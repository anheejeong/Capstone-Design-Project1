import React from "react";
import { Row, Col, Button } from "reactstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uuid from "uuid/v4";
import Widget from "../../components/Widget/Widget";
import s from "./NLP.module.scss";

import { chartData } from "./mock";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";

import $ from "jquery";

import ReactWordcloud from 'react-wordcloud';

import Fade from "react-reveal/Fade";
import Slide from 'react-reveal/Slide';

import axios from "axios";

exporting(Highcharts);
exportData(Highcharts);

// var ROOT_PATH = 'https://echarts.apache.org/examples';

// var chartDom = document.getElementById('main');
// var myChart = echarts.init(chartDom, 'dark');
// var option;

class NLP extends React.Component {
  state = {
    cd: chartData,
    initEchartsOptions: {
      renderer: "canvas",
    },
    clustering: [],
    regular: [],
    non_regular: [],
  };

  loadItem = async () => {
    axios
      .get("./nlp")
      .then(({ data }) => {
        this.setState({
          clustering: data.clustering,
          regular: data.regular,
          non_regular: data.non_regular
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

    // console.log(this.state.clustering)
    let clustering_list = []
    for (let i = 0; i < 70; i++) {
      if (this.state.clustering[i]) {
        clustering_list.push({
          "id": this.state.clustering[i][0],
          "name": this.state.clustering[i][1],
          "symbolSize": this.state.clustering[i][2],
          "x": this.state.clustering[i][3],
          "y": this.state.clustering[i][4],
          "value": this.state.clustering[i][5],
          "category": this.state.clustering[i][6]
        })
      }
    }

    let regular = [];
    let non_regular = [];

    for (let i = 0; i < 50; i++) {
      if (this.state.regular[i]) {
        regular.push({
          text: this.state.regular[i][0],
          value: this.state.regular[i][1]
        })
        if (this.state.non_regular[i]) {
          non_regular.push({
            text: this.state.non_regular[i][0],
            value: this.state.non_regular[i][1]
          })
        }
      }
    }

    console.log(regular)
    console.log(non_regular)

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
      getWordColor: word => word.value < 3 ? "white" : "yellow",
      onWordClick: console.log,
      onWordMouseOver: console.log,
      getWordTooltip: word => `${word.text} (${word.value}) [${word.value > 3 ? "good" : "bad"}]`,
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
          name: 'NLP',
          type: 'graph',
          layout: 'none',
          // data: this.state.cd.echarts.nodes,
          data: clustering_list,
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
            <Fade clear>
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
            </Fade>
          </Col>
        </Row>
        <Row>
          <Col lg={6} xs={12}>
            <Slide bottom>
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
                  words={regular}
                />
              </Widget>
            </Slide>
          </Col>
          <Col lg={6} xs={12}>
            <Slide bottom>
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
                  words={non_regular}
                />
              </Widget>
            </Slide>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NLP;
