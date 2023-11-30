import React from "react";
import { Row, Col, Button } from "reactstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uuid from "uuid/v4";
import Widget from "../../components/Widget";
import s from "./Notifications.module.scss";

import { chartData } from "./mock";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

exporting(Highcharts);
exportData(Highcharts);

class Notifications extends React.Component {
  state = {
    cd: chartData,
  };

  render() {
    const { cd } = this.state
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Analysis - <span className="fw-semi-bold">NLP</span>
        </h1>
        <Row>
          <Col lg={6}>
            <Widget>
              {/* <HighchartsReact
                highcharts={Highcharts}
                options={cd.highcharts.wordcloud}
              /> */}
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Notifications;
