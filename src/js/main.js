import './Content.js';

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    content.innerHTML = '';
    const contentElements = document.createElement('user-profile');
    content.appendChild(contentElements);
});
