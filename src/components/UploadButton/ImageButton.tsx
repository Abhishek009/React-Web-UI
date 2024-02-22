import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import logo from "../../logo.svg";
// Define a type for the button props if needed
type ImageButtonProps = {
  imageUrl: string;
  onClick: () => void;
};

// Use styled component approach to add background image
const ImageButtonStyle = styled(Button)<ImageButtonProps>(({ imageUrl }) => ({
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    height: '100px',
    width: '100px',
  }));

  const handleButtonClick = () => {
    console.log('Image button clicked');
  };

  const ImageButton=()=>{

    return (
        <div>
          <ImageButtonStyle
            imageUrl={logo} // Replace with your image path
            onClick={handleButtonClick}
          >
            {/* You can add text or leave it empty if you want only the image */}
          </ImageButtonStyle>
        </div>
      );
    };
  export default ImageButton;