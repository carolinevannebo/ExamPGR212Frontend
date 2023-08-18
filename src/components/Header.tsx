import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <header>
            <Navbar variant="dark" fixed="top" style={{paddingLeft: "10vw", backgroundColor: "#27374D", fontSize: "1.5rem"}}>
                <Navbar.Brand>Pig Sty Monitoring</Navbar.Brand>
                <Nav className="justify-content-center">
                    <Nav.Item>
                        <Nav.Link href="/">Dashboard</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/statistics">Statistics</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/history">History</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar>
        </header>
    )
}

export default Header;