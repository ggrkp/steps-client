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

    const addressPoints = adminCtx.mapData


    const clickHandler = (event) => {
        adminCtx.getMapData([{ latitude: 38.2505, longtitude: 22.0811 }])
    }
    const position = [38.2466, 21.7345]

    return (
        <ProfileCard ProfileCard title="Heatmap" >
            <MapContainer
                className="map-container"
                center={position}
                zoom={10}
                scrollWheelZoom={true}>
                <HeatMap data={addressPoints} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>

            <button className="button button-prim" onClick={clickHandler}>Refresh</button>
        </ProfileCard>
    )
}

export default MapObject