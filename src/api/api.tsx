
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

export const getSMFile = async () => {
    const data = await fetch("http://localhost:8080/getfilelist");
    return JSON.stringify(data);
};

export const downloadSMFile = async () => {
    const data = await fetch("http://localhost:8080/getfilelist");
    return JSON.stringify(data);
};

export const filedownload = async (data: FormData) => {
    try {
        const response = await fetch('http://localhost:8080/download', {
          method: 'POST', 
          body: data,
        });
        console.log(response)
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = data.get('filename') as string; // Set the desired filename
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error('Error downloading file:', response.statusText);
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
  
  }