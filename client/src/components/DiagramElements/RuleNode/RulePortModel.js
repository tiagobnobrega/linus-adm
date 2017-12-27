import * as RJD from 'react-js-diagrams';


export class RulePortModel extends RJD.PortModel {
  constructor(isInput, name, label = null,__error = false) {
    super(name);
    this.in = isInput;
    this.label = label || name;
    this.__error=__error;
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.in = object.in;
    this.label = object.label;
    this.__error=object.__error;
  }

  serialize() {
    return {
      ...super.serialize(),
      in: this.in,
      label: this.label,
      __error:this.__error
    };
  }
}

export class RulePortInstanceFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('RulePortModel');
  }

  getInstance() {
    return new RulePortModel(true, 'unknown');
  }
}
