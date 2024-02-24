import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import '../SourceInterface/SourceInterface.css';
import './UploadModal.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import { saveInterface, uploadFile } from "../../api/api";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';

const UploadModal = () => {

    const [open, setOpen] = React.useState(false);
    const [OAFile, setOAFile] = useState<File | undefined>();
    const [HdfsFile, setHdfsFile] = useState<File | undefined>();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOnChangeOAFile = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement & {
            files: FileList
        }
        for (let i = 0; i < target.files.length; i++) {
            setOAFile(target.files[i]);
        }


        console.log('target', target.files)
    };

    const handleOnChangeHdsfFile = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement & {
            files: FileList
        }
        for (let i = 0; i < target.files.length; i++) {
            setHdfsFile(target.files[i]);
        }


        console.log('target', target.files)
    };

    const handleSubmitFileUpload = (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            if (typeof OAFile == 'undefined' || typeof HdfsFile == 'undefined') return

            setOAFile(OAFile)
            setHdfsFile(HdfsFile)
            const formData = new FormData();
            formData.append('OAFile', OAFile)
            formData.append('HdfsFile', HdfsFile)
            uploadFile(formData).then((value) => {
                    console.log(value)
                    handleClose()
                    });
           
            
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

   

    return (
        <form onSubmit={handleSubmitFileUpload}>
            <Button variant="outlined" onClick={handleClickOpen}>
                Upload Files
            </Button>
           
            <Dialog open={open} onClose={handleClose} className='modalContainer'
             PaperProps={{
                component: 'form',
                action: {handleSubmitFileUpload}
              }}
            
            >
                <DialogTitle>Upload Config</DialogTitle>
                <Divider/>
                <DialogContent>
                    <DialogContentText>Upload OA File and HDFS file
                    </DialogContentText>
                    <Box className="modalContent">
                    <Grid container spacing={4}>
                        <Grid xs={6} >
                            <Button
                                variant='contained'
                                component="label"
                                size="medium" fullWidth>Upload HDFS file
                                <input type="file" hidden onChange={handleOnChangeHdsfFile}></input>
                            </Button>
                            
                        </Grid>
                        <Grid xs={6} >{HdfsFile && <p>{HdfsFile.name}</p>}</Grid>
                        
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid xs={6} ><Button
                                variant='contained'
                                component="label"
                                size="medium" fullWidth>Upload OA file
                                <input type="file" hidden onChange={handleOnChangeOAFile}></input>
                        </Button></Grid>
                        <Grid xs={6} >{OAFile && <p>{OAFile.name}</p>}</Grid>
                    </Grid>
                    <Grid container spacing={4}>
                    <LinearProgress variant="determinate" value={10} />
                    </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" type="submit">Upload Config</Button>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    
                </DialogActions>
            </Dialog>
            
            </form>


    );
}

export default UploadModal;