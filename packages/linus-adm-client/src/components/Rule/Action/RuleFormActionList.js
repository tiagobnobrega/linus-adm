import React from 'react';
import _ from 'lodash';
import RuleFormActionItem from './RuleFormActionItem';
import {Button, Header, Message} from 'semantic-ui-react';
import FormChange from '../../form/FormChange';

export default class RuleFormActionList extends FormChange {

    static defaultProps = {
        // 'visible':false,
        "actions": [
            // {
            //     "match": "",
            //     "setContext": "",
            //     "replies": [
            //         ""
            //     ],
            //     "goToDialog": "ROOT"
            // }
        ],
        "dialogs":[
            // {"id":'','label':''}
        ]
    };

    constructor({data, dialogs, onChange}){
        super();
        const {actions} = data;
        this.state = _.merge({}, RuleFormActionList.defaultProps, {actions});
        this.dialogs = dialogs || RuleFormActionList.dialogs;
        this.onChange=(onChange || (()=>null));
        this.indexKey = new Date().getTime();

        this.newActionItem = null;
    }

    getData(){
        return this.state;
    }

    handleAddAction(){
        // let nextActionIndex = this.state.actions.length;
        let newAction = _.merge({},RuleFormActionItem.defaultProps.action);
        let newActions = this.state.actions.concat([newAction]);
        this.indexKey = new Date().getTime();
        this.handleUpdate({'actions':newActions});
    }

    handleRemoveAction(actionState){
    // .splice(2, 0, "drum");
        let remainActions = _.cloneDeep(this.state.actions);
        remainActions.splice(actionState.index,1);
        this.indexKey = new Date().getTime();
        this.setState({actions:remainActions, visible:!this.state.visible},
            ()=>{this.onChange(this.state)});
        setTimeout(() => {
            this.setState({visible:false})
        }, 900);
    }

    handleIndexChange({from,to}){
        // console.log("ActionList.IndexChange:: from,to",{from,to});
        if(to<0) return;
        if(to>this.state.actions.length-1) to=this.state.actions.length-1;
        if(from===to) return;
        this.indexKey = new Date().getTime();
        let movedActions = _.cloneDeep(this.state.actions);
        movedActions.splice(to, 0, movedActions.splice(from, 1)[0]);
        this.setState({actions:movedActions},
            ()=>{this.onChange(this.state)});
    }

    handleActionChange({action,index}){
        // console.log("RuleFormActionList::handleActionChange.action",{action,index});
        let newActions = _.cloneDeep(this.state.actions);
        newActions.splice(index,1,action);
        this.setState({'actions':newActions},
            ()=>this.onChange(this.state));
    }

    renderMessage(){
        return(
            <div className="overlay-alert">
                <Message
                    negative
                    content='Excluindo action'
                />
            </div>
        )
    }

    renderActionItem(action, index){
        return (
            <RuleFormActionItem
                action={action}
                index={index}
                key={this.indexKey+"_"+index}
                onRemove={this.handleRemoveAction.bind(this)}
                onIndexChange={this.handleIndexChange.bind(this)}
                onChange={this.handleActionChange.bind(this)}
            />
        );
    }


    render() {
        const {visible} = this.state;
        return (
            <div>
                <Header content='Actions'/>
                <div className="overlay-alert" style={(!visible ? {'visibility':'hidden'} : null )}>
                    {this.renderMessage()}
                </div>
                { this.state.actions.map( (action,index)=>this.renderActionItem(action, index) ) }
                <Button 
                    className="addAction" 
                    size='medium'
                    icon='add square' 
                    content='Add New Action' 
                    onClick={this.handleAddAction.bind(this)} 
                />
            </div>
        )
    }
}