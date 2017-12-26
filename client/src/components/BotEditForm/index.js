import React from 'react';
import PropTypes from 'prop-types';
import FormChange from '../form/FormChange';
import {Form, Label, Input} from 'semantic-ui-react';
import _cloneDeep from 'lodash/cloneDeep';
import _merge from 'lodash/merge';

export default class BotEditForm extends FormChange {
  static propTypes = {
    botNames: PropTypes.array.isRequired,
  }
  static defaultProps = {
    "_id": null,
    "name": "",
    "description": ""
  };

  constructor({bot}) {
    super();
    this.state = {
      'bot': _merge({}, BotEditForm.defaultProps, bot),
      'originalBotName':bot.name,
      'invalid': {
        "name": null,
        "description": null
      }
    };

  }

  getBot() {
    return this.state.bot;
  }

  handleUpdate(changed) {
    let updatedBot = {};
    _merge(updatedBot, this.state.bot, changed);
    this.setState({bot: updatedBot});
  }

  validateBotName(newName){
    const {botNames} = this.props;
    //o nome é obrigatório
    if(newName==="") return "É preciso informar um nome para o bot";
    // se for o mesmo nome do original, ok
    if(newName === this.state.originalBotName) return null;
    // o nome deve ser único
    if(botNames.indexOf(newName)>-1){
      return `Já existe um bot com o nome ${newName}`;
    }
    // o nome não deve conter carateres especiais /
    const regPatt = /^[a-zA-Z\d\-_.,]+$/g;
    let test = regPatt.test(newName);
    if(test===false){
      return "Não é permitido o uso de caracteres especiais no nome do bot";
    }

    return null;
  }

  handleNameChange(e) {
    const el = e.target;
    let {value, name} = el;
    value = value.trim();

    let invalid =  _cloneDeep(this.state.invalid);
    invalid.name = this.validateBotName(value);
    this.setState({invalid});
    this.handleInputChange({target:{value, name}});
  }

  renderErrorLabel(attrName){
    const {invalid} = this.state;
    if(!invalid[attrName]){
      return null;
    }else{
      return <Label basic color='red' pointing>{invalid[attrName]}</Label>
    }
  }



  render() {
    const {bot,invalid} = this.state;
    return (
      <div>
        <Form className="form-dialog">
          {/*<Header content={'Editando: ' + this.state.bot.name}/>*/}
          <div className="row form-group">
            <small>{`_id:${bot._id}`}</small>
          </div>
          <div className="row form-group">
            <label className="large-2 column">Nome: </label>
            <div className="large-10 column">
              <Input className="column" type="text" value={bot.name} error={!!invalid.name} name="name"
                     placeholder='Nome do bot' onChange={this.handleNameChange.bind(this)}/>
              {this.renderErrorLabel('name')}
            </div>
          </div>
          <div className="row form-group">
            <label className="large-2 column">Descrição: </label>
            <div className="large-10 column">
              <Input className="column" type="text" value={bot.description} name="description"
                     placeholder='Uma breve descrição do bot' onChange={this.handleInputChange}/>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}
