import {render, default as preact} from 'preact'
import {Provider} from 'preact-redux'
import {csv} from 'd3-fetch';

import Main from './components/Main.js'
import {Actions, default as store} from './reduxStore.js'
import montreuilCVSToAgregationFormulas from './montreuilCVSToAgregationFormulas.js'


// apparently, babel-plugin-htm is run after preset-env (which compiles import statements)
// so `h` is applied after the compilation that transforms 
// `import {h} from preact` to `var _preact = require('preact'); var h = _preact.h`
// without this line, the compilation of `html` results in `h` not being defined
const {h} = preact;

csv('./data/agregation-Montreuil-v4.csv')
.then(natFuncAggRows => {
	console.log(natFuncAggRows.length, natFuncAggRows[0])
	return natFuncAggRows
})
.then(montreuilCVSToAgregationFormulas)
.then(formulas => {
	for(const {name, formula} of formulas){
		store.dispatch({
			type: Actions.ADD_FORMULA,
			name, 
			formula
		})
	}
})

render(
	html`
		<${Provider} store=${store}>
			<${Main} />
		<//>
	`, 
	document.querySelector('#react-content')
);
