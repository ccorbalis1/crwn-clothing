import styled, { css } from 'styled-components';


const buttonStyles = css`

    background-color: black;
    color: white;
    border: none;
    display: flex;

    &:hover {
        background-color: white;
        color: black;
        border: 1px solid black;
        }
`;


const invertedButtonStyles = css`

    background-color: white;
    color: black;
    border: 1px solid black;
    display: flex;
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;

    &:hover {
    background-color: black;
    color: white;
    border: none;
    }
`;

const googleSignInStyles = css`
    background-color: #4285f4;
    color: white;
    display: flex;
    
    &:hover {
        background-color: #357ae8;
        border: none;
    }
`;


const getButtonStyles = props => {
   
    if (props.isGoogleSignIn) {
        return googleSignInStyles;
    }

    return props.inverted ? invertedButtonStyles : buttonStyles;

}

export const CustomButtonContainer = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    cursor: pointer;
    
    justify-content: center;

    ${getButtonStyles}
`;