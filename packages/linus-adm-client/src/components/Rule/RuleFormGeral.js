import React from 'react';
import _ from 'lodash';
import {Input, Header, Form} from 'semantic-ui-react';

import CodeMirrorControl from '../form/CodeMirrorControl';
import DialogSelect from '../form/DialogSelect';
import FormChange from '../form/FormChange';

export default class RuleFormGeral extends FormChange {
    static defaultProps = {
        "id": "",
        "dialog": "",
        "match": "(ctx)=>{/*Seu código aqui*/}",
        "priority":0
    };

    constructor({data, onChange}){
        super();
        const {id, dialog, match, priority} = data;
        this.state = _.merge({}, RuleFormGeral.defaultProps, {id, dialog, match, priority});
        this.onChange=(onChange || (()=>null));
    }

    getData(){
        return this.state;
    }

    render() {
        const codeMirrorJsContext = {'_':_};
        // console.log("dialog=",this.state.dialog);
        return (
            <div>
                <Header content='Geral'/>
                <Form >
                    <div className="row form-group">
                        <label className="large-2 column">Name ID: </label>
                        <div className="large-10 column">
                            <Input type="text" value={this.state.id} name="id"
                                placeholder='Regra ID' onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="large-2 column">Dialog: </label>
                        <DialogSelect className="large-10 column" name="dialog" value={this.state.dialog} onChange={this.handleFormBaseChange} />
                    </div>
                    <div className="row form-group">
                        <label className="large-2 column">Proprity: </label>
                        <div className="large-10 column ">
                            <Input type="number" value={this.state.priority} name="priority"
                                placeholder='Prioridade' onChange={this.handleNumberChange}/>
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="large-2 column">Match: </label>
                        <div className="large-10 column ">
                            <CodeMirrorControl
                                name="match"
                                value={this.state.match}
                                onChange={this.handleFormBaseChange}
                                jsContext={codeMirrorJsContext}
                            />
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}
