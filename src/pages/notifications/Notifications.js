import React from "react";
import { Row, Col, Button } from "reactstrap";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import uuid from "uuid/v4";
import Widget from "../../components/Widget";
import s from "./Notifications.module.scss";

class Notifications extends React.Component {
  state = {
    options: {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
    },
  };

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Analysis - <span className="fw-semi-bold">NLP</span>
        </h1>
      </div>
    );
  }
}

export default Notifications;
