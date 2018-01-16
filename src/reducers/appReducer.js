import { combineReducers } from 'redux';
import { REMOVE_EVERYTHING, REMOVE_LAST_DIGIT, ADD_INPUT, ADD_OPERATOR, ADD_PARENTH, ADD_PERCENT, TOGGLE_NEGATION, CALCULATE } from '../actions';
import { joinExpressionsIntoString, isItNumber } from '../shared/helpers';

//reducers
/* Split in a couple of reducers based on action types */

const initialState = {
    input: '',
    operator: '',
    parenth: '',
    expressions: [],
    displayedString: '',
    result: "0",
    calculatingDone: false
}
/* state.expressions = [{type: 'input': value:'8'}];
    curly brackets after each case are for keeping let's in the specific case's block scope, a switch is normally single block
*/
const calculations = (state = initialState, action) => {    
    if (state.calculatingDone) {
        return {
            ...state,
            input: '',
            operator: '',
            parenth: '',
            expressions: [],
            displayedString: '',
            result: "0",
            calculatingDone: false
        }
    }
    let { input, parenth, operator, expressions, result } = state;
    let actionInput = action.input;
    let actionOperator = action.operator;
    let actionParenth = action.parenth;
    let openedParentheses = 0;
    let closedParentheses = 0;
    let lastExpressionValue;

    if (expressions.length > 0) {
        expressions.forEach(exp => {
            lastExpressionValue = expressions[expressions.length - 1].value;
            if (exp.value === '(') {openedParentheses++}
            if (exp.value === ')') {closedParentheses++}
        });
    }
    switch (action.type) {
        case REMOVE_EVERYTHING:
            return {
                ...state,
                input: '',
                operator: '',
                parenth: '',
                expressions: [],
                displayedString: '',
                result: "0",
                calculatingDone: false
            }
        case REMOVE_LAST_DIGIT: {
        // TODO set the correct type
            if (expressions.length > 0) {
                if (expressions[expressions.length - 1].value.length === 1) {
                    expressions.pop();
                } else {
                    expressions[expressions.length - 1].value = expressions[expressions.length - 1].value.slice(0,-1);
                }
                if (expressions.length) {
                    const { type, value } = expressions[expressions.length - 1];
                    input =''; parenth = ''; operator = '';

                    switch (type) {
                        case 'input':
                            input = value[value.length - 1];
                        break;
                        case 'operator':
                            operator = value[value.length - 1];
                        break;
                        case 'parenth':
                            parenth = value[value.length - 1];
                        break;
                    }
                }
            }
            return {
                ...state,
                input: input,
                operator: operator,
                parenth: parenth,
                displayedString: joinExpressionsIntoString(expressions),
                expressions: expressions
            }
        }
        case ADD_INPUT: 
            if (expressions.length && expressions[expressions.length - 1].type === 'input') {
            /*   Making sure we don't get more than one decimal separator */ 
            if (actionInput === '.' && expressions[expressions.length - 1].value.includes('.')) {
                    return state;
                } else {
                    expressions[expressions.length - 1].value += actionInput;
                    input = actionInput;
                    operator = '';
                    parenth = '';
                }
            } else {
                expressions.push({type: 'input', value: actionInput});
                input = actionInput;
                operator = '';
                parenth = '';
            }
            return {
                ...state,
                input: input,
                operator: operator,
                parenth: parenth,
                displayedString: joinExpressionsIntoString(expressions),
                expressions: expressions
            }
        case ADD_OPERATOR: 
            if (expressions.length === 0) {
                return state;
            }
            if (operator && expressions[expressions.length - 1].type === 'operator') {
                expressions[expressions.length - 1].value === actionOperator;
                operator = actionOperator;
                parenth = '';
                input = '';
            } 
            if (input || parenth === ')') {
                expressions.push({type: 'operator', value: actionOperator});
                operator = actionOperator;
                parenth = '';
                input = '';
            }
            return {
                ...state,
                input: input,
                operator: operator,
                parenth: parenth,
                expressions: expressions,
                displayedString: joinExpressionsIntoString(expressions)
            }
        case ADD_PARENTH: {
            if (actionParenth === '(') {
                if (expressions.length === 0 || operator || parenth) {
                    expressions.push({type: 'parenth', value: actionParenth});
                    parenth = actionParenth;
                    input = '';
                    operator = '';
                } else {
                    return state;
                }
            } else {
                if (openedParentheses > closedParentheses && expressions[expressions.length - 1].value !== '(' && !operator) {
                    expressions.push({type: 'parenth', value: actionParenth});
                    parenth = actionParenth;                
                    input = '';
                    operator = '';
                } else {
                    return state;
                }
            }
            return {
                ...state,
                input: input,
                operator: operator,
                parenth: parenth,
                displayedString: joinExpressionsIntoString(expressions),
                expressions: expressions
            }
        }
        case ADD_PERCENT: {
            if (input && isItNumber(lastExpressionValue) && lastExpressionValue !== '0' && lastExpressionValue !== '.') {
                const fixedDigitsLength =  lastExpressionValue.replace(/^-?\d*\.?/, '').length;
                expressions[expressions.length - 1].value = ((parseFloat(lastExpressionValue))/100).toFixed(fixedDigitsLength + 2);
            } else {
                return state;
            }
            return {
                ...state,
                displayedString: joinExpressionsIntoString(expressions),
                expressions: expressions
            }
        }
        case TOGGLE_NEGATION: 
            if (input && isItNumber(lastExpressionValue) && lastExpressionValue !== '0' && lastExpressionValue !== '.') {
                const newValue = parseFloat(lastExpressionValue) * -1;
                expressions[expressions.length - 1].value = String(newValue);
            } else {
                return state;
            }
            return {
                ...state,
                input: input,
                operator: operator,
                parenth: parenth,
                displayedString: joinExpressionsIntoString(expressions),
                expressions: expressions
            }
        case CALCULATE: {
            let { displayedString, calculatingDone } = state;

            if (expressions.length) {
                if (openedParentheses > closedParentheses || expressions[expressions.length - 1].type === 'operator') {
                    alert("Invalid input");
                    return state;
                }
                displayedString = joinExpressionsIntoString(expressions);                    

                try {
                    result = `=${(eval(displayedString)).toString()}`;
                    calculatingDone = true;
                  }
                  catch(error) {
                    console.error(error);
                    alert("Something went totally wrong! Try pressing F12(Windows) or Cmd+Alt+I(Mac) when the console opens calculate whatever you wanted me to calculate. "+error);

                  }
            } else {
                return state;
            }
            return {
                ...state,
                displayedString,
                result: result,
                calculatingDone
            }
        }
        default:
            return state
    }
}

const appReducer = combineReducers({
    calculations
});

export default appReducer;