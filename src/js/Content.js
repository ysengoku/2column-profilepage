import { simulateFetchUserProfile } from "./mock.js";
import "./components/index.js";

export class Profile extends HTMLElement {
  constructor() {
    super();
    this.user = null;
  }

  connectedCallback() {
    this.fetchUserData();
    // this.render();
  }

  async fetchUserData() {
    try {
      const userData = await simulateFetchUserProfile();
      this.user = userData;
      this.render();
    } catch (error) {
      // Error handling
      if (error.status === 404) {
        // 404 page & message
      } else {
        // Something went wrong page & message
      }
    }
  }

  render() {
    if (!this.user) {
      this.innerHTML = "<div>Loading...</div>";
      return;
    }
    console.log("User data:", this.user);

    const friendsCount = this.user.friends.length;

    // Online status
    const onlineStatus = document.createElement("profile-online-status");
    onlineStatus.setAttribute("online", this.user.is_online);

    this.innerHTML = `
		<style>
			.poster {
				background-image: url('../../img/poster.png');
    			background-size: cover;
    			background-position: center;
    			background-repeat: no-repeat;
				color: #2f2926
			}
			.online-status-indicator {
    			width: 16px;
    			height: 16px;
    			border-radius: 50%;
    			background-color: gray;
    			display: inline-block;
			}
			.online-status-indicator.online {
    			background-color: green;
			}
			hr {
  				height: 0;
  				margin: 0;
  				padding: 0;
  				border: 0;
			}
  			.line {
  				border-top: 4px double #2f2926;
				opacity: 1;
  			}
		</style>

		<div class="container-fluid d-grid gap-3 h-100">
			<div class="row h-100 no-gutters">

			<!-- Container Left -->
			<div class="d-flex col-12 col-md-6">
				<div class="poster container-fluid d-flex flex-column flex-grow-1 mx-1 my-3 p-3 gap-2">

				<!-- Container Top -->
				<div class="flex-grow-1">
					<div class="mb-3 w-100 text-center pt-3 px-2">
						<div class="d-flex flex-row align-items-center">
							<hr class="line flex-grow-1">	
							${onlineStatus.outerHTML}
							<hr class="line flex-grow-1">
						</div>
						<h1 class="rye-regular">WANTED</h1>
						<hr class="line">
					</div>
					<profile-avatar></profile-avatar>
					<profile-user-info></profile-user-info>
				</div>

				<!-- Container Bottom -->
				<div class="flex-grow-1">
					<profile-user-actions></profile-user-actions>

					<!-- Stats -->
					<div class="d-flex flex-row justify-content-around mt-5">
						<div class="row px-2 w-100">
							<profile-stat-card class="col-3" title="Elo" value="${this.user.elo}"></profile-stat-card>
							<profile-stat-card class="col-3" title="Total score" value="${this.user.scored_balls}"></profile-stat-card>
							<profile-stat-card class="col-3" title="total duels" value="${this.user.total_matches}"></profile-stat-card>	
							<profile-stat-card class="col-3" title="Friends" value="${friendsCount}"></profile-stat-card>
						</div>
					</div>

					<!-- Graphs -->
					<div class="d-flex flex-row justify-content-around align-items-top">
						<div class="row h-100 m-3 p-2" style="background-color:grey">
							<div class="col-md-6" style="background-color:darkslategrey">
								<p>Win Rate</p>
								<canvas id="winRateChart">

								</canvas>
							</div>
							<div class="col-md-6" style="background-color:darkolivegreen">
								<p>Elo progression</p>
								<canvas id="eloProgressionChart"></canvas>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Container Right -->
			<div class="d-flex col-12 col-md-6">
				<div class="poster container-fluid d-flex flex-column flex-grow-1 mx-1 my-3 p-3 gap-2">

					<!-- Container Top -->
					<div class="d-grid">
						<div class="row no-gutters no-margin pt-3 pb-1">
							<div class="col-6 d-flex flex-column px-2 pb-1">							
								<profile-enemy-component type="best"></profile-enemy-component>
							</div>
							<div class="col-6 d-flex flex-column px-2 pb-1">
								<profile-enemy-component type="worst"></profile-enemy-component>
							</div>
						</div>
					</div>

					<!-- Container Bottom -->
					<div class="flex-grow-1 d-flex flex-column p-3">
						<p>Game History</p>
						<div class="card text-center">
  							<div class="card-header">
    							<ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="true" href="#" id="duels-tab">Duels</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="tournaments-tab">Tournaments</a>
                        </li>
                    </ul>
  							</div>
							<div class="card-body">
								<p>List of duels will be displayed here.</p>
  							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>`;

    const profileAvatar = this.querySelector("profile-avatar");
    if (profileAvatar) {
      profileAvatar.avatarUrl = this.user.avatar;
    }

    const profileUserInfo = this.querySelector("profile-user-info");
    if (profileUserInfo) {
      profileUserInfo.data = {
        username: this.user.username,
        join_date: this.user.date_joined,
        titre: this.user.titre,
      };
    }

    const bestEnemyComponent = document.querySelector(
      'profile-enemy-component[type="best"]'
    );
    const worstEnemyComponent = document.querySelector(
      'profile-enemy-component[type="worst"]'
    );

    if (bestEnemyComponent) {
      bestEnemyComponent.data = this.user.best_enemy;
    }

    if (worstEnemyComponent) {
      worstEnemyComponent.data = this.user.worst_enemy;
    }

    const duelsTab = this.querySelector("#duels-tab");
    const tournamentsTab = this.querySelector("#tournaments-tab");
    const cardBody = this.querySelector("#card-body");

    duelsTab.addEventListener("click", (event) => {
      event.preventDefault();
      duelsTab.classList.add("active");
      tournamentsTab.classList.remove("active");
      cardBody.innerHTML = "<p>List of duels will be displayed here.</p>";
    });

    tournamentsTab.addEventListener("click", (event) => {
      event.preventDefault();
      tournamentsTab.classList.add("active");
      duelsTab.classList.remove("active");
      cardBody.innerHTML = "<p>List of tournaments will be displayed here.</p>";
    });
  }
}

customElements.define("user-profile", Profile);

{
  /* <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
<div class="d-flex justify-content-center align-items-center profile-avatar-container">
	<img src="${this.user.avatar}" alt="User Avatar" class="rounded-circle">
</div>
<div>
<h2>This field is to check response to API request</h2>
<h3>Basic information:</h3>
<p>Username: ${this.user.username}</p>

<div style="display: inline-block; position: relative;">
	${onlineStatus.outerHTML}
</div>

<p>Avatar path: ${this.user.avatar}</p>
<p>Elo: ${this.user.elo}</p>

<p>Joined on: ${formatedDate}</p>
<p>Wins: ${this.user.wins}</p>
<p>Loses: ${this.user.loses}</p>
<p>Win rate: ${this.user.winrate}</p>
<p>Total score: ${this.user.scored_balls}</p>

<h3>Best enemy</h3>
<best-enemy></best-enemy>

<h3>Worst enemy</h3>
<worst-enemy></worst-enemy>

<h3>Friends</h3>
<p>Friends count: ${friendsCount}</p>

</div>
<div class="mb-3 pt-5">
<a class="btn btn-outline-primary" href="/home" role="button">Back to Home</a>
</div>
</div> */
}
