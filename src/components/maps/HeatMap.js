import { useMap } from 'react-leaflet'
import { useEffect, useContext, useState, memo } from 'react'
import L from 'leaflet'
import "leaflet.heat"

const HeatMap = memo((props) => {
    const addressPoints = props.data
    const map = useMap()
    useEffect(() => {
        const points = addressPoints
            ? addressPoints.map((p) => {
                return [p[0], p[1], p[2]]; // lat lng intensity
            })
            : [];

        L.heatLayer(points).addTo(map);
    }, [addressPoints, map]);
})

export default HeatMap