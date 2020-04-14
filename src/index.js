import React from "react";
import { render } from "react-dom";
import "./style.css";
import ClickBurst from "./ClickBurst";

const App = () => (
  <div>
    <ClickBurst>
      <button>Do-nothing Button</button>
      <button onClick={() => console.log(`Ahoy!`)}>console.log</button>
    </ClickBurst>

    <ClickBurst>
      {/* eslint-disable jsx-a11y/anchor-is-valid */}
      <a href="#">Link</a>
    </ClickBurst>
  </div>
);

render(<App />, document.getElementById("root"));
