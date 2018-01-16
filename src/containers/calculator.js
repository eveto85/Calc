import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Column, MediaSizes } from '../shared/grid';
import DisplayStyled from '../components/display';
import Button from '../components/button';
import styled from 'styled-components';
import { colors } from '../shared/colors';
import { buttons } from '../shared/helpers';
import { removeEverything, removeLastDigit, addInput, addOperator, addParenth, addPercent, toggleNegation, calculate } from '../actions/index';

const CalculatorStyled = styled.div`
    background-color: ${colors.backGroundDarkColor};
    margin: 1em 0;
    transition: margin-top .3s;
    @media (min-width: ${MediaSizes.md}) {
        margin-top: 3em;
    }
`;

const basicOperations = ['/','*','+','-'];

class Calculator extends Component {
    constructor(props){
        super(props)
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }
      
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        let { key } = event;
        if (key === 'Enter' || key === '=') {
            event.preventDefault();            
            this.props.calculate();
        } else if ((/\d/).test(key)) {
            event.preventDefault();
            this.props.addInput(key);
        } else if (basicOperations.includes(key)) {
            event.preventDefault();
            this.props.addOperator(key);
        } else if (key === '.') {
            event.preventDefault();
            this.props.addInput(key);
        } else if (key === '%') {
            event.preventDefault();
            this.props.addPercent();
        } else if (key === '(') {
            event.preventDefault();
            this.props.addParenth(key);
        } else if (key === ')') {
            event.preventDefault();
            this.props.addParenth(key);
        } else if (key === 'Backspace') {
            event.preventDefault();
            this.props.removeLastDigit();
        } else if (key === 'Clear' || key === 'Escape') {
            event.preventDefault();
            this.props.removeEverything();
        }
    }
    render() {
        return (
            <Row>
                <Column>
                    <CalculatorStyled>
                        <DisplayStyled removeEverything={this.props.removeEverything} removeLastDigit={this.props.removeLastDigit} displayedString={this.props.displayedString} result={this.props.result} calculatingDone={this.props.calculatingDone} />
                        <Row>
                        {
                            buttons.map(butt =>
                                <Column xs="6" key={butt.value}>
                                    <Button type={butt.type} value={butt.value} addInput={this.props.addInput} addOperator={this.props.addOperator} addParenth={this.props.addParenth} addPercent={this.props.addPercent} toggleNegation={this.props.toggleNegation} calculate={this.props.calculate}/>
                                </Column>
                            )
                        }
                        </Row>
                    </CalculatorStyled>
                </Column>
            </Row>
        );
    }
}

const mapStateToProps = state => ({
    result: state.calculations.result,
    displayedString: state.calculations.displayedString,
    calculatingDone: state.calculations.calculatingDone
});

const mapDispatchToProps = {
    removeEverything,
    removeLastDigit,
    addInput,
    addOperator,
    addParenth,
    addPercent, 
    toggleNegation,
    calculate
};
export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
