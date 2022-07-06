// import styles from './DashBoardPage.module.css'
import Table from '../components/layout/Table';
import TableRow from '../components/layout/TableRow';
import ProfileCard from '../components/layout/ProfileCard';

import Chart from 'chart.js/auto';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Doughnut, Bar } from 'react-chartjs-2';
import ProfileWrapper from '../components/helpers/ProfileWrapper';

import { useState, useContext, useEffect } from 'react'
import AuthContext from '../store/auth-context'
import axios from 'axios'

const DashBoardPage = () => {
    // Add backend isAdmin verification middleware before requests.
    const authCtx = useContext(AuthContext)
    const [monthlyData, setMonthlyData] = useState([])
    const [perUserData, setPerUserData] = useState([])
    const [dailyData, setDailyData] = useState([])
    const [yearlyData, setYearlyData] = useState([])
    const [typePercentage, setTypePercentage] = useState({})
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']



    useEffect(() => {
        axios.get('http://localhost:3000/admin/dashboard', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + authCtx.token,
            }
        }).then(response => {
            const data = response.data
            setMonthlyData(data.monthlyData) // ok
            setPerUserData(data.perUserData)
            setDailyData(data.dailyData)
            setYearlyData(data.yearlyData)
            setTypePercentage(data.typePercentage)
        })
    }, [authCtx.token])

    return (
        <>
            <Container>
                {/* <Row>
                    <Col className="no-padding" md={6} lg={4}>
                        <ProfileCard title={<><i class="fa-solid fa-ranking-star"></i>&nbsp;&nbsp;Leaderboards</>}>
                            <Table firstCol={'User'} secondCol={"Last Month's Score"}>
                                {
                                    [...leaderScores].map(user => (
                                        <TableRow col1={user.user.name} col2={user.score} />
                                    ))}
                            </Table>
                        </ProfileCard>
                    </Col>
                    <Col className="no-padding" md={6} lg={4}>
                        <ProfileCard title={<><i class="fa-solid fa-star"></i>&nbsp;&nbsp;Your Score!</>}>

                        </ProfileCard>
                    </Col>
                    <Col className="no-padding" md={12} lg={4}>

                    </Col>
                </Row> */}
                <Row>
                    <Col className="no-padding" lg={4}>
                        <ProfileCard title={<><i class="fa-solid fa-chart-column"></i>&nbsp;&nbsp; User activity count.</>}>
                            <Table firstCol={'User'} secondCol={"Count per user"}>
                                {
                                    [...perUserData].map(item => (
                                        <TableRow col1={item.userName} col2={item.countPerUser} />
                                    ))}
                            </Table>
                        </ProfileCard>
                    </Col>
                    <Col className="no-padding" lg={8}>
                        <ProfileCard title={<><i class="fa-solid fa-chart-column"></i>&nbsp;&nbsp;Activity count.</>}>
                            <div className="canvas">
                                <Bar data={{
                                    labels: typePercentage.typeLabels,
                                    datasets: [{
                                        label: 'Monthly Score',
                                        data: typePercentage.typeData,
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

                                }} />
                            </div>
                        </ProfileCard>
                    </Col>
                </Row>
                <Row>
                    <Col className="no-padding" lg={12}>
                        <ProfileCard title={<><i class="fa-solid fa-chart-column"></i>&nbsp;&nbsp;Monthly activity count.</>}>
                            <div className="canvas">
                                <Bar data={{
                                    labels: [...months],
                                    datasets: [{
                                        label: 'Monthly Score',
                                        data: monthlyData,
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

                                }} />
                            </div>
                        </ProfileCard>
                    </Col>
                </Row>
                <Row>
                    <Col className="no-padding" lg={8}>
                        <ProfileCard title={<><i class="fa-solid fa-chart-column"></i>&nbsp;&nbsp; Daily activity count.</>}>
                            <div className="canvas">
                                <Bar data={{
                                    labels: [...days],
                                    datasets: [{
                                        label: 'Monthly Score',
                                        data: dailyData,
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

                                }} />
                            </div>
                        </ProfileCard>
                    </Col>
                    <Col className="no-padding" lg={4}>
                        <ProfileCard title={<><i class="fa-solid fa-chart-column"></i>&nbsp;&nbsp; Yearly activity count.</>}>
                            <Table firstCol={'Year'} secondCol={"Activity Count"}>
                                {
                                    [...yearlyData].map(year => (
                                        <TableRow col1={year.year} col2={year.yearlyActivityCount} />
                                    ))}
                            </Table>
                        </ProfileCard>


                    </Col>
                </Row>
            </Container>


















        </>
    )
}

export default DashBoardPage