export class ProfileUserActions extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
			<div class="d-flex flex-row justify-content-center my-2">
				<button class="btn btn-primary mx-1 profile-user-action-button" id="edit-profile-button">Edit Profile</button>

				<button class="btn btn-primary mx-1 profile-user-action-button" id="add-friend-button">Add friend</button>

				<button class="btn btn-primary mx-1 profile-user-action-button" id="send-message-button">Send Message</button>

				<button class="btn btn-primary mx-1 profile-user-action-button" id="block-user-button">Block user</button>
			</div>
		`;
  }
}

customElements.define("profile-user-actions", ProfileUserActions);
