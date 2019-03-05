import {createStore} from 'redux'

export const Actions = Object.freeze({
    'ADD_FORMULA': 'ADD_FORMULA',
    'SET_TESTED_COMPTE_ADMINISTRATIF': 'SET_TESTED_COMPTE_ADMINISTRATIF'
})


function reducer(state, action){
    switch(action.type){
        case Actions.ADD_FORMULA: {
            const {name, formula} = action;
            state.formulas.push({name, formula})
            return Object.assign({}, state);
        }
        case Actions.SET_TESTED_COMPTE_ADMINISTRATIF: {
            const {testedCompteAdministratif} = action;
            state.testedCompteAdministratif = testedCompteAdministratif
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
        testedCompteAdministratif: undefined
    }
);