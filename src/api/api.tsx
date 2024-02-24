
import { FormDataSaveRequest } from "./model";

export const saveInterface = async (data: FormDataSaveRequest): Promise<void> => {
    try {
        const response = await fetch('http://localhost:8080/executeshell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),  
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error saving interface:', error);
        throw error;
    }
};



export const uploadFile = async (data: FormData): Promise<void> => {
    try {
        const response = await fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: data,            
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error saving interface:', error);
        throw error;
    }
};