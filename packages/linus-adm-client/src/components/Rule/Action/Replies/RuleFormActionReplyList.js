import React from 'react';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';
import _ from 'lodash';
import RuleFormActionReplyItem from './RuleFormActionReplyItem';
import {Button} from 'semantic-ui-react';

const DragHandle = SortableHandle(() => <span>::</span>);

const ReplySortableItem = SortableElement(({reply, onChange, onRemove}) => {

        return (<li className="reply-item">
                <RuleFormActionReplyItem dragHandle={<DragHandle />} reply={reply} onChange={onChange} onRemove={onRemove} />
            </li>
        )
    }
);

const ReplySortableList = SortableContainer(({replies, onChange, onRemove, indexKey}) => {
    let curryChange = function (index) {
        return (reply) => {
            onChange({reply, index})
        }
    };

    let curryRemove = function (index) {
        return (reply) => {
            onRemove({reply, index})
        }
    };

    return (
        <ul className="reply-list">
            {replies.map((reply, index) => (
                <ReplySortableItem key={`item-${indexKey}-${index}`} index={index} reply={reply}
                                   onChange={curryChange(index)} onRemove={curryRemove(index)} />
            ))}
        </ul>
    );
});

export default class RuleFormActionReplyList extends React.Component {
    constructor({replies, onChange}) {
        super();
        this.state = {
            replies: (replies || [])
        };
        this.onChange = (onChange || _.stubTrue());
        this.indexKey = new Date().getTime();
    }
    // generateIndexKey(){
    //     this.state.replies.length
    // }

    onSortEnd = ({oldIndex, newIndex}) => {
        let newArray = arrayMove(this.state.replies, oldIndex, newIndex);
        // console.log('onSortEnd', newArray);
        this.indexKey = new Date().getTime();
        this.setState({
                replies: newArray,
            },
            () => this.onChange(this.state));
    }

    handleItemChange({index, reply}) {
        let newReplies = _.cloneDeep(this.state.replies);
        newReplies.splice(index, 1, reply);
        this.setState({"replies": newReplies},
            () => this.onChange(this.state));
    }

    handleItemRemove({index, reply}){
        console.log("RuleFormActionReplyList.handleItemRemove::index,reply=",{index, reply});
        let newReplies = _.cloneDeep(this.state.replies);
        newReplies.splice(index, 1);
        this.indexKey = new Date().getTime();
        this.setState({"replies": newReplies},
            () => this.onChange(this.state));
    }
    handleAddReply(){
        let newReplies = _.cloneDeep(this.state.replies);
        newReplies.push(_.cloneDeep(RuleFormActionReplyItem.defaultProps.text));
        this.setState({"replies": newReplies},
            () => this.onChange(this.state));
    }

    render() {
        console.log("RuleFormActionReplyList::render.replies=",this.state.replies);
        return (
            <div>
                <ReplySortableList
                    replies={this.state.replies}
                    onChange={this.handleItemChange.bind(this)}
                    onRemove={this.handleItemRemove.bind(this)}
                    onSortEnd={this.onSortEnd}
                    useDragHandle={true}
                    helperClass="sortable-helper"
                    lockAxis="y"
                    lockToContainerEdges={true}
                    indexKey={this.indexKey}
                />
                <Button 
                    icon='plus' 
                    size='small'
                    content='Add Reply' 
                    onClick={this.handleAddReply.bind(this)} /> 
            </div>
        )
    }
}