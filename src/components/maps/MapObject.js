import React, { useContext, useRef } from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from '../forms/Form.module.css'

import HeatMap from './HeatMap'
import ProfileCard from '../layout/ProfileCard'
import AdminContext from '../../store/admin-context'
import AuthContext from '../../store/auth-context'
import {
    MapContainer, TileLayer, useMap
} from 'react-leaflet'

import "leaflet.heat"
import Loader from '../layout/Loader'


function ClearHeatmap() {
    const map = useMap()

    map.eachLayer(function (layer) {
        console.log(layer.name ?? null)
        if (layer.name === "heatmap") {
            map.removeLayer(layer);
        }
    });
    return null
}



const MapObject = (props) => {

    const fromMoRef = useRef(null);
    const toMoRef = useRef(null);
    const fromYearRef = useRef(null);
    const toYearRef = useRef(null);


    const adminCtx = useContext(AdminContext)
    const authCtx = useContext(AuthContext)

    const yearlyData = adminCtx.yearlyData

    const addressPoints = adminCtx.mapData

    const fetchAllHandler = (event) => {
        // adminCtx.getMapData(adminCtx.mapData)
        adminCtx.fetchMapData(authCtx.token)
    }

    const clearHandler = (event) => {
        adminCtx.clearMapData()
    }

    const filterHandler = (event) => {
        event.preventDefault()
        const fromYear = fromYearRef.current.value
        const toYear = toYearRef.current.value
        const fromMonth = fromMoRef.current.value
        const toMonth = toMoRef.current.value
        adminCtx.fetchDateRangeMap(authCtx.token, fromYear, toYear, fromMonth, toMonth)
    }
    const position = [38.2466, 21.7345]

    return (

        <Container>
            <Row>
                <Col>
                    <ProfileCard ProfileCard title="Heatmap of your activity" >

                        <MapContainer
                            className="map-container"
                            center={position}
                            zoom={10}
                            scrollWheelZoom={true}>
                            <ClearHeatmap />
                            <HeatMap data={addressPoints} />
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </MapContainer>
                        <div>
                            <button disabled={adminCtx.mapFetching} className="button button-prim" onClick={fetchAllHandler}>Show Everything&nbsp;&nbsp;<i class="fa-solid fa-filter-circle-xmark"></i></button>
                            <button disabled={adminCtx.mapFetching} className="button button-critical" onClick={clearHandler}>Clear Map&nbsp;&nbsp;<i class="fa-solid fa-trash-can"></i></button>
                            {adminCtx.mapFetching && <Loader size={32} />}
                        </div>
                    </ProfileCard>
                </Col>
                <Col lg={4}>
                    <ProfileCard ProfileCard title="Filter your heatmap">
                        <>
                            <div>
                                <form className={styles.form}>
                                    <span className={styles['form-span']} >From</span>
                                    <select ref={fromMoRef} className={styles.field} placeholder="monthFrom">
                                        <option name="" value="" >Month</option>
                                        <option name="January" value="1">January</option>
                                        <option name="February" value="2">February</option>
                                        <option name="March" value="3">March</option>
                                        <option name="April" value="4">April</option>
                                        <option name="May" value="5">May</option>
                                        <option name="June" value="6">June</option>
                                        <option name="July" value="7">July</option>
                                        <option name="August" value="8">August</option>
                                        <option name="September" value="9">September</option>
                                        <option name="October" value="10">October</option>
                                        <option name="November" value="11">November</option>
                                        <option name="December" value="12">December</option>
                                    </select>

                                    <span className={styles['form-span']} >To</span>
                                    <select ref={toMoRef} className={styles.field} placeholder="monthTo">
                                        <option name="" value="" >Month</option>
                                        <option name="January" value="1">January</option>
                                        <option name="February" value="2">February</option>
                                        <option name="March" value="3">March</option>
                                        <option name="April" value="4">April</option>
                                        <option name="May" value="5">May</option>
                                        <option name="June" value="6">June</option>
                                        <option name="July" value="7">July</option>
                                        <option name="August" value="8">August</option>
                                        <option name="September" value="9">September</option>
                                        <option name="October" value="10">October</option>
                                        <option name="November" value="11">November</option>
                                        <option name="December" value="12">December</option>
                                    </select>

                                    <span className={styles['form-span']} >From</span>
                                    <select ref={fromYearRef} className={styles.field} placeholder="yearFrom">
                                        <option name="" value="" >Year</option>
                                        {yearlyData.map(year => {
                                            return <option name={`${year.year}`} value={`${year.year}`}> {year.year}</option>
                                        })}
                                    </select>
                                    <span className={styles['form-span']} >To</span>
                                    <select ref={toYearRef} className={styles.field} placeholder="yearTo">
                                        <option name="" value="" >Year</option>
                                        {yearlyData.map(year => {
                                            return <option name={`${year.year}`} value={`${year.year}`}> {year.year}</option>
                                        })}
                                    </select>
                                    <button disabled={adminCtx.mapFetching} className="button button-prim" onClick={filterHandler}>Filter&nbsp;&nbsp;<i class="fa-solid fa-filter"></i></button>
                                </form>
                            </div>
                        </>


                    </ProfileCard>
                </Col>
            </Row>
        </Container>






    )
}

export default MapObject