import {h} from 'preact'
import {sum} from 'd3-array'

export default function({id, name, formula, rows, onNameChange, onFormulaChange}){
    return html`
        <tr key=${id}>
            <td>
                <input type="text" value=${name} onInput=${onNameChange}/>
            </td>
            <td>
                <input type="text" value=${formula} onInput=${onFormulaChange}/>
            </td>
            <td>${rows.size}</td>
            <td>${sum(rows.toJS().map(r => r['MtReal'])).toFixed(2)+'€'}</td>
        </tr>
    `
}