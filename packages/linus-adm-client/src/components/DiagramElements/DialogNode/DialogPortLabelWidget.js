import React from 'react';
import * as RJD from 'storm-react-diagrams';
// import { PortWidget } from '../widgets/PortWidget';

export class DialogPortLabelWidget extends React.Component {
  static defaultProps = {
    in: true,
    label: 'port'
  };

  render() {
    const { model } = this.props;
    const port = (
      <RJD.PortWidget name={model.name} node={model.getParent()} />
    );
    // const label = (
    //   <div className='name'>
    //     {model.label}
    //   </div>
    // );
    const ic = (
        <i className="ic fa fa-arrow-right" />
    );

    const label = (<span className="label">{ model.label }</span>);

    return (
      <div className={`port ${(model.in ? 'in' : 'out')}-port`}>
          {model.in? ic : label }
          {model.in? label : ic }
          {port}
      </div>
    );
  }
}
