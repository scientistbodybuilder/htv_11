from gemini_config import client as gemini_client, model 
import json,re
from supabase_config import client as supabase_client

def parse_llm_json(text: str):
    text = text.strip()
    # Remove ```json ... ``` or ``` ... ``` wrapper if present
    match = re.search(r"```(?:json)?\s*(.*?)\s*```", text, re.DOTALL)
    if match:
        text = match.group(1)
    return json.loads(text)

def clean(v):
    return None if v in (None, "", "N/A") else v

def clean_date(v):
    # "Present" or "N/A" -> NULL (treat NULL end_date as "current" in your UI)
    return None if v in (None, "", "N/A", "Present") else v

def upload_blocks_to_db(blocks: list, user_id: int):
    rows = [
        {
            "user_id": user_id,
            "type": b.get("type"),
            "start_date": clean_date(b.get("start_date")),
            "end_date": clean_date(b.get("end_date")),
            "organization": clean(b.get("organization")),
            "role": clean(b.get("role")),
            "project_name": clean(b.get("project_name")),
            "bullets": b.get("bullets") if isinstance(b.get("bullets"), list) else [],
        }
        for b in blocks
    ]
    return supabase_client.table("resume_blocks").insert(rows).execute()

async def extract_blocks(content: str, id: int):
    """
    Parse a resume and extract relevant information.
    
    Args:
        content (str): The content of the resume
        
    Returns:
        dict: A dictionary containing the extracted information
    """
    prompt = f"""You are an assistant meant to extract experiences, projects, and extra-curricular activities from technical resumes.
    You will receive the parsed text content of a resume and will identify and extract information.
    
    Respond in JSON format list with the following structure.
    {{
        "type": "Work" | "Project" | "Extra-Curricular",
        "start_date": "YYYY-MM-DD",
        "end_date": "YYYY-MM-DD" | "Present",
        "organization": "[organization name]" | "N/A",
        "role": "[role]" | "N/A",
        "project_name": "[project name]" | "N/A",
        "bullets": ["[bullet point 1]", "[bullet point 2]", ...] | "N/A"
    }}

    Extract this information from the following resume content: {content}
    """

    # user_prompt = f"""Extract information from the following resume content:
    # {content}"""

    try:
        interaction = gemini_client.interactions.create(
            model=model,
            input=prompt
        )
        print(interaction.output_text)
        # return interaction.output_text
        result = parse_llm_json(interaction.output_text)
        print('parsed:', result)
        payload = {
            'result': result
        }
        payload['metadata'] = {
            'success': True
        }

        # Save to database
        upload_blocks_to_db(result, id)

        return payload

    except Exception as e:
        print(f"Error occurred while parsing resume: {e}")
        return {
            "error": str(e),
            "metadata": {
                "success": False
            }
        }