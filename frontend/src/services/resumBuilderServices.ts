import axios from "axios"
const API_URL = 'http://localhost:8000/api'

export const uploadMasterResume = async (file: File) => {

    try {
        const formData = new FormData();
        formData.append("file", file);
        // formData.append("uid", uid);
        const response = await axios.post(`${API_URL}/parse-resume`, formData)
        console.log('upload resume response: ', response.data);
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        }
        return response.data
    } catch (err) {
        console.error('Error uploading resume:', err);
        return { error: err, success: false }
        
    }
}

export const retrieveMasterResume = async (userId: number) => {

    try {
        const response = await axios.get(`${API_URL}/master-resume/${userId}`)
        console.log('retrieve resume response: ', response.data);
        if (response.status >= 200 && response.status < 300) {
            if (response.data.success) return { success: true, data: response.data.data };
            return { success: false, data: null }
        }
        return { error: new Error('Failed to retrieve master resume'), success: false }
    } catch (err) {
        console.error('Error retrieving master resume:', err);
        return { error: err, success: false }
    }
}

