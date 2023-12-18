import React from "react";
import {
  Row,
  Col,
  Table,
  Label,
  Input,
  Progress,
} from "reactstrap";
import { Sparklines, SparklinesBars } from "react-sparklines";

import Widget from "../../components/Widget/Widget";
import AnimateNumber from "react-animated-number";

import s from './Users.module.scss';

import { chartData } from './mock';
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";

import Highcharts from "highcharts/highstock";
// import HighchartsReact from "highcharts-react-official";
import PieChart from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import Map from '../dashboard/components/am4chartMap/am4chartMap'

import Fade from "react-reveal/Fade";

import axios from "axios";

import config from "../components/developer/config";
const colors = config.chartColors;
let lineColors = [colors.blue, colors.green, colors.orange];
const colors2 = Highcharts.getOptions().colors.map((c, i) =>
  // Start out with a darkened base color (negative brighten), and end
  // up with a much brighter color
  Highcharts.color(Highcharts.getOptions().colors[0])
    .brighten((i - 3) / 7)
    .get()
);

class Users extends React.Component {
  state = {
    traffic_day: [null],
    traffic_hour: [null],
    traffic_importance: [null],

    os_1_1: null,
    os_1_2: null,
    os_1_3: null,
    os_2_1: null,
    os_2_2: null,
    os_2_3: null,
    os_3_1: null,
    os_3_2: null,
    os_3_3: null,
    os_4_1: null,
    os_4_2: null,
    os_4_3: null,
    os_5_1: null,
    os_5_2: null,
    os_5_3: null,

    user_percentage_1: null,
    user_percentage_2: null,

    cd: chartData,
    initEchartsOptions: {
      renderer: "canvas",
    },
    checkboxes1: [false, true, false, false],
    checkboxes2: [false, false, false, false, false, false],
    checkboxes3: [false, false, false, false, false, false],
  }

  loadItem = async () => {
    axios
      .get("./user")
      .then(({ data }) => {
        this.setState({
          // visitToday: data.visitor,
          // payments: data.payment,
          // monthVisitor: data.year_visitor
          traffic_day: data.day,
          traffic_hour: data.hour,
          traffic_importance: data.importance,

          os_1_1: data.user_os[0][0],
          os_1_2: data.user_os[0][1],
          os_1_3: data.user_os[0][2],
          os_2_1: data.user_os[0][3],
          os_2_2: data.user_os[0][4],
          os_2_3: data.user_os[0][5],
          os_3_1: data.user_os[0][6],
          os_3_2: data.user_os[0][7],
          os_3_3: data.user_os[0][8],
          os_4_1: data.user_os[0][9],
          os_4_2: data.user_os[0][10],
          os_4_3: data.user_os[0][11],
          os_5_1: data.user_os[0][12],
          os_5_2: data.user_os[0][13],
          os_5_3: data.user_os[0][14],

          user_percentage_1: data.user_percentage[0],
          user_percentage_2: data.user_percentage[1],
        })
        // console.log(data.day)
        // console.log(data.hour)
        // console.log(data.importance)
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
        this.setState({
          loading: false
        });
      });
  };

  componentDidMount() {
    this.loadItem();
  }

