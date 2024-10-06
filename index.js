//Store Details
const storeName = "Samsing";
const storeLocation = "Alabang";
const storeCapacity = 230; // Maximum number of products store can hold

//Dynamic Product Inventory
let products = [
  { name: "Laptop", price: 18999, quantity: 50 },
  { name: "Smartphone", price: 9999, quantity: 100 },
  { name: "Tablet", price: 12999, quantity: 80 }
];

//Inventory Validation
function checkInventoryCapacity() {
  const total = products.reduce((total, product) => total + product.quantity, 0); //total num of products
  if (total > storeCapacity) {
    console.log("Warning: Store is at full capacity, cannot add new products.");
  }
}

//Product Manipulation (Add Product Dynamically)
function addProduct(productName, price, quantity) {
  const currentTotal = products.reduce((total, product) => total + product.quantity, 0); //current total products
  if (currentTotal + quantity > storeCapacity) {
    console.log(`Error: Cannot add ${productName}. Adding ${quantity} units will exceed capacity.`);
    return;
  }

  products.push({ name: productName, price: price, quantity: quantity });
  console.log(`Added product: ${productName}, Quantity: ${quantity}`);
  checkInventoryCapacity();
}

//Product Manipulation (Remove Product Dynamically)
function removeProduct(productName, quantity) {
  const product = products.find((p) => p.name === productName);
  if (!product) {
    console.log(`Error: ${productName} cannot be found.`);
    return;
  }

  if (product.quantity - quantity < 0) {
    console.log(`Error: Cannot remove ${quantity} units of ${productName}. The available unit is ${product.quantity}`);
  } else {
    product.quantity -= quantity;
    console.log(`Removed ${quantity} of ${productName}. Remaining: ${product.quantity}`);
  }
}

//Most expensive product
function getMostExpensiveProduct() {
  let expensiveProduct = products[0];
  products.forEach((product) => {
    if (product.price > expensiveProduct.price) {
      expensiveProduct = product;
    }
  });
  return expensiveProduct;
}

//Total inventory value
function calculateTotalInventoryValue() {
  return products.reduce((total, product) => total + product.price * product.quantity, 0);
}

// Stretch Goal: Automatic Restocking
function restockProduct(productName, threshold) {
  const product = products.find((p) => p.name === productName);
  if (product && product.quantity < threshold) { 
    product.quantity += 20;
    console.log(`Restocked ${productName}. New quantity: ${product.quantity}`);
  }
}

//Output Results
const totalProducts = products.reduce((total, product) => total + product.quantity, 0);
console.log(`Store Name: ${storeName}`);
console.log(`Store Location: ${storeLocation}`);
console.log(`Total Number of Products: ${totalProducts}`);
console.log(`Total Inventory Value: ₱ ${calculateTotalInventoryValue()}`);
console.log(`Most Expensive Product: ${getMostExpensiveProduct().name}`);

//User Interaction (Asking to add a product)
const addChoice = prompt("Do you want to add a product? (y/n)");
if (addChoice.toLowerCase() === "y") {
const newProductName = prompt("Enter the new product name:");
const newProductPrice = parseFloat(prompt("Enter the price of the new product:"));
const newProductQuantity = parseInt(prompt("Enter the quantity of the new product:"));
addProduct(newProductName, newProductPrice, newProductQuantity);
}

//User Interaction (Asking to remove a product)
const removeChoice = prompt("Do you want to remove a product? (y/n)");
if (removeChoice.toLowerCase() === "y") {
  const removeProductName = prompt("Enter the product name to remove:");
  const removeQuantity = parseInt(prompt("Enter the quantity to remove:"));
  removeProduct(removeProductName, removeQuantity);
}
