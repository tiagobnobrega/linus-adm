import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/diagramActions';
import {getActiveDialogs} from '../../reducers'

import _bindAll from 'lodash/bindAll';
import FormBaseControl from '../form/FormBaseControl';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class DialogSelect extends FormBaseControl{
  static propTypes = {
    value:PropTypes.string,
    name: PropTypes.string,
    dialogs: PropTypes.array,
    onChange: PropTypes.func
  };

    constructor(props){
        super();
      this.state={
        'value':props.value,
        'name':props.name
      };
        this.onChange = props.onChange || (()=>null);
      _bindAll(this,['buildOpts'])
    }

    buildOpts(){
        let opts = [{'value':"",'label':"None"}];
        let dialogsOpts = this.props.dialogs
            .map((d)=>{
            return {'value':d.id, 'label':(d.label || d.id)}
        });

        this.dialogOpts = opts.concat(dialogsOpts);
    }

    handleChange(selectedItem){
        this.setState(
            {'value':selectedItem.value},
            ()=>{this.onChange(this.state)}
        );
    }

    render(){
        this.buildOpts();
        let {className} = this.props;
        return (
            <Select
                className={className}
                options={this.dialogOpts}
                value={this.state.value}
                onChange={this.handleChange.bind(this)}
                searchable
                autosize
                inputProps={ { type: 'react-type' } }
            />
        )
    }

}

function mapStateToProps(state) {
  return {
    dialogs: getActiveDialogs(state),
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogSelect);
