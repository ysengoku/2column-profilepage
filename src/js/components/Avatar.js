export class ProfileAvatar extends HTMLElement {
  constructor() {
    super();
    this._avatarUrl = "";
  }

  set avatarUrl(url) {
    this._avatarUrl = url;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    console.log("Avatar URL:", this._avatarUrl);
    const avatarUrl = this._avatarUrl;
    this.innerHTML = `
            <style>
                .profile-avatar-container {
                    width: 100%;
                    padding: 8px;    
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: auto;
                }
                .avatar-frame {
                    width: 100%;
                    background-color: rgba(0, 0,0, 0.1);
                }
                .profile-avatar-container img {
                    width: 240px;
                    aspect-ratio: 1;
                    object-fit: cover;
                    border-radius: 50%;
                    background-color: grey;
                }
            </style>
            <div class="profile-avatar-container">
                <div class="avatar-frame d-flex justify-content-center align-items-center p-2">
                    <img src="${avatarUrl}" alt="Avatar" class="rounded-circle">
                </div>
            </div>
        `;
  }
}

customElements.define("profile-avatar", ProfileAvatar);
