import React from 'react';
import './pageAnimation.css';
import KonvaTest from './KonvaTest';
import StartPage from './StartPage';
import EndPage from './EndPage';
import NoMatch from './NoMatch';
import {Route, Switch, useLocation} from "react-router-dom";
import {TransitionGroup ,CSSTransition } from "react-transition-group";



const RouteManager = () => {
  let location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition 
        key={location.key}
        classNames={"pageTransition"} 
        timeout={200}
      >
        <div className={"page"}>
          <Switch location={location}>
            <Route exact path="/" children={<StartPage />} />
            <Route path="/play" children={<KonvaTest/>} />
            <Route path="/p/:id" children={<EndPage />} />
            <Route path="/_p/:id" children={<EndPage />} />
            <Route children={<NoMatch />} />
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
};
export default RouteManager;