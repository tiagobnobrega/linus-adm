import React from 'react';
import "./DialogNodeWidget.css";
import { DialogPortLabelWidget } from './DialogPortLabelWidget';


export class DialogNodeWidget extends React.Component {
  static defaultProps = {
    node: null,
  };

  onRemove() {
    const { node, diagramEngine } = this.props;
    node.remove();
    diagramEngine.forceUpdate();
  }

  getInPorts() {
    const { node } = this.props;
    return node.getInPorts().map((port, i) => <DialogPortLabelWidget model={port} key={`in-port-${i}`} />);
  }

  getOutPorts() {
    const { node } = this.props;
    return node.getOutPorts().map((port, i) => <DialogPortLabelWidget model={port} key={`out-port-${i}`} />);
  }

  render() {
    const { node } = this.props;
    return (
      <div className='dialog-node'>
        <div className="header">
          <div className="title">
            <a className="name" data-role="node-name" onClick={()=>{node.onEdit(node)}}>{node.name}</a>
          </div>
          <div className="icon" style={(node.color? {background:node.color}:{background:"#ccc"}  )}>
              <i className={(node.icon? node.icon : "comments big icon")} />
          </div>
        </div>
        {/*<div className='fa fa-close' onClick={this.onRemove.bind(this)} />*/}
        <div className="body">
          <div className="ports">
            {this.getInPorts()}
            {this.getOutPorts()}
          </div>
        </div>
      </div>
    );
  }
}
