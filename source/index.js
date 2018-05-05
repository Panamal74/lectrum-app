// Core
import React from "react";
import ReactDOM from "react-dom";

// Theme
import "./theme/init";

// App
import App from "./containers/App";

//const H1 = React.createElement('h1', { title: 'The title' }, 'Hello lectrum');

//const H1JSX = <h1 title = 'The title'>Hello JSX lectrum</h1>;

//ReactDOM.render(H1JSX, document.getElementById("app"));
ReactDOM.render(<App />, document.getElementById("app"));
