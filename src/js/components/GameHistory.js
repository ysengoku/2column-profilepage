export class UserGameHistory extends HTMLElement {
  constructor() {
    super();
    // this._games = [];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
	  <style>
	  	.nav-link{
		  color: black;
		}
		.nav-link.active{
  	    }
		.nav-link:hover{
		  color: black;
  	    }
		.user-game-history-table {
		  font-size: 12px;
          txt-decoration: none;
		}
		.user-game-history-table td {
          vertical-align: middle;
        }
        .user-game-history-item {
          border: none;
          border-bottom: 1px solid var(--bs-border-color);
          position: relative;
		  background-color: transparent;
		  color: black;
        }
        .user-game-history-item:last-of-type .friends-list-item {
          border-bottom: none;
          padding-bottom: 8px;
        }
		.card {
		  background-color: transparent;
		  color: black;
		  border: 1px solid black;
		}
      </style>
      <div class="card text-center">
	    <div class="card-header">
	    <p class="text-start">Game History</p>
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a class="nav-link active" aria-current="true" id="duels-tab">Duels</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="tournaments-tab">Tournaments</a>
            </li>
          </ul>
        </div>

        <div class="card-body" id="user-game-history-body">
          <user-duel-history></user-duel-history>
        </div>

      </div>
	  `;

    const duelsTab = this.querySelector("#duels-tab");
    const tournamentsTab = this.querySelector("#tournaments-tab");
    const cardBody = this.querySelector("#user-game-history-body");

    duelsTab.addEventListener("click", (event) => {
      event.preventDefault();
      duelsTab.classList.add("active");
      tournamentsTab.classList.remove("active");
      cardBody.innerHTML = "";
      const userDuelHistory = document.createElement("user-duel-history");
      cardBody.appendChild(userDuelHistory);
    });

    tournamentsTab.addEventListener("click", (event) => {
      event.preventDefault();
      tournamentsTab.classList.add("active");
      duelsTab.classList.remove("active");
      cardBody.innerHTML = "";
      const userTournamentHistory = document.createElement(
        "user-tournament-history"
      );
      cardBody.appendChild(userTournamentHistory);
    });
  }
}

customElements.define("user-game-history", UserGameHistory);
