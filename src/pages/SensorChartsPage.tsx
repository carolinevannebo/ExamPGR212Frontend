import ChartList from "../components/statistics/ChartList";
import { useParams, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useContext } from "react";
import APIContext from "../contexts/APIContext";
import ISensor from "../interfaces/ISensor";

const SensorChartsPage = () => {
    const {sensorId} = useParams<{sensorId: string}>();

    if (!sensorId) {return <Navigate replace to="/" />;}

    return (
        <Container fluid="sm md lg xl" >
            <ChartList sensorId={sensorId} />
        </Container>
    );
};

export default SensorChartsPage;