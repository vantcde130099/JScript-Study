
//     var boxHTMLCollection = document.getElementsByClassName('box');
//     var box1Element = document.getElementsByClassName('box')[0];
//     var box2Element = document.getElementsByClassName('box')[1];
//     var allItemElements = document.getElementsByTagName('li');
//     var box1ItemElements =  document.querySelectorAll('.container > .box:first-child li');
//     var box2ItemElements =  box2Element.getElementsByTagName('li');
// console.log(boxHTMLCollection);
// console.log(box1Element);
// console.log(box2Element);
// console.log(allItemElements);
// console.log(box1ItemElements);
// console.log(box2ItemElements);


// var courses = ['Javascript', 'NodeJs', 'ReactJs'];

// //forEach2()
// Array.prototype.forEach2 = function(callback){
// 	var arrayLength = this.length;
//   for(let i in this){
//   	callback(this[i]);
//   }
// }
// courses.forEach2(function(course){
// 	return console.log(course);;
// });

// //filter2()
// Array.prototype.filter2 = function (callback) {
//     var result = [];
//     for(let i of this){ 
//         if(callback(i)){
//             result.push(i);
//         }
//     }
//     return result;
// }
// var newCourse = courses.filter2(function (course) {
//     return course.length > 6;
// });
// console.log(newCourse);

// //some();
// Array.prototype.some2 = function (callback) {
//     for(let i of this){
//         if(callback(i))
//             return true;
//     }
//     return false;
// }

// var checkString = courses.some2(function (course) {
//     return typeof course === 'string';
// });
// console.log(checkString);

// //every()
// Array.prototype.every2 = function (callback) {
//     for(let i of this){
//         if(!callback(i))
//             return false;
//     }
//     return true;
// }

// var checkEveryString = courses.every2(function (course) {
//     return typeof course === 'string';
// });

// console.log(checkEveryString);

// /**Promise Example */
// function sleep(ms) {
//     return new Promise(function (resolve) {
//        setTimeout(resolve, ms) ;
//     });
// }   

// sleep(1000)
//     .then(function () {
//         console.log(1);
//         return sleep(1000);
//     })
//     .then(function () {
//         console.log(2);
//         return sleep(1000);
//     })
//     .then(function ()    {
//         console.log(3);
//         return sleep(1000);
//     })


// /**Cách lấy dữ liệu */
// var users = [
//     {
//         id: 1,
//         name: 'Cong Van'
//     },
//     {
//         id: 2,
//         name: 'Trung Nam'
//     },
//     {
//         id: 3,
//         name: 'Ngoc Long'
//     },
// ];
// var comments = [
//     {
//         id: 1,
//         content: 'di choi khong',
//         userId: 2
//     },
//     {
//         id: 2,
//         content: 'ok di',
//         userId: 3
//     },
//     {
//         id: 3,
//         content: 'thoi t ko di',
//         userId: 1
//     },
// ];

// function getComments() {
//     return new Promise(function (resolve) {
//         setTimeout(() => {
//             resolve(comments);
//         }, 1000);
//     });
// }

// function getUsersById(userIds) {
//     return new Promise(function (resolve) {
//         setTimeout(() => {
//             var result = users.filter(function (user) {
//                 return userIds.includes(user.id);
//             })
//             resolve(result);
//         }, 1000);
//     })
// }

// getComments()
//     .then(function (comments) {
//         var userIds = comments.map(function (comment) {
//             return comment.userId;
//         });
//         return getUsersById(userIds)
//             .then(function (users) {
//                 return {
//                     users: users,
//                     comments: comments,
//                 };
//             });
//     })
//     .then(function (data) {
//         var commentBox = document.getElementById('comment-box');
//         var html = '';
//         data.comments.forEach(function (comment) {
//             var user = data.users.find(function (user) {
//                 return user.id === comment.userId;
//             });
//             html += `<li>${user.name}: ${comment.content}</li>`
//         });
//         commentBox.innerHTML = html;
//     })

/**Fetch */
var postApi = 'https://jsonplaceholder.typicode.com/photos';
fetch(postApi)
    .then(function (response) {
        return response.json(); //javascript types
    })
    .then(function (posts) {
        var htmls = posts.map(function (post) {
            return `<li>
            <h3>${post.title}</h3>
            <p>${post.url}</p>
            </li>
            `
        });
        var html = htmls.join('');
        document.getElementById('comment-box').innerHTML = html;
    })
