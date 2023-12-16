import React from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Badge,
} from 'reactstrap';
import classnames from 'classnames';

import s from './Documents.module.scss';

import Fade from "react-reveal/Fade";

import Widget from "../../../components/Widget/Widget";

class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <section className={`${s.root} mb-4`}>
        <h1 className="page-title">회사 <span className="fw-semi-bold">기술문서</span></h1>

        {/* tabs */}
        <Fade clear>
          <Nav className="bg-transparent" tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              //style={{marginBottom: "-1px !important"}}
              >
                <span>Data Analysis&nbsp;</span>
                <Badge color="danger" style={{ padding: "3px 8px" }}>Important</Badge>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                <span className="mr-xs">Front</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                <span className="mr-xs">Back</span>
              </NavLink>
            </NavItem>
          </Nav>

          {/* tab content */}

          <TabContent activeTab={this.state.activeTab}>

            {/* tab #3 */}
            <TabPane tabId="1">
              <div>
                <h4>Data Analysis <span className="fw-semi-bold">Technical Documentation</span></h4>
                <Row className="icon-list">
                  <Col>
                    <p>
                      - 사용 라이브러리
                      &nbsp;&nbsp;&nbsp;- 'pandas' : 데이터프레임을 생성하는 라이브러리입니다. <br />
                      &nbsp;&nbsp;&nbsp;- 'numpy' : 행열/배열 처리 및 연산을 담당하는 라이브러리입니다.<br />
                      &nbsp;&nbsp;&nbsp;- 'pymysql' : MySQL 내의 데이터를 python 코드상으로 호출해 주는 라이브러리입니다.<br />
                      &nbsp;&nbsp;&nbsp;- 'sqlalchemy' : python에서 생성한 데이터를 MySQL로 전송하는 라이브러리입니다.<br /><br />
                      1. MySQL로부터 데이터 호출 <br />
                      <Widget>
                        <p>
                          def sql_dataframe(database: str, query: str, columns_list: list): <br />
                          &nbsp;&nbsp;&nbsp;conn = pms.connect(<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;host='180.66.240.165',<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;port=53306,<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user='root',<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password='U6ycE],+',<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;db=database,<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;charset='utf8mb4'<br />
                          &nbsp;&nbsp;&nbsp;)<br />
                          &nbsp;&nbsp;&nbsp;try:<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;with conn.cursor() as cur:<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cur.execute('select * from ' + query)<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = pd.DataFrame(cur.fetchall(), columns=columns_list)<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cur.close()<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return result<br />
                          &nbsp;&nbsp;&nbsp;finally:<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;conn.close()<br />

                        </p>
                      </Widget>
                      &nbsp;&nbsp;&nbsp;- 코드 설명 <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 데이터베이스의 명칭과 쿼리문을 문자열로, 해당 데이터베이스를 구성하는 열을 리스트로 하는 파라미터를 부여받습니다. <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ip주소와 port번호, user명, 서버 비밀번호, 데이터베이스 명, 문자 인코딩을 통하여 MySQL 서버로 접속합니다. <br /><br /><br />

                      Full Tech Documents : <a href="https://sharp-individual-1ab.notion.site/ce53e7d6ca804e86a85d55f5cc8b234d?pvs=4">TECHDOCUMENTS</a>
                    </p>
                  </Col>
                </Row>
              </div>
            </TabPane>

            <TabPane tabId="2">
              <div>
                <h4>Frontend <span className="fw-semi-bold">Technical Documentation</span></h4>
                <Row className="icon-list">
                  <Col>
                    <p>i. 프로젝트 component 설명<br /><br />

                      - 언어 : JavaScript<br />
                      - 라이브러리 : React.js<br />
                      - 템플릿 : https://github.com/flatlogic/light-blue-react-template<br />
                      - Color<br />
                      &nbsp;&nbsp;&nbsp;- background : #1e2045<br />
                      &nbsp;&nbsp;&nbsp;- widget : #171933<br />
                      &nbsp;&nbsp;&nbsp;- dashboard graph : #cf1228, #dc8204, #2a8313, #1c5cfe, #a83150, #a94542, #f1f1f3<br />
                      &nbsp;&nbsp;&nbsp;- users graph : #a1232b, #243346, #4b838f, #b26455, #74a892, #5b806d, #a76a24, #273a4a, #ca2528<br />
                      &nbsp;&nbsp;&nbsp;- payments graph : #1d5dff, #377627, #82c568, #fd9042<br />
                      &nbsp;&nbsp;&nbsp;- nlp graph : #ca2528, #273a4a, #5aa2aa, #e17b5c, #ffff09<br />
                      &nbsp;&nbsp;&nbsp;- developer page : #dc8204, #cf1228, #393f45 <br /><br />
                      - Project Components<br />
                      &nbsp;&nbsp;&nbsp;1. Chart Features<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Echart Charts<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Highchart Charts<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Apex Charts<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- React-wordcloud<br />
                      &nbsp;&nbsp;&nbsp;2. Pages<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Dashboard : 대시보드 홈<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Users : 회원 분석 페이지<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Payments : 결제 분석 페이지<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- NLP : 자연어 처리 페이지<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Information<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Developer : 팀원 소개<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Documents : 기술 문서<br />
                      &nbsp;&nbsp;&nbsp;3. Else<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Header<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Loader<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Notifications<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Sidebar<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- pages<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- error<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- login<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- register<br />
                      <br />
                      <br />
                      Full Tech Documents : <a href="https://sharp-individual-1ab.notion.site/ce53e7d6ca804e86a85d55f5cc8b234d?pvs=4">TECHDOCUMENTS</a>
                    </p>
                  </Col>
                </Row>
              </div>
            </TabPane>

            {/* tab #2 */}
            <TabPane tabId="3">
              <div>
                <h4>Backend <span className="fw-semi-bold">Technical Documentation</span></h4>
                <Row className="icon-list">
                  <Col>
                    <p>
                      i. Tech Stack <br /><br />

                      - python<br />
                      &nbsp;&nbsp;&nbsp;- 쉽고 빠른 개발을 위해 python을 사용합니다.<br />
                      - flask<br />
                      &nbsp;&nbsp;&nbsp;- 이 프로젝트는 사용자가 관리자 1명인 프로젝트로 무게가 상대적으로 가볍습니다. 따라서 간결하고 확장성이 좋은 파이썬 웹 프레임워크가 적절합니다. flask는 마이크로 웹 프레임워크로, django와 달리 form이나 database를 처리하는 기능이 없습니다. 개발자가 필요한 확장 모듈을 포함해 가며 개발하면 됩니다. 또한 자유도가 높아 새로운 대시보드 구성을 만들 때 유리합니다.<br />
                      - mysql<br />
                      &nbsp;&nbsp;&nbsp;- 데이터베이스 관리 도구로 mysql을 사용합니다.<br /><br /><br />

                      ii. 예제 코드<br /><br />

                      - __init__.py<br />
                      &nbsp;&nbsp;&nbsp;- 해당 디렉토리가 패키지로 인식되도록 하면서, 초기화하는 역할<br />

                      <Widget>
                        <p>
                          from flask import Flask <br /><br /><br />


                          def create_app(): <br />
                          app = Flask(__name__) <br /><br />

                          from .views import main_views <br />
                          app.register_blueprint(main_views.bp) <br /><br />

                          return app
                        </p>
                      </Widget>
                      <Widget>
                        <p>
                          def create_app()
                        </p>
                      </Widget>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- app = Flask(__name__)은 플라스크 애플리케이션을 생성하는 코드입니다. ‘__name__’ 변수 안에는 모듈명이 들어갑니다 <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 플라스크는 app 객체를 사용해서 여러 가지 설정을 진행합니다. 그런데 위 방식대로 app 객체를 전역으로 사용하면, 모듈이 서로 참조해서 반복되는 순환 참조 오류가 발생할 가능성이 높아집니다. 이를 방지하기 위한 방안으로 flask에서는 애플리케이션 팩토리를 제안하는데, 그것이 create_app()함수입니다. <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- ‘__init__.py’ 파일에는 @app.route(’/’)와 같이 URL 매핑하는 함수를 작성하는데, 새로운 URL 매핑이 필요할 때마다 라우팅 함수가 추가되면 create_app()함수가 크고 복잡해집니다. 그래서 Blueprint를 사용했습니다. <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- 이제 라우팅 함수가 추가되더라도 main_views.py 파일에 함수가 추가되기 때문에 create_app은 단순하게 유지할 수 있습니다. <br /><br /><br />

                      Full Tech Documents : <a href="https://sharp-individual-1ab.notion.site/ce53e7d6ca804e86a85d55f5cc8b234d?pvs=4">TECHDOCUMENTS</a>
                    </p>
                  </Col>
                </Row>
              </div>
            </TabPane>



          </TabContent>
        </Fade>
      </section>
    );
  }
}

export default Documents;
