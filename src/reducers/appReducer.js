import { REMOVE_EVERYTHING, REMOVE_LAST_DIGIT, ADD_INPUT, ADD_OPERATOR, ADD_PARENTH, ADD_PERCENT, TOGGLE_NEGATION, CALCULATE } from '../actions';
import { joinExpressionsIntoString, isItNumber, checkFixedDigitsLength } from '../shared/helpers';

//reducers
/* In an actual, bigger project -split in a couple of reducers based on action types */

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
    curly brackets after some case are for keeping let's in the specific case's block scope, a switch is normally single block
*/
export default (state = initialState, action) => {    
    let { input, parenth, operator, result } = state;
    //avoid mutation
    let expressions = state.expressions.slice();
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
        case REMOVE_LAST_DIGIT: 
            if (expressions.length > 0) {
                if (expressions[expressions.length - 1].value.length === 1) {
                    expressions.pop();
                } else {
                    const temper = expressions.pop();
                    expressions.push({...temper, value: temper.value.slice(0,-1)});
                }
                if (expressions.length) {
                    const { type, value } = expressions[expressions.length - 1];
                    let lastStroke = value[value.length - 1];
                    input =''; parenth = ''; operator = '';

                    switch (type) {
                        case 'input':
                            input = lastStroke;
                        break;
                        case 'operator':
                            operator = lastStroke;
                        break;
                        case 'parenth':
                            parenth = lastStroke;
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
                expressions: expressions,
                calculatingDone: false,
                result: '0'
            }
        case ADD_INPUT: 
            if (expressions.length && expressions[expressions.length - 1].type === 'input') {
                /*  stripping off 0 to avoid input as 012+123 which would fail in strict mode */
                if (input && lastExpressionValue === '0' && lastExpressionValue.length === 1 && actionInput !== '.') {
                    const temper = expressions.pop();
                    expressions.push({...temper, value: actionInput});
                    input = actionInput;    
                    operator = '';
                    parenth = '';
                } else if (actionInput === '.' && lastExpressionValue.includes('.')) {
                /*   Making sure we don't get more than one decimal separator */ 
                    return state;
                } else {
                    const temper = expressions.pop();
                    expressions.push({...temper, value: temper.value + actionInput});
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
                expressions: expressions,
                calculatingDone: false,
                result: '0'
            }
        case ADD_OPERATOR: 
            if (expressions.length === 0) {
                return state;
            }
            if (operator && expressions[expressions.length - 1].type === 'operator') {
                const temper = expressions.pop();
                expressions.push({...temper, value: actionOperator});
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
                displayedString: joinExpressionsIntoString(expressions),
                calculatingDone: false,
                result: '0'
            }
        case ADD_PARENTH: 
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
                expressions: expressions,
                calculatingDone: false,
                result: '0'
            }
        case ADD_PERCENT: 
            if (input && isItNumber(lastExpressionValue) && lastExpressionValue !== '0' && lastExpressionValue !== '.') {
                const fixedDigitsLength = checkFixedDigitsLength(lastExpressionValue);
                const temper = expressions.pop();
                expressions.push({...temper, value: ((parseFloat(lastExpressionValue))/100).toFixed(fixedDigitsLength + 2)});
                return {
                    ...state,
                    displayedString: joinExpressionsIntoString(expressions),
                    expressions: expressions,
                    calculatingDone: false,
                    result: '0'
                }
            } else {
                return state;
            }
        case TOGGLE_NEGATION: 
            /*  making sure the last input exists && ==!'.'||'0'  */
            if (input && isItNumber(lastExpressionValue) && lastExpressionValue !== '0') {
                const newValue = parseFloat(lastExpressionValue) * -1;
                const temper = expressions.pop();
                expressions.push({...temper, value: String(newValue)});
                input = newValue;
                return {
                    ...state,
                    input: input,
                    operator: operator,
                    parenth: parenth,
                    displayedString: joinExpressionsIntoString(expressions),
                    expressions: expressions,
                    calculatingDone: false,
                    result: '0'
                }
            } else {
                return state;
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
                    let evaluatedAmount = eval(displayedString);
                    const fixedDigitsLength = checkFixedDigitsLength(evaluatedAmount.toString());
                    if (fixedDigitsLength > 3) {
                        //all that conversion is to avoid having 98.000(removing zeros) after fixing to 3 decimals
                        evaluatedAmount = (parseFloat(evaluatedAmount.toFixed(3))).toString();
                    } else {
                        evaluatedAmount.toString();
                    }
                    
                    result = `=${evaluatedAmount}`;
                    input = evaluatedAmount;
                    operator = '';
                    parenth = '';
                    displayedString = '';
                    calculatingDone = true;
                    expressions = [{type: 'input', value: evaluatedAmount}];

                } catch (error) {
                    console.error(error);
                    alert("Something went totally wrong! Try pressing F12(Windows) or Cmd+Alt+I(Mac) when the console opens calculate whatever you wanted me to calculate. "+error);
                }
            } else {
                return state;
            }
            return {
                ...state,
                input,
                operator,
                parenth,
                displayedString,
                expressions,
                calculatingDone,
                result
            }
        }
        default:
            return state
    }
}
