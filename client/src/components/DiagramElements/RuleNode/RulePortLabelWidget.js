import React from 'react';
import * as RJD from 'storm-react-diagrams';
// import { PortWidget } from '../widgets/PortWidget';

export class RulePortLabelWidget extends React.Component {
    static defaultProps = {
        in: true,
        label: 'port',
        __error: false,
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
        const iconError =(
            <i className="ic ic-error fa fa-exclamation-triangle" />
        );
        // console.log("RuleportLabelWidget.__error=",model.__error);
        const icon = ()=>{return(
            <span className="icon-container">
                <i className="ic fa fa-arrow-right" />
                {(model.__error ? iconError:"")}
            </span>
        )};

        const label = (<span className="label">{model.label}</span>);

        return (
            <div className={`port ${(model.in ? 'in' : 'out')}-port`}>
                {icon('in')}{label}
                {port}
            </div>
        );
    }
}
