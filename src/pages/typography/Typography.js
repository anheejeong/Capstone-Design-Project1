import React from "react";
import { Row, Col } from "reactstrap";

import Widget from "../../components/Widget";

import s from './Typography.module.scss';

import { chartData } from './mock';
import ReactEchartsCore from "echarts-for-react/lib/core";
import echarts from "echarts/lib/echarts";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportData from "highcharts/modules/export-data";

exporting(Highcharts);
exportData(Highcharts);

// const Typography = () => (
//   <div>
//     <h1 className="page-title">
//       KNU <span className="fw-semi-bold">Users</span>
//     </h1>
//     <Row>
//       <Col lg={3} xs={6}>
//         <Widget
//           title={
//             <h5>
//               비회원 정회원 <span className="fw-semi-bold">비율</span>
//             </h5>
//           }
//           close
//           collapse
//         >
//           <ReactEchartsCore
//             echarts={echarts}
//             option={chartData.echarts.scatter}
//             // opts={initEchartsOptions}
//             style={{ height: "170px" }}
//           />
//         </Widget>
//       </Col>
//     </Row>
//   </div>
// );


class Typography extends React.Component {
  state = {
    cd: chartData,
    initEchartsOptions: {
      renderer: "canvas",
    }
  }

  render() {
    const { cd, initEchartsOptions } = this.state
    return (
      <div className={s.root}>
        <div>
          {/* <Row>
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
        </div>
      </div>
    )
  }
}

export default Typography;
