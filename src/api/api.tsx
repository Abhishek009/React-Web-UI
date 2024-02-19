
import { FormDataSaveRequest } from "./model";

export const saveInterface = async (data: FormDataSaveRequest): Promise<void> => {
    try {
        const response = await fetch('http://localhost:8080/api/executeshell', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
           //body: JSON.stringify({"squadName":"squadName","smName":"smName","sourceCountry":"sourceCountry"})
            
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error saving interface:', error);
        throw error;
    }
};