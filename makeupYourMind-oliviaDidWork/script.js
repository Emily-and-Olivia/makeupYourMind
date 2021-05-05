// PSEUDO CODE
// Create a namespace object to represent our app
const app = {};

app.resultContainer = document.querySelector('#resultContainer');

// define the init method to kickstart the app
app.init = (function(){
    app.findTheMakeup();
})
// define a method which makes a request to the API
app.findTheMakeup = function(productChoice){
    // utilise URL constructor to create object of base API endpoint
    const url = new URL(`http://makeup-api.herokuapp.com/api/v1/products.json`);
    console.log(url);
    // utilise URLSearchParams constructor to format API parameters
    url.search = new URLSearchParams({
        // pass in API params
        product_type: productChoice
    });
    // get information from the API endpoint
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonResponse){
            console.log(jsonResponse);
            app.displayProducts(jsonResponse);
        })
};
// define a method which takes the data and puts it onto the page
app.displayProducts = function(productArray){
    // *Remember* to clear/empty out the <ul>
    app.resultContainer.replaceChildren();
    // loop through the array
    productArray.forEach(function(product){
        console.log(product);
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
    // IF there is no price included on the product, do not print to page
    // IF no products match the users request, print a message to the page asking to search again
// define a method to setup event listeners
// attach an event listener when user submits the form
// attach a second event listener when user clicks the reset button to clear the results

app.init();


