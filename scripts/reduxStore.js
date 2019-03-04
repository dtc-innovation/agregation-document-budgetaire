import {createStore} from 'redux'

export const Actions = Object.freeze({
    'ADD_FORMULA': 'ADD_FORMULA'
})


function reducer(state, action){
    switch(action.type){
        case Actions.ADD_FORMULA: {
            const {name, formula} = action;
            state.formulas.push({name, formula})
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
        formulas: []
    }
);