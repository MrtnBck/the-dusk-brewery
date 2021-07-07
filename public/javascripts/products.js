$(document).ready(function(){
    class Product{
        constructor(productId, productName, productOrigin, productType, productDescription, productImg, productPrice){
            this.productId = productId,
            this.productName = productName,
            this.productOrigin = productOrigin,
            this.productType = productType,
            this.productDescription = productDescription,
            this.productImg = productImg,
            this.productPrice = productPrice
        }
    }

    class Shop{
        //Create the html strucutre and load the load in the product datas
        addProductToScreen(product){
            let mainProductScreen = document.getElementById("products");

            let article = document.createElement("article");
            mainProductScreen.appendChild(article);

            let divWrapp = document.createElement("div");
            divWrapp.classList.add("wrapp-img-product");
            article.appendChild(divWrapp);

            let imgTag= document.createElement("img");
            imgTag.src=  product.productImg;
            divWrapp.appendChild(imgTag);

            let qtyInput = document.createElement("input");
            qtyInput.id = product.productId;
            qtyInput.type = "number";
            qtyInput.min = "1";
            divWrapp.appendChild(qtyInput);

            let divWrapp2 = document.createElement("div");
            divWrapp2.classList.add("wrapp-content-product");
            article.appendChild(divWrapp2);
            
            let beerName = document.createElement("h2");
            beerName.appendChild(document.createTextNode(product.productName));
            divWrapp2.appendChild(beerName);

            let beerOrigin = document.createElement("h3");
            beerOrigin.classList.add("company");
            beerOrigin.appendChild(document.createTextNode(product.productOrigin));
            divWrapp2.appendChild(beerOrigin);

            let beerType = document.createElement("h3");
            beerType.classList.add("brand");
            beerType.appendChild(document.createTextNode(product.productType));
            divWrapp2.appendChild(beerType);

            let beerDescription = document.createElement("p");
            beerDescription.classList.add("wrapp-about-product");
            beerDescription.appendChild(document.createTextNode(product.productDescription));
            divWrapp2.appendChild(beerDescription);

            let beerPrice = document.createElement("h3");
            beerPrice.classList.add("company");
            beerPrice.appendChild(document.createTextNode(product.productPrice + " €"));
            divWrapp2.appendChild(beerPrice);

            let buttonAdd = document.createElement("button");
            buttonAdd.id = product.productId;
            buttonAdd.classList.add("price-add-cart", "link");
            buttonAdd.textContent = "Add to Shopping Cart";
            $(buttonAdd).click(function(){
                let qtyVal = document.getElementById(product.productId).value;
                shop.addProductToLocalStorage(product.productId, product.productName, product.productPrice, qtyVal );
            })
            divWrapp2.appendChild(buttonAdd);
        }
        //We need the product datas in the shopping cart page too. Good solution for this to use the localStorage
        addProductToLocalStorage(productId, productName, productPrice, qty){

            localStorage.setItem("product_"+productId, JSON.stringify({  // JSON. stringify make the JSON to string conversion. It is necessary because localStroage can't store datas in JSON
                productId: productId,
                productName: productName,
                productPrice : productPrice,
                productQty: qty

            }));
        };
    
    }
    //This part run automatically if the shopping_cart.js rendered -START
    const shop = new Shop();
    //This Jquery ajax method call the /product/show route. The backend will send the product data-s
    $.ajax({
        url: "http://localhost:8000/product/show",
        type:"GET",
        success: function(products){
            for(var i=0; i<products.length;i++){
                //Create a new Product instance from Product class and save the backend product data-s for the frontend work
                products[i] = new Product(products[i]._id, products[i].productName, products[i].productOrigin, products[i].productType, products[i].productDescription, products[i].productImg, products[i].productPrice);
                shop.addProductToScreen(products[i]);
                
                
            }
        }
    });
    //Forismatic API START
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/",
        jsonp: "jsonp",
        dataType: "jsonp",
        data: {
            method: "getQuote",
            lang: "en",
            format: "jsonp"
        }
    })
    .done(update)
    .fail(handleErr);

    function update(response) {
        console.log(response);
        let quoteDiv = document.getElementById("quote-div");

        let quote = document.createElement("blockquote");
        quote.appendChild(document.createTextNode(response.quoteText));
        quoteDiv.appendChild(quote);

        let author = document.createElement("h4");
        author.classList.add("author");
        author.appendChild(document.createTextNode(response.quoteAuthor));
        quoteDiv.appendChild(author);
    }
    
    function handleErr(jqxhr, textStatus, err){
        console.log(err);
    }
    //Forismatic API END

    $("#btn-cart").click(function(){
        var user = localStorage.getItem("user");
        var user_id = localStorage.getItem("user_id");
        if(user && user_id){
            $.ajax({
                url: "http://localhost:8000/cart/verify",
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("user", localStorage.getItem("user"));
                },
                success: function(file){
                    $('body').html(file);
                }
            });
        }
    })
    //This part run automatically if the shopping_cart.js rendered -END
});
