/**
 * Giới thiệu 1 số hàm built-in
 *  1.Alert
 *  2.Console
 *  3.Confirm
 *  4.Prompt
 *  5.Set timeout
 *  6.Set interval
 */

/**
 * Giới thiệu về toán tử trong JS
 *  1. Toán tử số học - Arithmetic
 *  2. Toán tử gán - Assignment
 *  3. Toán tử so sánh - Comparison
 *  4. Toán tử logic - Logical
 */

/**
 * Chuyển sang boolean = true
 *  1. 0
 *  2. false
 *  3. '' - ""
 *  4. undefined
 *  5. NaN
 *  6. null
 */

/**
 * Toán tử logic
 *  1. && - And
 *  2. || - Or
 *  3. ! - Not
 */

/**
 * Kiểu dữ liệu trong JS
 * 
 *  1. Dữ liệu nguyên thủy - Primative Data
 *      - Number
 *      - String
 *      - Boolean
 *      - undefined
 *      - Null
 *      - Symbol
 * 
 *  2. Dữ liệu phức tạp - Complex Data
 *      - Function
 *      - Object
 */

/**
 * Toán tử só sánh P2 => So sánh cả value và Data type
 *  1. ===
 *  2. !==
 */

/**
 * Arguments
 * 
 */

/**
 * Array method
 *  1. forEach()
 *  2. every()
 *  3. some()
 *  4. find()
 *  5. filter()
 *  6. map()
 *  7. reduce()
 */

/**
 * Math object
 *  1/ Math.PI
 *  2/ Math.round() //lam tron
 *  3/ Math.abs()   //gia tri tuyet doi
 *  4/ Math.ceil()  //lam tron tren
 *  5/ Math.floor() //lam tron duoi
 *  6/ Math.random()
 *  7/ Math.min()
 *  8/ Math.max()
 */

/**
 * Callback
 *  1. Là hàm
 *  2. Được truyền qua đối số
 *  3. Được gọi lại (Trong hàm nhận đối số)
 */ 

var courses = ['Javascript', 'NodeJs', 'ReactJs'];

//forEach2()
Array.prototype.forEach2 = function(callback){
	var arrayLength = this.length;
  for(let i in this){
  	callback(this[i]);
  }
}
courses.forEach2(function(course){
	return console.log(course);;
});

//filter2()
Array.prototype.filter2 = function (callback) {
    var result = [];
    for(let i of this){ 
        if(callback(i)){
            result.push(i);
        }
    }
    return result;
}
var newCourse = courses.filter2(function (course) {
    return course.length > 6;
});
console.log(newCourse);

//some();
Array.prototype.some2 = function (callback) {
    for(let i of this){
        if(callback(i))
            return true;
    }
    return false;
}

var checkString = courses.some2(function (course) {
    return typeof course === 'string';
});
console.log(checkString);

//every()
Array.prototype.every2 = function (callback) {
    for(let i of this){
        if(!callback(i))
            return false;
    }
    return true;
}

var checkEveryString = courses.every2(function (course) {
    return typeof course === 'string';
});

console.log(checkEveryString);