import React, { useState } from "react";
import { Button, Statistic } from "antd";
import { field } from "../const";
import { useTimeCountDown } from "../util";

export default ({ deadline, reset }) => {
  const [speed, setSpeed] = useState(1);
  const {
    value,
    state,
    minus,
    puls,
    onStart,
    onStop,
    clear,
    reset: reCounting,
    ...fields
  } = useTimeCountDown(deadline, 1000, speed);
  return (
    <div className="countDown">
      <div className="timeLeft">
        {Object.keys(field).map((key, i) => {
          return (
            <Statistic
              className="field"
              key={i}
              value={fields[key].toString().padStart(2, "0")}
              suffix={field[key].text}
            />
          );
        })}
      </div>
      <div className="control">
        <Button
          type="primary"
          disabled={speed === 4}
          onClick={() => {
            setSpeed((preSpeed) => (preSpeed * 2 > 4 ? 4 : preSpeed * 2));
          }}
        >
          減速
        </Button>
        <Button
          type="primary"
          onClick={() => {
            minus(5000);
          }}
        >
          -5秒
        </Button>
        {state ? (
          <>
            <Button type="primary" onClick={onStop}>
              暫停
            </Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={onStart}>
              繼續
            </Button>
            <Button type="primary" onClick={reCounting}>
              重置
            </Button>
          </>
        )}
        <Button
          type="primary"
          onClick={() => {
            puls(5000);
          }}
        >
          +5秒
        </Button>
        <Button
          type="primary"
          disabled={speed === 0.25}
          onClick={() => {
            setSpeed((preSpeed) => (preSpeed / 2 < 0.25 ? 0.25 : preSpeed / 2));
          }}
        >
          加速
        </Button>
        <Button type="primary" onClick={clear}>
          清除
        </Button>
        <Button
          type="primary"
          onClick={() => {
            clear();
            reset();
          }}
        >
          重設
        </Button>
      </div>
    </div>
  );
};
