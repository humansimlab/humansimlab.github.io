import { changeView } from "../index.js";

class BaseElement extends HTMLElement {

    constructor({ html }) {

        super();

        const template = document.createElement( 'template' );
        template.innerHTML = html;

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild( template.content.cloneNode(true) );

        const elements = this.shadowRoot.querySelectorAll( '*' );

        const elementsWithId = Object.values( elements ).filter( el => el.id );

        this.el = elementsWithId.reduce(
            ( elems, elem ) =>
                Object.assign(
                    elems,
                    { [ BaseElement.snakeToCamel( elem.id ) ]: elem }
                ),
            {}
        );

		this.shadowRoot
            .querySelectorAll('[data-link]')
            .forEach(link => 
                link.addEventListener('click', e => changeView(e))
            );
    }

    static snakeToCamel = snakeCaseString => snakeCaseString.replace(/([-_]\w)/g, g => g[1].toUpperCase()); 
}

export default BaseElement;
