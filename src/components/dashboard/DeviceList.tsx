import { useContext, useEffect, useState } from "react";
import { APIContext } from "../../contexts/APIContext";
import { MQTTContext } from "../../contexts/MQTTContext"
import ISensor from "../../interfaces/ISensor";
import { Col, Row, Card } from "react-bootstrap";

const DeviceList = () => {
    const { sensors: devices } = useContext<{sensors: { [key: string]: ISensor[] } }>(APIContext);
    const { sensors: mqttSensors } = useContext<{sensors: { [key: string]: ISensor[] } }>(MQTTContext);

    useEffect(() => {
    }, [devices]);

    const getDevices = () => {
        var deviceCounter: number = 0;

        for (const sensorId in devices) {
            if (devices.hasOwnProperty(sensorId)) {
                deviceCounter++;
            }
        }

        return deviceCounter;
    };

    const getDeviceStatus = () => {
        var onlineCounter: number = 0;

        for (const sensorId in mqttSensors) {
            if (mqttSensors.hasOwnProperty(sensorId)) {
                const isActive = localStorage.getItem(sensorId + '-active') === 'true';
                if (isActive) {
                    onlineCounter++;
                }
            }
        }
        
        return onlineCounter;
    };

    // get sensor id and their door status
    const getDoorStatus = (sensorId: string) => {
        const mqttSensor = mqttSensors[sensorId] ? mqttSensors[sensorId][0] : null;

        if (mqttSensor) {
            return mqttSensor.door;
        } else {
            return "Unknown";
        }
    };

    const setDoorStyle = (sensorId: string) => {
        const mqttSensor = mqttSensors[sensorId] ? mqttSensors[sensorId][0] : null;
        const isDoorOpen = mqttSensor!.door === "Open";

        const doorTextStyle = {
        color: isDoorOpen ? '#b51616' : '#DDE6ED',
        fontWeight: isDoorOpen ? 'bold' : 'normal',
        fontSize: '1.2rem'
        };

        return doorTextStyle;
    };

    return (
        <Row>
            <Col>
                <Card text="light" style={{margin: '1rem', backgroundColor: '#526D82'}}>
                    <Card.Body>
                        <Card.Title>Devices</Card.Title>
                        <Card.Text style={{color: '#DDE6ED', fontSize: '1.2rem'}}>Total {getDevices()}</Card.Text>
                        <Card.Text style={{color: '#DDE6ED', fontSize: '1.2rem'}}>Online {getDeviceStatus()}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card text="light" style={{margin: '1rem', backgroundColor: '#526D82'}}>
                    <Card.Body>
                        <Card.Title>Doors</Card.Title>
                            {Object.keys(mqttSensors).map(sensorId => (
                                <Card.Text key={sensorId} style={setDoorStyle(sensorId)}>
                                    {sensorId} {getDoorStatus(sensorId)}
                                </Card.Text>
                            ))}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default DeviceList;