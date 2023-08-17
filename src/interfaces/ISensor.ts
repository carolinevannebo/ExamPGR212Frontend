interface ISensor {
    [key: string]: any;
    sensorId: string;
    temperature: string;
    humidity: string;
    light: string;
    x: number;
    y: number;
    z: number;
    door: string;
    timeStamp: Date;
    isActive: boolean;
    intervalId: NodeJS.Timeout;
}

export default ISensor;