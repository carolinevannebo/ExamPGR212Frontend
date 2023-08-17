import { createContext, ReactNode, useEffect, useState } from "react";
import ISensorData from "../interfaces/ISensorData";
import MQTTService from "../services/MQTTService";

type GraphContextType = { sensorDataMapGraph: { [key: string]: ISensorData }; };

export const GraphContext = createContext<GraphContextType>({ sensorDataMapGraph: {} });

type GraphContextProviderProps = { children: ReactNode; };
  
const GraphContextProvider = ({ children }: GraphContextProviderProps) => {

    const [sensorDataMapGraph, setSensorDataMapGraph] = useState<{ [key: string]: ISensorData }>({});
  
    useEffect(() => {
        MQTTService.setOnDataChangedCallbackGraph((data) => {
            setSensorDataMapGraph((prevSensorDataMapGraph) => {
                const updatedSensorDataMapGraph = { ...prevSensorDataMapGraph };
    
                Object.keys(data).forEach((sensorId) => {
                    const sensorDataArray = data[sensorId];
    
                    if (updatedSensorDataMapGraph.hasOwnProperty(sensorId)) {
                        // Sensor already exists, update the existing data
                        const existingSensorData = updatedSensorDataMapGraph[sensorId];
                        const updatedSensorData = { ...existingSensorData, ...sensorDataArray[0] };
                        updatedSensorDataMapGraph[sensorId] = updatedSensorData;
                    } else {
                        // Sensor doesn't exist, create a new entry
                        updatedSensorDataMapGraph[sensorId] = sensorDataArray[0];
                    }
                });
            return { ...updatedSensorDataMapGraph };
            });
        });
    }, []);
  
    return <GraphContext.Provider value={{ sensorDataMapGraph }}>{children}</GraphContext.Provider>;
};

export default GraphContextProvider;