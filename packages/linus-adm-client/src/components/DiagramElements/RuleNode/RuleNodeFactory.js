import React from 'react';
import * as RJD from 'storm-react-diagrams';
import { RuleNodeWidget } from './RuleNodeWidget';

class RuleNodeFactory extends RJD.NodeWidgetFactory {
  constructor() {
    super(RuleNodeFactory.TYPE);
  }

  generateReactWidget(diagramEngine, node) {
    return (
      <RuleNodeWidget node={node} diagramEngine={diagramEngine} />
    );
    //   return RuleNodeFactory({ node });
  }
}
RuleNodeFactory.TYPE="rule";
export {RuleNodeFactory};
