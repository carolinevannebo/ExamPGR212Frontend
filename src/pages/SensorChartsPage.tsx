import ChartList from "../components/ChartList";
import { useParams, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

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