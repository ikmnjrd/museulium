import React from 'react';
import './stylesheets/pageAnimation.css';
import DrawPage from './pages/DrawPage';
import StartPage from './pages/StartPage';
import EndPage from './pages/EndPage';
import NoMatch from './pages/NoMatch';
import {Route, Switch, useLocation} from "react-router-dom";
import {TransitionGroup ,CSSTransition } from "react-transition-group";
import Container from '@material-ui/core/Container';
import GridListOfPieces from './components/GridListOfPieces';



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
            <Route path="/list" children={<GridListOfPieces />} />
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