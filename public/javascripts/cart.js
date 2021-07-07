$(document).ready(function(){
    class Cart {
        //Create the html table strucutre and load added product
        addCartItemToScreen(addedProduct){
            let cartHead = document.getElementById("table-append");
                
            let tr= document.createElement("tr");
            tr.classList.add("remove");
            cartHead.append(tr);

            let nameTd = document.createElement("td");
            nameTd.classList.add("align-left", "fw-bold");
            nameTd.appendChild(document.createTextNode(addedProduct.productName));
            tr.appendChild(nameTd);

            let qtyTd = document.createElement("td");
            qtyTd.appendChild(document.createTextNode(addedProduct.productQty));
            tr.appendChild(qtyTd);

            let priceTd = document.createElement("td");
            priceTd.appendChild(document.createTextNode(addedProduct.productPrice + " €"));
            tr.appendChild(priceTd);

            let total = Math.round((addedProduct.productQty * addedProduct.productPrice) * 10) /10;
            let sumTd = document.createElement("td");
            sumTd.appendChild(document.createTextNode(total + " €"));
            tr.appendChild(sumTd);

        };
        addToSum(itemQty, sum){
            let sumText = document.getElementById("sum-text");

            let qty = document.createElement("p");
            qty.classList.add("remove");
            qty.appendChild(document.createTextNode("Items: " +itemQty));
            sumText.appendChild(qty);

            let summary = document.createElement("p");
            summary.classList.add("remove");
            summary.appendChild(document.createTextNode("Total cart: " + Math.round(sum *10) /10 + " €"));
            sumText.appendChild(summary);
        }
    }
    //This part run automatically if the shopping_cart.js rendered -START
    const cart = new Cart(); //create a new instance from Cart class

    let itemQty = 0; // for addToSum method
    let sum = 0;        // for addToSum method

    for( var key in localStorage){              //It's a tricky part: we can read from the localStorage in this way.
        if(key.indexOf("product_") === 0){   
            let x = localStorage.getItem(key);
            let addedProduct = JSON.parse(x);   //Convert string to JSON
            itemQty += 1;
            sum += addedProduct.productPrice *addedProduct.productQty;
            cart.addCartItemToScreen(addedProduct);
        }
    }
    cart.addToSum(itemQty, sum);

    $("#btn-del").click(function(){             //Delete All button logic
        for( var key in localStorage){
            if(key.indexOf("product_") === 0){
                let x = localStorage.removeItem(key);
            }
        }
        $(".remove").remove();
    });

    //For email sending - not finished yet
    $("#order").click(function(){  

    });

    //This part run automatically if the shopping_cart.js rendered -END
});

