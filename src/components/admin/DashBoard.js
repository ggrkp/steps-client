import Table from '../layout/Table';
import TableRow from '../layout/TableRow';
import ProfileCard from '../layout/ProfileCard';

import { memo } from 'react'
import Chart from 'chart.js/auto';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Bar } from 'react-chartjs-2';

import { useState } from 'react'

const DashBoard = memo((props) => {
   

    const refreshHandler = () => {
        
        props.refreshData()
        
    }

    const monthlyData = props.monthlyData
    const perUserData = props.perUserData
    const dailyData = props.monthlyData
    const yearlyData = props.yearlyData
    const typePercentage = props.typePercentage
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    return (
        <>
            <Container>
                <Row>
                    <Col className="no-padding" lg={4}>
                        <button className="button button-prim" onClick={refreshHandler}>
                           Fetch Data
                        </button>

                        <button className="button button-critical">Delete Data</button>
                        <ProfileCard title={<>Total Activities per User</>}>
                            <Table firstCol={'User'} secondCol={"Activity Count"}>
                                {
                                    [...perUserData].map(item => (
                                        <TableRow col1={item.userName} col2={item.countPerUser} />
                                    ))}
                            </Table>
                        </ProfileCard>
                    </Col>
                    <Col className="no-padding" lg={8}>
                        <ProfileCard title={<>% Activities per Type</>}>
                            <div className="canvas">
                                <Bar data={{
                                    labels: typePercentage.typeLabels,
                                    datasets: [{
                                        label: 'Type Total',
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
                        <ProfileCard title={<>Total Activities per Month</>}>
                            <div className="canvas">
                                <Bar data={{
                                    labels: [...months],
                                    datasets: [{
                                        label: 'Monthly Total',
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
                        <ProfileCard title={<>Total Activities per Day</>}>
                            <div className="canvas">
                                <Bar data={{
                                    labels: [...days],
                                    datasets: [{
                                        label: 'Daily Total',
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
                        <ProfileCard title={<>Total Activities per Year</>}>
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
})

export default DashBoard