import React from 'react';
import * as RJD from 'react-js-diagrams';

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
        const diagramModel = this.props.diagramEngine.getDiagramModel();
        const zoom = diagramModel.getZoomLevel();
        const offsetX = diagramModel.getOffsetX();
        const offsetY = diagramModel.getOffsetY();
        const svgStyle = {
            transform: `scale(${zoom / 100.0}) translate(${offsetX}px, ${offsetY}px)`,
            width: '100%',
            height: '100%'
        };

        return (
            <svg style={svgStyle}>
                {this.generateDefs()}
                {this.generateLinks()}
            </svg>
        );
    }

}