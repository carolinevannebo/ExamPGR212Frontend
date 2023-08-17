import ISensor from "../../interfaces/ISensor";
import { APIContext } from "../../contexts/APIContext";
import { Card, Col, Container, Row} from "react-bootstrap";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Statistics = () => {
    const { sensors } = useContext<{sensors: { [key: string]: ISensor[] } }>(APIContext);

    return (
        <Container fluid="sm md lg xl" >
            <Row className="justify-content-center">
                {Object.keys(sensors).map((sensorId) => (
                    <Col key={sensorId} className="mb-3">
                        <Card key={sensorId} className="mb-3">
                            <Link key={sensorId} to={`/statistics/${sensorId}`}>
                                {sensorId}
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Statistics;