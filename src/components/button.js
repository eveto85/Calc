import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../shared/colors';
import { isItNumber } from '../shared/helpers';

const ButtonStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5em;
    height: 80px;
    color: ${colors.fontLightColor};
    cursor: pointer;
    /* transition: height .8s; */
    ${props => props.type === 'cta' && `background-color: ${colors.ctaColor}`};
    ${props => props.type === 'operator' && `color: ${colors.ctaColor}`};
    &:active {
        font-size: 1.8em;
        color: ${colors.accentColor};
    }
`;

class Button extends Component {
    constructor(props){
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onButtonClick (){
        if (isItNumber(this.props.value) || this.props.value === '.') {
            this.props.addInput(this.props.value);
        } else if (this.props.value === '(' || this.props.value === ')') {
            this.props.addParenth(this.props.value);
        } else if (this.props.type === 'percent') {
            this.props.addPercent(this.props.value);
        } else if (this.props.type === 'negation') {
            this.props.toggleNegation(this.props.value);
        } else {
            this.props.addOperator(this.props.value);
        }
    }
    
    render() {
        return (
            <ButtonStyled type={this.props.type} onClick={this.onButtonClick}>
                {this.props.value}
            </ButtonStyled>
        );
    }
}

Button.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    addInput: PropTypes.func.isRequired,
    addOperator: PropTypes.func.isRequired,
    addParenth: PropTypes.func.isRequired
};

export default Button;