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

import Widget from "../../components/Widget";
import AnimateNumber from "react-animated-number";

import s from './Typography.module.scss';

import { chartData } from './mock';
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";

import Highcharts from "highcharts/highstock";
// import HighchartsReact from "highcharts-react-official";
import PieChart from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import Map from '../dashboard/components/am4chartMap/am4chartMap'

class Typography extends React.Component {
  state = {
    cd: chartData,
    initEchartsOptions: {
      renderer: "canvas",
    },
    checkboxes1: [false, true, false, false],
    checkboxes2: [false, false, false, false, false, false],
    checkboxes3: [false, false, false, false, false, false],
  }

  render() {
    const { cd, initEchartsOptions } = this.state
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
                  option={cd.echarts.scatter}
                  opts={initEchartsOptions}
                  style={{ height: 350 }}
                />
              </Widget>
            </Col>
          </Row>
          <Row>
            <Col lg={5} xs={12}>
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
                <PieChart
                  highcharts={Highcharts}
                  options={cd.highcharts.pie}
                />
              </Widget>
            </Col>
            {/* <Col lg={6} md={6} sm={12}> */}
            <Col lg={7}>
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
                  너무 할 게 없어서 <span className="fw-semi-bold">설명이라도</span>
                </h3>
                <p>
                  적어야 할 것 같아요 옆에 파이 차트랑 height가 안 맞아요ㅠ
                  how all of us learned in school the table should look like. Just
                  add
                  <code>.table-bordered</code> to it.
                </p>
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
                        <th>Product</th>
                        <th className="text-right">Price</th>
                        <th className="text-center">Sales</th>
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
                        <td>On the Road</td>
                        <td className="text-right">$25 224.2</td>
                        <td className="text-center">
                          <Sparklines
                            data={[13, 14, 16, 15, 4, 14, 20]}
                            style={{ width: "35px", height: "20px" }}
                          >
                            <SparklinesBars style={{ fill: "#1870DC" }} />
                          </Sparklines>
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
                        <td>HP Core i7</td>
                        <td className="text-right">$87 346.1</td>
                        <td className="text-center">
                          <Sparklines
                            data={[14, 12, 16, 11, 17, 19, 16]}
                            style={{ width: "35px", height: "20px" }}
                          >
                            <SparklinesBars style={{ fill: "#58D777" }} />
                          </Sparklines>
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
                        <td>Let&apos;s Dance</td>
                        <td className="text-right">$57 944.6</td>
                        <td className="text-center">
                          <Sparklines
                            data={[11, 17, 19, 16, 14, 12, 16]}
                            style={{ width: "35px", height: "20px" }}
                          >
                            <SparklinesBars style={{ fill: "#f0af03" }} />
                          </Sparklines>
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
                        <td>Air Pro</td>
                        <td className="text-right">$118 533.1</td>
                        <td className="text-center">
                          <Sparklines
                            data={[13, 14, 20, 16, 15, 4, 14]}
                            style={{ width: "35px", height: "20px" }}
                          >
                            <SparklinesBars style={{ fill: "#F45722" }} />
                          </Sparklines>
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
                        <td>Version Control</td>
                        <td className="text-right">$72 854.5</td>
                        <td className="text-center">
                          <Sparklines
                            data={[16, 15, 4, 14, 13, 14, 20]}
                            style={{ width: "35px", height: "20px" }}
                          >
                            <SparklinesBars style={{ fill: "#4ebfbb" }} />
                          </Sparklines>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Widget>
            </Col>
          </Row>
          <Row>
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
          </Row>
        </div>
      </div>
    )
  }
}

export default Typography;
