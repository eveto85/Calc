import { combineReducers } from 'redux';
import { REMOVE_EVERYTHING, REMOVE_LAST_DIGIT, ADD_INPUT, ADD_OPERATOR, ADD_PARENTH } from '../actions';
import { isItNumber } from '../shared/helpers';

//reducers
const calculations = (state = {calculations: "0", result: 0, input: '', operator: '', parenth: '', parenthsOpened: 0, parenthsClosed: 0}, action) => {
    let { operator, input, parenth, parenthsOpened, parenthsClosed} = state;
    
    console.log(action.type);
    switch (action.type) {
    case REMOVE_EVERYTHING:
        return {
            ...state,
            input: '',
            operator: '',
            parenth: '',
            calculations: '0',
            parenthsOpened: 0,
            parenthsClosed: 0
        }
    case REMOVE_LAST_DIGIT:
        let newCalcs = state.calculations.slice(0,-1) || '0';
        let input = '';
        let operator = '';
        let parenth = '';
        if (newCalcs !== '0') {
            let newCalcsArr = newCalcs.split('');
            const newCalcsArrLength = newCalcsArr.length;
            newCalcsArr.forEach((item,i) => {
                if (item === '(') {
                    parenthsOpened++;
                }
                if (item === ')') {
                    parenthsClosed++;
                }
                if (i === newCalcsArrLength - 1) {
                    if (isItNumber(item)) {
                        console.log('input');
                        input = item;
                    }
                    if (item === '(' || item === ')') {
                        parenth = item;
                        console.log('input');
                    } else {
                        operator = item;
                        console.log('input');
                    }
                }

            });
        }
        return {
            ...state,
            input: input,
            operator: operator,
            parenth: parenth,
            calculations: newCalcs,
            parenthsOpened: parenthsOpened,
            parenthsClosed: parenthsClosed
        }
    case ADD_INPUT:
        return {
            ...state,
            input: action.input,
            operator: '',
            parenth: '',
            calculations: state.calculations === '0' ? action.input : state.calculations + action.input
        }
    case ADD_OPERATOR:
        let currentCalcs = state.calculations;
        let actionOperator = action.operator;
        if (currCalcs === '0') {
            actionOperator = '';
        }
        if (state.operator) {
            currentCalcs = state.calculations.slice(0,-1) + actionOperator;
        } 
        if (state.input) {
            currentCalcs += actionOperator;
        }
        return {
            ...state,
            input: '',
            operator: actionOperator,
            parenth: '',
            calculations: currentCalcs
        }
    case ADD_PARENTH:
        let currCalcs = state.calculations;

        if (action.parenth === '(') {
            if (currCalcs === '0') {
                currCalcs = action.parenth;
                parenthsOpened++;
            } else {
                currCalcs += action.parenth;
                parenthsOpened++;
            }
        } else {
            if (state.parenthsOpened > state.parenthsClosed +1) {
                currCalcs += action.parenth;
                parenthsClosed++;
            } 
        }
        return {
            ...state,
            operator: '',
            input: '',
            parenth: action.parenth,
            calculations: currCalcs,
            parentsOpened: parenthsOpened,
            parentsClosed: parenthsClosed
        }
    default:
        return state
    }
}

const appReducer = combineReducers({
    calculations
})

export default appReducer;