import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = styled.div`
  border-width: 2px;
  border-radius: 50;
`;

const containerStyle = {
    width: '40em',
    height: '40em',
    borderRadius: 50
};

export const UniMap = (props) => {
    const { setFieldValue } = props;
    const [markerLocation, setMarkerLocation] = useState({ lat: -36.88077058119626, lng: 174.7077441215515 })
    const options = {
        clickableIcons: false
    }

    useEffect(() => {
        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                setMarkerLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
                setFieldValue("location", { building: 'Exterior', lat: position.coords.latitude, lng: position.coords.longitude })
            }
            )
        }
    }, []);

    const mapClick = (e) => {
        console.log(e.latLng)
        setMarkerLocation(e.latLng)
        setFieldValue("location", { building: 'Exterior', lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
    return (
        <>
            <LoadScript
                googleMapsApiKey="AIzaSyA2w3DmsqG4uM4SMjW3PzkjtEdu07GA7OY"
            >
                <MapContainer>
                    <GoogleMap
                        zoom={ 19 }
                        mapContainerStyle={ containerStyle }
                        center={ markerLocation }
                        onClick={ mapClick }
                        options={ options }
                    >
                        <Marker position={ markerLocation } />
                    </GoogleMap>
                </MapContainer>
            </LoadScript>
        </>
    )
}

export default UniMap