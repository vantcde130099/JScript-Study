const myStore = window.localStorage
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const listUsers = $('.table tbody')
const searchInput = $('input[type=search]')
const showAddUser = $('.add-name')
const clearBtn = $('.clear-data')
const addUserBtn = $('.add-user button')
const addUserBlock = $('.add-user')
const subitEditBtn = $('.editBtn')
const notiBlock = $('.noti')
const addBtn = $('.addBtn')
const cancelBtn = $('.cancelBtn')


const app = {
    users: [],
    render: function() {
        const htmls = this.users.map((user, index) => {
            return `
            <tr class="user">
                <td><img src="${user.avatarLink}" style="width: 1.5rem; height:1.5rem;"></td>
                <td>${user.userName}</td>
                <td>${user.fName}</td>
                <td>${user.lName}</td>
                <td>${user.email}</td>
                <td><i class="bi bi-pencil-square editBtn" data-userName = "${user.userName}"></i></td>
                <td><i class="bi bi-x deleteBtn" data-userName = "${user.userName}"></i></td>
            </tr>
                `
        })
        listUsers.innerHTML = htmls.join('');
    },
    //catch Event
    handleEvent: function() {

        searchInput.onkeyup = function(e) {
                let listMatchName = [];
                for (const user of app.users) {
                    if (user.lName.includes(e.target.value) || user.fName.includes(e.target.value)) {
                        listMatchName.push(user)
                    }
                }
                const htmls = listMatchName.map((user, index) => {
                    return `
                <tr class="user">
                    <td><img src="${user.avatarLink}" style="width: 1.5rem; height:1.5rem;"></td>
                    <td>${user.userName}</td>
                    <td>${user.fName}</td>
                    <td>${user.lName}</td>
                    <td>${user.email}</td>
                    <td><i class="bi bi-pencil-square editBtn" data-userName = "${user.userName}"></i></td>
                <td><i class="bi bi-x deleteBtn" data-userName = "${user.userName}"></i></td>
                </tr>
                    `
                })
                listUsers.innerHTML = htmls.join('');
            }
            //close browser/tab
        window.addEventListener('beforeunload', function() {
            if (app.users.length > 0)
                myStore.setItem('myStore', JSON.stringify(app.users))
        });
        //empty data
        clearBtn.onclick = function() {
                app.users = []
                app.render()
            }
            //show add user block
        showAddUser.onclick = function() {
                addUserBlock.classList.toggle('d-none')
                addBtn.classList.remove('d-none')
                subitEditBtn.classList.add('d-none')

                $('#inputUsername').disabled = false
                $('#inputUsername').value = ''
                $('#inputEmail').value = ''
                $('#inputFName').value = ''
                $('#inputLName').value = ''
            }
            //add user
        addUserBtn.onclick = function() {
                let userName = $('#inputUsername').value
                let email = $('#inputEmail').value
                let fName = $('#inputFName').value
                let lName = $('#inputLName').value

                let user = {
                    avatarLink: './assets/img/user-img.png',
                    userName: userName,
                    fName: fName,
                    lName: lName,
                    email: email,
                }
                app.users.push(user)
                $('#inputUsername').value = ''
                $('#inputEmail').value = ''
                $('#inputFName').value = ''
                $('#inputLName').value = ''

                addUserBlock.classList.add('d-none')
                notiBlock.innerHTML = `<span class="badge bg-success">Success</span>`
                setTimeout(() => {
                    notiBlock.innerHTML = ''
                }, 3000);
            }
            //click edit user
        listUsers.onclick = function(e) {
                let editBtn = e.target.closest('.user .editBtn');
                let deleteBtn = e.target.closest('.user .deleteBtn')

                if (editBtn) {
                    let userName = editBtn.getAttribute('data-userName')
                    console.log(userName);
                    addUserBlock.classList.remove('d-none')
                    addBtn.classList.add('d-none')
                    subitEditBtn.classList.remove('d-none')
                    cancelBtn.classList.remove('d-none')

                    $('#inputUsername').disabled = true
                    let userFinded = app.users.find((user) => user.userName == userName) //get user from user name
                    $('#inputUsername').value = userFinded.userName
                    $('#inputEmail').value = userFinded.email
                    $('#inputFName').value = userFinded.fName
                    $('#inputLName').value = userFinded.lName
                }
                //delete user by username
                if (deleteBtn) {
                    let userName = deleteBtn.getAttribute('data-userName')
                    let userFinded = app.users.find((user) => user.userName == userName)
                    let indexUser = app.users.indexOf(userFinded);
                    app.users.splice(indexUser, 1)

                    searchInput.value = ''
                    notiBlock.innerHTML = `<span class="badge bg-success">Remove user success</span>`
                    setTimeout(() => { // thong bao
                        notiBlock.innerHTML = ''
                    }, 3000);
                    app.render() //render element changed
                }
            }
            //click edit button
        subitEditBtn.onclick = function() {
            let userName = $('#inputUsername').value
            let email = $('#inputEmail').value
            let fName = $('#inputFName').value
            let lName = $('#inputLName').value
            let user = {
                avatarLink: './assets/img/user-img.png',
                userName: userName,
                fName: fName,
                lName: lName,
                email: email,
            }
            let userFinded = app.users.find((user) => user.userName == userName)
            let indexUser = app.users.indexOf(userFinded);
            app.users[indexUser] = user //change user

            addUserBlock.classList.add('d-none')
            searchInput.value = ''
            notiBlock.innerHTML = `<span class="badge bg-success">Edit info success</span>`
            setTimeout(() => { // thong bao
                notiBlock.innerHTML = ''
            }, 3000);
            app.render() //render element changed
        }
        cancelBtn.onclick = function() { //cancel editing 
            addUserBlock.classList.toggle('d-none')
            addBtn.classList.remove('d-none')
            subitEditBtn.classList.add('d-none')

            $('#inputUsername').disabled = false
            $('#inputUsername').value = ''
            $('#inputEmail').value = ''
            $('#inputFName').value = ''
            $('#inputLName').value = ''
        }
    },

    //load data from localStorage
    loadLocalStorage: function() {
        if (myStore.length == 0) {
            this.getRandomData()
        } else {
            app.users = JSON.parse(myStore.getItem('myStore'))
        }
    },
    getRandomData: function() {
        for (let i = 0; i < 50; i++) {
            this.users.push({
                avatarLink: './assets/img/user-img.png',
                userName: faker.internet.userName(),
                fName: faker.name.findName(),
                lName: faker.name.lastName(),
                email: faker.internet.email()
            })
        }
    },
    start: function() {
        this.loadLocalStorage()

        this.handleEvent()

        this.render()
    }
}
app.start()