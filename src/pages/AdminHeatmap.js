import MapObject from '../components/maps/MapObject'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AdminContext from '../store/admin-context'
const AdminHeatmap = () => {

    const adminCtx = useContext(AdminContext)
    const data = adminCtx.mapData


    return (
        <MapObject data={data} />
    )
}

export default AdminHeatmap