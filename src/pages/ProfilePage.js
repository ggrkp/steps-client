import Table from '../components/layout/Table';
import TableRow from '../components/layout/TableRow';
import ProfileCard from '../components/layout/ProfileCard';
import Chart from 'chart.js/auto';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Doughnut, Bar } from 'react-chartjs-2';

import stringifyNumber from '../utils/numToStr'

import { useState, useContext, useEffect } from 'react'
import AuthContext from '../store/auth-context'
import axios from 'axios'

const ProfilePage = (props) => {
    // const stringifyNumber = require('../utils/numToStr.js')
    const authCtx = useContext(AuthContext)
    const [totalScore, setTotalScore] = useState('')
    const [monthlyScores, setMonthlyScores] = useState('')
    const [leaderScores, setLeaderScores] = useState('')
    const [userRank, setUserRank] = useState('')
    const [dateRange, setDateRange] = useState('')

    useEffect(() => {
        axios.get('http://localhost:3000/activities/get-total-score', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + authCtx.token,
            }
        }).then(response => {
            // set state and cast string to number.
            setTotalScore(+response.data.totalScore)
            console.log(response.data.totalScore)
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

        axios.get('http://localhost:3000/activities/get-monthly-score', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + authCtx.token,
            }
        }).then(response => {
            console.log(response.data)
            setMonthlyScores(response.data)
        })


        axios.get('http://localhost:3000/activities/get-leaders', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + authCtx.token,
            }
        }).then(response => {
            // console.log(response.data)
            const leaders = response.data.result
            const userId = response.data.userId
            console.log('userId: ' + userId)
            setLeaderScores(leaders.length > 3
                ? leaders.slice(0, 3) // if ranks len > 3,  get 3 first items of the ranks table.
                : leaders)

            // Find current user in rank tables and get his rank
            const currUser = leaders.find(x => x.userId === userId)
            setUserRank(currUser.rank)

        })


    }, [authCtx.token])

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

    return (
        <>
            <Container>
                <Row>
                    <Col className="no-padding" md={6} lg={4}>



                        <ProfileCard title={<><i class="fa-solid fa-ranking-star"></i>&nbsp;&nbsp;Leaderboards</>}>
                            <Table firstCol={'User'} secondCol={"Last Month's Score"}>
                                {
                                    [...leaderScores].map(user => (
                                        <TableRow col1={user.user.name} col2={user.score} />
                                    ))}
                            </Table>
                        </ProfileCard>



                        <ProfileCard title={<><i class="fa-solid fa-award"></i>&nbsp;&nbsp;Your Rank</>}>
                            <h2> You placed {stringifyNumber(userRank)}!</h2>

                        </ProfileCard>
                    </Col>
                    <Col className="no-padding" md={6} lg={4}>
                        <ProfileCard title={<><i class="fa-solid fa-star"></i>&nbsp;&nbsp;Your Score!</>}>
                            <div className="canvas square-chart">
                                <Doughnut data={
                                    {
                                        labels: ['Physical Activities %', 'Other Activities %'],
                                        datasets: [
                                            {
                                                backgroundColor: [
                                                    'rgba(75, 192, 192, 0.2)',
                                                    'rgba(54, 162, 235, 0.2)'],
                                                borderColor: [
                                                    'rgba(75, 192, 192, 1)',
                                                    'rgba(54, 162, 235, 1)',],
                                                borderWidth: 0.8,
                                                data: [totalScore, 100 - totalScore]
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
                            </div>
                        </ProfileCard>
                    </Col>
                    <Col className="no-padding" md={12} lg={4}>
                        <ProfileCard title={<><i class="fa-solid fa-database"></i>&nbsp;&nbsp;Records Range</>}>

                            <Table firstCol={'Oldest Record'} secondCol={"Latest Record"} >
                                <TableRow col1={formattedOldestDate} col2={formattedLatestDate} />
                            </Table>

                        </ProfileCard>
                    </Col>
                </Row>
                <Row>
                    <Col className="no-padding" lg={12}>
                        <ProfileCard title={<><i class="fa-solid fa-chart-column"></i>&nbsp;&nbsp;Your scores for the last 12 months</>}>
                            <div className="canvas">
                                <Bar data={{
                                    labels: monthlyScores.months,
                                    datasets: [{
                                        label: 'Monthly Score',
                                        data: monthlyScores.percentages,
                                        backgroundColor: [
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            'rgba(54, 162, 235, 0.2)'],


                                        borderColor: [
                                            'rgba(75, 192, 192, 1)',
                                            'rgb(255, 99, 132)',
                                            'rgb(255, 159, 64)',
                                            'rgba(54, 162, 235, 1)',
                                        ],
                                        borderWidth: 1
                                    }]

                                }}
                                    options={{
                                        scales: {
                                            y:
                                            {
                                                min: 0,
                                                max: 100,
                                                stepSize: 5,
                                            },
                                            x:
                                            {

                                            },
                                        },
                                    }
                                    }

                                />
                            </div>
                        </ProfileCard>
                    </Col>

                </Row>
            </Container>


        </>
    )
}

export default ProfilePage