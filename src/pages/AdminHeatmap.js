import MapObject from '../components/maps/MapObject'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import AdminContext from '../store/admin-context'
import Loader from '../components/layout/Loader'
const AdminHeatmap = () => {

    const adminCtx = useContext(AdminContext)
    const data = adminCtx.mapData


    return (<>

        {
            adminCtx.mapData.length !== 0 ? <MapObject data={data} />
                : <Loader size={64} />
        }
    </>
    )
}

export default AdminHeatmap