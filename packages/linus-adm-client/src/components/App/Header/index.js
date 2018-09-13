import React from 'react';
import "./style.scss";
import logo from './logo.svg';
import {Menu, Container, Image, Button, Icon} from 'semantic-ui-react';

export default class Header extends React.Component{

  render () {
    const {onToggleMenu, sidebarVisible} = this.props;
    return (
      <Menu fixed='top' inverted>
        {!sidebarVisible?
          <Button className='sidebar-button' color='black' size='small'
                  onClick={onToggleMenu}>
            <Button.Content visible>
              <Icon name='sidebar' />
            </Button.Content>
          </Button>
        :
          <Button className='sidebar-button' color='black' size='small'
                  onClick={onToggleMenu}>
            <Button.Content visible>
              <Icon name='close' />
            </Button.Content>
          </Button>}

        <Container>
          <Menu.Item as='a' header>
            <Image
              size='mini'
              src={logo}
              style={{ marginRight: '1.5em' }}
            />
            Linus Adm
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
};
