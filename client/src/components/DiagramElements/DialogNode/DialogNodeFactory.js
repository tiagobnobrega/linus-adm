import React from 'react';
import * as RJD from 'react-js-diagrams';
import { DialogNodeWidget } from './DialogNodeWidget';

class DialogNodeFactory extends RJD.NodeWidgetFactory {
  constructor() {
    super(DialogNodeFactory.TYPE);
  }

  generateReactWidget(diagramEngine, node) {
    return (
      <DialogNodeWidget node={node} diagramEngine={diagramEngine} />
    );
    //   return RuleNodeFactory({ node });
  }
}
DialogNodeFactory.TYPE="dialog";
export {DialogNodeFactory};
