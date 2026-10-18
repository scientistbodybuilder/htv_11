from supabase_config import client

def get_user_resume(id: int):
    try:
        result = client.table("resume_blocks").select("*").eq("user_id", id).execute()
        print('get',result.data)
        return { "success": True, "data": [{
            'id': x['id'],
            'type': x['type'],
            'startDate': x['start_date'],
            'endDate': x['end_date'],
            'organization': x['organization'],
            'role': x['role'],
            'projectName': x['project_name'],
            'bullets': x['bullets']
        } for x in result.data] }

    except Exception as e:
        print('Error getting user resume:', e)
        return { "success": False, "error": str(e) }