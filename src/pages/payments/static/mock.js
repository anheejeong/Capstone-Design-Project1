import config from "../../components/developer/config";
const colors = config.chartColors;
let lineColors = [colors.blue, colors.green, colors.orange];

export const chartData = {
    echarts: {
        line: {
            color: lineColors,
            tooltip: {
                trigger: "none",
                axisPointer: {
                    type: "cross",
                },
            },
            legend: {
                data: ["2015 Precipitation", "2016 Precipitation"],
                textStyle: {
                    color: colors.textColor,
                },
            },
            grid: {
                top: 70,
                bottom: 50,
            },
            xAxis: [
                {
                    type: "category",
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: lineColors[1],
                        },
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return (
                                    "Precipitation  " +
                                    params.value +
                                    (params.seriesData.length
                                        ? "：" + params.seriesData[0].data
                                        : "")
                                );
                            },
                        },
                    },
                    data: [
                        "2020-1",
                        "2020-2",
                        "2020-3",
                        "2020-4",
                        "2020-5",
                        "2020-6",
                        "2020-7",
                        "2020-8",
                        "2020-9",
                        "2020-10",
                        "2020-11",
                        "2020-12",
                    ],
                },
                {
                    type: "category",
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: lineColors[0],
                        },
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return (
                                    "Precipitation  " +
                                    params.value +
                                    (params.seriesData.length
                                        ? "：" + params.seriesData[0].data
                                        : "")
                                );
                            },
                        },
                    },
                    data: [
                        "2019-1",
                        "2019-2",
                        "2019-3",
                        "2019-4",
                        "2019-5",
                        "2019-6",
                        "2019-7",
                        "2019-8",
                        "2019-9",
                        "2019-10",
                        "2019-11",
                        "2019-12",
                    ],
                },
            ],
            yAxis: [
                {
                    type: "value",
                    axisLabel: {
                        color: colors.textColor,
                    },
                    axisLine: {
                        lineStyle: {
                            color: colors.textColor,
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: colors.gridLineColor,
                        },
                    },
                    axisPointer: {
                        label: {
                            color: colors.dark,
                        },
                    },
                },
            ],
            series: [
                {
                    name: "2015 Precipitation",
                    type: "line",
                    xAxisIndex: 1,
                    smooth: true,
                    data: [
                        2.6,
                        5.9,
                        9.0,
                        26.4,
                        28.7,
                        70.7,
                        175.6,
                        182.2,
                        48.7,
                        18.8,
                        6.0,
                        2.3,
                    ],
                },
                {
                    name: "2016 Precipitation",
                    type: "line",
                    smooth: true,
                    data: [
                        3.9,
                        5.9,
                        11.1,
                        18.7,
                        48.3,
                        69.2,
                        231.6,
                        46.6,
                        55.4,
                        18.4,
                        10.3,
                        0.7,
                    ],
                },
            ],
        },
        bar: {
            dataset: {
                source: [
                    ['score', 'amount', 'product'],
                    // [89.3, 58212, 'Matcha Latte'],
                    // [57.1, 78254, 'Milk Tea'],
                    // [74.4, 41032, 'Cheese Cocoa'],
                    // [50.1, 12755, 'Cheese Brownie'],
                    // [89.7, 20145, 'Matcha Cocoa'],
                    // [68.1, 79146, 'Tea'],
                    // [19.6, 91852, 'Orange Juice'],
                    // [10.6, 101852, 'Lemon Juice'],
                    // [32.7, 20112, 'Walnut Brownie']
                    [57.1, 40, '신용카드'],
                    [19.6, 23, '토스']
                ]
            },
            grid: { containLabel: true },
            xAxis: [
                {
                    name: '%',
                    axisLine: {
                        lineStyle: {
                            color: colors.textColor,
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: colors.gridLineColor,
                        },
                    },
                },
            ],
            yAxis: [
                {
                    type: 'category',
                    axisLabel: {
                        color: colors.textColor,
                    },
                    axisLine: {
                        lineStyle: {
                            color: colors.textColor,
                        },
                    },
                },
            ],
            visualMap: {
                orient: 'horizontal',
                left: 'center',
                min: 10,
                max: 100,
                text: ['High Score', 'Low Score'],
                textStyle: {
                    color: colors.textColor
                },
                // Map the score column to color
                dimension: 0,
                inRange: {
                    color: ['#65B581', '#FFCE34', '#FD665F']
                }
            },
            series: [
                {
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: 'amount',
                        // Map the "product" column to Y axis
                        y: 'product'
                    }
                }
            ]
        }
    },
}