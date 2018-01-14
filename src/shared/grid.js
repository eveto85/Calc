import styled from 'styled-components';

export const MediaSizes = {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
}
const GridSize = 24;
const GridGutter = 4;

export const ContainerFluid = styled.div`
    display: block;
    position: relative;
    max-width: ${props => props.width ? props.width : '100%'};
    padding-left: 15px;
    padding-right: 15px;
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
`;

export const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: ${`${GridGutter/-2}px`};
    margin-left: ${`${GridGutter/-2}px`};
    ${props => props.flexDirectionColumn && 'flex-direction: column'};
    ${props => props.JustifyContent && `justify-content: ${props.JustifyContent}`};
    ${props => props.JustifyItems && `justify-items: ${props.JustifyItems}`};
    ${props => props.AlignContent && `align-content: ${props.AlignContent}`};
    ${props => props.AlignSelf && `align-self: ${props.AlignSelf}`};
    ${props => props.AlignItems && `align-items: ${props.AlignItems}`};
    ${props => props.MobileHidden && `display: none`};
    ${props => props.Margin && `margin: ${props.Margin}`};
    ${props => props.Padding && `padding: ${props.Padding}`};

    @media (min-width: ${MediaSizes.md}) {
        ${props => props.MobileHidden && `display: block`};
        ${props => props.DesktopHidden && `display: none`};
    }
`;
const defaultColumnsBehavior = `flex-grow: 1;flex-basis: 0;max-width: 100%;`;

const fullWidthUpToBreakpoint = `flex: none; max-width: 100%;`;

const autoFromBreakpointUp = `flex-grow: 0; flex-shrink: 0; flex-basis: auto; max-width: 100%; width: auto;`;

const specificColumnSize = prop =>
    (`flex-grow: 0;flex-shrink: 0;flex-basis: ${(100/(GridSize/prop))}%;max-width: ${(100/(GridSize/prop))}%;`);

let columnStyles;
const getStylingForProps = props => {

    let propsArr = Object.keys(props).filter(prop => Object.keys(MediaSizes).includes(prop));
    let lockedDefaultXs = false;
    columnStyles = {};

    columnStyles.xs = defaultColumnsBehavior;
    if (propsArr.length) {
        propsArr.map(prop => {
            if (props[prop] === true) {
                if (columnStyles.xs === defaultColumnsBehavior) {
                    columnStyles.xs = fullWidthUpToBreakpoint;
                }
                columnStyles[prop] = defaultColumnsBehavior;
                lockedDefaultXs = prop === 'xs';
            }
            if (typeof(props[prop]) === 'string') {
                if (props[prop] === 'auto') {
                    if (columnStyles.xs === defaultColumnsBehavior && !lockedDefaultXs) {
                        columnStyles.xs = fullWidthUpToBreakpoint;
                    }
                    columnStyles[prop] = autoFromBreakpointUp;
                } else {
                    //it's a "number"
                    //prevent overwriting of existing xs styling (ex. xs lg="8")
                    if (columnStyles.xs === defaultColumnsBehavior && !lockedDefaultXs) {
                        columnStyles.xs = fullWidthUpToBreakpoint;
                    }
                    columnStyles[prop] = specificColumnSize(Number(props[prop]));
                }
            }
            if (typeof(props[prop]) === 'number') {
                //it's a number
                if (columnStyles.xs === defaultColumnsBehavior && !lockedDefaultXs) {
                    columnStyles.xs = fullWidthUpToBreakpoint;
                }
                columnStyles[prop] = specificColumnSize(props[prop]);
            }
        });
    }
}

export const Column = styled.div`
    /* Basic default styling ***************/
    position: relative;
    width: 100%;
    min-height: 1px;
    padding-left: ${`${GridGutter/2}px`};
    padding-right: ${`${GridGutter/2}px`};
    box-sizing: border-box;

    /**************************************/
    /*Prop dependant styling*/
    ${props => props.OrderXs && `order: ${props.OrderXs}`};
    ${props => props.mgb && `margin-bottom: ${props.mgb}`};
    ${props => props.mgt && `margin-top: ${props.mgt}`};
    ${props => props.LeftOffsetXs && `margin-left: auto!important;`};
    ${props => props.RightOffsetXS && `margin-right: auto!important;`};
    ${props => getStylingForProps(props)};
    ${props => columnStyles.xs};

    @media (min-width: ${MediaSizes.sm}) {
        ${props => props.LeftOffsetSm && `marsgin-left: auto!important;`};
        ${props => props.RightOffsetSm && `margin-right: auto!important;`};
        ${props => props.OrderSm && `order: ${props.OrderSm}`};
        ${props => columnStyles.sm};
    }
    @media (min-width: ${MediaSizes.md}) {
        ${props => props.LeftOffsetMd &&`margin-left: auto!important;`};
        ${props => props.RightOffsetMd &&`margin-right: auto!important;`};
        ${props => props.OrderMd &&`order: ${props.OrderMd}`};
        ${props => columnStyles.md};
    }
    @media (min-width: ${MediaSizes.lg}) {
        ${props => props.LeftOffsetLg &&`margin-left: auto!important;`};
        ${props => props.RightOffsetLg &&`margin-right: auto!important;`};
        ${props => props.OrderLg &&`order: ${props.OrderLg}`};
        ${props => columnStyles.lg};
    }
    @media (min-width: ${MediaSizes.xl}) {
        ${props => props.LeftOffsetXl &&`margin-left: auto!important;`};
        ${props => props.RightOffsetXl &&`margin-right: auto!important;`};
        ${props => props.OrderXl &&`order: ${props.OrderXl}`};
        ${props => columnStyles.xl};
    }
`;