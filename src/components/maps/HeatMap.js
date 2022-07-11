import { useMap } from 'react-leaflet'
import { useEffect, useContext, useState, memo } from 'react'
import L from 'leaflet'
import "leaflet.heat"
import HeatmapOverlay from './heatmap-leaflet'
const HeatMap = (props) => {
    // const addressPoints = 
    const map = useMap()

    useEffect(() => {
        console.log(props.data)

        // don't forget to include leaflet-heatmap.js
        const testData = {
            max: 8,
            data: props.data
            // data: [{ latitude: 24.6408, longtitude: 46.7728, count: 3 }, { latitude: 50.75, longtitude: -1.55, count: 1 }]
        };

        const cfg = {
            // radius should be small ONLY if scaleRadius is true (or small radius is intended)
            // if scaleRadius is false it will be the constant radius used in pixels
            
            "radius": 0.005,
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
            valueField: 'value'
        };


        const heatmapLayer = new HeatmapOverlay(cfg);

        heatmapLayer.name = "heatmap"
        
        heatmapLayer.setData(testData);

        heatmapLayer.addTo(map)

    }, [map, props.data])


    // useEffect(() => {
    //     const points = props.data
    //         ? props.data.map((p) => {
    //             return [p[0], p[1], p[2]]; // lat lng intensity
    //         })
    //         : [];

    //     let heatMap = L.heatLayer()
    //     heatMap.setLatLngs(points)
    //     heatMap.addTo(map);

    // }, [props.data, map]);
}

export default memo(HeatMap)