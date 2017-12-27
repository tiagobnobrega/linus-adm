import React from 'react';
import {DiagramWidget} from 'react-js-diagrams';
import {MoveItemsAction} from 'react-js-diagrams/lib/widgets/actions/MoveItemsAction';

import LinkLayerWidgetExt from './LinkLayerWidgetExt';

export default class DiagramWidgetExt extends DiagramWidget{

    renderLinkLayerWidget() {
        const { diagramEngine } = this.props;
        const diagramModel = diagramEngine.getDiagramModel();

        if (!this.state.renderedNodes) {
            return null;
        }

        return (
            <LinkLayerWidgetExt
                diagramEngine={diagramEngine}
                pointAdded={(point, event) => {
                    event.stopPropagation();
                    diagramModel.clearSelection(point);
                    this.setState({
                        action: new MoveItemsAction(event.pageX, event.pageY, diagramEngine)
                    });
                }}
            />
        );
    }
}