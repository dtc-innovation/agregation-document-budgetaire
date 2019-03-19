import {h, render} from 'preact'
import {csv, xml} from 'd3-fetch';

import Main from './components/Main.js'
import store from './store.js'
import montreuilCVSToAgregationFormulas from './montreuilCVSToAgregationFormulas.js'
import xmlDocumentToDocumentBudgetaire from './finance/xmlDocumentToDocumentBudgetaire.js'
import makeNatureToChapitreFI from './finance/makeNatureToChapitreFI.js'


const isMontreuil = new Set((new URLSearchParams(location.search)).keys()).has('montreuil')

if(isMontreuil){
	// Download and transform some Compte Administratif for easier use
	const docBudgP = Promise.all([
		xml('./data/CA/CA 2017.xml'),
		xml('./data/plansDeCompte/plan-de-compte-M14-M14_COM_SUP3500-2017.xml')
			.then(pdC => makeNatureToChapitreFI([pdC]))
	])
	.then(([doc, natureToChapitreFI]) => xmlDocumentToDocumentBudgetaire(doc, natureToChapitreFI))
	.then(docBudg => {
		console.log('docBudg', docBudg.toJS())
		store.mutations.setTestedDocumentBudgetaire(docBudg)
		return docBudg
	})
	.catch(console.error)


	// Download Montreuil "Open data nomenclature" CSV and transform it to formulas
	Promise.all([
		csv('./data/agregation-Montreuil-v4.csv'),
		docBudgP
	])
	.then(([csvData, docBudg]) => montreuilCVSToAgregationFormulas(csvData, [docBudg]))
	.then(formulas => {
		console.log('formulas', formulas)

		for(const {name, formula} of formulas){
			store.mutations.addFormula({ name, formula })
		}
	})
}

const container = document.querySelector('#react-content')

store.subscribe(state => {
	render(
		html`<${Main} store=${ {...store} }/>`,
		container,
		container.firstElementChild
	);
})


render(
	html`<${Main} store=${ {...store} }/>`,
	container,
	container.firstElementChild
)