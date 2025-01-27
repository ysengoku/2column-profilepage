export async function simulateFetchUserProfile() {
  const user = {
    username: "JohnDoe",
    avatar: "/img/avatar2.jpg",
    is_online: true,
    elo: 1200,
    wins: 45,
    loses: 30,
    winrate: 60,
    scored_balls: 500,
    total_matches: 75,
    date_joined: "2021-01-15",
    best_enemy: {
      username: "Alice",
      avatar: "/img/avatar.png",
      wins: 20,
      loses: 10,
      winrate: 67,
      elo: 1100,
    },
    worst_enemy: null,
    friends: [
      {
        username: "Alice",
        avatar: "/mock/img/avatars/sample_avatar2.jpg",
        elo: 1100,
        is_online: true,
      },
      {
        username: "George",
        avatar: "/mock/img/avatars/sample_avatar3.jpg",
        elo: 950,
        is_online: false,
      },
      {
        username: "Lucas",
        avatar: "/mock/img/avatars/sample_avatar4.jpg",
        elo: 1000,
        is_online: true,
      },
    ],
  };
  return user;
}
