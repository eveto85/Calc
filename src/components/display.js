import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../shared/colors';
import { Row, Column } from '../shared/grid';
import Backspace from '../assets/ic_backspace.svg';

const DisplayStyled = styled.div`
    background-color: ${colors.backGroundDisplayColor};
`;
const ScreenCalculationsStyled = styled.div`
    color: ${colors.fontLightColor};
    font-size: 3em;
    text-align: right;
    word-wrap: break-word;
    overflow-y: scroll;
    max-height: 124px;
`;
const ScreenResultStyled = styled.div`
    margin-top: 1em;
    text-align: right;
    font-size: 3em;
    color: ${props => props.active ? colors.ctaColor : colors.fontDullColor};
`;

const CleanButtonStyled = styled.div`
    color: ${colors.accentColor};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    cursor: pointer;
`;

class Display extends Component {
    render() {
        //$0.scrollTop = $0.scrollHeight
        return (
            <DisplayStyled>
                <Row Padding="1em 15px">
                    <Column>
                        <ScreenCalculationsStyled>{this.props.calculations}</ScreenCalculationsStyled>
                        <ScreenResultStyled>{this.props.result}</ScreenResultStyled>
                    </Column>
                </Row>
                <Row JustifyContent="space-between" Padding="0.7em 0">
                    <Column  xs="6">
                        <CleanButtonStyled onClick={this.props.removeEverything}>C</CleanButtonStyled>
                    </Column>
                    <Column  xs="6">
                        <CleanButtonStyled onClick={this.props.removeLastDigit}><img src={Backspace} alt="Backspace"/></CleanButtonStyled>
                    </Column>
                </Row>
            </DisplayStyled>
        );
    }
}

Display.propTypes = {
    removeEverything: PropTypes.func.isRequired,
    removeLastDigit: PropTypes.func.isRequired,
    calculations: PropTypes.string,
    result: PropTypes.number,
};

export default Display;