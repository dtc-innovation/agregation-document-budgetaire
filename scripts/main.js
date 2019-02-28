import {html, render} from 'https://unpkg.com/htm@2.0.0/preact/standalone.mjs'
import Main from './components/Main.js'
import store from './reduxStore.js'

const ConnectedMain = () => {
	return html`<${preactRedux.Provider} store=${store}>
		<${Main} />
	<//>`
}

render(html`<${ConnectedMain}/>`, document.querySelector('#react-content'));
