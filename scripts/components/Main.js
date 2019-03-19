import {Set as ImmutableSet} from 'immutable'
import {h} from 'preact'

import makeLigneBudgetFilterFromFormula from '../DocumentBudgetaireQueryLanguage/makeLigneBudgetFilterFromFormula.js'
import Agregation from './Agregation.js'

function mapStateToProps({formulas, testedDocumentBudgetaire}){
    return {
        agregation: [...formulas.values()].map(({id, name, formula}) => (
            {
                id,
                name, 
                formula, 
                rows: testedDocumentBudgetaire ?
                    testedDocumentBudgetaire.rows.filter(makeLigneBudgetFilterFromFormula(formula)) :
                    new ImmutableSet()
            }
        )),
        documentBudgetaire: testedDocumentBudgetaire
    }
}

export default function({store}){
    const props = Object.assign(
        mapStateToProps(store.state),
        store.mutations
    )

    return html`
        <div>
            <h1>Yo !</h1>
            <${Agregation} ...${props}/>
        </div>
        
    `
}