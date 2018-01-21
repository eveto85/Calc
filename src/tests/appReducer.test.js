import appReducer from '../reducers/appReducer';
import { REMOVE_EVERYTHING, REMOVE_LAST_DIGIT, ADD_INPUT, ADD_OPERATOR, ADD_PARENTH, ADD_PERCENT, TOGGLE_NEGATION, CALCULATE } from '../actions';

const initialState = {
    input: '',
    operator: '',
    parenth: '',
    expressions: [],
    displayedString: '',
    result: "0",
    calculatingDone: false
};

describe('app reducer', () => {
    it('should return the initial state', () => {
        expect(appReducer(undefined, {})).toEqual(initialState)
    });

    it('should handle ADD_INPUT', () => {
        expect(
            appReducer(initialState, {
                type: ADD_INPUT,
                input: '1'
            })
        ).toEqual({
            ...initialState,
            input: '1',
            expressions: [{type: 'input', value: '1'}],
            displayedString: '1'
        })

        expect(
            appReducer({
                    ...initialState,
                    input: '1',
                    expressions: [{type: 'input', value: '1'}],
                    displayedString: '1'
                },
                {
                    type: ADD_INPUT,
                    input: '6'
                }
            )
        ).toEqual({
                ...initialState,
                input: '6',
                expressions: [{type: 'input', value: '16'}],
                displayedString: '16'
        })
    })
})