import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = styled.div`
  border-width: 0;
  border-radius: 50%;
  margin: auto;
overflow: hidden;

object-fit: "cover";
object-position: "center";
padding: 0em -20em 0em -20em ;
  width: 10em;
  height: 10em;
  box-shadow: 18px 18px 30px 0px #D1D9E6, -18px -18px 30px 0px #FFFFFF;


  :hover {
    width: 40em;
  height: 40em;
  
  object-position: "center";
  border-radius: 0;
  }
`;

const containerStyle = {
    width: '40em',
    height: '40em',
    margin: 'auto'
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