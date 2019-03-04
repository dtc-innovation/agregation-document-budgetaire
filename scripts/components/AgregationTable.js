import preact from 'preact'
const {h} = preact;

export default function AgregationTable({agregation, addFormula}){
    return html`
        <table>
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
                                <td>${rows.length}</td>
                                <td>${rows.length*1000}</td>
                            </tr>
                        `
                    })
                }
                <tr onClick=${() => addFormula({name: '', formula: ''})}>
                    <td colspan="4">+ Ajouter une ligne</td>
                </tr>
            </tbody>
        </table>
    `
}