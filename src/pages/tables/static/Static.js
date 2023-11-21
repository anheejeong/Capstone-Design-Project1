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
  }

  render() {
    const { cd, initEchartsOptions } = this.state
    return (
      <div className={s.root}>
        <h2 className="page-title">
          Analysis - <span className="fw-semi-bold">Payments</span>
        </h2>
        <Row>
          <Col lg={7}>
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
                option={cd.echarts.line}
                opts={initEchartsOptions}
                style={{ height: "365px" }}
              />
            </Widget>
          </Col>
          <Col lg={5}>
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
                style={{ height: "365px" }}
              />
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Static;
