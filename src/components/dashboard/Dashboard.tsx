import EnvironmentList from "./EnvironmentList";
import MovementList from "./MovementList";
import DeviceList from "./DeviceList";
import { Card, Container, Row } from "react-bootstrap";

const Dashboard = () => {
    return (
        <Container fluid="sm md lg xl" >
            <Row className="mb-4">
                <Card style={{backgroundColor: '#324a5e'}}>
                    <p className="fs-1 fw-bold readings-title">Environment Readings</p>
                    <EnvironmentList />
                </Card>
            </Row>

            <Row className="mb-4">
                <Card style={{backgroundColor: '#324a5e'}}>
                    <DeviceList />
                </Card>
            </Row>

            <Row className="mb-4">
                <Card style={{backgroundColor: '#324a5e'}}>
                    <p className="fs-1 fw-bold readings-title">Movement Readings</p>
                    <MovementList />
                </Card>
            </Row>
        </Container>
    );
};

export default Dashboard;