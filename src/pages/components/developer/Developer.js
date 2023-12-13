import React from "react";

import { Row, Col, Badge } from "reactstrap";

import Widget from "../../../components/Widget/Widget";
import ApexChart from "react-apexcharts";

import s from "./Developer.module.scss";
import { chartData, liveChart, liveChartInterval } from "./mock";
import Sparklines from "../../../components/Sparklines/Sparklines";

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

class Developer extends React.Component {
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
        <p>경북대학교 IT대학</p>
        <p>종합설계프로젝트 2팀</p>
        <p>Company : 통계마당</p>
        <p>Project Repository : <a href="https://github.com/anheejeong/Capstone-Design-Project1">KNU-DASHBOARD</a></p>
        <Widget>
          <h5>
            <Badge color="warning">
              FRONTEND
            </Badge>
            &nbsp;2021110011 안희정
          </h5>
          <p>프론트엔드 안희정입니다. 경북대학교 컴퓨터학부 심화컴퓨터 전공이고, 프론트엔드 개발자를 꿈꾸고 있습니다. 이번 프로젝트에서 React를 이용해 프론트 화면을 구현했습니다.</p>
          <span className="fw-semi-bold">EMAIL</span><p>eyrt6973@naver.com</p>
          <span className="fw-semi-bold">GITHUB</span><p><a href="https://github.com/anheejeong">anheejeong</a></p>
        </Widget>
        <Widget>
          <h5>
            <Badge color="danger">
              BACKEND
            </Badge>
            &nbsp;2020117780 조성호
          </h5>
          <p>백엔드 조성호입니다. 경북대학교 글로벌소프트웨어융합전공으로, 서비스기업 백엔드 개발자를 꿈꾸고 있습니다. 이번 프로젝트에서는 Python과 Flask를 이용해 웹 서버를 구현했습니다. </p>
          <span className="fw-semi-bold">EMAIL</span><p>eoblue22@naver.com</p>
          <span className="fw-semi-bold">GITHUB</span><p><a href="https://github.com/sungholion">sungholion</a></p>
        </Widget>
        <Widget>
          <h5>
            <Badge color="dark">
              DATA ANALYSIS
            </Badge>
            &nbsp;2019113946 김창현
          </h5>
          <p>데이터분석 김창현입니다. 경북대학교 컴퓨터학부 심화컴퓨터 재학 중에 있고, 재미있는 것을 하면서 살기 위해 이것저것 해보고 있습니다. 이번 프로젝트에서 Python을 이용한 데이터 분석을 담당하였습니다.</p>
          <span className="fw-semi-bold">EMAIL</span><p>egnahckim0119@gmail.com</p>
          <span className="fw-semi-bold">GITHUB</span><p><a href="https://github.com/ChangHyeonn">ChangHyeonn</a></p>
        </Widget>
      </div>
    );
  }
}

export default Developer;
