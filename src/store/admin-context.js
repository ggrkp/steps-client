import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './auth-context'

const AdminContext = React.createContext({
    monthlyData: null,
    perUserData: null,
    dailyData: null,
    yearlyData: null,
    typePercentage: null,
    fetchDashData: () => { },
    clearDashData: () => { }

})

export const AdminContextProvider = (props) => {
    const authCtx = useContext(AuthContext)
    const [monthlyData, setMonthlyData] = useState([])
    const [perUserData, setPerUserData] = useState([])
    const [dailyData, setDailyData] = useState([])
    const [yearlyData, setYearlyData] = useState([])
    const [typePercentage, setTypePercentage] = useState({})

    const clearDashDataHandler = () => {
        setMonthlyData(null)
        setPerUserData(null)
        setDailyData(null)
        setYearlyData(null)
        setTypePercentage(null)
    }
    const fetchDashDataHandler = () => {
        axios.get('http://localhost:3000/admin/dashboard', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + authCtx.token,
            }
        }).then(response => {
            const data = response.data
            setMonthlyData(data.monthlyData)
            setPerUserData(data.perUserData)
            setDailyData(data.dailyData)
            setYearlyData(data.yearlyData)
            setTypePercentage(data.typePercentage)
        }).then(console.log('FETCHED'))

    }

    const contextValue = {
        monthlyData: monthlyData,
        perUserData: perUserData,
        dailyData: dailyData,
        yearlyData: yearlyData,
        typePercentage: typePercentage,
        fetchDashData: fetchDashDataHandler,
        clearDashData: clearDashDataHandler
    }


    return <AdminContext.Provider value={contextValue}>
        {props.children}
    </AdminContext.Provider>
}

export default AdminContext