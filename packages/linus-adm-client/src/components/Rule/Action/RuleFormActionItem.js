import React from 'react';
import _ from 'lodash';
import {Divider, Checkbox ,Icon} from 'semantic-ui-react';
import CodeMirrorControl from '../../form/CodeMirrorControl';
import DialogSelect from '../../form/DialogSelect';
import RuleFormActionReplyList from './Replies/RuleFormActionReplyList';
import FormChange from '../../form/FormChange';

export default class RuleFormActionItem extends FormChange {

    static defaultProps = {
            "index":0,
            "action":{
                "match": "",
                "setContext": "",
                "replies": [],
                "goToDialog": "",
                "evaluateNext":false
            }
        };

    constructor({action, index, dialogs, onChange, onRemove, onIndexChange}){
        super();
        // const {match, setContext, replies, goToDialog} = action;
        this.state = _.merge({}, RuleFormActionItem.defaultProps, {action, index});
        this.dialogs = dialogs || RuleFormActionItem.dialogs;
        this.onChange=(_.debounce(onChange,200) || _.stubTrue); //debounce for performance
        this.onRemove=(onRemove || _.stubTrue);
        this.onIndexChange=(onIndexChange || _.stubTrue);

        this.codeMirrorControl = null;
        //common binds
        this.curryIndexChange = this.curryIndexChange.bind(this);
        this.curryHandleChange = this.curryHandleChange.bind(this);
    }

    getData(){
        return this.state;
    }

    handleRemove(){
        this.onRemove(this.state);
    }

    curryIndexChange(amount){
        return ()=>this.onIndexChange({'from':this.state.index,'to':this.state.index+amount})
    }

    handleReplyListchange(listState){
        console.log("ActionItem::ReplyListChange.listState=",listState);
        let newState = _.cloneDeep(this.state);
        newState.action.replies = listState.replies;
        // console.log("ActionItem::ReplyListChange.newState=",newState);
        this.setState(newState,
            ()=>(this.onChange(this.state)));
    }

    curryHandleChange(name,value){
        return ()=>{
            this.handleInputChange({'target':{name, value}});
        }
    }

    componentDidUpdate(){
        //refresh codemirror instances to recalc if hidden
        ["matchCMC","setContextCMC"]
            .forEach((cmc)=> this[cmc].getInstance().refresh());
    };
    render() {
        let jsContext ={"_":_};
        return (
            <div className="action-item">
                <div className="index-control">
                    <i className="action chevron up mini icon" aria-hidden="true"
                       onClick={this.curryIndexChange(-1)}
                    />
                    <Divider />
                    <i className="action chevron down mini icon" aria-hidden="true"
                       onClick={this.curryIndexChange(1)}
                    />
                </div>
                <div className="body">
                    <div className="top-container">
                        <div className="index">
                            0{this.state.index+1}
                        </div>
                        <div className="remove-control" onClick={this.handleRemove.bind(this)}>
                            <Icon name='trash outline'/>
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="large-2 column">Match: </label>
                        <div className="large-10 column ">
                            <CodeMirrorControl
                                ref={(e)=>this.matchCMC = e}
                                name="action.match"
                                value={this.state.action.match}
                                onChange={this.handleFormBaseChange}
                                jsContext={jsContext}
                            />
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="large-2 column">setContext: </label>
                        <div className="large-10 column ">
                            <CodeMirrorControl
                                ref={(e)=>this.setContextCMC = e}
                                name="action.setContext"
                                value={this.state.action.setContext}
                                onChange={this.handleFormBaseChange}
                                jsContext={jsContext}
                            />
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="large-2 column">goToDialog: </label>
                        <div className="large-10 column ">
                            <DialogSelect
                                value={this.state.action.goToDialog}
                                name="action.goToDialog"
                                onChange={this.handleFormBaseChange} />
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="large-2 column">Replies: </label>
                        <div className="large-10 column ">
                            <RuleFormActionReplyList replies={this.state.action.replies} onChange={this.handleReplyListchange.bind(this)}/>
                        </div>
                    </div>
                    <div className="row form-group">
                        <label className="large-2 column">Evaluate Next: </label>
                        <div className="large-10 column ">
                            <Checkbox toggle checked={this.state.action.evaluateNext} onChange={this.curryHandleChange("action.evaluateNext",!this.state.action.evaluateNext)} />
                        </div>
                    </div>
                </div>
            </div>

        )


    }
}
