import ISensor from "../../interfaces/ISensor";
import { useState } from "react";
import { Table, Container, Card } from "react-bootstrap";
import moment from 'moment';

type Props = {
    sensorId: string;
    sensorData: ISensor[];
}

const HistoryItem = ({sensorId, sensorData}: Props) => {
    const [show, setShow] = useState<boolean>(false);

    const toggleShow = () => {
        setShow(!show);
    };

    const getData = () => {
        return sensorData.map((data, index) => () => (
            <tr key={index}>
                <td>{moment(data.timeStamp).format("DD MMMM YYYY HH:mm")}</td>
                <td>{Number(data.temperature).toFixed() + " " + String.fromCharCode(176) + "C"}</td>
                <td>{Number(data.humidity).toFixed() + " %"}</td>
                <td>{Number(data.light).toFixed() + " lux"}</td>
                <td>{data.door}</td>
                <td>{data.x}</td>
                <td>{data.y}</td>
                <td>{data.z}</td>
            </tr>
        ))
    };

    return (
        <Card text="light" className="mb-3" style={{padding: "2rem", backgroundColor: '#324a5e'}}>
            <p className="fs-2 fw-bold" onClick={toggleShow} style={{cursor: 'pointer'}}>{sensorId}</p>
            {show && (
                <Table striped hover variant="primary">
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>Temperature</th>
                            <th>Humidity</th>
                            <th>Light</th>
                            <th>Door</th>
                            <th>X</th>
                            <th>Y</th>
                            <th>Z</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getData().map((data, index) => data())}
                    </tbody>
                </Table>
            )}

        </Card>
    );
};

export default HistoryItem;