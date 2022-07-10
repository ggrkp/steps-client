import React, { useEffect, useContext, useState, useCallback } from 'react'
import HeatMap from './HeatMap'
import ProfileCard from '../layout/ProfileCard'
import AdminContext from '../../store/admin-context'
import {
    MapContainer, TileLayer
} from 'react-leaflet'

import "leaflet.heat"

const MapObject = (props) => {
    const adminCtx = useContext(AdminContext)
    const [addressPoints, setAddressPoints] = useState([])

    setTimeout(() => {
        setAddressPoints(adminCtx.mapData)
    }, 5000)
    const position = [38.2466, 21.7345]
    return (
        <ProfileCard ProfileCard title="Heatmap" >
            <MapContainer className="map-container" center={position} zoom={13} scrollWheelZoom={false}>
                <HeatMap data={addressPoints} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </ProfileCard>
    )
}

export default MapObject