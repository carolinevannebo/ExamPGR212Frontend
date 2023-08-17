import {useState, useEffect} from 'react';
import ApexCharts from 'apexcharts';
import { Card } from 'react-bootstrap';

type Props = {
    sensorId: string;
    values: {x: Date, y: number}[];
    input: string;
}

const ChartItem = ({sensorId, values, input}: Props) => {
    const [chart, setChart] = useState<ApexCharts | null>(null);

    const getData = () => {
        return values.map((value) => {
            return {x: value.x, y: value.y};
        });
    }

    const getOptions = (input: string) => {
        const options = {
            series: [{
                name: sensorId,
                data: getData()
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
                //her vil du muligens formattere
            },
            yaxis: {
                title: {
                    text: input,
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
            },
            stroke: {
                curve: 'smooth',
            }
        };
        return options;
    };

    const getChart = () => {
        const element = document.getElementById(`${sensorId}-${input}-Chart`);
        if (!element) {return null;}
        return new ApexCharts(element, getOptions(input));
    };

    useEffect(() => {
        const chart = getChart();
        if (chart) {
            chart.render();
            setChart(chart);
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