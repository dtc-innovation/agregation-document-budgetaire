import preact from 'preact'
import {connect} from 'preact-redux'

import makeLigneBudgetFilterFromFormula from '../DocumentBudgetaireQueryLanguage/makeLigneBudgetFilterFromFormula.js'
import Agregation from './Agregation.js'
import {Actions} from '../reduxStore.js'
import { DocumentBudgetaire } from '../finance/DocBudgDataStructures';

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
                rows: testedDocumentBudgetaire ?
                    testedDocumentBudgetaire.rows.filter(makeLigneBudgetFilterFromFormula(formula)) :
                    []
            }
        )),
        documentBudgetaire: testedDocumentBudgetaire
    }
}

const Main = function(props){
    return html`
        <div>
            <h1>Yo !</h1>
            <${Agregation} ...${props}/>
        </div>
    `
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)