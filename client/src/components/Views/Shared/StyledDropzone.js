import React, { useState, useEffect } from "react";
import styled from 'styled-components/macro';
import { useDropzone } from 'react-dropzone';
import { Row, Col, Image } from 'react-bootstrap';


const getColor = (props) => {
    if (props.isDragAccept) {
        return '#00e676';
    }
    if (props.isDragReject) {
        return '#ff1744';
    }
    if (props.isDragActive) {
        return '#2196f3';
    }
    return '#eeeeee';
}

const DropZoneContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .20s ease-in-out;
`;

const ThumbsContainer = styled.aside`
	display: 'grid';
	background-color: #00e676;
	width: 100;
	height: auto;
	margin: 1em;
  `;

const PreviewImg = styled(Image)`
	border-radius: 50%;
	width: 5em;
	height: 5em;
	object-fit: "cover";
    object-position: "center"
  `;

const StyledDropzone = (props) => {
    const { setFieldValue } = props;
    const [photos, setPhotos] = useState([]);
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedPhotos => {
            setFieldValue("photos", acceptedPhotos);
            setPhotos(acceptedPhotos.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = photos.map(file => (
        <Col>
            <PreviewImg key={ file.name } src={ file.preview } />
        </Col>
    ));

    useEffect(() => {
        photos.forEach(file => URL.revokeObjectURL(file.preview));
    }, [photos]);

    return (
        <>
            <DropZoneContainer>
                <div { ...getRootProps({ isDragActive, isDragAccept, isDragReject }) }>
                    <input { ...getInputProps() } />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
            </DropZoneContainer>
            <ThumbsContainer>
                <Row>
                    { thumbs }
                </Row>
            </ThumbsContainer>
        </>
    );
}

export default StyledDropzone