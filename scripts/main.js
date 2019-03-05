import {render, default as preact} from 'preact'
import {Provider} from 'preact-redux'
import {csv, xml} from 'd3-fetch';

import Main from './components/Main.js'
import {Actions, default as store} from './reduxStore.js'
import montreuilCVSToAgregationFormulas from './montreuilCVSToAgregationFormulas.js'
import xmlDocumentToDocumentBudgetaire from './finance/xmlDocumentToDocumentBudgetaire.js'
import makeNatureToChapitreFI from './finance/makeNatureToChapitreFI.js'

// apparently, babel-plugin-htm is run after preset-env (which compiles import statements)
// so `h` is applied after the compilation that transforms 
// `import {h} from preact` to `var _preact = require('preact'); var h = _preact.h`
// without this line, the compilation of `html` results in `h` not being defined
const {h} = preact;

// Download Montreuil "Open data nomenclature" CSV and transform it to formulas
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

// Download and transform some Compte Administratif for easier use
Promise.all([
	xml('./data/CA/CA 2017.xml'),
	xml('./data/plansDeCompte/plan-de-compte-M14-M14_COM_SUP3500-2017.xml')
		.then(pdC => makeNatureToChapitreFI([pdC]))
])
.then(([doc, natureToChapitreFI]) => xmlDocumentToDocumentBudgetaire(doc, natureToChapitreFI))
.then(docBudg => {
	console.log('docBudg', docBudg.toJS())
	store.dispatch({
		type: Actions.SET_TESTED_COMPTE_ADMINISTRATIF,
		testedCompteAdministratif: docBudg
	})
})
.catch(console.error)


render(
	html`
		<${Provider} store=${store}>
			<${Main} />
		<//>
	`, 
	document.querySelector('#react-content')
);
