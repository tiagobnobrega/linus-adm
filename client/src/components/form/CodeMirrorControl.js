import React from 'react';
import FormBaseControl from './FormBaseControl';
import CodeMirror from 'react-codemirror';
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/markdown/markdown');
require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/javascript-hint.js');


export default class CodeMirrorControl extends FormBaseControl {
    constructor(props) {
        super(props);
        this.jsContext = props.jsContext;
        this.onChange = props.onChange;
        this.useGlobalScope = !!props.useGlobalScope;
        this.globalVars = !!props.globalVars;
        this.codeMirrorComponent = null;
    }

    handleChange(newVal) {
        this.setState({'value': newVal},
            () => {
                this.onChange(this.state);
            });
    }
    getInstance(){
        return this.codeMirrorComponent.codeMirror;
    }

    render() {
        let options = {
            lineNumbers: true,
            extraKeys: {"Ctrl-Space": "autocomplete"},
            mode: {
                name: "javascript",
                globalVars: this.globalVars,
                useGlobalScope:this.useGlobalScope,
                additionalContext:this.jsContext
            }
        };
        return <CodeMirror ref={(e)=>this.codeMirrorComponent=e} value={this.state.value} onChange={this.handleChange.bind(this)} options={options}/>
    }

}
