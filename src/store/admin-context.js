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
    fetchDashData: () => { },
    clearDashData: () => { },
    fetchMapData: () => { },
    clearMapData: () => { },

})

export const AdminContextProvider = (props) => {
    const [monthlyData, setMonthlyData] = useState([])
    const [perUserData, setPerUserData] = useState([])
    const [dailyData, setDailyData] = useState([])
    const [yearlyData, setYearlyData] = useState([])
    const [typePercentage, setTypePercentage] = useState({})
    const [mapData, setMapData] = useState([])
    const [fetching, setFetching] = useState(false)

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
        }).then(console.log('FETCHED'))

    }
    const fetchMapDataHandler = (token) => {
        axios.get('http://localhost:3000/admin/heatmap', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            }
        })
            .then((res) => {
                setMapData(res.data)
                return res.data
            })
    }

    const clearMapDataHandler = () => {
        setMapData([])
    }

    const contextValue = {
        monthlyData: monthlyData,
        perUserData: perUserData,
        dailyData: dailyData,
        yearlyData: yearlyData,
        typePercentage: typePercentage,
        mapData: mapData,
        fetching: fetching,
        fetchDashData: fetchDashDataHandler,
        clearDashData: clearDashDataHandler,
        fetchMapData: fetchMapDataHandler,
        clearMapData: clearMapDataHandler
    }


    return <AdminContext.Provider value={contextValue}>
        {props.children}
    </AdminContext.Provider>
}

export default AdminContext