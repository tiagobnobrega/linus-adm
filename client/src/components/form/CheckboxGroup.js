import React from 'react';
import { Checkbox } from 'semantic-ui-react'
import FormBaseControl from './FormBaseControl';
export default class CheckboxGroup extends FormBaseControl{
    constructor(props){
        super(props);
        this.checkboxes = [];
        this.onChange=props.onChange || (()=>null);
        this.state.value = this.state.value || [];

    }
    handleOpts(opts){
        this.opts = opts;
        this.opts.forEach((o)=>o.checked=this.state.value.indexOf(o.value)>=0);
    }

    handleChange(e,data){
        let values = this.checkboxes
            .filter((check)=>check.inputRef.checked && check.props.value!==data.value)
            .map((check)=>check.props.value);
        if(data.checked){
            values.push(data.value);
        }
        this.setState({'value':values},
            ()=>{
                this.onChange({name:this.state.name, value:values});
            });
    }

    buildCheckbox(opt,key){
        return (
            <Checkbox
                key={key}
                ref={(c)=>this.checkboxes[key]=c}
                onChange={this.handleChange.bind(this)}
                label={opt.label}
                value={opt.value}
                checked={opt.checked}
            />
        )
    }
    render(){
        this.handleOpts(this.props.opts);
        this.checkboxes = [];

        let ret= (
            <div>
                {this.opts.map((o,ind)=>this.buildCheckbox(o,ind))}

            </div>
        );
        return ret
    }
}
