import React, {Component} from 'react';
import {Route,  Switch, Redirect} from 'react-router-dom';
import './style.css';
import Sidebar from './Sidebar';
import Header from './Header';

import NotFound from '../../containers/NotFound';
import BotList from '../../containers/BotList';
import Diagram from '../../containers/Diagram';
import ProjectList from '../../containers/Projects';

class App extends Component {

  constructor() {
    super();
    this.state = {sidebarVisible: false};
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    this.setState({sidebarVisible: !this.state.sidebarVisible});
  }

  render() {
    const {sidebarVisible} = this.state;
    return (
      <div className="App" id="app-outer-container">
        <Header onToggleMenu={this.toggleMenu} sidebarVisible={sidebarVisible}/>
        <Sidebar visible={sidebarVisible}>
          <div className="app-content-container">
              <Switch>
                <Route exact path="/bots" component={BotList}/>
                <Route exact path="/diagram/:botId" component={Diagram}/>
                <Route exact path="/projects" component={ProjectList}/>
                <Redirect exact from="/" to="/bots"/>
                <Route component={NotFound}/>
              </Switch>
          </div>
        </Sidebar>
      </div>
    );
  }

  renderNew() {
    // import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'
  }

}

export default App;
