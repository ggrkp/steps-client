import ChartCard from '../components/layout/ChartCard';
import Chart from 'chart.js/auto';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Doughnut, Bar } from 'react-chartjs-2';

import { useState, useContext, useEffect } from 'react'
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
    }, [authCtx.token])

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
            <Container>
                <Row>
                    <Col className="no-padding"  md={12} lg={4}>
                        <ChartCard>
                            <div className="canvas square-chart">
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
                            </div>
                        </ChartCard>
                    </Col>
                    <Col className="no-padding" md={12} lg={8}>
                        <ChartCard>
                            <div className="canvas">
                                <Bar data={{

                                    labels: ['label', 'label', 'label', 'label', 'label', 'label', 'label', 'label', 'label', 'label', 'label', 'label',],
                                    datasets: [{
                                        label: 'My First Dataset',
                                        data: [65, 59, 80, 81, 56, 55, 40, 60, 90, 99, 12, 59],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            'rgba(255, 205, 86, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(201, 203, 207, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(255, 99, 132, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgb(255, 99, 132)',
                                            'rgb(255, 159, 64)',
                                            'rgb(255, 99, 132)',
                                            'rgb(255, 205, 86)',
                                            'rgb(255, 99, 132)',
                                            'rgb(75, 192, 192)',
                                            'rgb(54, 162, 235)',
                                            'rgb(255, 99, 132)',
                                            'rgb(255, 99, 132)',
                                            'rgb(153, 102, 255)',
                                            'rgb(255, 99, 132)',
                                            'rgb(201, 203, 207)'
                                        ],
                                        borderWidth: 1
                                    }]

                                }} />
                            </div>
                        </ChartCard>
                    </Col>
                    {/* <Col sm>
                        <ChartCard>
                            LEADERBOARDS PLACEHOLDER
                        </ChartCard>
                    </Col>
                    <Col sm>
                        <ChartCard>
                            Records Range:{formattedRange}
                        </ChartCard>


                    </Col> */}
                </Row>
                <Row>

                    {/* <Col sm={4}>sm=4</Col> */}
                </Row>
            </Container>


        </>
    )
}

export default ProfilePage