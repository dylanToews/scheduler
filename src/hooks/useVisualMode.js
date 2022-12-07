import { useState } from "react";


export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  function transition(value, replace = false) {
    if (!replace) {
      history.push(mode);
      setMode(value);
    }
    if (replace) {
      history.splice(-1, 1, value);
      setMode(history.pop());
    }
  }

  function back() {
    if (history.length === 0) {
      return;
    }
    return setMode(history.pop());
  }
  
  return { mode, transition, back };
}