  render() {
    const { cd, initEchartsOptions } = this.state

    const pie = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          color: '#fff',
        },
      },
      series: [
        {
          name: '정회원 비회원 비율',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: this.state.user_percentage_1, name: '정회원' },
            { value: this.state.user_percentage_2, name: '비회원' },
          ]
        }
      ]
    };

    // prettier-ignore
    const hours = [
      '12a', '1a', '2a', '3a', '4a', '5a', '6a',
      '7a', '8a', '9a', '10a', '11a',
      '12p', '1p', '2p', '3p', '4p', '5p',
      '6p', '7p', '8p', '9p', '10p', '11p'
    ];
    // prettier-ignore
    const days = [
      'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];
    // prettier-ignore
    // const data = this.state.traffic;
    const title = [];
    const singleAxis = [];
    const series = [];
    days.forEach(function (day, idx) {
      title.push({
        textBaseline: 'middle',
        top: ((idx + 0.5) * 100) / 7 + '%',
        text: day,
        textStyle: {
          color: colors.textColor
        },
      });
      singleAxis.push({
        left: 150,
        type: 'category',
        boundaryGap: false,
        data: hours,
        top: (idx * 100) / 7 + 5 + '%',
        height: 100 / 7 - 10 + '%',
        axisLabel: {
          interval: 2
        },
        axisLine: {
          lineStyle: {
            color: colors.textColor
          }
        }
      });
      series.push({
        singleAxisIndex: idx,
        coordinateSystem: 'singleAxis',
        type: 'scatter',
        data: [],
        symbolSize: function (dataItem) {
          return dataItem[1] * 4;
        }
      });
    });

    let count;

    // 코드 정리하면 시간 초과 남
    for (count = 0; count < 24; count++) {
      series[0].data.push([this.state.traffic_hour[count], this.state.traffic_importance[count]])
    }
    for (count = 24; count < 48; count++) {
      series[1].data.push([this.state.traffic_hour[count], this.state.traffic_importance[count]])
    }
    for (count = 48; count < 72; count++) {
      series[2].data.push([this.state.traffic_hour[count], this.state.traffic_importance[count]])
    }
    for (count = 72; count < 96; count++) {
      series[3].data.push([this.state.traffic_hour[count], this.state.traffic_importance[count]])
    }
    for (count = 96; count < 120; count++) {
      series[4].data.push([this.state.traffic_hour[count], this.state.traffic_importance[count]])
    }
    for (count = 120; count < 144; count++) {
      series[5].data.push([this.state.traffic_hour[count], this.state.traffic_importance[count]])
    }
    for (count = 144; count < 168; count++) {
      series[6].data.push([this.state.traffic_hour[count], this.state.traffic_importance[count]])
    }

    console.log(series)

    const scatter = {
      tooltip: {
        position: 'top'
      },
      title: title,
      singleAxis: singleAxis,
      series: series,
    }

    return (
      <div className={s.root}>
        <h2 className="page-title">
          Analysis - <span className="fw-semi-bold">Users</span>
        </h2>
        <div>
          {/* <Row> - 어떤 차트 쓸지 몰라서 일단 보류
            <Col lg={12} xs={12}>
              <Widget
                title={
                  <h5>
                    접속 <span className="fw-semi-bold">시간</span>
                  </h5>
                }
                close
                collapse
              >
                <ReactEchartsCore
                  echarts={echarts}
                  option={cd.echarts.line}
                  opts={initEchartsOptions}
                  style={{ height: 350 }}
                />
              </Widget>
            </Col>
          </Row> */}
          <Row>
            <Col lg={12} xs={12}>
              <Fade clear>
                <Widget
                  title={
                    <h5>
                      접속 <span className="fw-semi-bold">시간</span>
                    </h5>
                  }
                  close
                  collapse
                >
                  <ReactEchartsCore
                    echarts={echarts}
                    // option={cd.echarts.scatter}
                    option={scatter}
                    opts={initEchartsOptions}
                    style={{ height: 370 }}
                  />
                </Widget>
              </Fade>
            </Col>
          </Row>
          <Row>
            <Col lg={5} xs={12}>
              <Fade clear>
                <Widget
                  title={
                    <h5>
                      정회원 비회원 <span className="fw-semi-bold">비율</span>
                    </h5>
                  }
                  close
                  collapse
                >
                  {/* <HighchartsReact
                  highcharts={Highcharts}
                  options={cd.highcharts.pie} /> */}
                  {/* <PieChart
                  highcharts={Highcharts}
                  options={pie}
                /> */}
                  <ReactEchartsCore
                    echarts={echarts}
                    // option={donut}
                    option={pie}
                    opts={initEchartsOptions}
                    style={{ height: 400 }}
                  />
                </Widget>
              </Fade>
            </Col>
            {/* <Col lg={6} md={6} sm={12}> */}
            <Col lg={7}>
              <Fade clear>
                <Widget
                  title={
                    <h5>
                      접속 <span className="fw-semi-bold">기기</span>
                    </h5>
                  }
                  settings
                  close
                >
                  <h3>
                    이용자 접속 환경
                    {/* 접속기기 <span className="fw-semi-bold">설명이라도</span> */}
                  </h3>
                  <div className={`widget-table-overflow ${s.overFlow}`}>
                    <Table className="table-bordered table-lg mt-lg mb-0">
                      <thead className="text-uppercase">
                        <tr>
                          <th>
                            <div className="abc-checkbox">
                              <Input
                                id="checkbox10"
                                type="checkbox"
                                checked={this.state.checkboxes2[0]}
                                onChange={(event) =>
                                  this.checkAll(event, "checkboxes2")
                                }
                              />
                              <Label for="checkbox10" />
                            </div>
                          </th>
                          <th>OS</th>
                          <th className="text-right">RATE</th>
                          <th className="text-center">WEB/APP</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="abc-checkbox">
                              <Input
                                id="checkbox11"
                                type="checkbox"
                                checked={this.state.checkboxes2[1]}
                                onChange={(event) =>
                                  this.changeCheck(event, "checkboxes2", 1)
                                }
                              />
                              <Label for="checkbox11" />
                            </div>
                          </td>
                          <td>{this.state.os_1_1}</td>
                          <td className="text-right">{this.state.os_1_2}</td>
                          <td className="text-center">
                            {/* <Sparklines
                            data={[13, 14, 16, 15, 4, 14, 20]}
                            style={{ width: "35px", height: "20px" }}
                          >
                            <SparklinesBars style={{ fill: "#1870DC" }} />
                          </Sparklines> */}
                            {this.state.os_1_3}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="abc-checkbox">
                              <Input
                                id="checkbox12"
                                type="checkbox"
                                checked={this.state.checkboxes2[2]}
                                onChange={(event) =>
                                  this.changeCheck(event, "checkboxes2", 2)
                                }
                              />
                              <Label for="checkbox12" />
                            </div>
                          </td>
                          <td>{this.state.os_2_1}</td>
                          <td className="text-right">{this.state.os_2_2}</td>
                          <td className="text-center">
                            {/* <Sparklines
                            data={[14, 12, 16, 11, 17, 19, 16]}
                            style={{ width: "35px", height: "20px" }}
                          >
                            <SparklinesBars style={{ fill: "#58D777" }} />
                          </Sparklines> */}
                            {this.state.os_2_3}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="abc-checkbox">
                              <Input
                                id="checkbox13"
                                type="checkbox"
                                checked={this.state.checkboxes2[3]}
                                onChange={(event) =>
                                  this.changeCheck(event, "checkboxes2", 3)
                                }
                              />
                              <Label for="checkbox13" />
                            </div>
                          </td>
                          <td>{this.state.os_3_1}</td>
                          <td className="text-right">{this.state.os_3_2}</td>
                          <td className="text-center">
                            {/* <Sparklines
                            data={[11, 17, 19, 16, 14, 12, 16]}
                            style={{ width: "35px", height: "20px" }}
                          >
                            <SparklinesBars style={{ fill: "#f0af03" }} />
                          </Sparklines> */}
                            {this.state.os_3_3}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="abc-checkbox">
                              <Input
                                id="checkbox14"
                                type="checkbox"
                                checked={this.state.checkboxes2[4]}
                                onChange={(event) =>
                                  this.changeCheck(event, "checkboxes2", 4)
                                }
                              />
                              <Label for="checkbox14" />
                            </div>
                          </td>
                          <td>{this.state.os_4_1}</td>
                          <td className="text-right">{this.state.os_4_2}</td>
                          <td className="text-center">
                            {/* <Sparklines
                            data={[13, 14, 20, 16, 15, 4, 14]}
                            style={{ width: "35px", height: "20px" }}
                          >
                            <SparklinesBars style={{ fill: "#F45722" }} />
                          </Sparklines> */}
                            {this.state.os_4_3}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className="abc-checkbox">
                              <Input
                                id="checkbox15"
                                type="checkbox"
                                checked={this.state.checkboxes2[5]}
                                onChange={(event) =>
                                  this.changeCheck(event, "checkboxes2", 5)
                                }
                              />
                              <Label for="checkbox15" />
                            </div>
                          </td>
                          <td>{this.state.os_5_1}</td>
                          <td className="text-right">{this.state.os_5_2}</td>
                          <td className="text-center">
                            {/* <Sparklines
                            data={[16, 15, 4, 14, 13, 14, 20]}
                            style={{ width: "35px", height: "20px" }}
                          >
                            <SparklinesBars style={{ fill: "#4ebfbb" }} />
                          </Sparklines> */}
                            {this.state.os_5_3}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Widget>
              </Fade>
            </Col>
          </Row>
          {/* <Row>
            <Col lg={8}>
              <Widget className="bg-transparent">
                <Map />
              </Widget>
            </Col>
            <Col lg={4}>
              <Widget
                className="bg-transparent"
                title={
                  <h5>
                    {" "}
                    접속 많이 하는
                    <span className="fw-semi-bold">&nbsp;국가명</span>
                  </h5>
                }
                settings
                refresh
                close
              >
                <p>
                  Status: <strong>Live</strong>
                </p>
                <p>
                  <span className="circle bg-default text-white">
                    <i className="fa fa-map-marker" />
                  </span>{" "}
                  &nbsp; 2023.11.08 18:28
                </p>
                <div className="row progress-stats">
                  <div className="col-md-9 col-12">
                    <h6 className="name fw-semi-bold">1</h6>
                    <p className="description deemphasize mb-xs text-white">
                      인기검색어1
                    </p>
                    <Progress
                      color="primary"
                      value="60"
                      className="bg-subtle-blue progress-xs"
                    />
                  </div>
                  <div className="col-md-3 col-12 text-center">
                    <span className="status rounded rounded-lg bg-default text-light">
                      <small>
                        <AnimateNumber value={75} />%
                      </small>
                    </span>
                  </div>
                </div>
                <div className="row progress-stats">
                  <div className="col-md-9 col-12">
                    <h6 className="name fw-semi-bold">2</h6>
                    <p className="description deemphasize mb-xs text-white">
                      인기검색어2
                    </p>
                    <Progress
                      color="danger"
                      value="39"
                      className="bg-subtle-blue progress-xs"
                    />
                  </div>
                  <div className="col-md-3 col-12 text-center">
                    <span className="status rounded rounded-lg bg-default text-light">
                      <small>
                        <AnimateNumber value={84} />%
                      </small>
                    </span>
                  </div>
                </div>
                <div className="row progress-stats">
                  <div className="col-md-9 col-12">
                    <h6 className="name fw-semi-bold">3</h6>
                    <p className="description deemphasize mb-xs text-white">
                      인기검색어3
                    </p>
                    <Progress
                      color="success"
                      value="80"
                      className="bg-subtle-blue progress-xs"
                    />
                  </div>
                  <div className="col-md-3 col-12 text-center">
                    <span className="status rounded rounded-lg bg-default text-light">
                      <small>
                        <AnimateNumber value={92} />%
                      </small>
                    </span>
                  </div>
                </div>
                <h6 className="fw-semi-bold mt">Map Distributions</h6>
                <p>
                  Tracking: <strong>Active</strong>
                </p>
                <p>
                  <span className="circle bg-default text-white">
                    <i className="fa fa-cog" />
                  </span>
                  &nbsp; 391 elements installed, 84 sets
                </p>
                <div className="input-group mt">
                  <input
                    type="text"
                    className="form-control bg-custom-dark border-0"
                    placeholder="Search Map"
                  />
                  <span className="input-group-btn">
                    <button
                      type="submit"
                      className={`btn btn-subtle-blue ${s.searchBtn}`}
                    >
                      <i className="fa fa-search text-light" />
                    </button>
                  </span>
                </div>
              </Widget>
            </Col>
          </Row> */}
        </div>
      </div>
    )
  }
}

export default Users;
