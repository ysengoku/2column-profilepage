export class UserDuelHistoryItem extends HTMLElement {
  constructor() {
	super();
	this._data = {};
  }

  set data(data) {
	this._data = data;
	this.render();
  }

  connectedCallback() {
	this.render();
  }

  render() {
	this.innerHTML = `
	  <div class="card text-center">
		<div class="card-header">
		  <p class="text-start">Duel History</p>
		</div>
		<div class="card-body">
		  <p>${this._data.date}</p>
		  <p>${this._data.opponent}</p>
		  <p>${this._data.result}</p>
		</div>
	  </div>
	`;
  }
}