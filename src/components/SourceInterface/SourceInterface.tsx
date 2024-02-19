import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControl, FormLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import './SourceInterface.css';
import { dark } from '@mui/material/styles/createPalette';
import { Typography } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



/*const SideItem = styled('div')(({ theme }) => ({

    padding: theme.spacing(1),
    textAlign: 'center',
    
})); */

const SourceInterface = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (

        <Box sx={{ flexGrow: 1 }}>
            <Grid container columnSpacing={2} >
                <Grid xs={3}></Grid>

                <Grid xs={6} spacing={2}>

                    <Item>
                        <Grid container spacing={1} >

                            <Grid xs={6}>
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Source|Country"
                                    multiline
                                    maxRows={4}
                                />
                            </Grid>
                            <Grid xs={12}>
                            <Box sx={{ minWidth: 120 }}>
                                <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={age}
                                    label="Age">
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </Box>

                            </Grid>
                            
                        </Grid>
                    </Item>
                </Grid>
                <Grid xs={3}></Grid>

            </Grid>
        </Box>
    );
};

export default SourceInterface;