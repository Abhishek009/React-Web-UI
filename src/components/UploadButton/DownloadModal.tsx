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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const DownloadModal = (props: {status:boolean}) => {
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
            <Button variant="text" onClick={handleClickOpen} startIcon={<CloudDownloadIcon />} disabled={props.status}>
                Download SM
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
                    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                    
                    


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
export default DownloadModal;