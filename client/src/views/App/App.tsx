import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { About } from '../../components/About';
import { Home } from '../../components/Home';
import { NavBar } from '../../components/NavBar';
import NotFound from '../../components/NotFound';
import FancyComponent from '../../components/FancyComponent/FancyComponent';

export const App: FC = () => {
  return (
    <div>
      <header>
        <BrowserRouter>
          <FancyComponent/>

          <NavBar />
          
          <Switch>
            <Route exact path='/about' component={ About } />
            <Route exact path='/' component={ Home } />
            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}


export default App;