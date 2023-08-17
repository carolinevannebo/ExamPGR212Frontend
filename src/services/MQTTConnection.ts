import '../buffer'
import { Client, ConnectionOptions } from 'paho-mqtt';
import { MQTTCA } from './MQTTCA'; //@todo remove?

export class MQTTConnection {
    private static instance: MQTTConnection;
    private client: Client;
    private options: ConnectionOptions;
    private topic: string;

    private constructor() {

        this.options = {
            userName: 'FrontendService',
            password: 'Kristiania1914',
            useSSL: true,
            reconnect: true
        };

        this.client = new Client('099bf917add24ebfae77efd1236af9e5.s1.eu.hivemq.cloud', 8884, 'WebApp');
        this.topic = 'EdgeService/pig-binge-monitoring/';
    }

    public static getInstance(): MQTTConnection {
        if (!MQTTConnection.instance) {
        MQTTConnection.instance = new MQTTConnection();
        }

        return MQTTConnection.instance;
    }

    public getClient(): Client {
        return this.client;
    }

    public getOptions(): any {
        return this.options;
    }

    public getTopic(): string {
        return this.topic;
    }

    public setTopic(topic: string): void {
        this.topic = topic;
    }
}