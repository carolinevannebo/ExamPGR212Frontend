import ISensor from "./ISensor";

export default interface ISensorData extends ISensor {
    temperatureValues: number[];
    humidityValues: number[];
    lightValues: number[];
    xValues: number[];
    yValues: number[];
    zValues: number[];
    doorValues: string[];
}