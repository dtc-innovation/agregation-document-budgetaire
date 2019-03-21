import {h, Component} from 'preact'
import {sum} from 'd3-array'

export default class AgregationTableRow extends Component{

    constructor(props) {
        super(props);
        this.state = {focused: false};
    }

    render({id, name, formula, rows, onNameChange, onFormulaChange}, {focused}){
        console.log('focused', focused)

        return html`
            <tr key=${id}>
                <td>
                    <input type="text" value=${name} onInput=${onNameChange}/>
                </td>
                <td>
                    <input type="text" value=${formula} onInput=${onFormulaChange} 
                        onFocus=${() => this.setState({focused: true})}
                        onBlur=${() => this.setState({focused: false})}
                        />
                    ${
                        focused && rows.size >= 1 ?
                            html`
                                <table>
                                    <thead>
                                        <tr>
                                            ${['RD', 'FI', 'Fonction', 'Nature', 'Montant'].map(s => html`<th>${s}</th>`)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${
                                            rows.toArray().map(r => {
                                                return html`
                                                    <tr>
                                                        <td>${r['CodRD']}</td>
                                                        <td>${r['FI']}</td>
                                                        <td>${r['Fonction']}</td>
                                                        <td>${r['Nature']}</td>
                                                        <td>${r['MtReal'].toFixed(2)+'€'}</td>
                                                    </tr>
                                                `
                                            })
                                        }
                                    </tbody>
                                </table>
                            ` : 
                            undefined

                    }
                </td>
                <td>${rows.size}</td>
                <td>${sum(rows.toJS().map(r => r['MtReal'])).toFixed(2)+'€'}</td>
            </tr>
        `
    }
}
