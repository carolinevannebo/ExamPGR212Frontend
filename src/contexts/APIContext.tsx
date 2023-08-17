import { useEffect, useState, createContext, ReactNode } from "react";
import ISensor from "../interfaces/ISensor";
import APIService from "../services/APIService";

export const APIContext = createContext<{ sensors: { [key: string]: ISensor[] } }>({ sensors: {} });

type Props = { children: ReactNode; };

const APIContextProvider = ({ children }: Props) => {
    const [sensors, setSensors] = useState<{ [key: string]: ISensor[] }>({});

    useEffect(() => {
        getDataFromService();
    }
    , []);

    const getDataFromService = async () => {
        const response = await APIService.getAllSensorReadings();
        const transformedData: { [key: string]: ISensor[] } = {};

        response.forEach((sensorReading: ISensor) => {
            if (transformedData[sensorReading.sensorId]) {
                transformedData[sensorReading.sensorId].push(sensorReading);
            } else {
                transformedData[sensorReading.sensorId] = [sensorReading];
            }
        });

        setSensors(transformedData);

        return (
            <APIContext.Provider value={{ sensors }}>
                {children}
            </APIContext.Provider>
        );
    };
};

export default APIContextProvider;