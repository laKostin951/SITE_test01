// globalne
var All_movies_in_js = JSON.parse(localStorage.All_movies)
var All_users_in_js = JSON.parse(localStorage.All_users)
var current_user = localStorage.getItem('Current_user')
var currentPurchase = JSON.parse(localStorage.current_purchuase)
var globalPurchase = JSON.parse(localStorage.Global_purchuase)


document.getElementById("button_purchuases").addEventListener('click', function() {
    document.getElementById("last_purchuase_div").style.height = 'auto';
    document.getElementById("last_purchuase_div").style.opacity = '1';
    document.getElementById("shoping_bag_div").style.height = '0';
    document.getElementById("shoping_bag_div").style.opacity = '0';
    this.style.right = '0'
    document.getElementsByClassName("button_left")[0].style.right = '-30px'
    scrol_for_movie200()

})

function scrol_for_movie200() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    check = false;
}
document.getElementById("button_bag").addEventListener('click', function() {
    document.getElementById("last_purchuase_div").style.height = '0';
    document.getElementById("last_purchuase_div").style.opacity = '0';
    document.getElementById("shoping_bag_div").style.opacity = '1';
    document.getElementById("shoping_bag_div").style.height = vrati_height();
    this.style.right = '0'
    document.getElementsByClassName("button_left")[1].style.right = '-30px'
    if (currentPurchase.length == 0) {
        document.getElementById('shoping_bag_div').innerHTML += '<h6> Your bag is Empty '
    }
    scrol_for_movie200()
})

// generate shhoping bag_container
window.onload = function() {
    if (JSON.parse(localStorage.Action_for_MyPage).action) {
        if (JSON.parse(localStorage.Action_for_MyPage).type == 1) {
            document.getElementById("button_bag").click()
        }
        if (JSON.parse(localStorage.Action_for_MyPage).type == 2) {
            document.getElementById("button_purchuases").click()
        }
        if (JSON.parse(localStorage.Action_for_MyPage).type == 3) {
            open_settingsProfile()
        }
        localStorage.setItem("Action_for_MyPage", JSON.stringify({
            "action": false,
            'type': 2
        }));
    }

    for (let i = 0; i < currentPurchase.length; i++) {
        generate_bag_conatiner(currentPurchase[i].id, i)
    }
    total()
    insert_values()
    loadPurchuases()

}

function loadPurchuases() {

    if (All_users_in_js[current_user].purchase.length != 0) {
        document.getElementById('last_purchuase_div').innerHTML = ''
        document.getElementById('last_purchuase_div').innerHTML = '<h1>My Purchase</h1>'
        heightPurchuase = heightPurchuase + 500
        for (let i = 0; i < All_users_in_js[current_user].purchase.length; i++) {
            genratePurchuase(All_users_in_js[current_user].purchase[i])
        }
    }
}

function generate_bag_conatiner(i, id_c) {
    let div_container = document.createElement('div')
    div_container.classList.add('bag_container')
    div_container.setAttribute('id', i)
    //slika
    let movie_img = document.createElement('img')
    movie_img.src = All_movies_in_js[i].cover
    div_container.appendChild(movie_img)
    //naslov
    let movie_title = document.createElement('p')
    movie_title.innerHTML = All_movies_in_js[i].title
    div_container.appendChild(movie_title)
    //input
    let div_bottons = document.createElement('div')

    let button1 = document.createElement('img')
    button1.src = 'FILES/iconfinder_basics-15_296819-minus.png'
    button1.setAttribute('onclick', 'quantity_down(this.parentNode)')
    div_bottons.appendChild(button1)

    let imput_quatity = document.createElement('input')
    imput_quatity.type = 'number'
    imput_quatity.setAttribute('onchange', 'imput_quatityBatman(this.parentNode.parentNode, this.value)')
    imput_quatity.value = currentPurchase[id_c].quantity
    div_bottons.appendChild(imput_quatity)

    let button2 = document.createElement('img')
    button2.src = 'FILES/iconfinder_basics-15_296819.png'
    button2.setAttribute('onclick', 'quantity_up(this.parentNode)')
    div_bottons.appendChild(button2)

    div_container.appendChild(div_bottons)
    //price
    let movie_price = document.createElement('p')
    movie_price.setAttribute('id', 'movie_price')
    movie_price.innerHTML = (All_movies_in_js[i].price * currentPurchase[id_c].quantity).toFixed(2)

    div_container.appendChild(movie_price)
    // remove
    let movie_remove = document.createElement('div')
    movie_remove.setAttribute('id', 'trash_can_container')
    movie_remove.setAttribute('onclick', 'remove_this(this.parentNode)')

    let trash_can_par1 = document.createElement('img')
    trash_can_par1.src = 'FILES/iconmonstr-trash-can-part_1.png'
    trash_can_par1.setAttribute('id', 'trash_can1')
    movie_remove.appendChild(trash_can_par1)

    let trash_can_par2 = document.createElement('img')
    trash_can_par2.src = 'FILES/iconmonstr-trash-can-part-2.png'
    trash_can_par2.setAttribute('id', 'trash_can2')
    movie_remove.appendChild(trash_can_par2)


    div_container.appendChild(movie_remove)
    //finalno dodavanje
    document.getElementById('shoping_bag_div').appendChild(div_container)

}

