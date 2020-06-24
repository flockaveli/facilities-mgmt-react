import React from 'react';

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
        <img src={ base64Flag + imageString } alt='requestImage' />

    )

}

export default UploadedImage