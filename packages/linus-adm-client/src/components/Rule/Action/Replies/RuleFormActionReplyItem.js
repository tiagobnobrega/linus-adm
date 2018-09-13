import React from 'react';
import {TextArea, Form} from 'semantic-ui-react';
import Select from 'react-select';
import _ from 'lodash';
import FormChange from '../../../form/FormChange';
import CodeMirrorControl from '../../../form/CodeMirrorControl';
import {Button} from 'semantic-ui-react';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <i className="drag-handle bars small icon" aria-hidden="true" />);

export default class RuleFormActionReplyItem extends FormChange{

    static defaultProps = {
        "text":{"type":"text","content":""},
        // "carousel":{"type":"carousel","content":[]},
        "media":{"type":"media","content":{"contentType":"","contentUrl":"","name":""}},
        "choice":{"type":"choice","meta":{"title":"","subtitle":"","text":""},"content":[]},
        "function":{"type":"function","content":"({session,context,scripts})=>{}"}
    };

    constructor({reply, onChange, onRemove}){
        super();

        if(! _.isObject(reply)){
            reply = {"type":"text","content":reply.toString()}
        }

        this.state=_.merge({}, RuleFormActionReplyItem.defaultProps[reply.type], reply);
        this.onChange = onChange || ( ()=>null );
        this.onRemove = onRemove || ( ()=>null );

    }

    componentDidUpdate(){
        //refresh codemirror instances to recalc if hidden
        ["replyCMC"]
            .forEach((cmc)=> {if(this[cmc]) this[cmc].getInstance().refresh()});
    };

    handleTypeChange({value}){
        let newType = value;
        let changed = RuleFormActionReplyItem.defaultProps[newType];
        this.handleUpdate(changed);
    }

    handleUpdateChoices(args){
        let target = args.target;
        let name = target.name;
        let value = this.serializeChoices(target.value);
        this.handleInputChange({'target':{name,value}});
    }


    deSerializeChoices(val){
        return val.split("\r\n");
    };
    serializeChoices(val){
        if(!val) return "";
        if(!_.isArray(val)) val = [val];
        return val.join("\r\n");
    }

    handleRemove(){
        // console.log("ReplyItem.onRemove::called");
        this.onRemove(this.state);
    }

    handleAddCarouselItem(){
        var currentQty = this.state.CarouselItemQty || 1;
        this.setState({"CarouselItemQty": ++currentQty});
        console.log('Add Carousel Item', this.state.CarouselItemQty);
    }

    handleDeleteCarouselItem(event, target){
        let index = target.index,
            currentQty = this.state.CarouselItemQty || 1;

        this.setState({"CarouselItemQty": --currentQty});

        this.handleRemoveArrayItem('content', index);
    }