function remove_this(x) {
    x.style.height = '0'
    x.style.transform = 'scale(0.3,1)'
    setTimeout(function() {
        x.style.display = 'none'
    }, 300)
    delite_from_bag(x)

}

function vrati_height() {
    return (currentPurchase.length + 1) * 120 + 86
}

function quantity_up(x) {
    x.children[1].value = parseFloat(x.children[1].value) + parseFloat(1)
    update_quantityBatman(x.parentNode, x.children[1].value)
}

function quantity_down(x) {
    x.children[1].value = parseFloat(x.children[1].value) - parseFloat(1)
    update_quantityBatman(x.parentNode, x.children[1].value)
    if (x.children[1].value == 0) {
        remove_this(x.parentNode)
        delite_from_bag(x.parentNode)
    }
}

function change_price(x, z) {
    x.children[3].innerHTML = (All_movies_in_js[x.id].price * currentPurchase[z].quantity).toFixed(2)
    total()
}

function imput_quatityBatman(x, y) {
    /*if (parseInt(y) <= 0) {
        delite_from_bag(x)
        console.log('uso1')
    } else {
        if (parseInt(y) >= All_movies_in_js[x.id].quantity) {
            x.children[3].innerHTM = All_movies_in_js[x.id].price * All_movies_in_js[x.id].quantity
        } else {
            x.children[3].innerHTML = (parseInt(y) * All_movies_in_js[x.id].price).toFixed(2)
        }
    }*/
    update_quantityBatman(x, y)


}

function delite_from_bag(x) {
    let id_x = x.id
    let deleteShoppingBag = []
    for (let i = 0; i < currentPurchase.length; i++) {
        if (currentPurchase[i].id != id_x) {
            deleteShoppingBag.push(currentPurchase[i])
        }
    }
    localStorage.setItem("current_purchuase", JSON.stringify(deleteShoppingBag));
    total()
}

function update_quantityBatman(x, y) {
    current_purchuase = currentPurchase
    let z
    for (let i = 0; i < current_purchuase.length; i++) {
        if (x.id == current_purchuase[i].id) {
            z = i
            if (y >= All_movies_in_js[x.id].quantity) {
                current_purchuase[i].quantity = All_movies_in_js[x.id].quantity
                x.children[2].children[1].value = All_movies_in_js[x.id].quantity
            } else {
                current_purchuase[i].quantity = y
            }
        }
        localStorage.setItem('current_purchuase', JSON.stringify(current_purchuase))
    }

    if (y <= 0) {
        remove_this(x)
    } else {
        if (y >= All_movies_in_js[x.id].quantity) {
            change_price(x, z)
            x.children[2].children[2].style.display = 'none'
        } else {
            x.children[2].children[2].style.display = 'inline-block'
            change_price(x, z)
        }
    }
}

function total() {
    let sum = 0
    for (let i = 0; i < currentPurchase.length; i++) {
        sum = sum + (All_movies_in_js[currentPurchase[i].id].price * currentPurchase[i].quantity)
    }
    sum = sum.toFixed(2)
    document.getElementsByClassName('price')[0].innerHTML = sum
    if (sum == 0) {
        document.getElementById('Check_Out').style.right = '-200px'
    } else {
        document.getElementById('Check_Out').style.right = '0px'
    }
}


