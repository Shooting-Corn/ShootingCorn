import React from "react";
import {HashRouter, Route} from "react-router-dom";
import Home from "./routes/Home";
import Home2 from "./routes/Home2"
import About from "./routes/About";
import Detail from "./routes/Detail";
import Navigation from "./components/Navigation";
import Timeline from "./routes/Timeline";


function App() {
  return (
  <HashRouter>
    <Navigation />
    <Route path="/" exact={true} component={Home} />
    <Route path="/about" component={About}/>
    <Route path="/home2" component={Home2}/>
    <Route path="/movie/:id" exact={true} component={Detail}/>
    <Route path="/movie/:id/timeline" component={Timeline}/>
  </HashRouter>
  );
}

export default App;