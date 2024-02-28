
import { FormDataSaveRequest } from "./model";

export const saveInterface = async (data: FormDataSaveRequest): Promise<Boolean> => {
    try {
        const response = await fetch('http://localhost:8080/executeshell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),  
        });
        if (response) {
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.error('Error saving execution SM:', error);
        throw error;
    }
};



export const uploadFile = async (data: FormData):Promise<Boolean> => {
    try {
        const response = await fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: data,            
        });
        if (!response.ok) {
            return false;
        }else{
            return true;
        }
    } catch (error) {
        console.error('Error in uploading file:', error);
        throw error;
    }
};