import Store from 'baredux'

export default new Store({
    state: {
        formulas: [],
        testedDocumentBudgetaire: undefined
    },
    mutations: {
        addFormula(state, {name, formula}){
            state.formulas.push({name, formula})
        },
        setTestedDocumentBudgetaire(state, testedDocumentBudgetaire){
            state.testedDocumentBudgetaire = testedDocumentBudgetaire
        }
    }
})
