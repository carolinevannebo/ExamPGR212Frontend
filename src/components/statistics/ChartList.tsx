import { useContext, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ISensor from "../../interfaces/ISensor";
import { APIContext } from "../../contexts/APIContext";
import ChartItem from "./ChartItem";
import moment from 'moment';

type Props = {
    sensorId: string;
}

type SensorDataKey = keyof ISensor;

const ChartList = ({sensorId}: Props) => {
    const { sensors } = useContext<{sensors: { [key: string]: ISensor[] } }>(APIContext);

    useEffect(() => {
    }, [sensors]);

    const getChartItems = (input: string, key: SensorDataKey) => {
        const items: JSX.Element[] = [];

        const sensorDataArray = sensors[sensorId];
        const values: {x: number, y: number}[] = [];
        const startOfLast24Hours = moment().subtract(24, 'hours').valueOf();
        
        sensorDataArray
        .filter((instance) => moment(instance.timeStamp).valueOf() >= startOfLast24Hours)
        .forEach((instance) => {
                var yaxis: number = 0;
                if (input === "Temperature") yaxis = parseFloat(instance.temperature);
                if (input === "Humidity") yaxis = parseFloat(instance.humidity);
                if (input === "Light") yaxis = parseFloat(instance.light);
                
                if (!isNaN(yaxis) || yaxis !== undefined) {
                    const xaxis = moment(instance.timeStamp).valueOf();
                    values.push({x: xaxis, y: yaxis});
                }
        });
        items.push(<ChartItem key={key} sensorId={sensorId} values={values} input={input} />);

        return items;
    };
    
    return (
        <Container fluid="sm md lg xl" >
            {getChartItems('Temperature', sensorId)}
            {getChartItems('Humidity', sensorId)}
            {getChartItems('Light', sensorId)}
        </Container>
    );
};

export default ChartList;