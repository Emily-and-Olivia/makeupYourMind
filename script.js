// Create a namespace object to represent our app
const app = {};
app.resultContainer = document.querySelector('#resultContainer');
app.productSelect = document.querySelector("#makeupType")
app.checkboxes = document.querySelectorAll("input[type='checkbox']");
app.submitButton = document.querySelector("form");
app.resetButton = document.querySelector("#reset");
// define the init method to kickstart the app
app.init = (function () {
    app.addEventListeners();
})
// define a method which makes a request to the API
app.findTheMakeup = function (product, filter) {
    // utilise URL constructor to create object of base API endpoint
    const url = new URL(`https://makeup-api.herokuapp.com/api/v1/products.json`);
    // utilise URLSearchParams constructor to format API parameters
    url.search = new URLSearchParams({
        // pass in API params
        product_type: product,
        product_tags: filter
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

    const filteredProducts = productArray

    // *Remember* to clear/empty out the <ul>
    app.resultContainer.replaceChildren();

    // IF no products match the users request, print a message to the page asking to search again
    if (filteredProducts.length == 0) {
        alert(`Looks like no products matched your search. Please try again!`);
    } else {
    // loop through the array
        filteredProducts.forEach(function(product){
            
            // create elements to house the product name, image and price
            const listItem = document.createElement('li');

            // <h4> - product name
            const productTitle = document.createElement('h4');
            productTitle.textContent = `${product.name}`;

            // <h5> - brand
            const productBrand = document.createElement('h5');
            productBrand.textContent = `By: ${product.brand}`;

            // image
            const image = document.createElement('img');
            image.src = product.image_link;

            // buy now
            const buyNow = document.createElement('p');
            buyNow.innerHTML = `<a href="${product.product_link}" target="_blank" rel="noopener noreferrer">Buy Now</a>`;

            // append all the elements to the <li>
            listItem.append(productTitle, productBrand, image, buyNow);
            app.resultContainer.appendChild(listItem);
        });
    }
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

        // save the value of the checked box (user input) 
        // use that to filter results
        
        const userProduct = app.productSelect.selectedOptions;
        const userFilters = [];
        
        app.checkboxes.forEach(function(box) {
            if (box.checked) {
                userFilters.push(box.value);
            }
        });

        for (let i = 0; i < userProduct.length; i++) {
            app.findTheMakeup(userProduct[i].label, userFilters);
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