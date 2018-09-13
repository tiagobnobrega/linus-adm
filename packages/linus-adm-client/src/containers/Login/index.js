import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, Form, Segment,Message,Header, Image, Button} from 'semantic-ui-react';
export default class Login extends Component{
  static propTypes = {
    onLogin: PropTypes.func.isRequired
  }
  constructor(){
    super();
    this.state ={password:undefined};
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handlePasswordChange(e){
    const {value} = e.target;
    this.setState({password:value});
  }
  handleLogin(){
    const {onLogin} = this.props;
    onLogin(this.state.password);
  }

  render(){
    const {errorMessage} = this.props;
    return(
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          {' '}Log-in to your account
        </Header>
        <Form size='large'>
          {errorMessage
          ?<Message
              attached
              header='Invalid Credentials!'
              content='You provided invalid credentials'
              color='red'
            />
          :null}
          <Segment stacked>
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />

            <Button color='teal' fluid size='large' onClick={this.handleLogin}>Login</Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
    )
  }
}