function check_outBatman() {

    let global_p1 = globalPurchase
    let global_p = []
    for (let i = 0; i < currentPurchase.length; i++) {
        global_p.push({
            'title': All_movies_in_js[currentPurchase[i].id].title,
            'director': All_movies_in_js[currentPurchase[i].id].director,
            'genre': All_movies_in_js[currentPurchase[i].id].genre,
            'year': All_movies_in_js[currentPurchase[i].id].year,
            'price': All_movies_in_js[currentPurchase[i].id].price,
            'quantity': currentPurchase[i].quantity,
            'cover': All_movies_in_js[currentPurchase[i].id].cover
        })
        update_quantityBatmanAllMovies(currentPurchase[i].id, currentPurchase[i].quantity)



    }
    for (let i = 0; i < currentPurchase.length; i++) {
        setTimeout(function() {
            document.getElementById(currentPurchase[i].id).style.height = '0'
            document.getElementById(currentPurchase[i].id).style.transform = 'scale(0.3,1)'
            setTimeout(function() {
                document.getElementById(currentPurchase[i].id).style.display = 'none'
            }, 300)
        }, 100)
    }
    global_p1.push(global_p)
    localStorage.setItem('Global_purchuase', JSON.stringify(global_p1))
    setTimeout(function() {
        localStorage.setItem('current_purchuase', '[]')
        total()
    }, currentPurchase.length * 110 + 500) // pitanje zasto blokra kad je vreme manje
    updateUserPurchuases()
    /*if (All_users_in_js[current_user].purchase.length != 0) {
        for (let i = 0; i < All_users_in_js[current_user].purchase.length; i++) {
            genratePurchuase(All_users_in_js[current_user].purchase[i])
        }
    }*/

}

function update_quantityBatmanAllMovies(x, y) {

    let movies = All_movies_in_js
    movies[x].quantity = movies[x].quantity - y
    localStorage.setItem('All_movies', JSON.stringify(movies))

}

/*function delite_this_movie(x) {
    let deleteMoviesUpdate = []
    for (let i = 0; i < All_movies_in_js.length; i++) {
        if (i != x) {
            deleteMoviesUpdate.push(All_movies_in_js[i])
        }
    }
    localStorage.setItem("All_movies", JSON.stringify(deleteMoviesUpdate));
    console.log(deleteMoviesUpdate)
}*/

function updateUserPurchuases() {

    let shopping = All_users_in_js

    shopping[current_user].purchase.push(globalPurchase.length - 1)

    localStorage.setItem("All_users", JSON.stringify(shopping));

    for (let i = 0; i < shopping[current_user].purchase.length; i++) {
        console.log(shopping[current_user].purchase[i])
    }
    setTimeout(function() {
        loadPurchuases()
    }, 600)
}

function open_indeX() {
    window.location.href = 'index.html'
}

function open_settingsProfile() {
    if (document.getElementById('cover_for_changes').offsetWidth == 0) {
        document.getElementById('cover_for_changes').style.width = '100%';
        document.getElementsByClassName('div_input_container')[4].style.opacity = '0'
        document.getElementsByClassName('div_input_container')[5].style.opacity = '0'
        document.getElementById('oldPasswordUser').value = All_users_in_js[current_user].password
        document.getElementById('saveDiv').style.opacity = '0'
        document.getElementById('cancelDiv').style.opacity = '0'

    } else {
        document.getElementById('cover_for_changes').style.width = '0';
        document.getElementsByClassName('div_input_container')[4].style.opacity = '1'
        document.getElementsByClassName('div_input_container')[5].style.opacity = '1'
        document.getElementById('oldPasswordUser').value = ''
        document.getElementById('saveDiv').style.opacity = '1'
        document.getElementById('cancelDiv').style.opacity = '1'
    }
}

function insert_values() {
    let {
        name,
        surname,
        password,
        admin,
        username,
        purchase
    } = All_users_in_js[current_user]

    document.getElementById('nameUser').value = name;
    document.getElementById('surmaneUser').value = surname;
    document.getElementById('userNameUser').value = username;
    document.getElementById('oldPasswordUser').value = password;
}

document.getElementById('saveDiv').addEventListener('click', (event) => {

    if (check_valid()) {
        console.log('usao')
        let users = All_users_in_js
        users[current_user] = ({
            'name': document.getElementById('nameUser').value,
            'surname': document.getElementById('surmaneUser').value,
            'password': password_in,
            'admin': users[current_user].admin,
            'username': document.getElementById('userNameUser').value,
            'purchase': users[current_user].purchase
        })

        localStorage.setItem('All_users', JSON.stringify(users))

        document.getElementById('newPasswordUser').style.borderColor = 'black'
        document.getElementById('newPasswordUser').value = ''
        document.getElementById('newPasswordUserAgain').style.borderColor = 'black'
        setTimeout(function() {
            document.getElementById('newPasswordUserAgain').value = ''
        }, 400);
        open_settingsProfile()
    }



    //localStorage.setItem('All_users', JSON.stringify({}))
})
console.log(All_users_in_js[current_user].password)
var password_in

