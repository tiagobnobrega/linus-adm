import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Header, Modal, Button} from 'semantic-ui-react'
import DialogForm from './DialogForm';
import { Message } from 'semantic-ui-react';
import './ModalDialog.css';
import _bindAll from 'lodash/bindAll';

export default class ModalDialog extends Component{
  static propTypes = {
    activeDialog: PropTypes.object,
    isLoading: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    message: PropTypes.object,
  };

  constructor(props){
    super(props);
    this.dialogForm=undefined;
    _bindAll(this,['renderMessage','onSaveAndCloseDialog','onCloseDialog']);
  }

  onSaveAndCloseDialog(){
    if(this.props.onSave) this.props.onSave(this.dialogForm.getDialog());
    if(this.props.onClose) this.props.onClose();
  }

  onCloseDialog(){
    if(this.props.onClose) this.props.onClose();
  }

  renderMessage(){
    if(!this.props.message) return null;
    let {type, text, list} = this.props.message;
    let typeCheck ={
        'positive':(type==='positive'),
        'info':(type==='info'),
        'negative':(type==='negative'),
        'warning':(type==='warning'),
    };
    if(text!=='null'){
        return (<Message positive={typeCheck.positive} info={typeCheck.info} negative={typeCheck.negative} warning={typeCheck.warning}
                         content={text} list={list}/>)
    }else{
      return null;
    }

  }

  render(){
    const {isLoading, activeDialog} = this.props
    return(
      <Modal dimmer='blurring' closeIcon='close'
        open={!!activeDialog}
        onClose={this.onCloseDialog}
      >
        <Header content='Dialog' />
        <Modal.Content>
          <div>
              {this.renderMessage()}
            <DialogForm ref={(e) => {this.dialogForm = e; }} dialog={activeDialog}/>
          </div>
        </Modal.Content>
        <Modal.Actions>
            <Button
              className={(isLoading ?'loading':null)}
              color='green'
              icon='checkmark'
              content='Save'
              onClick={this.onSaveAndCloseDialog}
            />
        </Modal.Actions>
      </Modal>
    )
  }
}
