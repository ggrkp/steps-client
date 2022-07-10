import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';


const UserContext = React.createContext({
    leaderScores: [],
    userRank: null,
    totalScore: null,
    monthlyScores: null,
    dateRange: null,
    latestUpload: null,
    userFetching: false,
    formattedOldestDate: '',
    formattedLatestDate: '',
    fetchUserData: () => { },
    clearUserData: () => { },
    updateLatestUpload: () => { },
   
})

export const UserContextProvider = (props) => {
    const [totalScore, setTotalScore] = useState('')
    const [monthlyScores, setMonthlyScores] = useState({ months: [], percentages: [] })
    const [leaderScores, setLeaderScores] = useState('')
    const [userRank, setUserRank] = useState('')
    const [dateRange, setDateRange] = useState({ latestDate: '', oldestDate: '' })
    const [latestUpload, setLatestUpload] = useState('')
    const [userFetching, setUserFetching] = useState(false)

    const fetchUserDataHandler = (token) => {
        setUserFetching(true)

        axios.get('http://localhost:3000/activities/latest-upload', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            }
        }).then((res) => {
            setLatestUpload(res.data)
        })

        axios.get('http://localhost:3000/activities/get-total-score', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            }
        }).then(response => {
            // set state and cast string to number.
            setTotalScore(+response.data.totalScore)
            setUserFetching(false)
        })

        axios.get('http://localhost:3000/activities/records-range', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            }
        }).then(response => {
            setDateRange({ ...response.data })
        })

        axios.get('http://localhost:3000/activities/get-monthly-score', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            }
        }).then(response => {
            setMonthlyScores(response.data)
        })


        axios.get('http://localhost:3000/activities/get-leaders', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }).then(response => {
            const leaders = response.data.result
            const userId = response.data.userId
            setLeaderScores(leaders.length > 3
                ? leaders.slice(0, 3) // if ranks len > 3,  get 3 first items of the ranks table.
                : leaders)

            // Find current user in rank tables and get his rank
            const currUser = leaders.find(x => x.userId === userId)
            setUserRank(currUser.rank)
        })

    }
    const updateLatestUploadHandler = (token) => {
        axios.get('http://localhost:3000/activities/latest-upload', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + token,
            }
        }).then((res) => {
            setLatestUpload(res.data)
        })
    }

    const clearUserDataHandler = () => {
        setLeaderScores([])
        setUserRank(null)
        setTotalScore(null)
        setMonthlyScores({ months: [], percentages: [] })
        setDateRange({ latestDate: '', oldestDate: '' })
        setLatestUpload(null)
        setUserFetching(false)
    }

   

    const latestDate = new Date(dateRange.latestDate);
    const latestYear = latestDate.getFullYear();
    const latestMonth = latestDate.getMonth() + 1;
    const latestDt = latestDate.getDate();

    const oldestDate = new Date(dateRange.oldestDate);
    const oldestYear = oldestDate.getFullYear();
    const oldestMonth = oldestDate.getMonth() + 1;
    const oldestDt = oldestDate.getDate();

    const formattedOldestDate = `${oldestDt}.${oldestMonth}.${oldestYear} `
    const formattedLatestDate = `${latestDt}.${latestMonth}.${latestYear}`

    const contextValue = {
        leaderScores: leaderScores,
        userRank: userRank,
        totalScore: totalScore,
        monthlyScores: monthlyScores,
        dateRange: dateRange,
        latestUpload: latestUpload,
        userFetching: userFetching,
        formattedOldestDate: formattedOldestDate,
        formattedLatestDate: formattedLatestDate,
        fetchUserData: fetchUserDataHandler,
        clearUserData: clearUserDataHandler,
        updateLatestUpload: updateLatestUploadHandler,
        
    }


    return <UserContext.Provider value={contextValue}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext