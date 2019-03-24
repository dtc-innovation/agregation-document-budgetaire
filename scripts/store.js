import Store from 'baredux'

import {makeAsyncMutationFunctions} from './asyncStatusHelpers.js'

export default new Store({
    state: {
        formulas: new Map(),
        testedDocumentBudgetaire: undefined
    },
    mutations: {
        addFormula(state, {id, name, formula}){
            state.formulas.set(id, {id, name, formula})
        },
        changeFormula(state, newFormula){
            state.formulas.set(newFormula.id, newFormula)
        },
        testedDocumentBudgetaire: makeAsyncMutationFunctions('testedDocumentBudgetaire')
    }
})
