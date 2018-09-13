import React from 'react';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import  * as actions from '../../actions/botActions';
import {getBotsNames} from '../../reducers'
import bindAll from 'lodash/bindAll'
import {Container, Card, Image, Button, Modal, Header} from 'semantic-ui-react';
import botAvatar from './bot-avatar.png';
import './style.css';

import BotEditmodal from '../../components/BotEditModal';
import swal from 'sweetalert2'

class BotList extends React.Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  constructor(props){
    super(props);

    bindAll(this,['renderBotCard','renderNewBotCard','renderCards',
      'botCardClick','botCardEdit','botCardRemove','closeBotModal','botModalSave'
    ]);
  }

  componentDidMount(){
    this.props.getAllBots();
  }

  botCardClick(bot){
    this.props.changePage(`diagram/${bot._id}`);
  }
  botCardEdit(bot){
    this.props.selectBot(bot);
  }
  botCardRemove(bot){

    swal({
      title: 'Are you sure?',
      text: `You will DELETE the bot and all it's rules and dialogs.` ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.props.removeAndReloadBot(bot);
      }
    })
  }

  closeBotModal(){
    this.props.selectBot(undefined);
  }

  botModalSave(bot){
    this.props.saveAndReloadBot(bot);
  }

  renderCards(){
    const { allBots } = this.props;
    return (<Card.Group>
      {allBots.map(this.renderBotCard)}
      {this.renderNewBotCard()}
    </Card.Group>);
  }

  renderNewBotCard(){
    return(
    <Card className='bot-card new-bot' key='__newBot__'>
      <Card.Content onClick={()=>this.botCardEdit({})}>
        <Image floated='right' size='tiny' src={botAvatar} />
        <Card.Header>
          New Bot
        </Card.Header>
        <Card.Description>
          Click here to add a new bot!
        </Card.Description>
      </Card.Content>
    </Card>
    )
  }

  renderBotCard(bot){
    return (
      <Card className='bot-card' key={bot._id}>
        <Card.Content onClick={()=>this.botCardClick(bot)}>
          <Image floated='right' size='tiny' src={botAvatar} />
          <Card.Header>
            {bot.name}
          </Card.Header>
          <Card.Description>
            {bot.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green' onClick={()=>this.botCardEdit(bot)} >Edit</Button>
            <Button basic color='red' onClick={()=>this.botCardRemove(bot)}>Delete</Button>
          </div>
        </Card.Content>
      </Card>
    );
  }

  renderSelectedBotModal(){
    const {selectedBot, botNames} = this.props;
    console.log('selectedBot',{selectedBot});
    if(!selectedBot) return null;
    return(
      <BotEditmodal bot={selectedBot} botNames={botNames} onClose={this.closeBotModal}  onSave={this.botModalSave}/>
    )
  }
  render() {
    const { allBots,selectedBot, isFetching } = this.props;
    return (
    <Container className='bot-list'>
      <h1>Bots</h1>
        <div>
          {isFetching ?
            <h3>loading...</h3>
            :
            this.renderCards()
          }
        </div>
        <hr />
        <div>
          {this.renderSelectedBotModal()}
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.bots,
    botNames: getBotsNames(state),
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    changePage: (route) => push(`/${route}`),
    ...actions
  } ,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BotList);
