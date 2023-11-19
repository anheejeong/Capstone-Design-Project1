import React from "react";
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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
                      <h2>4,332</h2>
                      <i class="la la-2x la-arrow-right text-success rotate-315"></i>
                    </div>
                    <div class="d-flex flex-wrap justify-content-between">
                      <div class="mt visit-element">
                        <h6>+830</h6>
                        <p class="text-muted mb-0"><small>Logins</small></p>
                      </div>
                      <div class="mt visit-element">
                        <h6>0.5%</h6>
                        <p class="text-muted mb-0"><small>Sign Out</small></p>
                      </div>
                      <div class="mt visit-element">
                        <h6>4.5%</h6>
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
            <Widget title={<h6> 최근 세달 결제 금액 </h6>} close settings>
              <div class="pb-xlg h-100">
                <section class="widget mb-0 h-100">
                  <header>
                    <div class="widget-controls">
                      <a data-widgster="close" title="Close" href="#"><i
                        class="la la-remove text-white"></i></a>
                    </div>
                  </header>
                  <div class="widget-body">
                    <p class="d-flex flex-wrap">
                      <small class="mr-lg d-flex align-items-center" data-toggle="tooltip"
                        data-placement="top" title="Year 2019">
                        <span class="circle bg-success text-danger mr-xs" style={{ 'font-size': '4px' }}>.</span>
                        This Period
                      </small>
                      <small class="mr-lg d-flex align-items-center" data-toggle="tooltip"
                        data-placement="top" title="Year 2019">
                        <span class="circle bg-primary text-primary mr-xs" style={{ 'font-size': '4px' }}>.</span>
                        Last Period
                      </small>
                    </p>
                    <h6 class="fs-sm">SDK</h6>
                    <div class="progress progress-xs mb-xs ">
                      <div class="progress-bar bg-success" role="progressbar" style={{ 'width': '60%' }}
                        aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="progress progress-xs ">
                      <div class="progress-bar bg-primary" role="progressbar" style={{ 'width': '30%' }}
                        aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <h6 class="mt-sm fs-sm">Integration</h6>
                    <div class="progress progress-xs mb-xs ">
                      <div class="progress-bar bg-success" role="progressbar" style={{ 'width': '40%' }}
                        aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="progress progress-xs ">
                      <div class="progress-bar bg-primary" role="progressbar" style={{ 'width': '55%' }}
                        aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                  </div>
                </section>
              </div>
            </Widget>
          </Col>

          { /* member rate */}
          <Col lg={3} xs={6}>
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
                option={cd.echarts.donut}
                opts={initEchartsOptions}
                style={{ height: "170px" }}
              />
            </Widget>
          </Col>

          { /* 실시간 검색어 */}
          <Col lg={3}>
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
                  {/* <h6 className="name fw-semi-bold">정회원</h6> */}
                  <p className="description deemphasize mb-xs text-white">
                    검색어1
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
                  {/* <h6 className="name fw-semi-bold">정회원</h6> */}
                  <p className="description deemphasize mb-xs text-white">
                    검색어2
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
                  {/* <h6 className="name fw-semi-bold">비회원</h6> */}
                  <p className="description deemphasize mb-xs text-white">
                    검색어3
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
                series={cd.apex.flow.series}
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
                      <th>Picture</th>
                      <th>Description</th>
                      <th className="hidden-sm-down">Info</th>
                      <th className="hidden-sm-down">Date</th>
                      <th className="hidden-sm-down">Size</th>
                      <th className="hidden-sm-down">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.tableStyles.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>
                          <img
                            className="img-rounded"
                            src={row.picture}
                            alt=""
                            height="50"
                          />
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
                          </p>
                        </td>
                        <td className="text-muted">{this.parseDate(row.date)}</td>
                        <td className="text-muted">{row.size}</td>
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
