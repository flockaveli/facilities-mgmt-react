import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = styled.div`
  border-width: 0;
  border-radius: 50;
  margin: auto;
`;

const containerStyle = {
    width: '40em',
    height: '40em',
    borderRadius: 50
};

export const LocationView = (props) => {

    const place = { lat: props.lat, lng: props.lng }

    const options = {
        clickableIcons: false,
        mapTypeId: 'satellite'
    }

    return (
        <>
            <LoadScript
                googleMapsApiKey="AIzaSyA2w3DmsqG4uM4SMjW3PzkjtEdu07GA7OY"
            >
                <MapContainer>
                    <GoogleMap
                        zoom={ 22 }
                        mapContainerStyle={ containerStyle }
                        center={ place }
                        options={ options }
                    >
                        <Marker position={ place } />
                    </GoogleMap>
                </MapContainer>
            </LoadScript>
        </>
    )
}

export default LocationView 