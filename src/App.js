import React, { Component } from 'react';
import { ContainerFluid } from './shared/grid';
import styled from 'styled-components';
import Calculator from './containers/calculator';
import { colors } from './shared/colors';

const PageStyled = styled.div`
    background-color: ${colors.backGroundDarkerColor};
    min-height: 100vh;
`;

class App extends Component {
    render() {
        return (
            <PageStyled>
                <ContainerFluid width="430px">
                    <Calculator />
                </ContainerFluid>
            </PageStyled>
        );
    }
}

export default App;
