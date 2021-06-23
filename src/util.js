import { useState, useEffect, useRef } from "react";
import { field } from "./const";

export const timeFormat = (totalSecond) => {
  let second = totalSecond;
  let year = Math.floor(second / field.year.unit);
  second = second - year * field.year.unit;
  let month = Math.floor(second / field.month.unit);
  second = second - month * field.month.unit;
  let day = Math.floor(second / field.day.unit);
  second = second - day * field.day.unit;
  let hour = Math.floor(second / field.hour.unit);
  second = second - hour * field.hour.unit;
  let minute = Math.floor(second / field.minute.unit);
  second = second - minute * field.minute.unit;
  second = Math.floor(second / field.second.unit);
  return { year, month, day, hour, minute, second };
};

export const useCountDown = (number, step = 1, speed = 1, timeUp) => {
  const timer = useRef();
  const [value, setValue] = useState(number);
  const [state, setState] = useState(true);
  useEffect(() => {
    setValue(number);
  }, [number]);
  useEffect(() => {
    if (value === 0) {
      setState(false);
      if (typeof timeUp === "function") timeUp();
    }
  }, [value]);
  useEffect(() => {
    if (value > 0 && state) {
      timer.current = setTimeout(() => {
        setValue((preV) => (preV - step < 0 ? 0 : preV - step));
      }, 1000 * speed);
    }
    return () => {
      clearTimeout(timer.current);
    };
  }, [state, value, step, speed]);

  return {
    value,
    state,
    minus: (v) => {
      setValue((preV) => (preV - v < 0 ? 0 : preV - v));
    },
    puls: (v) => {
      setValue((preV) => preV + v);
    },
    onStart: () => {
      setState(() => {
        if (value === 0) return false;
        return true;
      });
    },
    onStop: () => {
      setState(false);
    },
    clear: () => {
      setValue(0);
    },
    reset: () => {
      setValue(number);
    },
  };
};

export const useTimeCountDown = (deadline, step, speed, timeUp) => {
  const countDown = useCountDown(deadline, step, speed, timeUp);
  return {
    ...timeFormat(countDown.value),
    ...countDown,
  };
};
