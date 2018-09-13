import React from 'react';

export default class FormBaseControl extends React.Component{
    static defaultProps = {
        'value':"",
        'name':'',
    };

    constructor(props){
        super(props);
        props = props || FormBaseControl.defaultProps;
        this.state ={
            "value":props.value,
            "name":props.name,
        };
        this.onChange = (props.onChange || (()=>null));
    }

    //TODO SHOULD CRESOLVE HANDLE UPDATE AND ONCHANGE EVENTS
    updateValue(v){
        this.setState({'value':v});
    }

    getValue(){
        return this.state.value;
    }

    getName(){
        return this.state.name;
    }

}
