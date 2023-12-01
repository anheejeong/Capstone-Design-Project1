import React from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
} from "reactstrap";
import { Sparklines, SparklinesBars } from "react-sparklines";

import Widget from "../../../components/Widget";
import s from "./Static.module.scss";

import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";

import { chartData } from "./mock";

import axios from "axios";

import config from "../../components/charts/config";
const colors = config.chartColors;
let lineColors = [colors.blue, colors.green, colors.orange];

class Static extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //   }
  // }
  state = {
    cd: chartData,
    initEchartsOptions: {
      renderer: "canvas",
    },
    this_year: null,
    last_year: null,
  }

  loadItem = async () => {
    axios
      .get("./payment")
      .then(({ data }) => {
        this.setState({
          this_year: data.payment_this_year,
          last_year: data.payment_last_year
        })
      })
      .catch(e => {  // API 호출이 실패한 경우
        console.error(e);  // 에러표시
        this.setState({
          loading: false
        });
      })

  };

  componentDidMount() {
    this.loadItem();
  }

  render() {
    const { cd, initEchartsOptions } = this.state

    const line = {
      color: lineColors,
      tooltip: {
        trigger: "none",
        axisPointer: {
          type: "cross",
        },
      },
      legend: {
        data: ["Payment Amount in 2022", "Payment Amount in 2023"],
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
            "2023-1",
            "2023-2",
            "2023-3",
            "2023-4",
            "2023-5",
            "2023-6",
            "2023-7",
            "2023-8",
            "2023-9",
            "2023-10",
            "2023-11",
            "2023-12",
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
            "2022-1",
            "2022-2",
            "2022-3",
            "2022-4",
            "2022-5",
            "2022-6",
            "2022-7",
            "2022-8",
            "2022-9",
            "2022-10",
            "2022-11",
            "2022-12",
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
          name: "Payment Amount in 2022",
          type: "line",
          xAxisIndex: 1,
          smooth: true,
          data: this.state.last_year,
        },
        {
          name: "Payment Amount in 2023",
          type: "line",
          smooth: true,
          data: this.state.this_year,
        },
      ],
    }

    return (
      <div className={s.root}>
        <h2 className="page-title">
          Analysis - <span className="fw-semi-bold">Payments</span>
        </h2>
        <Row>
          <Col lg={7} xs={12}>
            <Widget
              title={
                <h5>
                  <span className="fw-semi-bold">금액</span> (당일/월별)
                </h5>
              }
              close
              collapse
            >
              <ReactEchartsCore
                echarts={echarts}
                option={line}
                opts={initEchartsOptions}
                style={{ height: "500px" }}
              />
            </Widget>
          </Col>
          <Col lg={5} xs={12}>
            <Row>
              <Col lg={12}>
                <Widget
                  title={
                    <h5>
                      <span className="fw-semi-bold">결제 방식</span>
                    </h5>
                  }
                  close
                  collapse
                >
                  <ReactEchartsCore
                    echarts={echarts}
                    option={cd.echarts.bar}
                    opts={initEchartsOptions}
                    style={{ height: "220px" }}
                  />
                </Widget>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <Widget
                  // title={
                  //   <h5>
                  //     <span className="fw-semi-bold">신규 정회원</span>
                  //   </h5>
                  // }
                  close
                  collapse
                >
                  <header class="d-flex justify-content-between flex-nowrap">
                    <h4 class="d-flex align-items-center pb-1 big-stat-title">
                      <span class="circle bg-primary mr-sm" style={{ 'font-size': '6px' }}></span>
                      신규 <span class="fw-normal ml-xs">정회원</span>
                    </h4>
                  </header>
                  <div class="pb-xlg h-100">
                    <section class="widget mb-0 h-100">
                      <div class="widget-body p-0">
                        <h4 class="fw-semi-bold ml-lg mb-lg">4,232</h4>
                        <div class="d-flex border-top">
                          <div class="w-50 border-right p-3 px-4">
                            <div class="d-flex align-items-center mb-2">
                              <h6>+830</h6>
                              <i class="la la-arrow-right la-2x text-success rotate-315 ml-sm"></i>
                            </div>
                            <p class="text-muted mb-0 mr"><small>Registrations</small></p>
                          </div>
                          <div class="w-50 p-3 px-4">
                            <div class="d-flex align-items-center mb-2">
                              <h6>4.5%</h6>
                              <i class="la la-2x la-arrow-right text-danger rotate-45 ml-sm"></i>
                            </div>
                            <p class="text-muted mb-0 mr"><small>Bounce Rate</small></p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </Widget>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <Widget>
              <header>
                <h4>
                  제품 구매 <strong>목록/수</strong>
                </h4>
                <div class="widget-controls">
                  <a href="#"><i class="la la-cog text-white"></i></a>
                  <a href="#" data-widgster="close"><i class="la la-remove text-white"></i></a>
                </div>
              </header>
              <div class="widget-body p-0 support table-wrapper">
                <table class="table table-striped mb-0">
                  <thead>
                    <tr class="text-white">
                      <th scope="col"><span class=" pl-3">NAME</span></th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">PRODUCT</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">DATE</th>
                      <th scope="col">CITY</th>
                      <th scope="col">STATUS</th>
                    </tr>
                  </thead>
                  <tbody class="text-white-50">
                    <tr>
                      <th class="pl-4 fw-normal">Mark Otto</th>
                      <td>ottoto@wxample.com</td>
                      <td>ON the Road</td>
                      <td>$25 224.2</td>
                      <td>11 May 2017</td>
                      <td>Otsego</td>
                      <td><span class="badge badge-primary p-1 px-3">Sent</span></td>
                    </tr>
                    <tr>
                      <th class="pl-4">Jacob Thornton</th>
                      <td>thornton@wxample.com</td>
                      <td>HP Core i7</td>
                      <td>$1 254.2</td>
                      <td>4 Jun 2017</td>
                      <td>Fivepointville</td>
                      <td><span class="badge badge-primary p-1 px-3">Sent</span></td>
                    </tr>
                    <tr>
                      <th class="pl-4">Larry the Bird</th>
                      <td>bird@wxample.com</td>
                      <td>Air Pro</td>
                      <td>$1 570.0</td>
                      <td>27 Aug 2017</td>
                      <td>Leadville North</td>
                      <td><span class="badge badge-success p-1 px-3">Pending</span></td>
                    </tr>
                    <tr>
                      <th class="pl-4">Joseph May</th>
                      <td>josephmay@wxample.com</td>
                      <td>Version Control</td>
                      <td>$5 224.5</td>
                      <td>19 Feb 2018</td>
                      <td>Seaforth</td>
                      <td><span class="badge badge-danger p-1 px-3">Declined</span></td>
                    </tr>
                    <tr>
                      <th class="pl-4">Peter Horadnia</th>
                      <td>horadnia@wxample.com</td>
                      <td>Let's Dance</td>
                      <td>$43 594.7</td>
                      <td>1 Mar 2018</td>
                      <td>Hanoverton</td>
                      <td><span class="badge badge-primary p-1 px-3">Sent</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Static;
