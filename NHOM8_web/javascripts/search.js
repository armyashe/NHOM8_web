function searchfunc() {
    let menusearch = document.querySelector('#menu-search');
    let menuitems = Array.from(document.querySelectorAll('.menu-item'));
    let searchText = menusearch.value.toLowerCase(); // Chuyển đổi tất cả thành chữ thường

    menuitems.forEach(function (el) {
        let text = el.innerText.toLowerCase(); // Chuyển đổi văn bản mục tiêu thành chữ thường
        if (text.indexOf(searchText) > -1) {
            el.style.display = "";
        } else {
            el.style.display = "none";
        }
    });
}

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  window.addEventListener("scroll", reveal);

  const categories = [...new Set(list_products.map((item) => { return item }))]

document.getElementById('menu-search').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredData = categories.filter((item) => {
        return (
            item.name.toLowerCase().includes(searchData)
        )
    })
    displayItem(filteredData)
});

function getprice(){
    const selectedInputprice = document.querySelector('input[name="price"]:checked');
    const selectedInput = document.querySelector('input[name="company"]:checked');
    
        var searchDatacompany ;
        var searchData ;
        if(selectedInput&&selectedInputprice){
            searchDatacompany=selectedInput.value.toLowerCase();
            searchData= selectedInputprice.value.toLowerCase();
            const filteredData = categories.filter((item) => {
                return (
                    item.listprice && item.listprice.toLowerCase().includes(searchData) && item.company && item.company.toLowerCase().includes(searchDatacompany)
                    )
                
            });
            console.log(filteredData);
            displayItem(filteredData);
        }else
        if(selectedInput){
            searchDatacompany=selectedInput.value.toLowerCase();
            
            const filteredData = categories.filter((item) => {
                return (
                    item.company && item.company.toLowerCase().includes(searchDatacompany)
                    )
                    
                
            });
            displayItem(filteredData);
        }else
        if(selectedInputprice){
            searchData= selectedInputprice.value.toLowerCase();
            const filteredData = categories.filter((item) => {
                return (
                    item.listprice && item.listprice.toLowerCase().includes(searchData)
                    )
                   
                
            });
            displayItem(filteredData);
        }
}
   



console.log(categories);
const displayItem = (items) => {
    document.getElementById('root').innerHTML = items.map((item) => {
        
        var { img, name, price , company , masp} = item;
        console.log(item);
        var chitietSp='chitietsanpham.html?' +name.split(' ').join('-');
        console.log(masp);
        
        return (
            `<div class='box'>
            <a href="` + chitietSp + `">
                <div class='img-box'>
                    <img class='images' src=${img}></img>
                </div> 
                <div class='bottom'>
                    <h2>${name}</h2>
                    <h2>${price}đ</h2>
                </div>
            </div>`
        )
    }).join('')
};
displayItem(categories);
