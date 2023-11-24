var user = getCurrentUser();

listcart(user);

function listcart(user) {
    var list = document.querySelector(".list-cart");
    var s = `
        <thead>
            <tr>
                <th>STT</th>
                <th>Ảnh đại diện</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
                <th>Hành động</th>
            </tr>
        </thead>`;
    console.log("user:", user);
    console.log("user.products:", user.products);
    console.log("list_products:", list_products);

    var mergedProducts = mergeProducts(user.products, list_products);

    for (var i = 0; i < mergedProducts.length; i++) {
        var p = mergedProducts[i];
        var soluongSp = p.soluong;
        s += `
            <tr>
                <td>` + (i + 1) + `</td>
                <td> <img src="` + p.img + `"></td>
                <td>
                    <a target="_blank" href="chitietsanpham.html?` + p.name.split(' ').join('-') + `" title="Xem chi tiết">` + p.name + `</a>
                </td>
                <td>
                `+ soluongSp +`
                <button class="btn btn-success" onclick="tangSoLuong('` + p.name + `')">+</button>
                <button class="btn btn-warning" onclick="giamSoLuong('` + p.name + `')">-</button>
                </td>
                <td>` + p.price + ` ₫</td>
                <td>`+ formatNumberWithCommasAndDecimal(parseFloat(p.price) * soluongSp) + ` ₫</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSanPham('` + p.name + `')">Xóa</button>
                </td>
            </tr>`;
    }
    list.innerHTML = s;
}
function timKiemTheoMa(list, ten) {
    for (var l of list) {
        if (l.name == ten) return l;
    }
}
// hàm gộp những sản phẩm giống nhau
function mergeProducts(userProducts, allProducts) {
    var mergedProducts = [];

    for (var i = 0; i < userProducts.length; i++) {
        var namesp = userProducts[i].name;
        var existingProduct = findProductByName(mergedProducts, namesp);

        if (existingProduct) {
            // Sản phẩm cùng tên đã có sẵn, cập nhật số lượng và giá
            existingProduct.soluong += userProducts[i].soluong;
        } else {
            // Sản phẩm không tồn tại trong danh sách hợp nhất, hãy thêm nó
            var product = timKiemTheoMa(allProducts, namesp);
            product.soluong = userProducts[i].soluong;
            mergedProducts.push(product);
        }
    }

    return mergedProducts;
}

function findProductByName(productList, name) {
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name == name) {
            return productList[i];
        }
    }
    return null;
}
function formatNumberWithCommasAndDecimal(number) {
    var formattedNumber = number.toFixed(3).replace(".", ".");
    return formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function xoaSanPham(tenSanPham) {
    // Xóa sản phẩm từ danh sách sản phẩm của người dùng
    user.products = user.products.filter(product => product.name !== tenSanPham);

    // Cập nhật danh sách giỏ hàng
    listcart(user);
}

function tangSoLuong(tenSanPham) {
    // Tăng số lượng của sản phẩm trong danh sách sản phẩm của người dùng
    for (var i = 0; i < user.products.length; i++) {
        if (user.products[i].name === tenSanPham) {
            user.products[i].soluong++;
            break;
        }
    }

    // Cập nhật danh sách giỏ hàng
    listcart(user);
}

function giamSoLuong(tenSanPham) {
    // Giảm số lượng của sản phẩm trong danh sách sản phẩm của người dùng
    for (var i = 0; i < user.products.length; i++) {
        if (user.products[i].name === tenSanPham) {
            user.products[i].soluong--;
            // Optional: Remove the product if the quantity is 0
            if (user.products[i].soluong === 0) {
                user.products.splice(i, 1);
            }
            break;
        }
    }

    // Cập nhật danh sách giỏ hàng
    listcart(user);
}
function muaHangThanhCong() {
    // Hiển thị thông báo
    alert("Mua hàng thành công!");
}