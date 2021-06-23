import React, { useState } from "react";
import { Form, message, Row, Col, Tooltip, Input, Button } from "antd";
import CountDown from "./component/CountDown";
import "antd/dist/antd.css";
import "./styles.css";

export default function App() {
  const [deadline, setDeadline] = useState(0);
  const [value, setValue] = useState(0);
  const [counting, setCounting] = useState(false);

  const inputHandle = (e) => {
    const { value } = e.target;
    const reg = /^\d+$/;
    if ((!isNaN(value) && reg.test(value)) || value === "") {
      setValue(() => {
        if (parseInt(value, 10) > 1555200) return 1555200;
        else return value === "" ? 0 : parseInt(value, 10);
      });
    }
  };

  const StartCount = (e) => {
    e.preventDefault();
    if (value === 0) {
      message.error("請輸入大於0的數字");
      return;
    }
    setDeadline(value * 1000);
    setCounting(true);
    setValue(0);
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
        <Form onSubmit={StartCount}>
          <Form.Item>
            <Row className='valueRow'>
              <Tooltip placement='top' title='請輸入秒數'>
                <Input
                  className='valueInput'
                  value={value}
                  suffix='秒'
                  onChange={inputHandle}
                  size='large'
                />
              </Tooltip>
            </Row>
          </Form.Item>
          <Form.Item>
            <Row type='flex' justify='center'>
              <Col>
                <Button type='primary' htmlType='submit' size='large'>
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
