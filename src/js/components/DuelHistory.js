export class UserDuelHistory extends HTMLElement {
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
	// test data ------------------------------------------------------
	this._data = [
		{
			avatar: "../../img/avatar.png",
			name: "Mark",
			date: "Jan 25, 2025",
			score: "15 - 14",
			result: "Win",
			elo: "1555"
		},
		{
			avatar: "../../img/avatar2.jpg",
			name: "GeorgeLucas",
			date: "Jan 25, 2025",
			score: "1 - 14",
			result: "Lose",
			elo: "1555"
		},
		{
			avatar: "../../img/avatar2.jpg",
			name: "GeorgeLucas",
			date: "Jan 25, 2025",
			score: "1 - 14",
			result: "Lose",
			elo: "1555"
		},
		{
			avatar: "../../img/avatar2.jpg",
			name: "GeorgeLucas",
			date: "Jan 25, 2025",
			score: "1 - 14",
			result: "Lose",
			elo: "1555"
		},
		{
			avatar: "../../img/avatar2.jpg",
			name: "GeorgeLucas",
			date: "Jan 25, 2025",
			score: "1 - 14",
			result: "Lose",
			elo: "1555"
		}
	];
    // ----------------------------------------------------------------
    this.innerHTML = `
	    <style>
		  .user-game-history-avatar {
		    width: 24px;
			aspect-ratio: 1;
            object-fit: cover;
            border-radius: 50%;
            background-color: grey;
			margin-right: 8px;
        }
		.bi-arrow-up-right {
		  color: green;
		}
		.bi-arrow-down-right {
		  color: red;
		}
		</style>
	  	<table class="table user-game-history-table">
		  <thead>
		    <tr>
			  <th scope="col">User</th>
			  <th scope="col">Date</th>
			  <th scope="col">Score</th>
			  <th scope="col">Result</th>
			  <th scope="col">Elo</th>
			</tr>
		  </thead>
		  <tbody>
		    <tr>
			  <td>
			    <div class="d-flex flex-row align-items-center">
				  <img class="user-game-history-avatar" src="../../img/avatar2.jpg">
			      <p class="no-margin">Mark</p>
				</div>
			  </td>
			  <td>Jan 25, 2025</td>
			  <td>15 - 14</td>
			  <td>
			    <span class="badge text-bg-success">Win</span>
			  </td>
			  <td>
			    <div class="d-flex flex-row align-items-center">
				  +
				  15
				  <i class="bi bi-arrow-up-right ps-1"></i>
				</div>
			  </td>
			</tr>
		    <tr>
			  <td>
			    <div class="d-flex flex-row align-items-center">
				  <img class="user-game-history-avatar" src="../../img/avatar2.jpg">
			      <p class="no-margin">Mark</p>
				</div>
			  </td>
			  <td>Jan 25, 2025</td>
			  <td>15 - 14</td>
			  <td>
			    <span class="badge text-bg-danger">Lost</span>
			  </td>
			  <td>
			    <div class="d-flex flex-row align-items-center">
				  +
				  15
				  <i class="bi bi-arrow-down-right ps-1"></i>
				</div>
			  </td>
			</tr>
		</ul>
	`;
  }
}

customElements.define("user-duel-history", UserDuelHistory);


{/* <ul class="list-group">
<li class="list-group-item user-game-history-item">Game 1</li>
<li class="list-group-item user-game-history-item">Game 2</li>
<li class="list-group-item user-game-history-item">Game 3</li>
</ul> */}