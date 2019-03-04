import {render, default as preact} from 'preact'
import {Provider} from 'preact-redux'

import Main from './components/Main.js'
import store from './reduxStore.js'

const {h} = preact;

render(
	html`
		<${Provider} store=${store}>
			<${Main} />
		<//>
	`, 
	document.querySelector('#react-content')
);
