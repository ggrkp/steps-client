import React, { useEffect, useContext, useState, useCallback } from 'react'
import HeatMap from './HeatMap'
import ProfileCard from '../layout/ProfileCard'
import AdminContext from '../../store/admin-context'
import AuthContext from '../../store/auth-context'
import {
    MapContainer, TileLayer, useMap
} from 'react-leaflet'

import "leaflet.heat"
import Loader from '../layout/Loader'


function ClearHeatmap() {
    const map = useMap()

    map.eachLayer(function (layer) {
        console.log(layer.name ?? null)
        if (layer.name === "heatmap") {
            map.removeLayer(layer);
        }
    });
    return null
}



const MapObject = (props) => {
    const adminCtx = useContext(AdminContext)
    const authCtx = useContext(AuthContext)

    const addressPoints = adminCtx.mapData

    const fetchAllHandler = (event) => {
        // adminCtx.getMapData(adminCtx.mapData)
        adminCtx.fetchMapData(authCtx.token)
    }

    const clearHandler = (event) => {
        adminCtx.clearMapData()
    }
    const position = [38.2466, 21.7345]

    return (
        <ProfileCard ProfileCard title="Heatmap of your activity" >
            <MapContainer
                className="map-container"
                center={position}
                zoom={10}
                scrollWheelZoom={true}>
                <ClearHeatmap />
                <HeatMap data={addressPoints} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
            <div>
                <>{!adminCtx.mapFetching ? <>
                    <button className="button button-critical" onClick={clearHandler}>Clear map</button>
                    <button className="button button-prim" onClick={fetchAllHandler}>Show all data</button></>
                    : <Loader size={36} />
                }</>
            </div>

            
        </ProfileCard>
    )
}

export default MapObject