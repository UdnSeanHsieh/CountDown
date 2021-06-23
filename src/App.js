import React, { useState } from "react";
import { Form, message, Select, Row, Col, Tooltip, Input, Button } from "antd";
import CountDown from "./component/CountDown";
import "antd/dist/antd.css";
import "./styles.css";
import { field } from "./const";

export default function App() {
  const initValue = () => {
    let obj = {};
    Object.keys(field).forEach((key) => {
      obj[key] = {
        value: 0,
        suffix: field[key].text,
      };
    });
    return obj;
  };
  const [deadline, setDeadline] = useState(0);
  const [values, setValues] = useState(() => initValue());
  const [second, setSecond] = useState(0);
  const [mode, setMode] = useState("sec");
  const [counting, setCounting] = useState(false);

  const valuesHandle = (e) => {
    const { value, name } = e.target;
    const reg = /^\d+$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      let nValue = value === "" ? 0 : parseInt(value, 10);
      setValues((preV) => {
        return {
          ...preV,
          [name]: {
            ...preV[name],
            value: nValue > 99 ? 99 : nValue,
          },
        };
      });
    }
  };

  const secondHandle = (e) => {
    const { value } = e.target;
    const reg = /^\d+$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      setSecond(() => {
        if (parseInt(value, 10) > 1555200000) return 1555200000;
        else return value === "" ? 0 : parseInt(value, 10);
      });
    }
  };

  const StartCount = (e) => {
    e.preventDefault();
    let sec = 0;
    switch (mode) {
      case "sec":
        sec = second * 1000;
        break;
      case "all":
        Object.keys(values).forEach((key) => {
          sec = sec + field[key].unit * values[key].value;
        });
        break;
    }
    if (sec === 0) {
      message.error(mode === "sec" ? "請輸入大於0的數字" : "至少輸入一個數字");
      return;
    }
    console.log(sec);
    setDeadline(sec);
    setCounting(true);
    setSecond(0);
    setValues(initValue());
  };

  return (
    <div className='wrap'>
      {counting ? (
        <CountDown
          deadline={deadline}
          reset={() => {
            setCounting(false);
          }}
        />
      ) : (
        <Form className='form' onSubmit={StartCount}>
          <Form.Item>
            <Select value={mode} style={{ width: 120 }} onChange={setMode}>
              <Select.Option value='sec'>秒數</Select.Option>
              <Select.Option value='all'>時分秒</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            {mode === "sec" && (
              <Tooltip placement='top' title='請輸入秒數'>
                <Input
                  className='valueInput'
                  value={second}
                  suffix='秒'
                  onChange={secondHandle}
                  size='large'
                />
              </Tooltip>
            )}
            {mode === "all" && (
              <Row className='valuesRow'>
                {Object.keys(values).map((key, i) => {
                  return (
                    <Col key={i} span={4}>
                      <Input
                        className='valuesInput'
                        name={key}
                        value={values[key].value}
                        suffix={values[key].suffix}
                        onChange={valuesHandle}
                        size='large'
                      />
                    </Col>
                  );
                })}
              </Row>
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large'>
              開始
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
