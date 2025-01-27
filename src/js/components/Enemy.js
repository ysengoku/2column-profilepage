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
				.enemy-avatar-container {
					height: 144px;
				}	
				.enemy-avatar-container img {
    				width: 88px;
    				aspect-ratio: 1;
    				object-fit: cover;
				}
			</style>
			<div class="enemy-avatar-container">
				<p class="lh-1 fs-5 px-2 pt-3 no-margin">${enemy.username}</p>
				<div class="d-flex flex-row justify-content-around align-items-start py-2">
					<div class="d-flex flex-column justify-content-start px-2">
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
			<div class="enemy-avatar-container d-flex flex-column justify-content-center text-center p-2">
				<p>No ${type.toLowerCase()} yet</p>
			</div>
			`;
		}
	}
}

customElements.define('profile-enemy-component', ProfileEnemy);
