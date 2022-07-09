import React, { useEffect, useContext, useState, useCallback } from 'react'
import ProfileCard from '../layout/ProfileCard'
// import HeatmapOverlay from './heatmap-leaflet.js'
import L from 'leaflet'
import "leaflet.heat"
import axios from 'axios'
import Loader from '../layout/Loader'


const MapObject = (props) => {
    const addressPoints = props.data
    // useEffect(() => {
    //     axios.get('http://localhost:3000/admin/heatmap')
    //         .then((res) => {
    //             console.log(res.data)
    //             return res.data
    //         })
    // }, [])



    const fetchHeatmap = useCallback(() => {
        var map = L.map("map").setView([37.9838, 23.7275], 12);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const points = addressPoints
            ? addressPoints.map((p) => {
                return [p[0], p[1]];
            })
            : [];

        L.heatLayer(points, { radius: 10 }).addTo(map);
        return (() => {
            map.remove()
        })
    }, [addressPoints])


    useEffect(() => {
        if (addressPoints) {

            fetchHeatmap()
        }
    }, [fetchHeatmap,addressPoints]);

    return (
        <ProfileCard ProfileCard title="Heatmap" >
            {addressPoints
                ? <div className="map-container" id="map"></div>
                : <div className="map-loader">
                    <div>Please wait until the map is ready...</div>
                    <Loader size={72} />
                </div>
            }
        </ProfileCard >

    )
}

export default MapObject