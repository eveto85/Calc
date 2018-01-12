import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../shared/colors';

const DisplayStyled = styled.div`
    background-color: ${colors.borderColor};
    height: 150px;
`;
const ScreenCalculations = styled.div`
    color: ${colors.fontLightColor};
`;
const ScreenResult = styled.div`
    color: ${props => props.active ? colors.ctaColor : colors.fontDullColor};
`;

class Display extends Component {
    render() {
        return (
            <DisplayStyled>
                <ScreenCalculations>1212+1212</ScreenCalculations>
                <ScreenResult>9102831</ScreenResult>
            </DisplayStyled>
        );
    }
}

Display.propTypes = {

};

export default Display;