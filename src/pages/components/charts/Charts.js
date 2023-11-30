import React from "react";

import { Row, Col } from "reactstrap";

import Widget from "../../../components/Widget";
import ApexChart from "react-apexcharts";

import s from "./Charts.module.scss";
import { chartData, liveChart, liveChartInterval } from "./mock";
import Sparklines from "../../../components/Sparklines";

import ReactEchartsCore from "echarts-for-react/lib/core";

import echarts from "echarts/lib/echarts";

import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/themeRiver";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

exporting(Highcharts);
exportData(Highcharts);

class Charts extends React.Component {
  state = {
    cd: chartData,
    ld: liveChart,
    initEchartsOptions: {
      renderer: "canvas",
    },
    sparklineData: {
      series: [{ data: [1, 7, 3, 5, 7, 8] }],
      options1: {
        colors: ["#db2a34"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
      options2: {
        colors: ["#2477ff"],
        plotOptions: {
          bar: {
            columnWidth: "50%",
          },
        },
      },
    },
  };

  componentWillUnmount() {
    clearInterval(liveChartInterval);
  }

  render() {
    const { cd, ld, initEchartsOptions, sparklineData } = this.state;
    return (
      <div className={s.root}>
        <h1 className="page-title">
          KNU <span className="fw-semi-bold">팀원 소개</span>
        </h1>
        <p>파워레인져 엔진포스 나는 빨강 나는 노랑 나는 초록 나는 파랑 나는 보라 !</p>
      </div>
    );
  }
}

export default Charts;
