import { Paper, Typography } from "@mui/material";
import React, { FormEvent, useRef,useState } from 'react';
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
import { saveInterface } from "../../api/api";

const SourceInterface = () => {

    const [squadName, setSquadName] = useState('');
    const [smName, setSMName] = useState('');
    const [sourceCountry, setsourceCountry] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSquadName(event.target.value);
    };

    const handleSMChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSMName(event.target.value);
      };

    const handleSourceCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setsourceCountry(event.target.value);
      };



    const handleSubmit =(event: React.FormEvent) => {
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
          }catch (error) {
          console.error('Error submitting data:', error);
        }

      };

    



    return (
        <aside>
            <form onSubmit={handleSubmit}>
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

                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    variant="standard"
                                    value={squadName}
                                    label="Squad"
                                    onChange={handleChange}
                                    //inputRef={squadName}
                                    >
                                    <MenuItem value="RFTD">RFTD</MenuItem>
                                    <MenuItem value="BB">BB</MenuItem>
                                    <MenuItem value="Zeus">Zeus</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={4} className="TextFormat">
                        <Grid xs={4} >
                            <FormLabel>Process Type</FormLabel>
                        </Grid>
                        <Grid  xs={5} >
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
                        <Grid  xs={8} >
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