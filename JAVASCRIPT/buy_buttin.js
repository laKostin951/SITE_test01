document.getElementsByClassName('img-slider-button')[0].addEventListener('click', function() {
    show_movie()

})

function show_movie() {
    show_full_movie_spec_batman(document.getElementsByClassName('img-slider-button')[0].id);
}


function show_full_movie_spec_batman(movie_index) {

    /* pravljenje frve frakcije*/

    document.getElementById("preview_img").src = All_movies_in_js[movie_index].cover

    /*pravljanj edruge frakcije*/
    document.getElementsByClassName("preview_fraction_drescrition")[0].childNodes[1].innerHTML = '+'
    document.getElementsByClassName("preview_fraction_drescrition")[0].childNodes[3].innerHTML = All_movies_in_js[movie_index].title

    /*kreiranje trece frakcije*/

    let preview_fraction_infoX = document.getElementsByClassName("preview_fraction_info")[0]
    preview_fraction_infoX.innerHTML = '<p> genre:  ' + All_movies_in_js[movie_index].genre + '</p>';
    preview_fraction_infoX.innerHTML += '<p> director: ' + All_movies_in_js[movie_index].director + ' </p>';
    preview_fraction_infoX.innerHTML += '<p> year: ' + All_movies_in_js[movie_index].year + ' </p>';
    preview_fraction_infoX.innerHTML += '<p> price: ' + All_movies_in_js[movie_index].price + ' </p>';

    /*pravljenje cetvrte frakcije*/
    let final_buy_buttonX = document.getElementsByClassName("final_buy_button")[0]
    if (admin()) {
        final_buy_buttonX.innerHTML = 'Change';

        document.getElementById("trash_can_container").setAttribute('style', "display:flex");
    } else {
        final_buy_buttonX.style.background = 'red';
        final_buy_buttonX.style.width = '140px';
        final_buy_buttonX.innerHTML = 'Buy';
    }

    if (checkOutStock(movie_index)) {
        final_buy_buttonX.innerHTML = 'Not Available';
        final_buy_buttonX.style.background = 'transparent';
        final_buy_buttonX.style.width = '200px';
    }
    final_buy_buttonX.setAttribute('id', movie_index);

    document.getElementById("preview_page").style.top = "100px";
}

function delite_this_movie() {
    let id_x = document.getElementsByClassName("final_buy_button")[0].id
    let deleteMoviesUpdate = []
    for (let i = 0; i < All_movies_in_js.length; i++) {
        if (i != id_x) {
            deleteMoviesUpdate.push(All_movies_in_js[i])
        }
    }
    localStorage.setItem("All_movies", JSON.stringify(deleteMoviesUpdate));
    console.log(deleteMoviesUpdate)
    close_preview()
    setTimeout(function() {
        window.location.href = 'index.html'
    }, 600)
}

/*kupovina u preview modu*/
document.getElementsByClassName("final_buy_button")[0].addEventListener('click', function(event) {
    if (admin()) {
        localStorage.setItem("Action_for_change_movie", JSON.stringify({
            "action": true,
            "id_change": this.id
        }));
        console.log(this.id)
        window.location.href = 'adminChange.html'
    } else {
        if (current_user == '') {
            open_logIn_window()
        } else {
            add_item_to_cart_list(this.id)
        }
    }
})



//localStorage.setItem("current_purchuase", '[]');


function add_item_to_cart_list(id) {
    let shopping = currentPurchase
    let check = true
    if (checkOutStock(id)) {
        check = false
    }
    for (let i = 0; i < currentPurchase.length; i++) {
        if (shopping[i].id == id) {
            if (checkOutStock(id)) {
                check = false
            } else {
                check = false
                shopping[i] = {
                    "id": id,
                    "quantity": parseInt(shopping[i].quantity) + 1
                }
            }
        }
    }
    if (check) {
        shopping.push({
            "id": id,
            "quantity": 1
        })
    }


    localStorage.setItem('current_purchuase', JSON.stringify(shopping))

    close_preview()
    shopping_bag_gif_animated()

}

/*function update_quantityBatman(x) {
    let movies = All_movies_in_js
    if (movies[x].quantity == 1) {
        delite_this_movie()
    } else {
        movies[x].quantity = movies[x].quantity - 1
        localStorage.setItem('All_movies', JSON.stringify(movies))
    }
}*/

function checkOutStock(id) {
    let shopping = currentPurchase
    let check = false

    for (let i = 0; i < currentPurchase.length; i++) {
        if (shopping[i].id == id) {
            if (shopping[i].quantity >= All_movies_in_js[id].quantity) {
                check = true
            }
        }
    }
    if (All_movies_in_js[id].quantity == 0) {
        check = true
    }

    return check
}