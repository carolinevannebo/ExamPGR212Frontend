import 'timers-browserify';
import { MQTTConnection } from "./MQTTConnection";
import ISensor from "../interfaces/ISensor";
import ISensorData from "../interfaces/ISensorData";
import { Message } from "paho-mqtt";

const MQTTService = (
    () => {
        const connection = MQTTConnection.getInstance();
        const client = connection.getClient();

        const sensorDataMap: { [key: string]: ISensor } = {};
        const sensorDataMapGraph: { [key: string]: ISensorData } = {};

        let onDataChangedCallback: ((data: { [key: string]: ISensor[] }) => void) | null = null;
        let onDataChangedCallbackGraph: ((data: { [key: string]: ISensorData[] }) => void) | null = null;

        const setOnDataChangedCallback = (callback: (data: { [key: string]: ISensor[] }) => void) => {
            onDataChangedCallback = callback;
        };

        const setOnDataChangedCallbackGraph = (callback: (data: { [key: string]: ISensorData[] }) => void) => {
            onDataChangedCallbackGraph = callback;
        };

        const subscribeToBaseTopic = (): void => {
            const baseTopic = connection.getTopic();
            const wildcardTopic = baseTopic + "#"; // wildcard topic to subscribe to all subtopics

            console.log('Is MQTT client connected:', client.isConnected());

            if (client.isConnected()) {
                client.subscribe(wildcardTopic, {
                    onSuccess: () => {
                        console.log(`Successfully subscribed to topic "${wildcardTopic}"`);
                    },
                    onFailure: (err: any) => {
                        console.error(`Failed to subscribe to topic "${wildcardTopic}":`, err);
                    },
                });
            }
        };

        const updateSensorDataGraph = (sensorId: string, value: string, topic: string) => {
            let sensorData = sensorDataMapGraph[sensorId];

            if (!sensorData) {
                sensorData = {
                    sensorId,
                    temperature: "",
                    humidity: "",
                    light: "",
                    x: 0,
                    y: 0,
                    z: 0,
                    door: "",
                    timeStamp: new Date(),
                    isActive: false,
                    intervalId: setInterval(() => {}, 0),
                    temperatureValues: [],
                    humidityValues: [],
                    lightValues: [],
                    xValues: [],
                    yValues: [],
                    zValues: [],
                    doorValues: []
                };
                sensorDataMapGraph[sensorId] = sensorData;
            } else {
                    clearInterval(sensorData.intervalId);
                    setIsActive(sensorData, true);
                    sensorData.intervalId = setInterval(() => setIsActive(sensorData, false), 60000);
            }
          
            const getValueNumber = (valueString: string): number => {
                const valueNumber = parseFloat(valueString);
                return isNaN(valueNumber) ? 0 : valueNumber;
            };

            // Assign the value based on the topic
            if (topic.endsWith("/Temperature")) {
                const valueParts = value.split(" ");
                const valueString = valueParts[0];
                const valueNumber = getValueNumber(valueString);
                sensorData.temperature = value;
                sensorData.temperatureValues.push(valueNumber);
            } else if (topic.endsWith("/Humidity")) {
                const valueParts = value.split(" ");
                const valueString = valueParts[0];
                const valueNumber = getValueNumber(valueString);
                sensorData.humidity = value;
                sensorData.humidityValues.push(valueNumber);
            } else if (topic.endsWith("/Light")) {
                const valueParts = value.split(" ");
                const valueString = valueParts[0];
                const valueNumber = getValueNumber(valueString);
                sensorData.light = value;
                sensorData.lightValues.push(valueNumber);
            } else if (topic.endsWith("/X")) {
                const valueNumber = getValueNumber(value);
                sensorData.x = valueNumber;
                sensorData.xValues.push(valueNumber);
            } else if (topic.endsWith("/Y")) {
                const valueNumber = getValueNumber(value);
                sensorData.y = valueNumber;
                sensorData.yValues.push(valueNumber);
            } else if (topic.endsWith("/Z")) {
                const valueNumber = getValueNumber(value);
                sensorData.z = valueNumber;
                sensorData.zValues.push(valueNumber);
            } else if (topic.endsWith("/Door")) {
                sensorData.doorValues.push(value);
            }
            
            if (sensorData.temperatureValues.length > 100) {
                sensorData.temperatureValues.pop();
            }
            if (sensorData.humidityValues.length > 100) {
                sensorData.humidityValues.pop();
            }
            if (sensorData.lightValues.length > 100) {
                sensorData.lightValues.pop();
            }
            if (sensorData.xValues.length > 100) {
                sensorData.xValues.pop();
            }
            if (sensorData.yValues.length > 100) {
                sensorData.yValues.pop();
            }
            if (sensorData.zValues.length > 100) {
                sensorData.zValues.pop();
            }
            if (sensorData.doorValues.length > 100) {
                sensorData.doorValues.pop();
            }

            if (onDataChangedCallbackGraph) {
                const sensorDataArray = Object.values(sensorDataMapGraph);

                if (onDataChangedCallbackGraph) {
                    const uniqueData: { [key: string]: ISensorData[] } = {};

                    sensorDataArray.forEach((sensorData) => {
                        const sensorId = sensorData.sensorId;

                        if (!uniqueData[sensorId]) {
                        uniqueData[sensorId] = [sensorData];
                        } else {
                        uniqueData[sensorId].push(sensorData);
                        }
                    });
                    onDataChangedCallbackGraph(uniqueData);
                }
            }
        };

        const setIsActive = (sensorData: ISensor, isActive: boolean) => {
            sensorData.isActive = isActive;

            localStorage.setItem(sensorData.sensorId + '-active', isActive.toString());
            console.log(`Sensor ${sensorData.sensorId} is ${isActive ? 'active' : 'inactive'}`);
        };

        const messageArrived = (message: Message) => {
            const topicParts = message.destinationName.split("/");
            const sensorId = topicParts[2];
          
            console.log('Message received:', message.destinationName, message.payloadString);
          
            if (!sensorId) {
              console.error(`Failed to parse sensorId from topic "${message.destinationName}"`);
              return;
            }
          
            try {
                const value = message.payloadString.trim();
                let sensorData = sensorDataMap[sensorId];
          
                if (!sensorData) {
                    sensorData = {
                        sensorId,
                        temperature: "",
                        humidity: "",
                        light: "",
                        x: 0,
                        y: 0,
                        z: 0,
                        door: "",
                        timeStamp: new Date(),
                        isActive: false,
                        intervalId: setInterval(() => {}, 0)
                    };
                } else {
                    clearInterval(sensorData.intervalId);
                    setIsActive(sensorData, true);
                    sensorData.intervalId = setInterval(() => setIsActive(sensorData, false), 60000);
                }
          
                // Assign the value based on the topic
                if (message.destinationName.endsWith("/Temperature")) {
                    sensorData.temperature = value;
                    updateSensorDataGraph(sensorId, value, message.destinationName);
                } else if (message.destinationName.endsWith("/Humidity")) {
                    sensorData.humidity = value;
                    updateSensorDataGraph(sensorId, value, message.destinationName);
                } else if (message.destinationName.endsWith("/Light")) {
                    sensorData.light = value;
                    updateSensorDataGraph(sensorId, value, message.destinationName);
                } else if (message.destinationName.endsWith("/X")) {
                    sensorData.x = parseFloat(value);
                    updateSensorDataGraph(sensorId, value, message.destinationName);
                } else if (message.destinationName.endsWith("/Y")) {
                    sensorData.y = parseFloat(value);
                    updateSensorDataGraph(sensorId, value, message.destinationName);
                } else if (message.destinationName.endsWith("/Z")) {
                    sensorData.z = parseFloat(value);
                    updateSensorDataGraph(sensorId, value, message.destinationName);
                } else if (message.destinationName.endsWith("/Door")) {
                    sensorData.door = value;
                } else if (message.destinationName.endsWith("/TimeStamp")) {
                    sensorData.timeStamp = new Date(value);
                    updateSensorDataGraph(sensorId, value, message.destinationName);
                } 

                const isActiveFromLocalStorage = localStorage.getItem(sensorData.sensorId + '-active');
                if (isActiveFromLocalStorage !== null) {
                    sensorData.isActive = isActiveFromLocalStorage === 'true';
                }

                sensorDataMap[sensorId] = sensorData;
            
                if (onDataChangedCallback) {
                    const sensorDataArray = Object.values(sensorDataMap);

                    if (onDataChangedCallback) {
                        const uniqueData: { [key: string]: ISensor[] } = {};

                        sensorDataArray.forEach((sensorData) => {
                            const sensorId = sensorData.sensorId;
                            
                            if (!uniqueData[sensorId]) {
                            uniqueData[sensorId] = [sensorData];
                            } else {
                            uniqueData[sensorId].push(sensorData);
                            }
                        });
                        onDataChangedCallback(uniqueData);
                    }
                }
            } catch (error) {
              console.error(`Error processing message from topic "${message.destinationName}":`, error);
            }
        };

        client.onConnectionLost = (error: any) => {
            console.log('MQTT client connection lost:', error);
            client.connect({
                onSuccess: () => {
                    console.log('MQTT client reconnected');
                    subscribeToBaseTopic();
                },
                onFailure: (err: any) => {
                    console.error('MQTT client failed to reconnect:', err);
                },
            });
          };
        
        client.onMessageArrived = messageArrived;

        client.connect({
            userName: 'FrontendService',
            password: 'Kristiania1914',
            useSSL: true,
            reconnect: true,
            onSuccess: () => {
                console.log('MQTT client connected');
                subscribeToBaseTopic();
            },
            onFailure: (error: any) => {
                console.error('MQTT client failed to connect:', error);
            },
        });
        
        const getDataFromMQTT = (): { [key: string]: ISensor } => {
            return sensorDataMap;
        };

        return {
            setOnDataChangedCallback,
            setOnDataChangedCallbackGraph,
            getDataFromMQTT
        }
    }
)();

export default MQTTService;