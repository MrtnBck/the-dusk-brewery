//We are using here jQuery and basic Javascript (Vanilla JS)

$(document).ready(function(){               //Important: this ensures if the browser rendered the html page, the javascript can work.
    $("#btn-login").click(function(){       // if you click the button with id="btn-login" ...
        //jQuery AJAX call
        $.ajax({
            type: 'POST',
            url: "http://localhost:8000/login",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "username": $("#login-user").val(),     
                "password": $("#login-pwd").val(),     
            }),
            success: function(data){                     
                if ($("#login-chkbx").is(':checked')){  
                    const user = data.user || false;        
                    const user_id = data.user_id || false; 
                    if(user && user_id){
                        localStorage.setItem('user', data.user);  //save to the browser's localStorage
                        localStorage.setItem('user_id', data.user_id); //save to the browser's localStorage
                        // this ajax call the verifyToken middleware, if our token is valid the products page will rendered to the browser
                        $.ajax({
                            url: "http://localhost:8000/products/verify", 
                            type: 'GET',
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("user", localStorage.getItem("user")); //We send the token in the request header for the verifyToken middleware
                            },
                            success: function(file){
                                $('body').html(file);  //the response file ( product_list.html will render)
                            }
                        });
                    }
                }else{
                    console.log("Don't have you respect for beer?:(");
                }
            },
            error: function(data){
               alert("User or password does not match. Try again!")
            }
        });
    });

    $('#btn-register').click(function(){
        let chkbx = $("#register-chkbx").is(':checked'); //on
        let pwd1 = $('#register-pwd').val();
        let pwd2 = $('#register-pwd2').val();
        $.ajax({
            type: 'POST',
            url: "http://localhost:8000/user/register",
            dataType: "json",
            contentType: "application/json",
            //send data for backend .
            data: JSON.stringify({
                "firstName": $("#register-first").val(),
                "lastName": $("#register-last").val(),
                "username": $("#register-user").val(),
                "email":  $('#register-email').val(),
                "password": $("#register-pwd").val(),
                "password2": $("#register-pwd2").val(),
                "chkbx": $("#register-chkbx").is(':checked')
            }),
            success: function(data){
                location.href = "/login"; //Standard Vanilla JS way to redirect page
            }
        });
    })
    
    $("#btn-chk").click(function(){
        $.ajax({
            type:'POST',
            url: 'http://localhost:8000/register/check',
            dataType:'json',
            contentType: "application/json",
            data: JSON.stringify({
                "code": $('#code-input').val()
            }),
            success: function(data){
                location.href = "/register"; 
            }
        })
    });
    //JOKE ONE -RESTFUL API
    //https://jokes.one/api/joke/
    $.ajax({
        url: "https://api.jokes.one/jod" ,
        type: "GET",
        success: function(joke){
            //console.log(joke.contents.jokes[0].joke.text);
            let jokeDiv = document.getElementById("joke");

            let p = document.createElement("p");
            p.id = "jokeText";
            p.appendChild(document.createTextNode(joke.contents.jokes[0].joke.text));
            jokeDiv.appendChild(p);
        }
    })
});