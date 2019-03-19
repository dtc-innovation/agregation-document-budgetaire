import {h} from 'preact'

import AgregationAnalysis from './AgregationAnalysis.js'
import AgregationTable from './AgregationTable.js'


export default function({agregation, documentBudgetaire, addFormula, changeFormula}){
    return html`
        <div>
            <${AgregationTable} ...${ {agregation, addFormula, changeFormula} } />
            <${AgregationAnalysis} agregation=${agregation} documentBudgetaire=${documentBudgetaire} />
        </div>
    `
}