export class ProfileEnemy extends HTMLElement {
	constructor() {
		super();
		this._data = null,
		this._type = null;
	}

	static get observedAttributes() {
        return ['type'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'type') {
            this._type = newValue;
            this.render();
        }
    }

	set data(value) {
		this._data = value;
		this.render();
	}

	connectedCallback() {
		this.render();
	}

	render() {
		const type = this._type === 'best' ? 'Best Enemy' : 'Worst Enemy';
		if (this._data) {
			const enemy = this._data;
			this.innerHTML = `
			<style>
				.enemy-avatar-container img {
    				width: 88px;
    				aspect-ratio: 1;
    				object-fit: cover;
				}
			</style>
			<div class="d-flex flex-column px-3 pb-1">
				<p class="no-margin ms-1">${type}</p>
				<div class="d-flex flex-row justify-content-around align-items-start pt-3">
					<div class="enemy-avatar-container d-flex flex-column justify-content-center px-2">
						<p class="lh-1 fs-5">${enemy.username}</p>
						<img src="${enemy.avatar}" alt="User Avatar" class="rounded-circle">
					</div>
					<div class="mb-1 py-2">
						<p class="no-margin fs-6">Elo: ${enemy.elo}</p>
						<p class="no-margin fs-6">Win rate: ${enemy.winrate}</p>
						<small>win ${enemy.wins} - losses ${enemy.loses}</small>
					</div>
				</div>
			</div>
			`;
		} else {
			this.innerHTML = `
			<div class="d-flex flex-column justify-content-center p-3">
				<p class="no-margin ms-1">${type}</p>
				<p>No ${type.toLowerCase()} yet</p>
			</div>
			`;
		}
	}
}

customElements.define('profile-enemy-component', ProfileEnemy);
