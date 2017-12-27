import _ from 'lodash';
import * as RJD from 'react-js-diagrams';
import {DialogNodeFactory} from './DialogNodeFactory'

export class DialogNodeModel extends RJD.NodeModel {
  //TODO Alterar constructor para receber objeto com propriedades x,y, e meta
  constructor(name = 'Untitled', color = 'rgb(0,192,255)', onEdit, x=0, y=0, source={}) {
    super(DialogNodeFactory.TYPE);
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

export class DialogNodeInstanceFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('DialogNodeModel');
  }

  getInstance() {
    return new DialogNodeModel();
  }
}
