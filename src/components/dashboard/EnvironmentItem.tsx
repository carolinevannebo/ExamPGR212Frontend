import ISensor from "../../interfaces/ISensor";
import { Card } from "react-bootstrap";
import { BsWifi, BsWifiOff } from "react-icons/bs";
import { useEffect, useState } from "react";

const EnvironmentItem = ({sensorId, temperature, humidity, light, timeStamp}: ISensor) => {
    const [isConnected, setIsConnected] = useState(false);
  
    useEffect(() => {
      const isActive = localStorage.getItem(sensorId + '-active') === 'true';
      setIsConnected(isActive);
    }, [sensorId, isConnected]);
  
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
            <Card.Text style={{color: '#DDE6ED', fontSize: '1.2rem'}}>Temperature {temperature}</Card.Text>
            <Card.Text style={{color: '#DDE6ED', fontSize: '1.2rem'}}>Humidity {humidity}</Card.Text>
            <Card.Text style={{color: '#DDE6ED', fontSize: '1.2rem'}}>Light {light}</Card.Text>
        </Card.Body>
        <Card.Footer>
            <Card.Text style={{color: '#DDE6ED'}}>Last updated {timeStamp.toLocaleString('en-US', { timeZone: 'Europe/Oslo' })}</Card.Text>
        </Card.Footer>
      </Card>
    )
};

export default EnvironmentItem;