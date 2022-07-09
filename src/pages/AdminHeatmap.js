import MapObject from '../components/maps/MapObject'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AdminHeatmap = () => {
    const [data, setData] = useState(null)
    // useEffect(() => {

    //     axios.get('http://localhost:3000/admin/heatmap')
    //         .then((res) => {
    //             setData(res.data)
    //             return res.data
    //         })
    // }, [])

    return (
        <MapObject />
    )
}

export default AdminHeatmap