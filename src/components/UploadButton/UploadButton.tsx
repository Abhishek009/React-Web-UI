import React, { FormEvent, useRef,useState } from 'react';
import Button from '@mui/material/Button';

interface ButtonName{
    name:String,
}

const UploadButton=({name}:ButtonName) => {
    const [file, setFile] = useState<File|undefined>();

    const handleonChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement & {
            files: FileList
        }
        setFile(target.files[0]);
        //const reader = new FileReader();
    console.log('target',target.files)
        
    
        
      };

return(
    <Button
    variant='contained'
    component="label"
    size="medium">{name}<input type="file" hidden onChange={handleonChange}></input>
    
    </Button>
);

}

export default  UploadButton;