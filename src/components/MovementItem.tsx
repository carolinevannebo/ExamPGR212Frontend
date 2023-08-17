import ISensor from "../interfaces/ISensor";
import { Card } from "react-bootstrap";
import { BsWifi, BsWifiOff } from "react-icons/bs";
import { useEffect, useState } from "react";

const MovementItem = ({sensorId, x, y, z, door, timeStamp}: ISensor) => {
    const [isConnected, setIsConnected] = useState(false);
  
    useEffect(() => {
      const isActive = localStorage.getItem(sensorId + '-active') === 'true';
      setIsConnected(isActive);
    }, [sensorId, isConnected]);
  
    return (
      <Card bg="dark" text="light" style={{margin: '1rem'}}>
        <Card.Header>
            <Card.Title>
                {sensorId} 
                {isConnected ? <BsWifi style={{color: '#16b546', marginLeft: '1rem'}}/> : 
                <BsWifiOff style={{color: '#b51616', marginLeft: '1rem'}}/>}
            </Card.Title>
        </Card.Header>
        <Card.Body>
            <Card.Text>X {x}</Card.Text>
            <Card.Text>Y {y}</Card.Text>
            <Card.Text>Z {z}</Card.Text>
            <Card.Text>Door {door}</Card.Text>
        </Card.Body>
        <Card.Footer>
            <Card.Text>Last updated {timeStamp.toDateString()}</Card.Text>
        </Card.Footer>
      </Card>
    )
};

export default MovementItem;