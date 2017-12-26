import React,{Component} from 'react';
import _bindAll from 'lodash/bindAll';
import PropTypes from 'prop-types';
import {Modal,Button} from 'semantic-ui-react'
import BotEditForm from '../BotEditForm';

export default class BotEditmodal extends Component{
  static propTypes = {
    botNames: PropTypes.array.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func,
  };

  constructor(){
    super();
    _bindAll(this, ['clickSave']);
  }

  clickSave(){
    const {onSave} = this.props;
    if(onSave) onSave(this.form.getBot());
  }

  render(){
    const {bot,botNames,open,onClose,} = this.props;
    if(!bot) return null;
    return (
      <Modal dimmer='blurring' open={(open||true)} onClose={onClose}>
        <Modal.Header>{(bot.name || 'New Bot')}</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <BotEditForm ref={(form)=>this.form=form} bot={bot} botNames={botNames}/>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={onClose}>
            Close
          </Button>
          <Button positive icon='checkmark' labelPosition='right' content="Save" onClick={this.clickSave} />
        </Modal.Actions>
      </Modal>
    )

  }

}
