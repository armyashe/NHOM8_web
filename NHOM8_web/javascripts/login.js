const btn = document.querySelector('.btn-primary-login');
const inputname = document.querySelector('.username');
const inputemail = document.querySelector('.email');
const inputpass = document.querySelector('.password');
const inputusernamereg = document.querySelector('#usernamereg');
const inputpassreg = document.querySelector('#passreg');


setTimeout(() => {
    checkCurrentUser();
}, 1);

function equalUser(u1, u2) {
    return (u1.username == u2.username && u1.pass == u2.pass);
}
function getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('CurrentUser'));
}

function setCurrentUser(u) {
    window.localStorage.setItem('CurrentUser', JSON.stringify(u));
}
function login() {
    var username = document.getElementById('usernamereg').value;
    var pass = document.getElementById('passreg').value;
    console.log(username)
    var user = new User(username, pass); 
    // Updated to pass an empty email
    console.log(pass)
    var listUser = getListUser();
    console.log(listUser)
    console.log(user)
    var check = false;
    alert('1')

    for (var u of listUser) {
        if (equalUser(user, u)) {
            setCurrentUser(u);
            check = true;
            console.log('1')
            
        }
    }
    console.log(check)
    

    if (check) {
        window.location.href = "sanpham.html"
        alert('Đăng nhập thành công');
        
    } else {
        alert('Vui lòng đăng nhập lại');
        inputpassreg.focus();
    }
}
function getuser() {
    var username = inputname.value;
    var email = inputemail.value;
    var pass = inputpass.value;
    if (username === "") {
        alert("Vui lòng nhập username!");
        return false;
    }
    if (pass === "" || pass.length < 8) {
        alert("Vui lòng nhập lại pass ( ít nhất 8 kí tự )!");
        return false;
    }
    if (email === "") {
        alert("Vui lòng nhập email!");
        return false;
    }

    var user = new User(email,username, pass);
    var listUser = getListUser();
    for (var u of listUser) {
        if (user.username === u.username) {
            alert("Tên đã có người đăng nhập");
            return false;
        }
    }

    listUser.push(user);

    window.localStorage.setItem('ListUser', JSON.stringify(listUser));
    window.location.href = "login.html"
    alert("Đăng kí thành công vui lòng đăng nhập")
}

var list=getListUser();
 console.log(list);
 function getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('CurrentUser'));
}

function setCurrentUser(u) {
    window.localStorage.setItem('CurrentUser', JSON.stringify(u));
}


function getListUser() {
    var data = JSON.parse(window.localStorage.getItem('ListUser')) || []
    var l = [];
    for (var d of data) {
        l.push(d);
    }
    return l;
}

function setListUser(l) {
    window.localStorage.setItem('ListUser', JSON.stringify(l));
}

function User(username, pass,email, products, donhang) {
	this.pass = pass || '';
	this.email = email || '';
	this.username = username || '';
    this.products = products || [];
	this.donhang = donhang || [];
}

function checkCurrentUser(){
    var user=getCurrentUser();
    console.log(user);
    if(user!=null){
        document.querySelector('.login').innerHTML=user.username;
        document.querySelector('.login').href="giohang.html";
    }
}   
function logout() {
    // Xóa người dùng hiện tại từ localStorage.
    window.localStorage.removeItem('CurrentUser');
    
    // Chuyển hướng về trang đăng nhập.
    window.location.href = "sanpham.html";
}

// ... Các hàm và đối tượng khác ...

// Sự kiện cho nút đăng xuất.
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', function () {
        logout();
    });
}