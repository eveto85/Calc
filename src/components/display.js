import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../shared/colors';
import { Row, Column } from '../shared/grid';
import Backspace from '../assets/ic_backspace.svg';

const DisplayStyled = styled.div`
    background-color: ${colors.backGroundDisplayColor};
`;
const DisplayCalculationsStyled = styled.div`
    color: ${colors.fontLightColor};
    font-size: 3em;
    text-align: right;
    word-wrap: break-word;
    overflow-y: scroll;
    max-height: 124px;
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.3);
        background-color: ${colors.backGroundDisplayColor};
    }
    &::-webkit-scrollbar {
        width: 5px;
        background-color: ${colors.backGroundDisplayColor};
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${colors.backGroundDisplayColor};
        border: 1px solid ${colors.backGroundDisplayColor};
    }
`;
const DisplayResultStyled = styled.div`
    margin-top: 1em;
    text-align: right;
    font-size: 3em;
    color: ${props => props.active ? colors.ctaColor : colors.fontDullColor};
    word-wrap: break-word;
    max-height: 124px;
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

    componentWillReceiveProps (nextProps){
        if (this.calculationsDisplay.scrollHeight > 160) {
            this.calculationsDisplay.scrollTop = this.calculationsDisplay.scrollHeight/2;
        } else {
            this.calculationsDisplay.scrollTop = 0;
        }
    }
    /* CleanButtonStyled > img needs an actual svg loader and wrapper for inlining instead */
    render() {
        return (
            <DisplayStyled>
                <Row Padding="1em 15px">
                    <Column>
                        <DisplayCalculationsStyled innerRef={r => this.calculationsDisplay = r}>
                            {this.props.displayedString || '0'}
                        </DisplayCalculationsStyled>
                        <DisplayResultStyled active={this.props.calculatingDone}>
                            {this.props.result}
                        </DisplayResultStyled>
                    </Column>
                </Row>
                <Row JustifyContent="space-between" Padding="0.7em 0">
                    <Column  xs="6">
                        <CleanButtonStyled onClick={this.props.removeEverything}>C</CleanButtonStyled>
                    </Column>
                    <Column  xs="6">
                        <CleanButtonStyled onClick={this.props.removeLastDigit}>
                            <img src={Backspace} alt="Backspace"/>
                        </CleanButtonStyled>
                    </Column>
                </Row>
            </DisplayStyled>
        );
    }
}

Display.propTypes = {
    removeEverything: PropTypes.func.isRequired,
    removeLastDigit: PropTypes.func.isRequired,
    displayedString: PropTypes.string,
    result: PropTypes.string,
    calculatingDone: PropTypes.bool,
};

export default Display;