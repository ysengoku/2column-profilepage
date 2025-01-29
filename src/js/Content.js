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

    const r = 100 / (2 * Math.PI);  // radius
    const winRate = this.user.winrate;

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
            <div class="d-flex flex-row justify-content-around align-items-top px-2 py-3">
              <div class="graph-container me-2 px-4 py-2" style="background-color:rgba(0, 0,0, 0.1)">
                <p>Win Rate</p>
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <svg width="160" height="160" viewBox="0 0 45 45">
                      <path
                        d="M20 ${(40 - (r * 2)) / 2}
                          a ${r} ${r} 0 0 1 0 ${r * 2}
                          a ${r} ${r} 0 0 1 0 -${r * 2}"
                        fill="none"
                        stroke="grey"
                        stroke-width="6"
                        stroke-dasharray="100"
                      />
                      <path class="donut"
                        d="M20 ${(40 - (r * 2)) / 2}
                          a ${r} ${r} 0 0 1 0 ${r * 2}
                          a ${r} ${r} 0 0 1 0 -${r * 2}"
                        fill="none"
                        stroke="#2f2926"
                        stroke-width="6"
                        stroke-dasharray="${winRate} 100"
                      />
                      <text x="48%" y="36%" text-anchor="middle" dy="7" font-size="0.5rem">
                        ${winRate}%
                      </text>
                    </svg>
                    <div class="d-flex flex-row justify-content-center">
                      <p class="fs-6">Wins: ${this.user.wins}</p>
                      <p>&nbsp;-&nbsp;</p>
                      <p class="fs-6">Losses: ${this.user.loses}</p>
                    </div>
                  </div>
                </div>
                <div class="graph-container flex-grow-1 ms-1 px-4 py-2" style="background-color:rgba(0, 0,0, 0.1)">
                  <p>Elo progression</p>
                  <canvas id="eloProgressionChart"></canvas>
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
          <div class="flex-grow-1 d-flex flex-column px-1 py-3">
            <user-game-history class="flex-grow-1"></user-game-history>
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

    const gameHistory = this.querySelector("user-game-history");
    if (gameHistory) {
      gameHistory.data = {
        matches: this.user.match_history,
        // tournaments: = this.user.tournament_history
      }
    }
  }
}

customElements.define("user-profile", Profile);
