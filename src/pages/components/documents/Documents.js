import React from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Badge,
} from 'reactstrap';
import classnames from 'classnames';

import s from './Documents.module.scss';

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
        <Nav className="bg-transparent" tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            //style={{marginBottom: "-1px !important"}}
            >
              <span>Front</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <span className="mr-xs">Back</span>
              <Badge color="primary" style={{ padding: "3px 8px" }}>new</Badge>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              <span className="mr-xs">Data Analysis</span>
            </NavLink>
          </NavItem>
        </Nav>

        {/* tab content */}

        <TabContent activeTab={this.state.activeTab}>

          <TabPane tabId="1">
            <div>
              <h4>Frontend <span className="fw-semi-bold">Technical Documentation</span></h4>
              <Row className="icon-list">
                <Col>
                  <p>Frontend Technical Documentation Content</p>
                </Col>
              </Row>
            </div>
          </TabPane>

          {/* tab #2 */}
          <TabPane tabId="2">
            <div>
              <h4>Backend <span className="fw-semi-bold">Technical Documentation</span></h4>
              <Row className="icon-list">
                <Col>
                  <p>Backend Techincal Documentation Content</p>
                </Col>
              </Row>
            </div>
          </TabPane>

          {/* tab #3 */}
          <TabPane tabId="3">
            <div>
              <h4>Data Analysis <span className="fw-semi-bold">Technical Documentation</span></h4>
              <Row className="icon-list">
                <Col>
                  <p>Data Analysis Techincal Documentation Content</p>
                </Col>
              </Row>
            </div>
          </TabPane>

        </TabContent>
      </section>
    );
  }
}

export default Documents;
