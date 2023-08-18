import { useContext, useState, useRef } from "react";
import ISensor from "../../interfaces/ISensor";
import HistoryItem from "./HistoryItem";
import { Button, Form, Container, Card, Row, Col } from "react-bootstrap";
import { APIContext } from "../../contexts/APIContext";

const HistoryList = () => {
    const { sensors } = useContext<{sensors: { [key: string]: ISensor[] } }>(APIContext);
    const [filteredSensorData, setFilteredSensorData] = useState<{ [key: string]: ISensor[] }>({});
    const fromDateRef = useRef<HTMLInputElement>(null);
    const toDateRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (fromDateRef.current && toDateRef.current) {
          const fromDate = new Date(fromDateRef.current.value);
          const toDate = new Date(toDateRef.current.value);
    
          const filteredData: { [key: string]: ISensor[] } = {};
    
          for (const sensorId in sensors) {
            const sensorData = sensors[sensorId].filter((data) => {
              const date = new Date(data.timeStamp);
              return date >= fromDate && date <= toDate;
            });
    
            if (sensorData.length > 0) {
              filteredData[sensorId] = sensorData;
            }
          }
    
          setFilteredSensorData(filteredData);
        }
    };

    return (
        <Container fluid="sm md lg xl" >
            <Card text="light" className="mb-3" style={{padding: "2rem", backgroundColor: '#324a5e'}}>
                <Form>
                    <Row className="my-4">
                        <Col className="my-1">
                            <Form.Group controlId="from-date">
                                <Form.Label className="text-light">From:</Form.Label>
                                <Form.Control type="date" ref={fromDateRef} />
                            </Form.Group>
                        </Col>
                        <Col className="my-1">
                            <Form.Group controlId="to-date">
                                <Form.Label className="text-light">To:</Form.Label>
                                <Form.Control type="date" ref={toDateRef} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="my-4">
                        <Button onClick={handleSearch} style={{backgroundColor: "#2C74B3"}}>Search</Button>
                    </Row>
                </Form>
            </Card>

            {Object.keys(filteredSensorData).length > 0 ? (
            Object.entries(filteredSensorData).map(([sensorId, sensorData]) => (
                <HistoryItem key={sensorId} sensorId={sensorId} sensorData={sensorData} />
            ))
            ) : (
            <p className="text-light">No sensor data found for the selected date range.</p>
            )}
        </Container>
    );
};

export default HistoryList;