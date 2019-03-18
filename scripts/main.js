import preact from 'preact'
import {csv, xml} from 'd3-fetch';

import Main from './components/Main.js'
import store from './store.js'
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
.then(montreuilCVSToAgregationFormulas)
.then(formulas => {
	console.log('formulas', formulas)

	for(const {name, formula} of formulas){
		store.mutations.addFormula({ name, formula })
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
	store.mutations.setTestedDocumentBudgetaire(docBudg)
})
.catch(console.error)

const container = document.querySelector('#react-content')

store.subscribe(state => {
	preact.render(
		html`<${Main} store=${ {...store} }/>`,
		container,
		container.firstElementChild
	);
})


