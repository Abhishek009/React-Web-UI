import Button from '@mui/material/Button';
import '../SourceInterface/SourceInterface.css';
import './UploadModal.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect,useState } from 'react';
import { saveInterface, uploadFile,getSMFile, filedownload } from "../../api/api";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


type fileData = {
  filename:string
}



const DownloadModal = (props: { status: boolean }) => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);

  const fetchData = () => {
    fetch("http://localhost:8080/getfilelist")
      .then((response) => response.json())
      .then((data) => {
        console.log("in use effect => "+data)
        setUsers(data);
      });
  };
 

  const handleClickOpen = () => {
    setOpen(true);
    fetchData()
    const data = getSMFile();
    
    
    
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleOnChangeHdsfFile = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()

  };

  function handleFileDownload(event: React.FormEvent<HTMLElement>): void {
    event.preventDefault();
    const filename = event.currentTarget
    console.log(filename.id)
    const formData = new FormData();
    formData.append('filename', filename.id)
    const data = filedownload(formData)
    console.log(data)
    
    
    
   
}


    
  

  return (
    <aside>
      <Button variant="text" onClick={handleClickOpen} startIcon={<CloudDownloadIcon />} disabled={props.status}>
        Download SM
      </Button>

      <Dialog open={open} onClose={handleClose} className='modalContainer'>
        <DialogTitle>Download SM Files</DialogTitle>
        <Divider />
        <DialogContent>

          {/* <Box className="modalContent">
          <div>
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
             <a href="{user}" onClick={handleFileDownload} id={user}>{user}</a>
          ))}
        </ul>
      )}
    </div>




          </Box> */}

          <Box className="modalContent">
      
      {users.length > 0 && (
        <List>
          {users.map((user) => (
          <ListItem disablePadding onClick={handleFileDownload} id={user}>
        <ListItemButton >
          <ListItemText primary={user} />
        </ListItemButton>
      </ListItem>
       ))}
        </List>
      )}
        
      
    </Box>


        </DialogContent>
        <DialogActions>

          <Button variant="contained" size='small' onClick={handleClose}>Cancel</Button>

        </DialogActions>
      </Dialog>

    </aside>

  
  );
}
export default DownloadModal;