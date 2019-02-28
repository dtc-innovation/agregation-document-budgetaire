import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(preact.h);

export default preactRedux.connect()(function(){
    return html`<h1>Yo !</h1>`
})