import type {ApexOptions} from 'apexcharts';

export function generateApexOptions<T = string>(title: string, values: T[], coords: number[], height = 400, width = 400, color = '#1C64F2') {
    return <ApexOptions>{
        chart: {
            background: '#FFEBCD',
            height: `${height}px`,
            width: `${width}px`,
            type: "area",
            fontFamily: "Inter, sans-serif",
            dropShadow: {
                enabled: false
            },
                toolbar: {
                show: false
            }
        },
        tooltip: {
            enabled: true,
            x: {
                show: false
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
                shade: color,
                gradientToColors: ['violet', color, 'blue']
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 6
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 2,
                right: 2,
                top: 0
            }
        },
        series: [
            {
                name: title,
                data: values,
                color: color,
            }
        ],
        xaxis: {
            categories: coords,
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            show: false
        }
    };
}