import { useEffect, useState, createContext, ReactNode } from "react";
import ISensor from "../interfaces/ISensor";
import MQTTService from "../services/MQTTService";

export const MQTTContext = createContext<{ sensors: { [key: string]: ISensor[] } }>({ sensors: {} });

type Props = { children: ReactNode; };

const MQTTContextProvider = ({ children }: Props) => {

    const [sensors, setSensors] = useState<{ [key: string]: ISensor[] }>({});

    useEffect(() => {
        MQTTService.setOnDataChangedCallback((data) => {
          setSensors((prevSensors) => {
            const updatedSensors = { ...prevSensors };
      
            Object.keys(data).forEach((sensorId) => {
              const sensorDataArray = data[sensorId];
      
              if (updatedSensors.hasOwnProperty(sensorId)) {
                // Sensor already exists, update the existing data
                updatedSensors[sensorId] = sensorDataArray;
              } else {
                // Sensor doesn't exist, create a new entry
                updatedSensors[sensorId] = sensorDataArray;
              }
            });
      
            return { ...updatedSensors };
          });
        });
      }, []);

    return (
        <MQTTContext.Provider value={{ 
            sensors,
            }}>
            {children}
        </MQTTContext.Provider>
    );
};

export default MQTTContextProvider;