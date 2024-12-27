
const addBtn = document.getElementById("btn");
let pname = document.getElementById("pname");
let pimage = document.getElementById("pimage");
let pcat = document.getElementById("pcat");
let pprice = document.getElementById("pprice");
let cartCount = document.getElementById("cart-counter");
const filterInput = document.getElementById("filter-input");
const filterButton = document.getElementById("filterData");

let UpdateIndex = null;

addBtn.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("product")) || [];

  if (UpdateIndex !== null) {
    
    data[UpdateIndex] = {
      productName: pname.value,
      Image: pimage.value,
      category: pcat.value,
      price: pprice.value,
    };
    UpdateIndex = null;
  } else {
   
    if (pname.value && pimage.value && pcat.value && pprice.value) {
      data.push({
        productName: pname.value,
        Image: pimage.value,
        category: pcat.value,
        price: pprice.value,
      });
    } else {
      alert("Please fill all the fields!");
      return;
    }
  }
  localStorage.setItem("product", JSON.stringify(data));
  loadProductData();
  clearFormInputs();
});

const loadProductData = () => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; 

  const products = JSON.parse(localStorage.getItem("product")) || [];
  if (products.length === 0) {
    cardContainer.innerHTML = "<p>No products available. Add some!</p>";
    return;
  }

  products.forEach((pro, index) => {
    let card = `
      <div class="card m-3" style="width: 18rem;">
        <img src="${pro.Image}" class="card-img-top" alt="Product Image" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title"><strong>Product:</strong> ${pro.productName}</h5>
          <p class="card-text">
            <strong>Category:</strong> ${pro.category}<br/>
            <strong>Price:</strong> ₹${pro.price}<br/>
          </p>
          <button class="btn btn-primary" onclick="editProductDetails(${index})">Edit</button>
          <button class="btn btn-danger" onclick="deleteProduct(${index})">Remove</button>
        </div>
      </div>`;
    cardContainer.innerHTML += card;
  });
};

const editProductDetails = (index) => {
  const data = JSON.parse(localStorage.getItem("product")) || [];
  const product = data[index];

  pname.value = product.productName;
  pimage.value = product.Image;
  pcat.value = product.category;
  pprice.value = product.price;

  UpdateIndex = index;
};

const deleteProduct = (index) => {
  let data = JSON.parse(localStorage.getItem("product")) || [];
  data.splice(index, 1); 
  localStorage.setItem("product", JSON.stringify(data));
  loadProductData();
};

const clearFormInputs = () => {
  pname.value = "";
  pimage.value = "";
  pcat.value = "";
  pprice.value = "";
};

filterButton.addEventListener("click", () => {
  const productData = JSON.parse(localStorage.getItem("product")) || [];
  const filterValue = filterInput.value.toLowerCase();

  const filteredProducts = productData.filter((product) =>
    product.productName.toLowerCase().includes(filterValue)
  );

  if (filteredProducts.length === 0) {
    alert("No products match your search.");
  }

  displayFilteredProducts(filteredProducts);
});

const displayFilteredProducts = (products) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ""; 

  if (products.length === 0) {
    cardContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach((pro, index) => {
    let card = `
      <div class="card m-3" style="width: 18rem;">
        <img src="${pro.Image}" class="card-img-top" alt="Product Image" style="height: 200px; object-fit: cover;">
        <div class="card-body">
          <h5 class="card-title"><strong>Product:</strong> ${pro.productName}</h5>
          <p class="card-text">
            <strong>Category:</strong> ${pro.category}<br/>
            <strong>Price:</strong> ₹${pro.price}<br/>
          </p>
          <button class="btn btn-primary" onclick="editProductDetails(${index})">Edit</button>
          <button class="btn btn-danger" onclick="deleteProduct(${index})">Remove</button>
        </div>
      </div>`;
    cardContainer.innerHTML += card;
  });
};
loadProductData();


