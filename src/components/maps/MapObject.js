import React, { useEffect, useContext, useState } from 'react'
// import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import ProfileCard from '../layout/ProfileCard'
import HeatmapOverlay from './heatmap-leaflet.js'
import L from 'leaflet'
import axios from 'axios'

const MapObject = () => {

    useEffect(() => {
        axios.get('http://localhost:3000/admin/heatmap')
            .then((res) => {
                return res.data
            }).then((data) => {
                // const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                //     maxZoom: 19,
                //     attribution: '© OpenStreetMap'
                // })

                const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                });

                const cfg = {
                    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
                    // if scaleRadius is false it will be the constant radius used in pixels
                    "radius": 0.001,
                    "maxOpacity": .8,
                    // scales the radius based on map zoom
                    "scaleRadius": true,
                    // if set to false the heatmap uses the global maximum for colorization
                    // if activated: uses the data maximum within the current map boundaries
                    //   (there will always be a red spot with useLocalExtremas true)
                    "useLocalExtrema": true,
                    // which field name in your data represents the latitude - default "lat"
                    latField: 'latitude',
                    // which field name in your data represents the longitude - default "lng"
                    lngField: 'longtitude',
                    // which field name in your data represents the data value - default "value"
                    // valueField: 'count'
                };


                const heatmapLayer = new HeatmapOverlay(cfg);

                const map = new L.Map('map', {
                    center: new L.LatLng(38.2304, 21.7531),
                    zoom: 7,
                    layers: [baseLayer, heatmapLayer]
                });

                heatmapLayer.setData({ data });
            })

    }, [])


    return (
        <ProfileCard ProfileCard title="Heatmap" >
            <div className="map-container" id="map"></div>
        </ProfileCard >

    )
}


export default MapObject

