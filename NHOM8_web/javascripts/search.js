function searchfunc() {
    let menusearch = document.querySelector('#menu-search');
    let menuitems = Array.from(document.querySelectorAll('.menu-item'));
    menusearch.value = menusearch.value.toLowerCase();

    menuitems.forEach(function (el) {
        let text = el.innerText;
        if (text.indexOf(menusearch.value) > -1) {
            el.style.display = "";
        } else {
            el.style.display = "none";
        }
    });
}

let menusearch = document.querySelector('#menu-search');

menusearch.addEventListener('input', searchfunc); // Sử dụng sự kiện input để gọi searchfunc() khi gõ vào ô tìm kiếm
