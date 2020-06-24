import React from 'react';
import styled from 'styled-components/macro';

const StyledImage = styled.img`
margin: 2em;
height: 8em;
width: 8em;
border-radius: 50%;
box-shadow: rgb(209, 217, 230) 18px 18px 30px 0px, rgb(255, 255, 255) -18px -18px 30px 0px;

:hover{
    height: 24em;
    width: auto;
    border-radius: 0;
}

`

export const UploadedImage = (props) => {
    const base64Flag = `data:${props.props.contentType};base64,`
    const imageString = arrayBufferToBase64(props.props.data.data)

    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    return (
        <StyledImage
            src={ base64Flag + imageString } alt='requestImage' />

    )

}

export default UploadedImage