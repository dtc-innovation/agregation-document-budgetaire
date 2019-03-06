import {createStore} from 'redux'

export const Actions = Object.freeze({
    'ADD_FORMULA': 'ADD_FORMULA',
    'SET_TESTED_DOCUMENT_BUDGETAIRE': 'SET_TESTED_DOCUMENT_BUDGETAIRE'
})


function reducer(state, action){
    switch(action.type){
        case Actions.ADD_FORMULA: {
            const {name, formula} = action;
            state.formulas.push({name, formula})
            return Object.assign({}, state);
        }
        case Actions.SET_TESTED_DOCUMENT_BUDGETAIRE: {
            const {testedDocumentBudgetaire} = action;
            state.testedDocumentBudgetaire = testedDocumentBudgetaire
            return Object.assign({}, state);
        }

        default: {
            return state
        }
    }
}

export default createStore(
    reducer,
    {
        formulas: [],
        testedDocumentBudgetaire: undefined
    }
);