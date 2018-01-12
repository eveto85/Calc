import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DisplayStyled from '../components/display';
import styled from 'styled-components';
import { colors } from '../shared/colors';

const CalculatorStyled = styled.div`
    background-color: ${colors.backGroundDarkColor};
    height: 700px;
`;
class Calculator extends Component {


    render() {
        return (
            <CalculatorStyled>
                <DisplayStyled>8102</DisplayStyled>
            </CalculatorStyled>
        );
    }
}

Calculator.propTypes = {

};

export default Calculator;