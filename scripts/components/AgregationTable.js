import preact from 'preact'
import {sum} from 'd3-array'

const {h} = preact;

export default function AgregationTable({agregation, addFormula}){
    return html`
        <table class="agregation">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Formule</th>
                    <th>Nombre</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                ${
                    agregation.map(({name, formula, rows}) => {
                        return html`
                            <tr>
                                <td>${name}</td>
                                <td>${formula}</td>
                                <td>${rows.size}</td>
                                <td>${sum(rows.toJS().map(r => r['MtReal'])).toFixed(2)+'€'}</td>
                            </tr>
                        `
                    })
                }
            </tbody>
        </table>
    `

    /*
        Table row to add formulas manually:

        <tr onClick=${() => addFormula({name: '', formula: ''})}>
            <td colspan="4">+ Ajouter une ligne</td>
        </tr>
    */
}