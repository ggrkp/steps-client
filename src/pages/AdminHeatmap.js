import MapObject from '../components/maps/MapObject'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Loader from '../components/layout/Loader'
import AdminContext from '../store/admin-context'

const AdminHeatmap = () => {

    return (<>
        <MapObject />
    </>
    )
}

export default AdminHeatmap