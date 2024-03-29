
import { Configuration } from 'ng-chartist';
import { ChartType } from './chartist.model';

const generateResponsiveData = () => {
    const times = (n) => {
        return Array.apply(null, new Array(n));
    };
    let data;
    data = times(52).map(Math.random).reduce((mData, rnd, index) => {
        mData.labels.push(index + 1);
        mData.series.forEach((series) => {
            series.push(Math.random() * 100);
        });
        return mData;
    }, {
        labels: [],
        series: times(4).map(() => {
            return new Array();
        })
    });
    let options;
    options = {
        showLine: false,
        axisX: {
            labelInterpolationFnc: (value, index) => {
                return index % 13 === 0 ? 'W' + value : null;
            }
        },
        height: 300
    };
    let responsiveOptions;
    responsiveOptions = [
        [
            'screen and (min-width: 640px)',
            {
                axisX: {
                    labelInterpolationFnc: (value, index) => {
                        return index % 4 === 0 ? 'W' + value : null;
                    }
                }
            }
        ]
    ];

    let type;
    type = 'line scatter'
    return {
        options,
        data,
        responsiveOptions,
        type
    };
};

const simpleLineChart: Configuration = {
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],

        series: [
            [12, 9, 7, 8, 5],
            [2, 1, 3.5, 7, 3],
            [1, 3, 4, 5, 6]
        ]
    },
    type: 'Line',
    options: {
        height: 300,
        fullWidth: true,

        chartPadding: {
            right: 40
        }
    },

};

const lineScatter: Configuration = generateResponsiveData();

const areaLineChart: Configuration = {
    data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        series: [
            [5, 9, 7, 8, 5, 3, 5, 4]
        ],
    },
    options: {
        low: 0,
        showArea: true,
        height: 300,
    },
    type: 'Line'
};

const overlappingBarChart: Configuration = {
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
            [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
        ]
    },
    options: {
        seriesBarDistance: 10,
        height: 300
    },
    type: 'Bar',
    responsiveOptions: [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: (value) => {
                    return value[0];
                }
            }
        }]
    ]
};
const stackBarChart: Configuration = {
    data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
        series: [
            [800000, 1200000, 1400000, 1300000, 1520000, 1400000],
            [200000, 400000, 500000, 300000, 452000, 500000],
            [160000, 290000, 410000, 600000, 588000, 410000]
        ]
    },
    options: {
        stackBars: true,
        axisY: {
            // labelInterpolationFnc: (value) => {
            // return (value / 1000) + 'k';
            // }
        },
        height: 300
    },
    // events: {
    //     draw: (data) => {
    //         if (data.type === 'bar') {
    //             data.element.attr({
    //                 style: 'stroke-width: 30px'
    //             });
    //         }
    //     }
    // },
    type: 'Bar'
};

const horizontalBarChart: Configuration = {
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: [
            [5, 4, 3, 7, 5, 10, 3],
            [3, 2, 9, 5, 4, 6, 4]
        ]
    },
    type: 'Bar',
    options: {
        seriesBarDistance: 10,
        reverseData: true,
        horizontalBars: true,
        axisY: {
            offset: 70
        },
        height: 300
    }
};

const donutAnimateChart: Configuration = {
    data: {
        series: [10, 20, 50, 20, 5, 50, 15],
        labels: [1, 2, 3, 4, 5, 6, 7]
    },
    options: {
        donut: true,
        showLabel: false,
        height: 300
    },
    type: 'Pie'
};

const simplePieChart: Configuration = {
    data: {
        series: [5, 3, 4]
    },
    options: {
        height: 300,
        showLabel: false
    },
    type: 'Pie'
};

export {
    simpleLineChart, lineScatter, areaLineChart, overlappingBarChart,
    stackBarChart, horizontalBarChart, donutAnimateChart, simplePieChart
};
