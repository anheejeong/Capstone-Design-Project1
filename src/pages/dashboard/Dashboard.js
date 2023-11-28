import React, { Component, componentDidMount } from "react";
import ApexChart from "react-apexcharts";
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";

import Widget from "../../components/Widget";

// import Calendar from "./components/calendar/Calendar";
// import Map from "./components/am4chartMap/am4chartMap";
// import Rickshaw from "./components/rickshaw/Rickshaw";

import AnimateNumber from "react-animated-number";

import s from "./Dashboard.module.scss";

// import peopleA1 from "../../assets/people/a1.jpg";
// import peopleA2 from "../../assets/people/a2.jpg";
// import peopleA5 from "../../assets/people/a5.jpg";
// import peopleA4 from "../../assets/people/a4.jpg";

import {
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Badge,
} from "reactstrap";

import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts";
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

import { chartData } from "../components/charts/mock";

import axios from 'axios';

import config from "../components/charts/config";
const colors = config.chartColors;

let columnColors = [
  colors.blue,
  colors.green,
  colors.orange,
  colors.red,
  colors.default,
  colors.gray,
  colors.teal,
  colors.pink,
];
let lineColors = [colors.blue, colors.green, colors.orange];

function generateDayWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([baseval, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donut_value_one: null,
      donut_value_two: null,

      visit_year: [],

      // visitToday: null,
      // payments: null,
      // monthVisitor: null,
      visitToday: [],
      payments: [],
      payment_percent: [],

      month_visit: [],

      keyword_ranking: [],

      hot_post_one: [],
      hot_post_two: [],
      hot_post_three: [],
      hot_post_four: [],
      hot_post_five: [],

      graph: null,
      checkedArr: [false, false, false],
      cd: chartData,
      initEchartsOptions: {
        renderer: "canvas",
      },
      tableStyles: [
        {
          id: 1,
          picture: require("../../assets/tables/1.png"), // eslint-disable-line global-require
          description: "Palo Alto",
          info: {
            type: "JPEG",
            dimensions: "200x150",
          },
          date: new Date("September 14, 2012"),
          size: "45.6 KB",
          progress: {
            percent: 29,
            colorClass: "success",
          },
        },
        {
          id: 2,
          picture: require("../../assets/tables/2.png"), // eslint-disable-line global-require
          description: "The Sky",
          info: {
            type: "PSD",
            dimensions: "2400x1455",
          },
          date: new Date("November 14, 2012"),
          size: "15.3 MB",
          progress: {
            percent: 33,
            colorClass: "warning",
          },
        },
        {
          id: 3,
          picture: require("../../assets/tables/3.png"), // eslint-disable-line global-require
          description: "Down the road",
          label: {
            colorClass: "primary",
            text: "INFO!",
          },
          info: {
            type: "JPEG",
            dimensions: "200x150",
          },
          date: new Date("September 14, 2012"),
          size: "49.0 KB",
          progress: {
            percent: 38,
            colorClass: "inverse",
          },
        },
        {
          id: 4,
          picture: require("../../assets/tables/4.png"), // eslint-disable-line global-require
          description: "The Edge",
          info: {
            type: "PNG",
            dimensions: "210x160",
          },
          date: new Date("September 15, 2012"),
          size: "69.1 KB",
          progress: {
            percent: 17,
            colorClass: "danger",
          },
        },
        {
          id: 5,
          picture: require("../../assets/tables/5.png"), // eslint-disable-line global-require
          description: "Fortress",
          info: {
            type: "JPEG",
            dimensions: "1452x1320",
          },
          date: new Date("October 1, 2012"),
          size: "2.3 MB",
          progress: {
            percent: 41,
            colorClass: "primary",
          },
        },
      ],
    };
    this.checkTable = this.checkTable.bind(this);
  }

  // async loadAsyncData() {
  //   try {
  //     const resp = await fetch('/')
  //       .then(r => r.json())
  //     // .then(data => {
  //     //   console.log(data)
  //     // })
  //     console.log(resp)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  // componentDidMount() {
  //   this.loadAsyncData();
  // }

  // componentDidMount() {
  //   fetch('/home')
  //     .then(r => r.json())
  //     .then(r => console.log(r))
  // }

  loadItem = async () => {
    axios
      .get("./home")
      .then(({ data }) => {
        console.log(data);
        this.setState({
          // visitToday: data.visitor,
          // payments: data.payment,
          // monthVisitor: data.year_visitor
          visitToday: data.visitor,
          payments: data.payment,
          payment_percent: data.payment_percent,

          month_visit: data.visitor_for_year,

          donut_value_one: data.user_percentage[0],
          donut_value_two: data.user_percentage[1],

          keyword_ranking: data.keyword_rank,

          visit_year: data.visitor_for_year,

          hot_post_one: data.hot_post[0],
          hot_post_two: data.hot_post[1],
          hot_post_three: data.hot_post[2],
          hot_post_four: data.hot_post[3],
          hot_post_five: data.hot_post[4],
        })
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

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${this.dateSet[2]
      }, ${this.dateSet[3]}`;
  };

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    const { cd, initEchartsOptions } = this.state;
    console.log(this.state.visitToday)
    console.log(this.state.payments)
    console.log(this.state.payment_percent)
    console.log(this.state.month_visit)
    console.log(this.state.keyword_ranking)
    // console.log(this.state.hot_post)

    const donut = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        show: false,
      },
      color: [
        colors.red,
        colors.green,
      ],
      series: [
        {
          name: "Access source",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center",
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold",
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: this.state.donut_value_one, name: "정회원" },
            { value: this.state.donut_value_two, name: "비회원" },
          ],
        },
      ],
    };

    const flow = {
      series: [
        {
          name: 'Visitor',
          data: [
            [1486771200000, this.state.visit_year[0]],
            [1486857600000, this.state.visit_year[1]],
            [1486944000000, this.state.visit_year[2]],
            [1487030400000, this.state.visit_year[3]],
            [1487116800000, this.state.visit_year[4]],
            [1487203200000, this.state.visit_year[5]],
            [1487289600000, this.state.visit_year[6]],
            [1487376000000, this.state.visit_year[7]],
            [1487462400000, this.state.visit_year[8]],
            [1487548800000, this.state.visit_year[9]],
            [1487635200000, this.state.visit_year[10]],
            [1487721600000, this.state.visit_year[11]],
          ]
        },
      ],
    }

    const tableStyles = [
      {
        id: 1,
        // picture: require("../../assets/tables/1.png"), // eslint-disable-line global-require
        title: this.state.hot_post_one[0],
        description: this.state.hot_post_one[1],
        info: {
          type: "JPEG",
          dimensions: "200x150",
        },
        date: this.state.hot_post_one[2],
        size: "45.6 KB",
        progress: {
          percent: 29,
          colorClass: "success",
        },
        recommendation: this.state.hot_post_one[3]
      },
      {
        id: 2,
        // picture: require("../../assets/tables/2.png"), // eslint-disable-line global-require
        title: this.state.hot_post_two[0],
        description: this.state.hot_post_two[1],
        info: {
          type: "PSD",
          dimensions: "2400x1455",
        },
        date: this.state.hot_post_two[2],
        size: "15.3 MB",
        progress: {
          percent: 33,
          colorClass: "warning",
        },
        recommendation: this.state.hot_post_two[3]
      },
      {
        id: 3,
        // picture: require("../../assets/tables/3.png"), // eslint-disable-line global-require
        title: this.state.hot_post_three[0],
        description: this.state.hot_post_three[1],
        label: {
          colorClass: "primary",
          text: "INFO!",
        },
        info: {
          type: "JPEG",
          dimensions: "200x150",
        },
        date: this.state.hot_post_three[2],
        size: "49.0 KB",
        progress: {
          percent: 38,
          colorClass: "inverse",
        },
        recommendation: this.state.hot_post_three[3]
      },
      {
        id: 4,
        // picture: require("../../assets/tables/4.png"), // eslint-disable-line global-require
        title: this.state.hot_post_four[0],
        description: this.state.hot_post_four[1],
        info: {
          type: "PNG",
          dimensions: "210x160",
        },
        date: this.state.hot_post_four[2],
        size: "69.1 KB",
        progress: {
          percent: 17,
          colorClass: "danger",
        },
        recommendation: this.state.hot_post_four[3]
      },
      {
        id: 5,
        title: this.state.hot_post_five[0],
        // picture: require("../../assets/tables/5.png"), // eslint-disable-line global-require
        description: this.state.hot_post_five[1],
        info: {
          type: "JPEG",
          dimensions: "1452x1320",
        },
        date: this.state.hot_post_five[2],
        size: "2.3 MB",
        progress: {
          percent: 41,
          colorClass: "primary",
        },
        recommendation: this.state.hot_post_five[3]
      },
    ]

    const payment_percent_one = {
      width: this.state.payment_percent[0] + '%'
    }

    const payment_percent_two = {
      width: this.state.payment_percent[1] + '%'
    }

    const payment_percent_three = {
      width: this.state.payment_percent[2] + '%'
    }

    return (
      <div className={s.root}>
        <h1 className="page-title">
          Dashboard &nbsp;
          <small>
            <small>KNU</small>
          </small>
        </h1>

        <Row>
          { /* VISIT TODAY - animated x */}
          <Col xl={3} md={6}>
            <Widget title={<h6> Visits Today </h6>} close settings>
              <div class="pb-xlg h-100">
                <section class="widget mb-0 h-100">
                  <header>
                    <div class="widget-controls">
                      <a data-widgster="close" title="Close" href="#"><i
                        class="la la-remove text-white"></i></a>
                    </div>
                  </header>
                  <div class="widget-body">
                    <div class="d-flex justify-content-between align-items-center mb-lg">
                      <h2>{this.state.visitToday[0]}</h2>
                      <i class="la la-2x la-arrow-left text-danger rotate-315"></i>
                    </div>
                    <div class="d-flex flex-wrap justify-content-between">
                      <div class="mt visit-element">
                        <h6>{this.state.visitToday[1]}</h6>
                        <p class="text-muted mb-0"><small>Yesterday</small></p>
                      </div>
                      <div class="mt visit-element">
                        <h6>{this.state.visitToday[3]}</h6>
                        <p class="text-muted mb-0"><small>This Month</small></p>
                      </div>
                      <div class="mt visit-element">
                        <h6>{this.state.visitToday[2]}%</h6>
                        <p class="text-muted mb-0"><small>Rate</small></p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </Widget>
          </Col>

          {/* 최근 세달 결제 금액 */}
          <Col xl={3} md={6}>
            <Widget title={<h6> Recent Payments </h6>} close settings>
              <div class="pb-xlg h-100">
                <section class="widget mb-0 h-100">
                  <header>
                    <div class="widget-controls">
                      <a data-widgster="close" title="Close" href="#"><i
                        class="la la-remove text-white"></i></a>
                    </div>
                  </header>
                  <div class="widget-body">
                    <h6 class="fs-sm">This Month ({this.state.payments[0]}₩)</h6>
                    <div class="progress progress-s mb-s ">
                      <div class="progress-bar bg-warning" role="progressbar" style={payment_percent_one}
                        aria-valuenow={this.state.payments[0]} aria-valuemin="0" aria-valuemax={this.state.payments[3]}></div>
                    </div>
                    <h6>Last Month ({this.state.payments[1]}₩)</h6>
                    <div class="progress progress-s ">
                      <div class="progress-bar bg-warning" role="progressbar" style={payment_percent_two}
                        aria-valuenow={this.state.payments[1]} aria-valuemin="0" aria-valuemax={this.state.payments[3]}></div>
                    </div>
                    <h6 class="mt-sm fs-sm">Two Months Ago ({this.state.payments[2]}₩)</h6>
                    <div class="progress progress-s mb-s ">
                      <div class="progress-bar bg-warning" role="progressbar" style={payment_percent_three}
                        aria-valuenow={this.state.payments[2]} aria-valuemin="0" aria-valuemax={this.state.payments[3]}></div>
                    </div>
                  </div>
                </section>
              </div>
            </Widget>
          </Col>

          { /* member rate */}
          <Col xl={3} md={6}>
            <Widget
              title={
                <h5>
                  비회원 정회원 <span className="fw-semi-bold">비율</span>
                </h5>
              }
              close
              collapse
            >
              <ReactEchartsCore
                echarts={echarts}
                // option={cd.echarts.donut}
                option={donut}
                opts={initEchartsOptions}
                style={{ height: "170px" }}
              />
            </Widget>
          </Col>

          { /* 실시간 검색어 */}
          <Col xl={3} md={6}>
            <Widget
              title={
                <h5>
                  {" "}
                  실시간
                  <span className="fw-semi-bold">&nbsp;인기 검색어</span>
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
                &nbsp; 146 Countries, 2759 Cities
              </p>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">{this.state.keyword_ranking[0]}</h6>
                  <Progress
                    color="primary"
                    value={this.state.keyword_ranking[1]}
                    className="bg-subtle-blue progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={this.state.keyword_ranking[1]} />%
                    </small>
                  </span>
                </div>
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">{this.state.keyword_ranking[2]}</h6>
                  <Progress
                    color="danger"
                    value={this.state.keyword_ranking[3]}
                    className="bg-subtle-blue progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={this.state.keyword_ranking[3]} />%
                    </small>
                  </span>
                </div>
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">{this.state.keyword_ranking[4]}</h6>
                  <Progress
                    color="success"
                    value={this.state.keyword_ranking[5]}
                    className="bg-subtle-blue progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={this.state.keyword_ranking[5]} />%
                    </small>
                  </span>
                </div>
              </div>
            </Widget>
          </Col>
        </Row>

        {/* 월 별 방문자 수 */}
        <Row>
          <Col lg={12} xs={12}>
            <Widget
              title={
                <h5>
                  월 별{" "}
                  <span className="fw-semi-bold">방문자 수</span>
                </h5>
              }
              close
              collapse
            >
              <ApexChart
                className="sparkline-chart"
                type={"area"}
                height={350}
                // series={cd.apex.flow.series}
                series={flow.series}
                options={cd.apex.flow.options}
              />
            </Widget>
          </Col>
        </Row>

        {/* 조회수 높은 게시글 */}
        <Row>
          <Col lg={12} md={12} sm={12}>
            <Widget
              title={
                <h5>
                  조회수 높은 <span className="fw-semi-bold">인기 게시글</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <div className={s.overFlow}>
                <Table lg={12} md={12} sm={12} striped>
                  <thead>
                    <tr className="fs-sm">
                      <th className="hidden-sm-down">#</th>
                      <th>Title</th>
                      <th>Description</th>
                      {/* <th className="hidden-sm-down">Info</th> */}
                      <th className="hidden-sm-down">Date</th>
                      <th className="hidden-sm-down">Recommendation</th>
                      <th className="hidden-sm-down">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableStyles.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>
                          {/* <img
                            className="img-rounded"
                            src={row.picture}
                            alt=""
                            height="50"
                          /> */}
                          <p>{row.title}</p>

                        </td>
                        <td>
                          {row.description}
                          {row.label && (
                            <div>
                              <Badge color={row.label.colorClass}>
                                {row.label.text}
                              </Badge>
                            </div>
                          )}
                        </td>
                        <td>
                          <p className="mb-0">
                            {row.date}
                          </p>
                          {/* <p className="mb-0">
                            <small>
                              Type:
                              <span className="text-muted fw-semi-bold">
                                &nbsp; {row.info.type}
                              </span>
                            </small>
                          </p>
                          <p>
                            <small>
                              Dimensions:
                              <span className="text-muted fw-semi-bold">
                                &nbsp; {row.info.dimensions}
                              </span>
                            </small>
                          </p> */}
                        </td>
                        {/* <td className="text-muted">{this.parseDate(row.date)}</td> */}
                        {/* <td className="text-muted">{row.size}</td> */}
                        <td className="text-muted">{row.recommendation}</td>
                        <td className="width-150">
                          <Progress
                            color={row.progress.colorClass}
                            value={row.progress.percent}
                            className="progress-sm mb-xs"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="clearfix">
                <div className="float-right">
                  <Button color="default" className="mr-2" size="sm">
                    Send to...
                  </Button>
                  <UncontrolledButtonDropdown>
                    <DropdownToggle
                      color="inverse"
                      className="mr-xs"
                      size="sm"
                      caret
                    >
                      Clear
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Clear</DropdownItem>
                      <DropdownItem>Move ...</DropdownItem>
                      <DropdownItem>Something else here</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Separated link</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledButtonDropdown>
                </div>
                <p>Basic table with styled content</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
