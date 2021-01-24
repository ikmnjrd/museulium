import React from 'react';
import './pageAnimation.css';
import DrawPage from './DrawPage';
import StartPage from './StartPage';
import EndPage from './EndPage';
import NoMatch from './NoMatch';
import {Route, Switch, useLocation} from "react-router-dom";
import {TransitionGroup ,CSSTransition } from "react-transition-group";
import Container from '@material-ui/core/Container';



const RouteManager = () => {
  let location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition 
        key={location.key}
        classNames={"pageTransition"} 
        timeout={300}
      >
        <Container className={"page"} maxWidth="sm" fixed style={{padding: 0, position: 'relative'}}>
          <Switch location={location}>
            <Route exact path="/" children={<StartPage />} />
            <Route path="/play" children={<DrawPage/>} />
            <Route path="/p/:id" children={<EndPage />} />
            <Route path="/_p/:id" children={<EndPage />} />
            <Route children={<NoMatch />} />
          </Switch>
        </Container>
      </CSSTransition>
    </TransitionGroup>
  )
};
export default RouteManager;