function check_valid() {

    let nameX = document.getElementById('nameUser')
    let surnameX = document.getElementById('surmaneUser')
    let usernameX = document.getElementById('userNameUser')
    let passwordX = document.getElementById('oldPasswordUser')
    let newPasswordX = document.getElementById('newPasswordUser')
    let newPaswordAgainX = document.getElementById('newPasswordUserAgain')

    let chaeck_input = true

    /*let {
        name,
        surname,
        password,
        admin,
        username,
        purchase
    } = All_users_in_js[current_user]*/
    if (passwordX.value == '') {
        passwordX.style.borderColor = 'red'
        chaeck_input = false
    }
    if (passwordX.value != All_users_in_js[current_user].password) {
        chaeck_input = false
        passwordX.style.borderColor = 'red'
        passwordX.value = ''
        passwordX.focus();
    } else {
        passwordX.style.borderColor = 'black'
    }
    if (newPasswordX.value != "") {
        if (newPasswordX.value != newPaswordAgainX.value) {
            chaeck_input = false
            newPasswordX.style.borderColor = 'red'
            newPasswordX.value = ''
            newPaswordAgainX.style.borderColor = 'red'
            newPaswordAgainX.value = ''
        } else {
            password_in = newPaswordAgainX.value
        }
    } else {
        password_in = All_users_in_js[current_user].password
    }


    return chaeck_input
}

document.getElementById('cancelDiv').addEventListener('click', (event) => {
    insert_values()
    open_settingsProfile()
})

function clear_purchuases() {
    let users = All_users_in_js
    for (let x = 0; x < users.length; x++) {
        users[x] = ({
            'name': users[x].name,
            'surname': users[x].surname,
            'password': users[x].password,
            'admin': users[x].admin,
            'username': users[x].username,
            'purchase': []
        })
    }

    localStorage.setItem('Global_purchuase', '[]')

    localStorage.setItem('All_users', JSON.stringify(users))
}
//clear_purchuases()

function genratePurchuase(x) {
    let mainDiv = document.getElementById('last_purchuase_div')

    let date = document.createElement('p')
    date.innerHTML = '29. Novembar 2020.'
    date.classList.add('date')

    mainDiv.appendChild(date)

    heightPurchuase = heightPurchuase + 60;

    for (let i = 0; i < globalPurchase[x].length; i++) {
        let {
            title,
            director,
            genre,
            year,
            price,
            quantity,
            cover
        } = globalPurchase[x][i]

        let div_container = document.createElement('div')
        div_container.classList.add('purchase_container')

        let cover_img = document.createElement('img')
        cover_img.src = cover
        div_container.appendChild(cover_img)

        let titleH3 = document.createElement('h3')
        titleH3.innerHTML = title
        div_container.appendChild(titleH3)
        //info container
        let info_div_container = document.createElement('div')
        info_div_container.classList.add('info_div')

        let img1 = document.createElement('img')
        img1.src = 'FILES/iconmonstr-video-3-48.png'

        let p1 = document.createElement('p')
        p1.innerHTML = title

        let img2 = document.createElement('img')
        img2.src = 'FILES/film-director-chair-icon-simple-style-vector-25556630 (1).png'

        let p2 = document.createElement('p')
        p2.innerHTML = director

        let img3 = document.createElement('img')
        img3.src = 'FILES/iconmonstr-calendar-4-48 (1).png'

        let p3 = document.createElement('p')
        p3.innerHTML = year

        let img4 = document.createElement('img')
        img4.src = 'FILES/iconmonstr-coin-thin-48.png'

        let p4 = document.createElement('p')
        p4.innerHTML = price

        let img5 = document.createElement('img')
        img5.src = 'FILES/iconmonstr-hashtag-1-64.png'

        let p5 = document.createElement('p')
        p5.innerHTML = quantity

        info_div_container.appendChild(img1)
        info_div_container.appendChild(p1)

        info_div_container.appendChild(img2)
        info_div_container.appendChild(p2)

        info_div_container.appendChild(img3)
        info_div_container.appendChild(p3)

        info_div_container.appendChild(img4)
        info_div_container.appendChild(p4)

        info_div_container.appendChild(img5)
        info_div_container.appendChild(p5)

        div_container.appendChild(info_div_container)
        //tota; Price
        let totalPrice = document.createElement('p')
        totalPrice.innerHTML = "Total:&nbsp " + (quantity * price).toFixed(2)
        div_container.appendChild(totalPrice)

        mainDiv.appendChild(div_container)
        heightPurchuase = heightPurchuase + 170;
    }

    mainDiv.innerHTML += "<hr>"
    heightPurchuase = heightPurchuase + 40
}
var heightPurchuase = 200