import Snackbar from '../components/layout/Snackbar'
import Card from '../components/layout/Card'
import Chart from 'chart.js/auto';

import { useState, useContext, useEffect } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2';
import AuthContext from '../store/auth-context'
import axios from 'axios'

const ProfilePage = (props) => {
    const authCtx = useContext(AuthContext)
    const [phPercent, setPhPercent] = useState('')
    const [dateRange, setDateRange] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3000/activities/physical-percentage', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + authCtx.token,
            }
        }).then(response => {
            // set state and cast string to number.
            setPhPercent(+response.data.phPercent)
            console.log(response.data.phPercent)
        })

        axios.get('http://localhost:3000/activities/records-range', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + authCtx.token,
            }
        }).then(response => {
            setDateRange({ ...response.data })
            console.log(response.data)
        })
    },[authCtx.token])

    const latestDate = new Date(dateRange.latestDate);
    const latestYear = latestDate.getFullYear();
    const latestMonth = latestDate.getMonth() + 1;
    const latestDt = latestDate.getDate();

    const oldestDate = new Date(dateRange.oldestDate);
    const oldestYear = oldestDate.getFullYear();
    const oldestMonth = oldestDate.getMonth() + 1;
    const oldestDt = oldestDate.getDate();

    const formattedRange = `${oldestDt}.${oldestMonth}.${oldestYear} - ${latestDt}.${latestMonth}.${latestYear}`

    return (
        <>
            <h4>{formattedRange}</h4>
            <Card>
                <Doughnut data={
                    {
                        labels: ['Physical Activities %', 'Other Activities %'],
                        datasets: [
                            {
                                label: 'Physical activities Percentage',
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(54, 162, 235, 0.2)'],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(54, 162, 235, 1)',],
                                borderWidth: 0.8,
                                data: [phPercent, 100 - phPercent]
                            }
                        ]
                    }}
                    options={{
                        title: {
                            display: true,
                            text: 'Physical activities Percentage',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }} />
                {/* <h3>Percentage of physical activities</h3> */}
            </Card>
        </>
    )
}

export default ProfilePage