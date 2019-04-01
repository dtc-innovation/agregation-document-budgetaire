import {h, render} from 'preact'
import {csv, xml} from 'd3-fetch';

import xmlDocumentToDocumentBudgetaire from './finance/xmlDocumentToDocumentBudgetaire.js'
import makeNatureToChapitreFI from './finance/makeNatureToChapitreFI.js'

import Main from './components/Main.js'

import store from './store.js'

import { getStoredState, saveState } from './stateStorage.js'

import montreuilCVSToAgregationFormulas from './montreuilCVSToAgregationFormulas.js'

const isMontreuil = new Set((new URLSearchParams(location.search)).keys()).has('montreuil')

if(isMontreuil){
	// Download and transform some Compte Administratif for easier use
	const docBudgsP = Promise.all([
		{
			CA: 'CA_2016.xml',
			planDeCompte: 'plan-de-compte-M14-M14_COM_SUP3500-2016.xml'
		},
		{
			CA: 'CA 2017.xml',
			planDeCompte: 'plan-de-compte-M14-M14_COM_SUP3500-2017.xml'
		},
		{
			CA: 'CA_2018.xml',
			planDeCompte: 'plan-de-compte-M14-M14_COM_SUP3500-2018.xml'
		}
	].map(({CA, planDeCompte}) => {
		return Promise.all([
			xml(`./data/CA/${CA}`),
			xml(`./data/plansDeCompte/${planDeCompte}`)
				.then(pdC => makeNatureToChapitreFI([pdC]))
		])
		.then(([doc, natureToChapitreFI]) => xmlDocumentToDocumentBudgetaire(doc, natureToChapitreFI))
		.then(docBudg => {
			if(CA === 'CA_2018.xml')
				store.mutations.testedDocumentBudgetaire.setValue(docBudg)
			
			return docBudg
		})
		.catch(console.error)
	}))


	// Download Montreuil "Open data nomenclature" CSV and transform it to formulas
	Promise.all([
		csv('./data/agregation-Montreuil-v4.csv'),
		csv('./data/NATURES - FONCTIONS v4 complément.csv'),
		docBudgsP
	])
	.then(([csvData, csvData2, docBudgs]) => montreuilCVSToAgregationFormulas(csvData.concat(csvData2), docBudgs))
	.then(formulas => {
		console.log('formulas', formulas)

		for(const {name, formula} of formulas){
			store.mutations.addFormula({ id: name, name, formula })
		}
	})
}
else{
	// Download and transform some Compte Administratif
	Promise.all([
		xml('./data/CA/CA2017BPAL.xml'),
		xml('./data/plansDeCompte/plan-de-compte-M52-M52-2017.xml')
			.then(pdC => makeNatureToChapitreFI([pdC]))
	])
	.then(([doc, natureToChapitreFI]) => xmlDocumentToDocumentBudgetaire(doc, natureToChapitreFI))
	.then(docBudg => {
		store.mutations.testedDocumentBudgetaire.setValue(docBudg)
	})
	.catch(console.error)

	const formulas = getStoredState()
	for(const {id, name, formula} of formulas){
		store.mutations.addFormula({ id, name, formula })
	}
}

// UI render
const container = document.querySelector('#react-content')

function renderUI(){
	render(
		html`<${Main} store=${ {...store} }/>`,
		container,
		container.firstElementChild
	);
}

// initial render
renderUI()

// render when state changes
store.subscribe(renderUI)


// Save state regularly
store.subscribe(saveState)