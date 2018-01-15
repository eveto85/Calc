import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Column, MediaSizes } from '../shared/grid';
import DisplayStyled from '../components/display';
import Button from '../components/button';
import styled from 'styled-components';
import { colors } from '../shared/colors';
import { buttons } from '../shared/helpers';
import { removeEverything, removeLastDigit, addInput, addOperator, addParenth, addPercent, toggleNegation} from '../actions/index';

const CalculatorStyled = styled.div`
    background-color: ${colors.backGroundDarkColor};
    margin-top: 1em;
    transition: margin-top .3s;
    @media (min-width: ${MediaSizes.md}) {
        margin-top: 3em;
    }
`;

const basicOperations = ['/','*','+','-','='];

class Calculator extends Component {
    constructor(props){
        super(props)
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    }
      
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown(event) {
        let { key } = event;
        if (key === 'Enter')
            key = '='
        if ((/\d/).test(key)) {
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
            if (this.props.displayedString !== '') {
                this.props.removeEverything();
            }
        }
    }
    render() {
        return (
            <Row>
                <Column>
                    <CalculatorStyled>
                        <DisplayStyled removeEverything={this.props.removeEverything} removeLastDigit={this.props.removeLastDigit} displayedString={this.props.displayedString} result={this.props.result}/>
                        <Row>
                        {
                            buttons.map(butt =>
                                <Column xs="6" key={butt.value}>
                                    <Button type={butt.type} value={butt.value} addInput={this.props.addInput} addOperator={this.props.addOperator} addParenth={this.props.addParenth} addPercent={this.props.addPercent} toggleNegation={this.props.toggleNegation} />
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
    input: state.calculations.input
})

const mapDispatchToProps = {
    removeEverything,
    removeLastDigit,
    addInput,
    addOperator,
    addParenth,
    addPercent, 
    toggleNegation
};
export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
