import os, json, asyncio, logging, fitz
from datetime import date
from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, Request, UploadFile, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from fastapi.responses import JSONResponse, StreamingResponse

from services.models import extract_blocks
from services.users import get_user_resume

load_dotenv()

app = FastAPI(
    title="Juno",
    description="A capacity aware pivoting planner",
    version="1.0.0",
)
security = HTTPBearer()

_origins = [
    "http://localhost:5173",
]
print("origins:", _origins)
app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


def parse_pdf_text(file_bytes: bytes) -> str:
    """
    Parse text content from a PDF file.
    
    Args:
        file_bytes: Raw bytes of the PDF file
        
    Returns:
        Extracted text as a single string
    """
    text_parts = []
    text_pages = []
    
    # Open PDF from bytes
    pdf_document = fitz.open(stream=file_bytes, filetype="pdf")
    
    for page_num in range(len(pdf_document)):
        page = pdf_document[page_num]
        text = page.get_text()
        if text.strip():
            text_parts.append(text)
        text_pages.append({
            "page": page_num,
            "text": text
        })
    pdf_document.close()
    
    return "\n\n".join(text_parts), text_pages

@app.post("/api/parse-resume")
async def parse_resume(file: UploadFile = File(...),uid: str = Form(...)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF file.")

    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(status_code=400, detail="Empty file uploaded.")
    
    text, pages = parse_pdf_text(file_bytes)
    id = int(uid)
    extracted_info = await extract_blocks(text, id)
    return {"extracted_info": extracted_info}

@app.get("/api/master-resume/{user_id}")
async def get_master_resume(user_id: int):
    # Implementation for retrieving master resume
    id = int(user_id)
    return get_user_resume(id)

@app.get("/health")
async def health() -> dict:
    """Health check for load balancers and monitoring."""
    return {"status": "ok", "service": "juno-api"}