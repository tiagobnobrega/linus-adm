import React from 'react';
import * as RJD from 'storm-react-diagrams';
import LinkWidgetExt from './LinkWidgetExt';

class LinkFactoryExt extends RJD.LinkWidgetFactory {
  constructor() {
    super(LinkFactoryExt.TYPE);
  }

  generateReactWidget(diagramEngine, link) {
    return (
      <LinkWidgetExt link={link} diagramEngine={diagramEngine} />
    );
  }
}
LinkFactoryExt.TYPE='linkEXT';

export default LinkFactoryExt;
