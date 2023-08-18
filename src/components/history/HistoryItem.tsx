import ISensor from "../../interfaces/ISensor";
import { useState } from "react";
import { Table, Container } from "react-bootstrap";
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
        <Container fluid="sm md lg xl" >
            <p className="fs-2 fw-bold" onClick={toggleShow} style={{cursor: 'pointer'}}>{sensorId}</p>
            {show && (
                <Table striped bordered hover variant="dark">
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
        </Container>
    );
};

export default HistoryItem;