import ISensor from "../../interfaces/ISensor";
import { APIContext } from "../../contexts/APIContext";
import { Card, Col, Container, Row, Image} from "react-bootstrap";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "../../assets/bg1.png";

const Statistics = () => {
    const { sensors } = useContext<{sensors: { [key: string]: ISensor[] } }>(APIContext);

    return (
        <Container fluid="sm md lg xl" >
            <Row className="justify-content-center">
                {Object.keys(sensors).map((sensorId) => (
                    <Col key={sensorId} className="mb-3">
                        <Card key={sensorId} className="mb-3" text="light" style={{margin: '1rem', backgroundColor: '#526D82'}}>
                            <Card.Title style={{padding: "1rem"}}>
                            <Link key={sensorId} to={`/statistics/${sensorId}`} style={{color: '#DDE6ED', fontSize: '1.5rem', textDecoration: 'none', textAlign: 'center', padding: '2rem'}}>
                                {sensorId}
                            </Link>
                            </Card.Title>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Statistics;