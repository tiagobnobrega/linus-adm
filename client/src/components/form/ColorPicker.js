import React from 'react';
import FormBaseControl from './FormBaseControl';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';//TODO Remover estilo inline
import parse_color from 'parse-color';

export default class ColorPicker extends FormBaseControl{
    constructor(props){
        super(props);
        this.state = {
            displayColorPicker: false,
            name:props.name,
            value:props.value,
            color: this.parseColor(props.value)
        };
        this.onChange = props.onChange ||(()=>null);
    }

    stringifyColor(color){
        // console.log('stringifyColor::'+color);
        return `rgba(${color.r},${color.g},${color.b},${color.a})`;
    }

    parseColor(strColor){
        if(!strColor) strColor='rgba(0,0,0,1)';
        let rgbArr = parse_color(strColor).rgb;
        return {
            r: rgbArr[0].toString(),
            g: rgbArr[1].toString(),
            b: rgbArr[2].toString(),
            a: (rgbArr[3] || 1).toString()
        }
    }

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })

    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({
            value: this.stringifyColor(color.rgb),
            color: color.rgb
        },()=>{
            this.onChange(this.state);
        });
    };

    render() {
        const styles = reactCSS({
            'default': {
                color: {
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
                },
                swatch: {
                    padding: '5px',
                    background: '#fff',
                    borderRadius: '1px',
                    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                    display: 'inline-block',
                    cursor: 'pointer',
                },
                popover: {
                    position: 'absolute',
                    zIndex: '2',
                },
                cover: {
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px',
                },
            },
        });

        return (
            <div>
                <div style={ styles.swatch } onClick={ this.handleClick }>
                    <div style={ styles.color } />
                </div>
                { this.state.displayColorPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.handleClose }/>
                    <SketchPicker color={ this.state.color } onChange={ this.handleChange.bind(this) } />
                </div> : null }

            </div>
        )
    }
}

