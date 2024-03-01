import { Alert, LinearProgress, Paper, Typography } from "@mui/material";
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
import { ReactNode } from "react";
import DownloadModal from "../UploadButton/DownloadModal";
const SourceInterface = () => {

    const [error, setError] = useState<string>();
    const [success, setSuccess] = useState<string>();
    const [squadName, setSquadName] = useState('');
    const [smName, setSMName] = useState('');
    const [sourceCountry, setsourceCountry] = useState('');
    const [isExecuted, setIsExecuted] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

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
        event.preventDefault();
        console.log(squadName)
        console.log(smName)
        console.log(sourceCountry)

        if (!isClicked) setIsClicked(true)
        setIsExecuted(true)
        console.log("IsExecuted: " + isExecuted)

        const formData: FormDataSaveRequest = {
            squadName: squadName,
            smName: smName,
            sourceCountry: sourceCountry,
        };
        saveInterface(formData).then(function (data) {
            console.log("========" + data)
            if (data) {
                setIsExecuted(false);
                setSuccess("SM Executed succesfully");
                setIsClicked(false)
            } else {
                setIsExecuted(false);
                setError("Colud not execute the SM");
                setIsClicked(false)
            }
        }).catch(error => {
            console.log("Error submitting data:", error instanceof Error);
            if (error instanceof Error) {
                setIsExecuted(false);
                setError(error.message);
                setIsClicked(false)
            }
        })
        setIsExecuted(true)

    };
    let content: ReactNode;

    if (isExecuted) {
        content = <LinearProgress />
    } else if (error) {
        content = !isExecuted && <Alert severity="error">{error}</Alert>
    } else if (success) {
        content = !isExecuted && <Alert severity="success">{success}</Alert>
    }


    return (
        <aside>

            <Grid className='App'>
                <Paper elevation={5} >
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
                                        <FormControlLabel value="sm_prepare" control={<Radio />} label="SM_Prepare" />
                                        <FormControlLabel value="sm_compare" control={<Radio />} label="SM_Compare" />
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
                                <Button variant="contained" type="submit" size='small' disabled={isClicked}>Generate SM</Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid xs={12} >
                                {content}
                            </Grid>

                        </Grid>
                    </form>
                    <Grid container spacing={4} className="TextFormat">
                        {/* <Grid xs={4} >

                        </Grid> */}
                        <Grid xs={6} >
                            <UploadModal status={isClicked}></UploadModal>
                        </Grid>
                        <Grid xs={6} >
                            <DownloadModal status={isClicked}></DownloadModal>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>


        </aside>
    );

}

export default SourceInterface;