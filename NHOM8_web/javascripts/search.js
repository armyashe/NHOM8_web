const categories = [...new Set(list_products.map((item) => { return item }))] // khai báo mảng với tên là categories sẽ là danh sách mục duy nhất từ mảng list_products

// dùng để tìm kiếm các sản phẩm trên thanh tìm kiếm 
document.getElementById('menu-search').addEventListener('keyup', (e) => { // nhập từ tìm kiếm trên thanh tìm kiếm thì nó sẽ lọc danh sách dựa trên giá trị tìm kiếm . Sau đó nó sẽ hiện thị sản phẩm theo giá trị tìm kiếm trên trang hiện tại
    const searchData = e.target.value.toLowerCase();// sử dụng để so sánh không phân biệt chữ hoa và chữ thường.
    filteredData = categories.filter((item) => {
        return (
            item.name.toLowerCase().includes(searchData) 
        );
    });
    displayProductsOnPage(currentPage)
});
// hàm này dùng để tìm kiếm hai phần lọc theo giá và lọc theo sản phẩm 
function getprice() {
    const selectedInputprice = document.querySelector('input[name="price"]:checked');
    const selectedInput = document.querySelector('input[name="company"]:checked');

    var searchDatacompany;
    var searchData;
    if (selectedInput && selectedInputprice) { // nếu cùng ấn vào ô trong lọc theo giá và lọc theo sản phẩm thì sẽ hiển thị sản phẩm theo cái mình muốn tìm  vd : nhấn vào 0 đến 500đ và bàn trang điểm thì sẽ hiện ra sản phẩm bàn trang điểm có giá từ 0 đến 500đ
        searchDatacompany = selectedInput.value.toLowerCase();
        searchData = selectedInputprice.value.toLowerCase();
        filteredData = categories.filter((item) => {
            return (
                item.listprice && item.listprice.toLowerCase().includes(searchData) && item.company && item.company.toLowerCase().includes(searchDatacompany)
            )

        });
        console.log(filteredData);
        displayItem(filteredData);
    } else
        if (selectedInput) { // nếu ấn vào ô trong lọc theo sản phẩm thì ra những sản phẩm mình chọn vd chọn bàn trà thì chỉ hiện ra những sản phẩm bàn trà
            currentPage = 1;
            searchDatacompany = selectedInput.value.toLowerCase();
            filteredData = categories.filter((item) => {
                return (
                    item.company && item.company.toLowerCase().includes(searchDatacompany)
                )
            });
            displayProductsOnPage(currentPage)
        } else
            if (selectedInputprice) { //nếu ấn vào ô trong lọc theo giá thì ra những sản phẩm mình chọn vd chọn giá từ 5 triêu tới 7 triệu thì chỉ hiện ra những sản phẩm có giá từ 5 triêu tới 7 triệu
                currentPage = 1;
                searchData = selectedInputprice.value.toLowerCase();
                filteredData = categories.filter((item) => {
                    return (
                        item.listprice && item.listprice.toLowerCase().includes(searchData)
                    )
                });
                console.log(filteredData)
                displayProductsOnPage(currentPage)
            }
}

// dùng html trong js ( là mình làm html trong js thì giảm thời gian của những trang html giống nhau ) vd khung sản phẩm tầm 30 sản phẩm nếu làm bthuong thì sẽ làm 30 thẻ div nhưng dùng html trong js thì 1 thẻ div sẽ tạo 30 khung giống nhau
console.log(categories);
const displayItem = (items) => {
    document.getElementById('root').innerHTML = items.map((item) => {

        var { img, name, price, company, masp } = item;
        console.log(item);
        var chitietSp = 'chitietsanpham.html?' + name.split(' ').join('-');


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

// lọc danh sách sản phẩm dựa trên một danh mục được chỉ định (list_products) và sau đó hiển thị các sản phẩm đã được lọc lên trang hiện tại.
function filterProducts(category) {
    filteredData = list_products.filter((item) => {
        return item.category.toLowerCase() === category.toLowerCase();
    });
    displayProductsOnPage(currentPage)//Sau khi danh sách đã được lọc, hàm gọi displayProductsOnPage(currentPage)  để hiển thị các sản phẩm đã lọc lên trang hiện tại.
}

// Your other functions and code...

// chuyển trang

const itemsPerPage = 9;
let currentPage = 1;
var filteredData = categories;
displayProductsOnPage(currentPage);

function displayProductsOnPage(pageNumber) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = filteredData.slice(startIndex, endIndex);
    console.log(productsToDisplay)
    displayItem(productsToDisplay);
    updatePaginationButtons();
}


// xử lý nút trước
document.getElementById('nextPage').addEventListener('click', () => {
    if (filteredData && currentPage * itemsPerPage < filteredData.length) {
        currentPage++;
        displayProductsOnPage(currentPage);
        updatePaginationButtons();
    }
});

//xử lý nút sau
document.getElementById('prevPage').addEventListener('click', () => {
    if (filteredData && currentPage > 1) {
        currentPage--;
        displayProductsOnPage(currentPage);
        updatePaginationButtons();
    }
});

// Hàm cập nhật trạng thái của nút phân trang
function updatePaginationButtons() {
    // Cập nhật trạng thái của nút "prevPage" và "nextPage"
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    console.log(currentPage);

    if (currentPage === 1) {
        // Tắt "prevPage" nếu ở trang đầu tiên
        prevPageButton.disabled = true;
    } else {
        // Bật "prevPage" nếu không có trên trang đầu tiên
        prevPageButton.disabled = false;
    }

    if (!filteredData || currentPage * itemsPerPage >= filteredData.length) {
        // Tắt "nextPage" nếu không có dữ liệu tìm kiếm hoặc nếu ở trang cuối cùng
        nextPageButton.disabled = true;
    } else {
        // Bật "nextPage" nếu có nhiều dữ liệu hơn để hiển thị
        nextPageButton.disabled = false;
    }
}

// Khởi tạo các nút phân trang
updatePaginationButtons();


function User(username,pass,email, products, donhang) {
    this.username = username || '';
	this.pass = pass || '';
	this.email = email || '';
    this.products = products || [];
	this.donhang = donhang || [];
}