    render(){
        const choiceFields = [
            <div key="choice-title" className="row form-group">
                <label className="large-2 column">Title: </label>
                <div className="large-10 column ">
                    <input value={_.get(this.state,"meta.title")} name="meta.title" onChange={this.handleInputChange}/>
                </div>
            </div>
            ,
            <div key="choice-subtitle" className="row form-group">
                <label className="large-2 column">Subtitle: </label>
                <div className="large-10 column ">
                    <input value={_.get(this.state,"meta.subtitle")} name="meta.subtitle" onChange={this.handleInputChange}/>
                </div>
            </div>
            ,
            <div key="choice-text" className="row form-group">
                <label className="large-2 column">Text: </label>
                <div className="large-10 column ">
                    <input value={_.get(this.state,"meta.text")} name="meta.text" onChange={this.handleInputChange}/>
                </div>
            </div>
            ,
            <div key="choice-content" className="row form-group">
                <label className="large-2 column">Choices<br/>(One per Line): </label>
                <div className="large-10 column ">
                    <TextArea
                        value={this.serializeChoices(_.get(this.state,"content"))}
                        name="content"
                        onChange={this.handleUpdateChoices.bind(this)}/>
                </div>
            </div>
        ];

        const textFields = [
            <div key="text-content" className="row form-group">
                <label className="large-2 column">Message: </label>
                <div className="large-10 column ">
                    <TextArea value={this.state.content.toString()} name="content" onChange={this.handleInputChange}/>
                </div>
            </div>
        ];

        let jsContext = {"_":_};
        const functionFields = [
            <div key="text-content" className="row form-group">
                <label className="large-2 column">Script: </label>
                <div className="large-10 column ">
                    <CodeMirrorControl
                        ref={(e)=>this.replyCMC = e}
                        name="content"
                        value={this.state.content.toString()}
                        onChange={this.handleFormBaseChange}
                        jsContext={jsContext}
                    />
                </div>
            </div>
        ];

        const mediaFields = [
            <div key="media-content-type" className="row form-group">
                <label className="large-2 column">Content-type:</label>
                <div className="large-10 column">
                    <input value={_.get(this.state,"content.contentType")} name="content.contentType" onChange={this.handleInputChange}/>
                </div>
            </div>,
            <div key="media-content-url" className="row form-group">
                <label className="large-2 column">Url:</label>
                <div className="large-10 column">
                    <input value={_.get(this.state,"content.contentUrl")} name="content.contentUrl" onChange={this.handleInputChange}/>
                </div>
            </div>,
            <div key="media-content-name" className="row form-group">
                <label className="large-2 column">Name:</label>
                <div className="large-10 column">
                    <input value={_.get(this.state,"content.name")} name="content.name" onChange={this.handleInputChange}/>
                </div>
            </div>
        ];


        const CarouselTemplate = () => {

            let template = [],
                qty = this.state.CarouselItemQty || 1;

            for(var index = 0; index < qty; index++){
                template.push(
                    [
                        <div className="carousel-item">
                            <div key="carousel-content-delete" className="row form-group">
                                <Button
                                icon='delete'
                                size='small'
                                content='delete'
                                index={index}
                                onClick={this.handleDeleteCarouselItem.bind(this)} />
                            </div>
                            <div key="carousel-content-image" className="row form-group">
                                <label className="large-2 column">Image:</label>
                                <div className="large-10 column">
                                    <input value={_.get(this.state,`content[${index}].image`)} name={`content[${index}].image`} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div key="carousel-content-title" className="row form-group">
                                <label className="large-2 column">Title:</label>
                                <div className="large-10 column">
                                    <input value={_.get(this.state,`content[${index}].title`)} name={`content[${index}].title`} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div key="carousel-content-text" className="row form-group">
                                <label className="large-2 column">Text:</label>
                                <div className="large-10 column">
                                    <input value={_.get(this.state,`content[${index}].text`)} name={`content[${index}].text`} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div key="carousel-content-buttonText" className="row form-group">
                                <label className="large-2 column">Button Text:</label>
                                <div className="large-10 column">
                                    <input value={_.get(this.state,`content[${index}].buttonText`)} name={`content[${index}].buttonText`} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <div key="carousel-content-buttonLink" className="row form-group">
                                <label className="large-2 column">Button Link:</label>
                                <div className="large-10 column">
                                    <input value={_.get(this.state,`content[${index}].buttonLink`)} name={`content[${index}].buttonLink`} onChange={this.handleInputChange}/>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ]
                );
            }

            return template;
        };

        const CarouselList = CarouselTemplate();

        const carouselFields = [
            CarouselList,
            <Button
            icon='plus'
            size='small'
            content='Add Carousel Item'
            onClick={this.handleAddCarouselItem.bind(this)} />
        ];

        const typeOpts = [
            {"value":"text","label":"Text"},
            // {"value":"carousel","label":"Carousel"},
            {"value":"media","label":"Media"},
            {"value":"choice","label":"Choices"},
            {"value":"function","label":"Function"}
        ];

        const typeFileds={
            "text":textFields,
            "carousel":carouselFields,
            "media":mediaFields,
            "choice":choiceFields,
            "function":functionFields
        };

        return (
            <div className="reply-container">
                <div className="reply-top">
                  <DragHandle/>
                    <i className="remove trash large icon" aria-hidden="true" onClick={this.handleRemove.bind(this)}/>
                </div>
                <Form>
                    <div className="row form-group">
                        <label className="large-2 column">Type: </label>
                        <div className="large-10 column ">
                            <Select
                                options={typeOpts}
                                value={this.state.type}
                                onChange={this.handleTypeChange.bind(this)}
                                autosize
                                inputProps={ { type: 'react-type' } }
                            />
                        </div>
                    </div>
                    {typeFileds[this.state.type]}
                </Form>
            </div>

        )
    }
}
