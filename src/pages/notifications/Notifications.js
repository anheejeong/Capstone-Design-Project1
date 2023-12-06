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

import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";

import $ from "jquery";

import ReactWordcloud from 'react-wordcloud';

exporting(Highcharts);
exportData(Highcharts);

// var ROOT_PATH = 'https://echarts.apache.org/examples';

// var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom, 'dark');
// var option;

class Notifications extends React.Component {
  state = {
    cd: chartData,
    initEchartsOptions: {
      renderer: "canvas",
    },
  };

  // componentDidMount() {
  //   $.getJSON(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph) {
  //     myChart.hideLoading();
  //     option = {
  //       tooltip: {},
  //       legend: [
  //         {
  //           data: graph.categories.map(function (a) {
  //             return a.name;
  //           })
  //         }
  //       ],
  //       series: [
  //         {
  //           name: 'Les Miserables',
  //           type: 'graph',
  //           layout: 'none',
  //           data: graph.nodes,
  //           links: graph.links,
  //           categories: graph.categories,
  //           roam: true,
  //           label: {
  //             show: true,
  //             position: 'right',
  //             formatter: '{b}'
  //           },
  //           labelLayout: {
  //             hideOverlap: true
  //           },
  //           scaleLimit: {
  //             min: 0.4,
  //             max: 2
  //           },
  //           lineStyle: {
  //             color: 'source',
  //             curveness: 0.3
  //           }
  //         }
  //       ]
  //     };
  //   }
  //   )
  // }

  render() {
    const { initEchartsOptions } = this.state;

    console.log(this.state.cd.echarts.nodes)
    console.log(this.state.cd.echarts.categories)

    const words = [
      {
        text: 'told',
        value: 120,
      },
      {
        text: 'mistake',
        value: 110,
      },
      {
        text: 'thought',
        value: 160,
      },
      {
        text: 'bad',
        value: 170,
      },
    ]
    const callbacks = {
      getWordColor: word => word.value > 50 ? "white" : "red",
      onWordClick: console.log,
      onWordMouseOver: console.log,
      getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 50 ? "good" : "bad"}]`,
    }
    const options = {
      rotations: 2,
      rotationAngles: [-90, 0],
    };
    // const size = [600, 400];

    const clustering = {
      tooltip: {},
      legend: [
        {
          data: this.state.cd.echarts.categories.map(function (a) {
            return a.name;
          }),
          textStyle: {
            color: '#fff',
          },
        },
      ],
      series: [
        {
          name: 'Les Miserables',
          type: 'graph',
          layout: 'none',
          data: this.state.cd.echarts.nodes,
          links: this.state.cd.echarts.links,
          categories: this.state.cd.echarts.categories,
          roam: true,
          label: {
            show: true,
            position: 'right',
            formatter: '{b}',
            color: '#fff',
          },
          labelLayout: {
            hideOverlap: true,
            color: '#fff',
          },
          scaleLimit: {
            min: 0.4,
            max: 2
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          }
        }
      ]
    };

    console.log(clustering)

    return (
      <div className={s.root} >
        <h1 className="page-title">
          Analysis - <span className="fw-semi-bold">NLP</span>
        </h1>
        <Row>
          <Col lg={12} xs={12}>
            <Widget
              title={
                <h5>Clustering</h5>
              }
              close
              collapse
            >
              {/* <ReactEchartsCore
                echarts={echarts}
                // option={cd.echarts.scatter}
                option={scatter}
                opts={initEchartsOptions}
                style={{ height: 350 }}
              /> */}
              {/* clustering - echarts : les-miserables */}
              <ReactEchartsCore
                echarts={echarts}
                option={clustering}
                opts={initEchartsOptions}
                style={{ height: 700 }}
              />
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col lg={6} xs={12}>
            <Widget
              title={
                <h5>정회원 WordCloud</h5>
              }
              close
              collapse
            >
              <ReactWordcloud
                callbacks={callbacks}
                options={options}
                // size={size}
                words={words}
              />
            </Widget>
          </Col>
          <Col lg={6} xs={12}>
            <Widget
              title={
                <h5>비회원 WordCloud</h5>
              }
              close
              collapse
            >
              <ReactWordcloud
                callbacks={callbacks}
                options={options}
                // size={size}
                words={words}
              />
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Notifications;
