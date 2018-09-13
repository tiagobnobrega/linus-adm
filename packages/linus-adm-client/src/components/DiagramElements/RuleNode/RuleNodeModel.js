import _ from 'lodash';
import * as RJD from 'storm-react-diagrams';
import {RuleNodeFactory} from './RuleNodeFactory';
// import { NodeModel } from '../Common';
// import { AbstractInstanceFactory } from '../AbstractInstanceFactory';


export class RuleNodeModel extends RJD.NodeModel {
  constructor(name = 'Untitled', color = 'rgb(0,192,255)', onEdit, x=0, y=0, source={}) {
    super(RuleNodeFactory.TYPE);
    this.name = name;
    this.color = color;
    this.onEdit = onEdit || (()=>{console.log('no onEdit callback')});
    this.x = x;
    this.y = y;
    this.source = source;

  }

  deSerialize(object) {
    super.deSerialize(object);
    this.name = object.name;
    this.color = object.color;
    this.x = object.x;
    this.y = object.y;
    this.source = object.source;
  }

  serialize() {
    return _.merge(super.serialize(), {
      name: this.name,
      color: this.color,
      onEdit: this.onEdit,
      source: this.source,
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
