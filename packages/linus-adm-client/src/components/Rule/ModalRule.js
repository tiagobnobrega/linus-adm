import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _bindAll from 'lodash/bindAll';
import {Modal, Button} from 'semantic-ui-react'
import RuleForm from './RuleForm';
import {Message} from 'semantic-ui-react';
import './ModalRule.css';

export default class ModalRule extends Component {
  static propTypes = {
    activeRule: PropTypes.object,
    isLoading: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    message: PropTypes.object,
  };

    constructor(props) {
        super(props);
        // this.state = {
        //     'activeRule': null,
        //     'message': {'text': null, 'type': 'info', 'list': null},
        // };
        this.ruleForm = null;
        // this.store = ModalRuleStore;
      _bindAll(this,['onSaveAndClose','onClose','renderMessage']);
    }

  onSaveAndClose(){
      const {onSave,onClose} = this.props;
      console.log('onSaveAndClose!!!!!',{onSave,onClose});
    if(onSave) onSave(this.ruleForm.getRule());
    if(onClose) onClose();
  }

    onClose() {
      const {onClose} = this.props;
      if(onClose) onClose();
    }

    renderMessage() {
      if(!this.props.message) return null;
        let {type, text, list} = this.props.message;
        let typeCheck = {
            'positive': (type === 'positive'),
            'info': (type === 'info'),
            'negative': (type === 'negative'),
            'warning': (type === 'warning'),
        };
        if (text !== null) {
            return (<Message positive={typeCheck.positive} info={typeCheck.info} negative={typeCheck.negative}
                             warning={typeCheck.warning}
                             content={text} list={list}/>)
        } else {
            return null;
        }

    }

    render() {
        const {isLoading, activeRule} = this.props
        return (
            <Modal closeIcon='close'
                   open={!!activeRule}
                   onClose={this.onClose}
                   size="large"
                   className="modal-rule"
                   closeOnDimmerClick={false}
            >

                <Modal.Content>
                    <div>
                        {this.renderMessage()}
                        <RuleForm ref={(e) => {
                            this.ruleForm = e;
                        }} rule={activeRule}/>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        className={(isLoading ?'loading':null)}
                        color='green'
                        icon='checkmark'
                        content='Salvar'
                        onClick={this.onSaveAndClose}
                    />
                </Modal.Actions>
            </Modal>
        )
    }
}
