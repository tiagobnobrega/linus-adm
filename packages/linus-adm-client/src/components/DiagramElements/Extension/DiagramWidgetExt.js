import React from 'react';
import * as RJD from 'storm-react-diagrams';
import _ from 'lodash';

// import {MoveItemsAction} from 'storm-react-diagrams/lib/widgets/actions/MoveItemsAction';

import LinkLayerWidgetExt from './LinkLayerWidgetExt';

export default class DiagramWidgetExt extends RJD.DiagramWidget {

  stopFiringAction(shouldSkipEvent,originalEvent) {
    console.log('stopFiringAction!!!!',{param:this.props.actionStoppedFiring,shouldSkipEvent});
    if (this.props.actionStoppedFiring && !shouldSkipEvent) {
      this.props.actionStoppedFiring(this.state.action,originalEvent);
    }
    this.setState({action: null});
  }

  onMouseUp(event) {
    var diagramEngine = this.props.diagramEngine;
    //are we going to connect a link to something?
    if (this.state.action instanceof RJD.MoveItemsAction) {
      var element = this.getMouseElement(event);
      var linkConnected = false;
      _.forEach(this.state.action.selectionModels, (model) => {
        //only care about points connecting to things
        if (!(model.model instanceof RJD.PointModel)) {
          return;
        }

        if (element && element.model instanceof RJD.PortModel && !diagramEngine.isModelLocked(element.model)) {
          linkConnected = true;
          let link = model.model.getLink();
          link.setTargetPort(element.model);
          delete this.props.diagramEngine.linksThatHaveInitiallyRendered[link.getID()];
        }
      });

      //do we want to allow loose links on the diagram model or not
      if (!linkConnected && !this.props.allowLooseLinks) {
        _.forEach(this.state.action.selectionModels, (model) => {
          //only care about points connecting to things
          if (!(model.model instanceof RJD.PointModel)) {
            return;
          }

          var link = model.model.getLink();
          if (link.isLastPoint(model.model)) {
            link.remove();
          }
        });
      }
      diagramEngine.clearRepaintEntities();
      // console.log('this.state.wasMoved',this.state.wasMoved);
      this.stopFiringAction(null, event);
    } else {
      diagramEngine.clearRepaintEntities();
      this.stopFiringAction();
    }

    this.state.document.removeEventListener("mousemove", this.onMouseMove);
    this.state.document.removeEventListener("mouseup", this.onMouseUp);
  }
}
