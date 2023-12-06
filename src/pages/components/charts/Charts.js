import React from "react";

import { Row, Col, Badge } from "reactstrap";

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
        <p>안녕하세요 저희는 세얼간이입니다</p>
        <p>할 줄 아는 게 아무것도 없어요</p>
        <p>사실 이거 다 디비에서 들고만 온 거예요</p>
        <p>감사합니다.</p>
        <h5>
          <Badge color="warning">
            FRONTEND
          </Badge>
          &nbsp;2021110011 안희정
        </h5>
        <p>하이 나는 프론트엔드</p>
        <h5>
          <Badge color="danger">
            BACKEND
          </Badge>
          &nbsp;2020- 조성호
        </h5>
        <p>하이 나는 백엔드</p>
        <h5>
          <Badge color="dark">
            DATA ANALYSIS
          </Badge>
          &nbsp;2019- 김창현
        </h5>
        <p>하이 나는 데이터분석</p>
      </div>
    );
  }
}

export default Charts;
