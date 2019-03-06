import preact from 'preact'
import {connect} from 'preact-redux'

import makeLigneBudgetFilterFromFormula from '../DocumentBudgetaireQueryLanguage/makeLigneBudgetFilterFromFormula.js'
import AgregationTable from './AgregationTable.js'
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

function mapStateToProps({formulas, testedDocumentBudgetaire}){
    return {
        agregation: formulas.map(({name, formula}) => (
            {
                name, 
                formula, 
                rows: testedDocumentBudgetaire.rows.filter(makeLigneBudgetFilterFromFormula(formula))
            }
        ))
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