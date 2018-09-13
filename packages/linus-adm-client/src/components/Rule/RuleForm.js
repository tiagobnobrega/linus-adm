import React, {Component} from 'react';
import _ from 'lodash';
import {Grid, Menu, Container} from 'semantic-ui-react'
import RuleFormGeral from "./RuleFormGeral";
import RuleFormAction from './Action/RuleFormActionList';

export default class RuleForm extends Component {
    static defaultProps = {
        "id": "teste",
        "dialog": "",
        "match": "",
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
        "meta": {
            "x": 100,
            "y": 100
        }
    };

    constructor({rule}) {
        super();
        this.state = {
            'rule': _.merge({}, RuleForm.defaultProps, rule),
            'activeItem':'geral'
        };

    }

    getRule() {
        // console.log("RuleForm.getRule::rule=",this.state.rule);
        return this.state.rule;
    }

    handleGeralChange(data){
        let newRule = _.merge({},this.state.rule,data);
        this.setState({'rule':newRule});
    }

    handleActionsChange({actions}){
        // console.log("RuleForm.handleActionsChange::actions=",actions);
        let newRule = _.cloneDeep(this.state.rule);
        newRule.actions = actions;
        console.log("RuleForm.handleActionsChange::newRule=",newRule);
        this.setState({'rule':newRule});
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;
        return (
            <Grid>
                <Grid.Column width={4}>
                    <Menu  pointing secondary vertical>
                        <Menu.Item name='geral' active={activeItem === 'geral'} onClick={this.handleItemClick}/>
                        <Menu.Item name='actions' active={activeItem === 'actions'} onClick={this.handleItemClick}/>
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <Container style={ {display: (activeItem === 'geral' ? 'block' : 'none')} } >
                        <RuleFormGeral data={this.state.rule} onChange={this.handleGeralChange.bind(this)}/>
                    </Container>
                    <div style={ {display: (activeItem === 'actions' ? 'block' : 'none')} } >
                        <RuleFormAction data={ this.state.rule } onChange={this.handleActionsChange.bind(this)}/>
                    </div>
                </Grid.Column>
            </Grid>
        )
    }
}
