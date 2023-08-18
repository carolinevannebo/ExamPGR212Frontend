import {useState, useEffect} from 'react';
import ApexCharts from 'apexcharts';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import 'moment-timezone';

type Props = {
    sensorId: string;
    values: {x: number, y: number}[];
    input: string;
}

const ChartItem = ({sensorId, values, input}: Props) => {

    const getOptions = (input: string) => {
        const options = {
            series: [{
                name: sensorId,
                data: values
            }],
            chart: {
                id: `${sensorId}-${input}-Chart`,
                type: 'line',
                toolbar: { show: false },
                zoom: {
                    enabled: true,
                    type: 'x',
                    autoScaleYaxis: true,
                },
            }, xaxis: {
                type: 'datetime',
                labels: {
                    datetimeUTC: false,
                    formatter: (value: number): string => {
                        return moment(value).tz('Europe/Oslo').format("HH:mm");
                    },
                    style: {
                        colors: '#DDE6ED',
                    },
                },
            },
            yaxis: {
                title: {
                    text: input,
                    style: {
                        colors: '#DDE6ED',
                    }
                },
                labels: {
                    style: {
                        colors: '#DDE6ED',
                    },
                },
            }, tooltip: {
                enabled: true,
                x: {
                    show: true,
                    format: 'HH:mm',
                },
                y: {
                    formatter: (value: number): string => {
                        if (input === 'Temperature') {
                            return `${value} °C`;
                        }
                        if (input === 'Humidity') {
                            return `${value} %`;
                        }
                        if (input === 'Light') {
                            return `${value} lux`;
                        }
                        return `${value}`;
                    },
                },
                theme: 'dark',
            },
            stroke: {
                curve: 'smooth',
            }
        };
        return options;
    };

    const getChart = () => {
        const element = document.querySelector(`#${sensorId}-${input}-Chart`);
        if (!element) {return null;}
        return new ApexCharts(element, getOptions(input));
    };

    useEffect(() => {
        const chart = getChart();

        if (chart) {
            chart.render();
        }
    }, [sensorId, input]);


    return (
        <Card text="light" style={{margin: '1rem', backgroundColor: '#526D82'}}>
            <Card.Header>
                <Card.Title>{sensorId} {input}</Card.Title>
            </Card.Header>
            <Card.Body>
                <div id={`${sensorId}-${input}-Chart`} style={{width: '100%', height: '100%'}}></div>
            </Card.Body>
        </Card>
    );
}

export default ChartItem;