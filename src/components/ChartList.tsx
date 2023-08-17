import { useContext, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ISensor from "../interfaces/ISensor";
import { APIContext } from "../contexts/APIContext";
import ChartItem from "./ChartItem";

type Props = {sensorId: string;}

const ChartList = ({sensorId}: Props) => {
    const { sensors } = useContext<{sensors: { [key: string]: ISensor[] } }>(APIContext);

    useEffect(() => {
    }, [sensors]);

    const getChartItems = (input: string) => {
        const items: JSX.Element[] = [];

        //Object.keys(sensors).forEach((sensorId) => {
            const sensorDataArray = sensors[sensorId];
            const values: {x: Date, y: number}[] = [];
            var yaxis: number;

            sensorDataArray.forEach((sensorData) => {
                if (input === 'Temperature') yaxis = parseFloat(sensorData.temperature);
                if (input === 'Humidity') yaxis = parseFloat(sensorData.humidity);
                if (input === 'Light') yaxis = parseFloat(sensorData.light);

                values.push({x: new Date(sensorData.timestamp), y: yaxis});
            });

            items.push(<ChartItem key={sensorId} sensorId={sensorId} values={values} input={input} />);
        //});

        return items;
    };
    
    return (
        <Container fluid="sm md lg xl" >
            {getChartItems('Temperature')}
            {getChartItems('Humidity')}
            {getChartItems('Light')}
        </Container>
    );
};

export default ChartList;