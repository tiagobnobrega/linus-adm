import React from 'react';
import _ from 'lodash';
import * as RJD from 'storm-react-diagrams';

export default class LinkLayerWidgetExt extends RJD.LinkLayerWidget{
    generateDefs(){
        return (<defs>
            <filter id="rjd-dropshadow" height="130%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                <feOffset dx="1" dy="1" result="offsetblur"/>
                <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <linearGradient id="rjd-linear-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0CC4AF"/>
                <stop offset="50%"   stopColor="#4189BB"/>
                <stop offset="100%" stopColor="#B815DE"/>
            </linearGradient>
        </defs>)

    }

  render() {
    var diagramModel = this.props.diagramEngine.getDiagramModel();
    return (
      <svg
        style={{
          transform:
          "translate(" +
          diagramModel.getOffsetX() +
          "px," +
          diagramModel.getOffsetY() +
          "px) scale(" +
          diagramModel.getZoomLevel() / 100.0 +
          ")",
          width: "100%",
          height: "100%"
        }}
      >
        {this.generateDefs()}
        {//only perform these actions when we have a diagram
          this.props.diagramEngine.canvas &&
          _.map(diagramModel.getLinks(), link => {
            if (this.props.diagramEngine.nodesRendered && !this.props.diagramEngine.linksThatHaveInitiallyRendered[link.id]) {
              if (link.sourcePort !== null) {
                try {
                  link.points[0].updateLocation(this.props.diagramEngine.getPortCenter(link.sourcePort));
                  this.props.diagramEngine.linksThatHaveInitiallyRendered[link.id] = true;
                } catch (ex) {}
              }
              if (link.targetPort !== null) {
                try {
                  _.last(link.points).updateLocation(this.props.diagramEngine.getPortCenter(link.targetPort));
                  this.props.diagramEngine.linksThatHaveInitiallyRendered[link.id] = true;
                } catch (ex) {}
              }
            }

            //generate links
            var generatedLink = this.props.diagramEngine.generateWidgetForLink(link);
            if (!generatedLink) {
              console.log("no link generated for type: " + link.getType());
              return null;
            }

            return (
              <RJD.LinkWidget key={link.getID()} link={link} diagramEngine={this.props.diagramEngine}>
                {React.cloneElement(generatedLink, {
                  pointAdded: this.props.pointAdded
                })}
              </RJD.LinkWidget>
            );
          })}
      </svg>
    );
  }


    // render() {
    //     const diagramModel = this.props.diagramEngine.getDiagramModel();
    //     const zoom = diagramModel.getZoomLevel();
    //     const offsetX = diagramModel.getOffsetX();
    //     const offsetY = diagramModel.getOffsetY();
    //     const svgStyle = {
    //         transform: `scale(${zoom / 100.0}) translate(${offsetX}px, ${offsetY}px)`,
    //         width: '100%',
    //         height: '100%'
    //     };
    //
    //     return (
    //         <svg style={svgStyle}>
    //             {this.generateDefs()}
    //             {this.generateLinks()}
    //         </svg>
    //     );
    // }

}
