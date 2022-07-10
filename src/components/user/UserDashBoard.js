import Table from '../../components/layout/Table';
import TableRow from '../../components/layout/TableRow';
import ProfileCard from '../../components/layout/ProfileCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Doughnut, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { memo } from 'react'
import stringifyNumber from '../../utils/numToStr'


const UserDashBoard = memo((props) => {

    const fetchDataHandler = () => {
        props.fetchUserData()
    }
    
    const leaderScores = props.leaderScores
    const userRank = props.userRank
    const totalScore = props.totalScore
    const formattedOldestDate = props.formattedOldestDate
    const formattedLatestDate = props.formattedLatestDate
    const monthlyScores = props.monthlyScores


    return (
        <>
            <Container>
                <Row>
                    <Col className="no-padding" md={6} lg={4}>
                        <button className="button button-prim" onClick={fetchDataHandler}> Fetch Data </button>
                        <ProfileCard title={<><i class="fa-solid fa-ranking-star"></i>&nbsp;&nbsp;Leaderboards</>}>
                            <Table firstCol={'User'} secondCol={"Last 30 days score"}>
                                {
                                    [...leaderScores].map(user => (
                                        <TableRow col1={user.user.name} col2={user.score} />
                                    ))}
                            </Table>
                        </ProfileCard>
                        <ProfileCard title={<><i class="fa-solid fa-award"></i>&nbsp;&nbsp;Your Rank</>}>
                            <h3> You placed {stringifyNumber(userRank)}!</h3>
                        </ProfileCard>
                    </Col>
                    <Col className="no-padding" md={6} lg={4}>
                        <ProfileCard title={<><i class="fa-solid fa-star"></i>&nbsp;&nbsp;Your Total Score!</>}>
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
                                        data: monthlyScores.percentages ?? [],
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
})

export default UserDashBoard
