import preact from 'preact'
import {connect} from 'preact-redux'

import AgregationTable from './AgregationTable.js';

import {Actions} from '../reduxStore.js'

const {h} = preact;

function mapDispatchToProps(dispatch){
    return {
        addFormula({name, formula}){
            dispatch({
                type: Actions.ADD_FORMULA,
                name, 
                formula
            })
        }
    }
}

function mapStateToProps({formulas}){
    return {
        agregation: formulas.map(({name, formula}) => ({name, formula, rows: []}))
    }
}

const Main = function(props){
    return html`
        <div>
            <h1>Yo !</h1>
            <${AgregationTable} ...${props}/>
        </div>
    `
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)