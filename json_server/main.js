var postsBlock = document.getElementById('list-post-block');
var postsApi = 'http://localhost:3000/posts';


function start() {
    getPosts(renderPosts); // do render
    handleCreateForm();
}

start();

function getPosts(callback) {
    fetch(postsApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback); //return posts
}

function createPost(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(postsApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function modifyPost(data) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(postsApi+'/'+data.id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log('success ' + result);
        })
        .catch(function (err) {
            console.log('Error ' + err);
        })
}

function handleDeletePost(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(postsApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var postItem = document.querySelector('.post-item-' + id);
            postItem.remove();
        });
}

function handleModifyPost(id) {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }

    fetch(postsApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function (post) {
            return createFormModify(post);
        })


}

function renderPosts(posts) {
    var htmls = posts.map(function (post) {
        return `
            <li class="post-item-${post.id}">
                <h3>${post.author}</h3>
                <p>${post.title}</p>
                <button onclick="handleDeletePost(${post.id})">Xóa</button>
                <button onclick="handleModifyPost(${post.id})">Modify</button>
            </li>
        `
    });
    postsBlock.innerHTML = htmls.join('');
}

function handleCreateForm() {
    var createBtn = document.getElementById('submit');
    createBtn.onclick = function () {
        var author = document.querySelector('input[name="author"]').value;
        var title = document.querySelector('input[name="title"]').value;

        var formData = {
            author: author,
            title: title,
        }

        createPost(formData, function () {
            getPosts(renderPosts);
        });
    };
}

function createFormModify(data) {
    document.querySelector('input[name="author"]').value = data.author;
    document.querySelector('input[name="title"]').value = data.title;
    document.getElementById('submit').hidden = true;
    document.getElementById('modify').hidden = false;

    var modifyBtn = document.getElementById('modify');

    modifyBtn.onclick = function () {
        var author = document.querySelector('input[name="author"]').value;
        var title = document.querySelector('input[name="title"]').value;
        console.log(author, title);
        var formData = {
            id:data.id,
            author: data.author,
            title: data.title,
        }

        modifyPost(formData);
    };
}