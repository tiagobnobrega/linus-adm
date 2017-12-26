import React from 'react';
import _ from 'lodash';
import update from 'react-addons-update';

export default class FormChange extends React.Component{
    constructor(props){
    super(props)

    //common binds
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleFormBaseChange = this.handleFormBaseChange.bind(this);
    }

    handleNumberChange(e) {
        let el = e.target;
        return this.handleInputChange({'target': {'name': el.name, 'value': parseFloat(el.value)}});
    }

    handleInputChange(e) {
        let el = e.target;
        let value = el.value;
        let name = el.name;
        let changed = {};
        _.set(changed, name, value);
        this.handleUpdate(changed);
    }

    handleFormBaseChange(data) {
        let name = data.name;
        if (!name) console.warn("handleFormInput:: Elements has no name defined");
        let value = data.value;
        let changed = {};
        _.set(changed, name, value);
        this.handleUpdate(changed);
    }

    handleUpdate(changed) {
        let updatedState = {};
        _.merge(updatedState, this.state, changed);        
        this.setState(updatedState,
            ()=>{this.onChange(this.state)});
    };

    handleRemoveArrayItem(propName,index) {
        let arrContainer = {};
        arrContainer[propName] = update(this.state[propName], {$splice: [[index, 1]]})
        this.setState(
            {
                arrContainer
            },
            ()=>{this.onChange(this.state)}
        ); 
    };

}