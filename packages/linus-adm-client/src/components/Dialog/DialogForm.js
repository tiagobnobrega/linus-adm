import React from 'react';
import _ from 'lodash';
import {Input, Form} from 'semantic-ui-react';
import CheckboxGroup from '../form/CheckboxGroup';
import ColorPicker from '../form/ColorPicker';
import FormChange from '../form/FormChange';
import { Header} from 'semantic-ui-react'

export default class DialogForm extends FormChange {
    static defaultProps = {
        "id": "",
        "minConfidence": 0.8,
        "listenTo": [
            "intents",
            "entities"
        ]
    };

    constructor({dialog, onChange}) {
        super();
        this.state = {
            'dialog': _.merge({}, DialogForm.defaultProps, dialog)
        };
        this.onChange=(onChange || (()=>null));
    }

    getDialog() {
        return this.state.dialog;
    }

    handleUpdate(changed) {
        let updatedDialog = {};
        _.merge(updatedDialog, this.state.dialog, changed);
        this.setState({dialog: updatedDialog});
    }

    render() {
        return (
            <div>
                <Form className="form-dialog">
                    <Header content={'Editando: '+this.state.dialog.id}/>
                    <div className="row form-group">
                        <label className="large-2 column">Nome ID: </label>
                        <div className="large-10 column">
                            <Input className="column" type="text" value={this.state.dialog.id} name="id"
                                placeholder='Dialogo ID' onChange={this.handleInputChange}/>
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="large-2 column">Cor: </label>
                        <div className="large-10 column colorPicker">
                            <ColorPicker
                                onChange={this.handleFormBaseChange}
                                value={this.state.dialog.meta.color}
                                name="meta.color"/>
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="large-2 column">ListenTo: </label>
                        <div className="large-10 column">
                            <CheckboxGroup
                                opts={[
                                    {'label': "intents", 'value': "intents"},
                                    {'label': "entities", 'value': "entities"}
                                ]}
                                name="listenTo"
                                value={this.state.dialog.listenTo}
                                onChange={this.handleFormBaseChange}
                            />
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="large-2 column">Confidence: </label>
                        <div className="large-10 column">
                            <Input type="text" value={this.state.dialog.minConfidence} name="minConfidence"
                                placeholder='Dialogo Confidence' onChange={this.handleNumberChange}/>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}
