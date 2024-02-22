import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import logo from "../../logo.svg";
import Grid from '@mui/material/Unstable_Grid2';
import { Paper, Typography } from "@mui/material";
import '../SourceInterface/SourceInterface.css';
import NavBar from "../NavBar/NavBar";

// Define a type for the button props if needed
type ImageButtonProps = {
  imageUrl: string;
  onClick: () => void;
};

// Use styled component approach to add background image
const ImageButtonStyle = styled(Button)<ImageButtonProps>(({ imageUrl }) => ({
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: 'cover',
  height: '200px',
  width: '200px',
}));

const handleButtonClick = () => {
  console.log('Image button clicked');
};

const ImageButton = () => {

  return (
    <aside>
      
    
    <Grid 
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="inherit"
    sx={{ minHeight: '100vh' }}>
      <Paper >
        <Grid container spacing={1}>
          <Grid xs={4} >
            <ImageButtonStyle
              imageUrl={logo} // Replace with your image path
              onClick={handleButtonClick}
            >
           Upload Config
            </ImageButtonStyle>
          </Grid>
          <Grid container spacing={1}>
          <Grid xs={4} >
            <ImageButtonStyle
              imageUrl={logo} // Replace with your image path
              onClick={handleButtonClick}
            >
           Generate SM
            </ImageButtonStyle>
          </Grid>
         </Grid>
        </Grid>
      </Paper>

      
      <br></br>

    </Grid>
    </aside>
  );
};
export default ImageButton;