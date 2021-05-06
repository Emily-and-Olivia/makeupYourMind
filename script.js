// PSEUDO CODE
// Create a namespace object to represent our app
const app = {};
app.resultContainer = document.querySelector('#resultContainer');
app.productSelect = document.querySelector("#makeupType")
app.submitButton = document.querySelector("form");
app.resetButton = document.querySelector("#reset");
// define the init method to kickstart the app
app.init = (function () {
    // app.findTheMakeup();
    app.addEventListeners();
})
// define a method which makes a request to the API
app.findTheMakeup = function (product) {
    // utilise URL constructor to create object of base API endpoint
    const url = new URL(`http://makeup-api.herokuapp.com/api/v1/products.json`);
    // utilise URLSearchParams constructor to format API parameters
    url.search = new URLSearchParams({
        // pass in API params
        product_type: product
    });
    
    // get information from the API endpoint
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(jsonResponse){
        app.displayProducts(jsonResponse);
    })
    
};

// IF there is no price included on the product, do not print to page
// define a method which takes the data and puts it onto the page
app.displayProducts = function(productArray){

    const productsWithPrices = productArray.filter((product) => {
        if (product.price != "0.0") {
            return true;
        } else {
            return false;
        }
    });

    // *Remember* to clear/empty out the <ul>
    app.resultContainer.replaceChildren();
    // loop through the array
    productsWithPrices.forEach(function(product){
        
        // create elements to house the product name, image and price
        const listItem = document.createElement('li');

        // <h4> - brand and product name
        const productTitle = document.createElement('h4');
        productTitle.textContent = `${product.brand} ${product.name}`;

        // <p> - price
        const price = document.createElement('p');
        price.textContent = product.price;

        // image
        const image = document.createElement('img');
        image.src = product.image_link;

        // append all the elements to the <li>
        listItem.append(productTitle, price, image);
        app.resultContainer.appendChild(listItem);
    });
}


// define a method to setup event listeners
app.addEventListeners = function() {
    app.submitEventListener();
    app.resetEventListener();
}

// // attach an event listener when user submits the form
app.submitEventListener = function() {
    
    app.submitButton.addEventListener("submit", function(event) {
        
        event.preventDefault();
        
        const userProduct = app.productSelect.selectedOptions;
        
        for (let i = 0; i < userProduct.length; i++) {
            app.findTheMakeup(userProduct[i].label);
        }
    });
}


// attach a second event listener when user clicks the reset button to clear the results
app.resetEventListener = function() {
    app.resetButton.addEventListener("click", function() {
        app.resultContainer.replaceChildren();
    });
}

app.init();

// STRETCH GOALS

// filter products by creulty-free, oil-free, and alcohol-free (based off users input of the checkboxes)
// IF no products match the users request, print a message to the page asking to search again
// if (product === "") {
//     app.resultContainer.innerHTML = `<p>Looks like no products matched your search. Please try again!</p>`
// } else {
