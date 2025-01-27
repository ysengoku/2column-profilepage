// import sheriff from '../../../img/sheriff.png';

export class ProfileStatCard extends HTMLElement {
	constructor() {
		super();
		this._title = null;
		this._value = null;
	}

	static get observedAttributes() {
        return ['title', 'value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') {
            this._title = newValue;
            this.render();
        } else if (name === 'value') {
			this._value = newValue;
			this.render();
		} 
    }

	connectedCallback() {
		this.render();
	}

	render() {
		const title = this._title;
		const value = this._value;

		this.innerHTML = `
			<style>
				.stat-card {
					width: 88px;
					height: 88px;
					background-image: url('../../../img/sheriff.png');
					padding: 8px;
					background-size: cover;
                    background-position: center;
				}
			</style>
			<div class="stat-card d-flex flex-column justify-content-cernter text-center m-2">
				<small class="mb-2 no-margin">${title}</small>
				<p class="no-margin">${value}</p>
			</div>
			`;
	}
}

customElements.define('profile-stat-card', ProfileStatCard);
