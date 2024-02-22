import { Paper, Typography } from "@mui/material";
import React, { FormEvent, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import './SourceInterface.css';
import { FormControl, FormLabel } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormDataSaveRequest } from '../../api/model';
import { saveInterface, uploadFile } from "../../api/api";
import UploadButton from "../UploadButton/UploadButton";
import ImageButton from "../UploadButton/ImageButton";

const SourceInterface = () => {

    const [squadName, setSquadName] = useState('');
    const [smName, setSMName] = useState('');
    const [sourceCountry, setsourceCountry] = useState('');
    const [OAFile, setOAFile] = useState<File | undefined>();
    const [HdfsFile, setHdfsFile] = useState<File | undefined>();

    const handleSquadNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSquadName(event.target.value);
    };

    const handleSMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSMName(event.target.value);
    };

    const handleSourceCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setsourceCountry(event.target.value);
    };

    const handleOnChangeOAFile = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement & {
            files: FileList
        }
        for(let i=0;i< target.files.length;i++){
            setOAFile(target.files[i]);
        }
        
       
        console.log('target', target.files)
    };

    const handleOnChangeHdsfFile = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault()
        const target = event.target as HTMLInputElement & {
            files: FileList
        }
        for(let i=0;i< target.files.length;i++){
            setHdfsFile(target.files[i]);
        }
        
       
        console.log('target', target.files)
    };

    const handleSubmit = (event: React.FormEvent) => {
        console.log(squadName)
        console.log(smName)
        console.log(sourceCountry)
        event.preventDefault();
        try {
            const formData: FormDataSaveRequest = {
                squadName: squadName,
                smName: smName,
                sourceCountry: sourceCountry,
            };
            saveInterface(formData);
        } catch (error) {
            console.error('Error submitting data:', error);
        }

    };

const handleSubmitFileUpload = (event:React.FormEvent) => {
    event.preventDefault();
    try {
        if (typeof OAFile=='undefined' || typeof HdfsFile=='undefined' ) return
        
        setOAFile(OAFile)
        setHdfsFile(HdfsFile)
        const formData = new FormData();
        formData.append('OAFile',OAFile)
        formData.append('HdfsFile',HdfsFile)
        uploadFile(formData)
    } catch (error) {
        console.error('Error submitting data:', error);
    }


    
}



    return (
        <aside>
            <form onSubmit={handleSubmitFileUpload}>
                <Grid className='App'>
                    <Paper elevation={10} >
                        <Grid xs={12}><Typography variant="h4" className='HeaderText TextPadding'>
                            Security Matrix
                        </Typography>
                        </Grid>
                        <br></br>
                        <Grid container spacing={4} className="TextFormat" >
                            <Grid xs={4} >
                                <FormLabel > Squad Name </FormLabel>
                            </Grid>
                            <Grid xs={5} >
                                <FormControl fullWidth>
                                    <TextField
                                        id="squadName"
                                        variant="standard"
                                        onChange={handleSquadNameChange}
                                    ></TextField>

                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} className="TextFormat">
                            <Grid xs={4} >
                                <FormLabel>Process Type</FormLabel>
                            </Grid>
                            <Grid xs={5} >
                                <FormControl >
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        onChange={handleSMChange}
                                    >
                                        <FormControlLabel value="SM_Prepare" control={<Radio />} label="SM_Prepare" />
                                        <FormControlLabel value="SM_Compare" control={<Radio />} label="SM_Compare" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={4} className="TextFormat">
                            <Grid xs={4} >
                                <FormLabel >Source|Country</FormLabel>
                            </Grid>
                            <Grid xs={5} >
                                <TextField
                                    id="outlined-multiline-flexible"
                                    multiline
                                    maxRows={3}
                                    onChange={handleSourceCountryChange}
                                />
                            </Grid>
                        </Grid>

                        

                        <Grid container spacing={4} className="TextFormat">
                            <Grid xs={4} >
                                
                            </Grid>
                            <Grid xs={8} >
                            <Button
                                    variant='contained'
                                    component="label"
                                    size="medium">Upload OA file 
                                    <input type="file" hidden onChange={handleOnChangeOAFile}></input>
                                </Button>
                               {OAFile && <p>{OAFile.name}</p>}
                            </Grid>
                        </Grid>
                        <Grid container spacing={4} className="TextFormat">
                            <Grid xs={4} >
                                
                            </Grid>
                            <Grid xs={8} >
                            <Button
                                    variant='contained'
                                    component="label"
                                    size="medium">Upload HDFS file 
                                    <input type="file" hidden onChange={handleOnChangeHdsfFile}></input>
                                </Button>
                               {HdfsFile && <p>{HdfsFile.name}</p>}
                            </Grid>
                        </Grid>

                        <Grid container spacing={4} className="TextFormat">
                            <Grid xs={4} >
                               
                            </Grid>
                            <Grid xs={8} >
                                <Button variant="contained" type="submit">Generate SM</Button>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
            </form>
        </aside>
    );

}

export default SourceInterface;