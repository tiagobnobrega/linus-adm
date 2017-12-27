import _ from 'lodash';
import * as RJD from 'react-js-diagrams';
import {RuleNodeFactory} from './RuleNodeFactory';
// import { NodeModel } from '../Common';
// import { AbstractInstanceFactory } from '../AbstractInstanceFactory';


export class RuleNodeModel extends RJD.NodeModel {
  //TODO Alterar constructor para receber objeto com propriedades x,y, e meta
  constructor(name = 'Untitled', color = 'rgb(0,192,255)', onEdit) {
    super(RuleNodeFactory.TYPE);
    this.name = name;
    this.color = color;
    this.onEdit = onEdit || (()=>{console.log('no onEdit callback')});
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      onEdit: this.onEdit
    });
  }

  getInPorts() {
    return _.filter(this.ports,(portModel) => portModel.in);
  }

  getOutPorts() {
    return _.filter(this.ports,(portModel) => !portModel.in);
  }
}

export class RuleNodeInstanceFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('RuleNodeModel');
  }

  getInstance() {
    return new RuleNodeModel();
  }
}
