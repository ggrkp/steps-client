import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './auth-context'

const AdminContext = React.createContext({
    mapData: [],
    monthlyData: null,
    perUserData: null,
    dailyData: null,
    yearlyData: null,
    typePercentage: null,
    fetching: false,
    mapFetching: false,
    fetchDashData: () => { },
    clearDashData: () => { },
    fetchMapData: () => { },
    clearMapData: () => { },
    getMapData: () => { },

})

export const AdminContextProvider = (props) => {
    const [monthlyData, setMonthlyData] = useState([])
    const [perUserData, setPerUserData] = useState([])
    const [dailyData, setDailyData] = useState([])
    const [yearlyData, setYearlyData] = useState([])
    const [typePercentage, setTypePercentage] = useState({})
    const [mapData, setMapData] = useState([])
    const [fetching, setFetching] = useState(false)
    const [mapFetching, setMapFetching] = useState(false)

    const clearDashDataHandler = () => {
        setMonthlyData([])
        setPerUserData([])
        setDailyData([])
        setYearlyData([])
        setTypePercentage({})
        setFetching(false)
    }
    const fetchDashDataHandler = (token) => {
        setFetching(true)

        axios.get('http://localhost:3000/admin/dashboard', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            }
        }).then(response => {
            const data = response.data
            setMonthlyData(data.monthlyData)
            setPerUserData(data.perUserData)
            setDailyData(data.dailyData)
            setYearlyData(data.yearlyData)
            setTypePercentage(data.typePercentage)
            setFetching(false)
        })

    }

    const fetchMapDataHandler = (token) => {
        setMapFetching(true)

        axios.get('http://localhost:3000/admin/heatmap', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            }
        })
            .then((res) => {
                setMapData(res.data)
                setMapFetching(false)
                return res.data
            })
    }

    const clearMapDataHandler = () => {
        setMapData([])
    }
    const getMapDataHandler = (data) => {
        setMapData(data)
    }
    const contextValue = {
        monthlyData: monthlyData,
        perUserData: perUserData,
        dailyData: dailyData,
        yearlyData: yearlyData,
        typePercentage: typePercentage,
        mapData: mapData,
        fetching: fetching,
        mapFetching: mapFetching,
        fetchDashData: fetchDashDataHandler,
        clearDashData: clearDashDataHandler,
        fetchMapData: fetchMapDataHandler,
        clearMapData: clearMapDataHandler,
        getMapData: getMapDataHandler
    }


    return <AdminContext.Provider value={contextValue}>
        {props.children}
    </AdminContext.Provider>
}

export default AdminContext