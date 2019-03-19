import {h} from 'preact'

import AgregationAnalysis from './AgregationAnalysis.js'
import AgregationTable from './AgregationTable.js'


export default function({agregation, documentBudgetaire}){
    return html`
        <div>
            <${AgregationTable} agregation=${agregation} />
            <${AgregationAnalysis} agregation=${agregation} documentBudgetaire=${documentBudgetaire} />
        </div>
    `
}