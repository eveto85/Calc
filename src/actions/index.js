export const REMOVE_EVERYTHING = 'REMOVE_EVERYTHING';
export const REMOVE_LAST_DIGIT = 'REMOVE_LAST_DIGIT';
export const ADD_INPUT = 'ADD_INPUT';
export const ADD_OPERATOR = 'ADD_OPERATOR';
export const ADD_PARENTH = 'ADD_PARENTH';
export const ADD_PERCENT = 'ADD_PERCENT';
export const ADD_NEGATION = 'ADD_NEGATION';

//action creators
export const removeEverything = () => ({
    type: REMOVE_EVERYTHING
});

export const removeLastDigit = () => ({
    type: REMOVE_LAST_DIGIT
});

export const addInput = input => ({
    type: ADD_INPUT,
    input
});

export const addOperator = operator => ({
    type: ADD_OPERATOR,
    operator
});

export const addParenth = parenth => ({
    type: ADD_PARENTH,
    parenth
});

export const addPercent = () => ({
    type: ADD_PERCENT
});

export const toggleNegation = () => ({
    type: ADD_NEGATION
});