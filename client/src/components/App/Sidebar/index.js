import React from 'react';
import "./style.css";
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {Sidebar, Menu, Segment, Icon, Header, Image} from 'semantic-ui-react';


class AppSidebar extends React.Component{

  doNotNavigate (event) {
    event.preventDefault();
    alert("Should not change context!");
  }

  render (){
    const {visible, children, changePage} = this.props;
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation='scale down' width='thin' visible={visible} icon='labeled' vertical inverted>
          <Menu.Item name='home'>
            <Icon name='home' />
            <Link className="menu-item" to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item name='about'>
            <Link className="menu-item" to="/about">About</Link>
          </Menu.Item>
          <Menu.Item name='projects'>
            <Link className="menu-item" to="/about">About</Link>
          </Menu.Item>
          <Menu.Item name='notDefinedRoute'>
            <Link className="menu-item" to="/about">About</Link>
          </Menu.Item>
          <Menu.Item name='noNav'>
            <a onClick={ this.doNotNavigate } href="">No Navigation</a>
          </Menu.Item>
          <Menu.Item name='button'>
            <button onClick={()=> changePage('home')} className="menu-item--small">Home via redux</button>
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>

    )

  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (route) => push(`/${route}`)
}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(AppSidebar)
