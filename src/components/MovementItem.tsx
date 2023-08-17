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

    const isDoorOpen = door === "Open";
    const doorTextStyle = {
      color: isDoorOpen ? '#b51616' : '#DDE6ED',
      fontWeight: isDoorOpen ? 'bold' : 'normal',
      fontSize: '1.2rem'
    };
  
    return (
      <Card text="light" style={{margin: '1rem', backgroundColor: '#526D82'}}>
        <Card.Header>
            <Card.Title>
                {sensorId} 
                {isConnected ? <BsWifi style={{color: '#16b546', marginLeft: '1rem'}}/> : 
                <BsWifiOff style={{color: '#b51616', marginLeft: '1rem'}}/>}
            </Card.Title>
        </Card.Header>
        <Card.Body>
            <Card.Text style={{color: '#DDE6ED', fontSize: '1.2rem'}}>X {x}</Card.Text>
            <Card.Text style={{color: '#DDE6ED', fontSize: '1.2rem'}}>Y {y}</Card.Text>
            <Card.Text style={{color: '#DDE6ED', fontSize: '1.2rem'}}>Z {z}</Card.Text>
            <Card.Text style={doorTextStyle}>Door {door}</Card.Text>
        </Card.Body>
        <Card.Footer>
            <Card.Text style={{color: '#DDE6ED'}}>Last updated {timeStamp.toLocaleString('en-US', { timeZone: 'Europe/Oslo' })}</Card.Text>
        </Card.Footer>
      </Card>
    )
};

export default MovementItem;