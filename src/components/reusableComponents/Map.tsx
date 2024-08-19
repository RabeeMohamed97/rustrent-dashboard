import 'leaflet/dist/leaflet.css';

import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import loc from '../../assets/location.svg';
import L from 'leaflet';

// import "./map.css";
import { useState } from 'react';
type MapProps = {
    setPosition: (arr: { lat: number; lng: number } | null) => void;
};
const MapComponent = (props: MapProps) => {
    const [Position, setPosition] = useState<[number, number]>([30.760718908944472, 30.992431640625004]);
    const LocationMarker = () => {
        useMapEvents({
            click(e: any) {
                props.setPosition(e.latlng);
                setPosition(e.latlng);
            },
        });

        return null;
    };

    console.log(Position);

    const LocationIcon = new L.Icon({
        iconUrl: loc,
        iconSize: [36, 36],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
    return (
        <div className="relative">
            <MapContainer center={[30.760718908944472, 30.992431640625004]} zoom={7} style={{ height: '50vh', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
                <LocationMarker />
                <Marker position={Position} icon={LocationIcon}></Marker>
            </MapContainer>{' '}
        </div>
    );
};

export default MapComponent;
