import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    const newPostBtn = document.getElementById('newPostBtn');
    const postForm = document.getElementById('postForm');
    const submitPostBtn = document.getElementById('submitPostBtn');
    const postsContainer = document.getElementById('postsContainer');
    const loadingSpinner = document.getElementById('loadingSpinner');

    const quill = new Quill('#editor', {
        theme: 'snow'
    });

    newPostBtn.addEventListener('click', () => {
        postForm.style.display = postForm.style.display === 'none' ? 'block' : 'none';
    });

    submitPostBtn.addEventListener('click', async () => {
        const title = document.getElementById('postTitle').value;
        const author = document.getElementById('postAuthor').value;
        const body = quill.root.innerHTML;

        if (title && author && body) {
            loadingSpinner.style.display = 'block';
            await backend.addPost(title, author, body);
            loadingSpinner.style.display = 'none';
            loadPosts();
        } else {
            alert('Please fill in all fields.');
        }
    });

    async function loadPosts() {
        loadingSpinner.style.display = 'block';
        const posts = await backend.getPosts();
        loadingSpinner.style.display = 'none';
        postsContainer.innerHTML = posts.map(post => `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">by ${post.author}</h6>
                    <p class="card-text">${post.body}</p>
                </div>
            </div>
        `).join('');
    }

    loadPosts();
});
