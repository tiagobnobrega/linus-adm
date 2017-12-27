import * as RJD from 'react-js-diagrams';

export class DialogPortModel extends RJD.PortModel {
  constructor(isInput, name, label = null) {
    super(name);
    this.in = isInput;
    this.label = label || name;
  }

  deSerialize(object) {
    super.deSerialize(object);
    this.in = object.in;
    this.label = object.label;
  }

  serialize() {
    return {
      ...super.serialize(),
      in: this.in,
      label: this.label
    };
  }
}

export class DialogPortInstanceFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('DialogPortModel');
  }

  getInstance() {
    return new DialogPortModel(true, 'unknown');
  }
}