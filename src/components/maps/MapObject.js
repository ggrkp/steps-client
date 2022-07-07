import React, { useState } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import ProfileCard from '../layout/ProfileCard'

const MapObject = () => {
    

    const [position, setPosition] = useState([38.0110, 23.6887])
    const [zoom, setZoom] = useState(13)
    return (
        <ProfileCard title={"Heatmap"}>
            <MapContainer className="map-container" center={position} zoom={zoom}>
                <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </ProfileCard>
    )
}







// class MapObject extends React.Component {
//   constructor () {
//     super()
//     this.state = {
//       lat: 51.505,
//       lng: -0.09,
//       zoom: 13
//     }
//   }

//   render () {
//     const position = [this.state.lat, this.state.lng]
//     return (
//         <MapContainer className="map-container" center={position} zoom={this.state.zoom}>
//           <TileLayer
//             url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={position}>
//             <Popup>
//               <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
//             </Popup>
//           </Marker>
//         </MapContainer>
//       )
//   }
// }

export default MapObject