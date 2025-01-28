export class UserTournamentHistory extends HTMLElement {
  constructor() {
    super();
    this._data = [];
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
      <ul class="list-group">
        <li class="list-group-item user-game-history-item">Tournament 1</li>
        <li class="list-group-item user-game-history-item">Tournament 2</li>
        <li class="list-group-item user-game-history-item">Tournament 3</li>
      </ul>
    `;
  }
  }
  
customElements.define('user-tournament-history', UserTournamentHistory);
  