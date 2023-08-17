import EnvironmentList from "./EnvironmentList";
import MovementList from "./MovementList";
import { Container } from "react-bootstrap";

const Dashboard = () => {
    return (
        <>
            <Container fluid="md">
                <p className="fs-1 fw-bold text-light">Environment Readings</p>
                <EnvironmentList />
            </Container>

            <Container fluid="md">
                <p className="fs-1 fw-bold text-light">Movement Readings</p>
                <MovementList />
            </Container>
        </>
    );
};

export default Dashboard;