import React, { useState } from "react";
import { Form, message, Row, Col, Input, Button } from "antd";
import CountDown from "./component/CountDown";
import "antd/dist/antd.css";

import { field } from "./const";
import "./styles.less";

export default function App() {
  const initValue = () => {
    let obj = {};
    Object.keys(field).forEach((key) => {
      obj[key] = {
        value: 0,
        suffix: field[key].text
      };
    });
    return obj;
  };

  const [deadline, setDeadline] = useState(0);
  const [values, setValues] = useState(() => initValue());
  const [counting, setCounting] = useState(false);

  const inputHandle = (e) => {
    const { value, name } = e.target;
    const reg = /^\d+$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      let nValue = value === "" ? 0 : parseInt(value, 10);
      setValues((preV) => {
        return {
          ...preV,
          [name]: {
            ...preV[name],
            value: nValue > 99 ? 99 : nValue
          }
        };
      });
    }
  };

  const StartCount = (e) => {
    e.preventDefault();
    let sec = 0;
    Object.keys(values).forEach((key) => {
      sec = sec + field[key].unit * values[key].value;
    });
    if (sec === 0) {
      message.error("至少輸入一個數字");
      return;
    }
    setDeadline(sec);
    setCounting(true);
    setValues(initValue());
  };

  return (
    <div className="wrap">
      {counting ? (
        <CountDown
          deadline={deadline}
          reset={() => {
            setCounting(false);
          }}
        />
      ) : (
        <Form onSubmit={StartCount}>
          <Form.Item>
            <Row className="valueRow">
              {Object.keys(values).map((key, i) => {
                return (
                  <Col key={i} span={4}>
                    <Input
                      className="valueInput"
                      name={key}
                      value={values[key].value}
                      suffix={values[key].suffix}
                      onChange={inputHandle}
                      size="large"
                    />
                  </Col>
                );
              })}
            </Row>
          </Form.Item>
          <Form.Item>
            <Row type="flex" justify="center">
              <Col>
                <Button type="primary" htmlType="submit" size="large">
                  開始
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
