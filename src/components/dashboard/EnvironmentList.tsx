import { useContext, useEffect } from "react";
import EnvironmentItem from "./EnvironmentItem";
import { MQTTContext } from "../../contexts/MQTTContext";
import ISensor from "../../interfaces/ISensor";
import { Col, Row } from "react-bootstrap";

const EnvironmentList = () => {
    const { sensors } = useContext<{sensors: { [key: string]: ISensor[] } }>(MQTTContext);

    useEffect(() => {
    }, [sensors]);

    const getSensorItems = () => {
        const items: JSX.Element[] = [];
      
        Object.keys(sensors).forEach((sensorId) => {
          const sensorDataArray = sensors[sensorId];
      
          sensorDataArray.forEach((sensorData, index) => {
            const key = `${sensorId}_${index}`;
            items.push(<EnvironmentItem key={key} {...sensorData} />);
          });
        });
      
        return items;
    };

    return (
        <Row>
            {getSensorItems().map((item, index) => {
                return (
                    <Col key={index} xs={12} sm={6} md={4} lg={3}>
                        {item}
                    </Col>
                )
            })}
        </Row>
    );

};

export default EnvironmentList;