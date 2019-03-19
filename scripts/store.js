import Store from 'baredux'

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
        setTestedDocumentBudgetaire(state, testedDocumentBudgetaire){
            state.testedDocumentBudgetaire = testedDocumentBudgetaire
        }
    }
})
