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

const Main = function(props){
    console.log('Main', props)

    return html`
        <div>
            <h1>Yo !</h1>
            <${AgregationTable} ...${props}/>
        </div>
    `
}

export default connect(state => state, mapDispatchToProps)(Main)