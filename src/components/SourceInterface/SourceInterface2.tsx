import { Paper, Typography } from "@mui/material";
import React, { FormEvent, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import './SourceInterface.css';
import { FormControl, FormLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormDataSaveRequest } from '../../api/model';
import { saveInterface, uploadFile } from "../../api/api";
import UploadModal from "../UploadButton/UploadModal";

const SourceInterface = () => {

    
    const [squadName, setSquadName] = useState('');
    const [smName, setSMName] = useState('');
    const [sourceCountry, setsourceCountry] = useState('');
    

    const handleSquadNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSquadName(event.target.value);
    };

    const handleSMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSMName(event.target.value);
    };

    const handleSourceCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setsourceCountry(event.target.value);
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


    return (
        <aside>
            
                <Grid className='App'>
                    <Paper elevation={10} >
                    <form onSubmit={handleSubmit}>
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
                        </form>
                        

                        
                        
                        <Grid container spacing={4} className="TextFormat">
                            <Grid xs={4} >
                               
                            </Grid>
                            <Grid xs={8} >
                            <UploadModal></UploadModal>
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
            
        </aside>
    );

}

export default SourceInterface;