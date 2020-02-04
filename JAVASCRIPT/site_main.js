/* globalne*/
var All_movies_in_js = JSON.parse(localStorage.All_movies)
var All_users_in_js = JSON.parse(localStorage.All_users)
var current_user = localStorage.getItem('Current_user')
var currentPurchase = JSON.parse(localStorage.current_purchuase)
var mainNavBar = document.getElementById("nav-bar")
continer_for_prediction = document.getElementById("continer_for_prediction")

localStorage.setItem("poster_movies", JSON.stringify([{
        "poster": "FILES/POSTER/the-lion-king-2019-movie.jpg",
        "title": "Lion King",
        "id": 5
    }, {
        "poster": "FILES/POSTER/avengers-logo-purple-minimal.png",
        "title": "Avengers Endgame",
        "id": 6
    }, {
        "poster": "FILES/POSTER/dora-and-the-lost-city-of-gold-2019-movie.jpg",
        "title": "Dora and the Lost City of Gold",
        "id": 7
    }, {
        "poster": "FILES/POSTER/fast-furious-presents-hobbs-shaw-dwayne-johnson-jason.jpg",
        "title": "Fast & Furious Present: Hobbs & Shaw",
        "id": 8
    }, {
        "poster": "FILES/POSTER/joker-2019-movie.jpg",
        "title": "Joker",
        "id": 9
    }, {
        "poster": "FILES/POSTER/jumanji-the-next-level-kevin-hart-dwayne-johnson.jpg",
        "title": "Jumanji:The Next Level",
        "id": 10
    }, {
        "poster": "FILES/POSTER/movie-poster-of-john-wick-3.jpg",
        "title": "John Wick: Chapter 3 - Parabellum",
        "id": 11
    }, {
        "poster": "FILES/POSTER/movie-the-dark-knight-rises.jpg",
        "title": "The Dark Knight Rises",
        "id": 12
    }, {
        "poster": "FILES/POSTER/red-balloons-it-chapter-2-movie.jpg",
        "title": "It Chapter Two",
        "id": 13
    }]


));


/* nav bar STICKY ANIMACIJA */

window.onmousemove = function() /* supustanje nav bar na poziciju misa*/ {
    var y_mouse = event.clientY;
    if (document.body.scrollTop > 500) {
        if (y_mouse < 150) {
            mainNavBar.style.position = "fixed";
            mainNavBar.style.top = "0" + "px";
            continer_for_prediction.classList.remove('hide');

        }
    }
}


function main_page_load() {
    window.location.href = 'index.html'
}


var pr = document.body.scrollTop; /*spustanje nav bar na akciju scrol*/

window.onscroll = function() {


    if (document.body.scrollTop < 500) {
        mainNavBar.style.position = "fixed";
        mainNavBar.style.top = "0" + "px";
        continer_for_prediction.classList.remove('hide');
    }

    if (document.body.scrollTop > 500) {
        mainNavBar.style.position = "fixed";
        mainNavBar.style.top = "-100" + "px";
        continer_for_prediction.classList.add('hide');
        if (sessionStorage.getItem("gif_count") == 1) {
            change_gif()
        }

    }

    if (document.body.scrollTop < pr) {
        mainNavBar.style.position = "fixed";
        mainNavBar.style.top = "0" + "px";
        continer_for_prediction.classList.remove('hide');
    }

    pr = document.body.scrollTop;
}


/* Log IN window*/
/*animacija podizuceg span teksat*/
document.getElementsByClassName("log_in_input")[0].addEventListener('focusin', (event) => {

    document.getElementsByClassName("span_down")[0].style.bottom = "40px";
});

document.getElementsByClassName("log_in_input")[0].addEventListener('focusout', (event) => {
    if (document.getElementsByClassName("log_in_input")[0].value == '') {
        document.getElementsByClassName("span_down")[0].style.bottom = 0;
    } else {
        document.getElementsByClassName("span_down")[0].style.bottom = 25;
    }
});


document.getElementsByClassName("log_in_input")[1].addEventListener('focusin', (event) => {

    document.getElementsByClassName("span_down")[1].style.bottom = "40px";
});

document.getElementsByClassName("log_in_input")[1].addEventListener('focusout', (event) => {
    if (document.getElementsByClassName("log_in_input")[1].value == '') {
        document.getElementsByClassName("span_down")[1].style.bottom = 0;
    } else {
        document.getElementsByClassName("span_down")[1].style.bottom = 25;
    }
});
/*funkcijaa zatvaranja login window koja se poziva na dugme*/
function close_logIn_window() {
    document.getElementsByClassName("log")[0].classList.add('hide');
    document.getElementById("register_fieldset").style.opacity = "0";
    document.getElementById("register_fieldset").style.top = "150%";
    document.getElementById("log_fieldset").style.opacity = "1";
    document.getElementById("log_fieldset").style.top = "50%";
}

function open_logIn_window() {
    document.getElementsByClassName("log")[0].classList.remove('hide');
}


/* main drop menu */
/*document.getElementsByClassName('gif')[0].addEventListener('mouseenter', function(event) {
    change_gif()
})*/
window.addEventListener('mousemove', function() {
    if (sessionStorage.getItem("gif_count") == 1) {
        let y_mouse = event.clientY;
        let x_mouse = event.clientX;
        if (y_mouse > 600) {
            change_gif()
        }
        if (x_mouse > 1100) {
            change_gif()
        }
    }
})
/*document.getElementById('div1_animation').addEventListener('mouseover', (event) => {
    change_gif()
})*/
document.getElementById('div2_animation').addEventListener('mouseenter', change_gif)
/*change_gif()
document.getElementById('div2_animation').removeEventListener('mouseenter', (event) => {
    console.log('uso')
})*/

document.getElementsByClassName('drop_menu_container')[0].addEventListener('mouseenter', change_gif)

sessionStorage.setItem("gif_count", 0);

function change_gif() {

    document.getElementById('div2_animation').removeEventListener('mouseenter', change_gif)
    setTimeout(function() {
        document.getElementById('div2_animation').addEventListener('mouseenter', change_gif)
    }, 800)
    document.getElementsByClassName('drop_menu_container')[0].removeEventListener('mouseenter', change_gif)
    if (sessionStorage.getItem("gif_count") == 0) {
        open_gif()
        sessionStorage.setItem("gif_count", 1);
    } else {
        close_gif()
        sessionStorage.setItem("gif_count", 0);
    }
}

function open_gif() {

    mainNavBar.style.height = '140%'
    document.getElementById('nav-bar-2').style.opacity = '0.1'
    document.getElementById('nav-bar-3').style.opacity = '0.1'
    document.getElementById('div1_animation').style.transform = 'rotate(45deg)'
    document.getElementById('div1_animation').style.top = '41px'
    document.getElementById('div2_animation').style.transform = 'rotate(-45deg)'
    document.getElementById('div2_animation').style.top = '37px'
    document.getElementsByClassName('drop_menu_container')[0].style.left = '0'
}

function close_gif() {

    mainNavBar.style.height = '100px'
    document.getElementById('nav-bar-2').style.opacity = '1'
    document.getElementById('nav-bar-3').style.opacity = '1'
    document.getElementById('div1_animation').style.transform = 'rotate(0deg)'
    document.getElementById('div1_animation').style.top = '35px'
    document.getElementById('div2_animation').style.transform = 'rotate(0deg)'
    document.getElementById('div2_animation').style.top = '43px'
    document.getElementsByClassName('drop_menu_container')[0].style.left = '-915px'
    setTimeout(function() {
        document.getElementsByClassName('drop_menu_container')[0].addEventListener('mouseenter', change_gif)
    }, 800)
}

/*shooping bag*/

function hide_shopping_bag() {
    document.getElementById('bag_wrraper').style.background = 'transparent'
    document.getElementById('shopping_bag_container').style.right = '-35%'
    setTimeout(function() {
        document.getElementById('bag_wrraper').classList.add('hide');
    }, 1000)
}

function show_shopping_bag() {
    document.getElementById('bag_wrraper').style.background = 'rgba(0, 0, 0, 0.8)'
    document.getElementById('shopping_bag_container').style.right = '1vw'
    generate_item_in_bag()
    document.getElementById('bag_wrraper').classList.remove('hide');
}

function generate_item_in_bag() {
    document.getElementById('div_2').innerHTML = ''
    for (let i = 0; i < currentPurchase.length; i++) {
        let novi_div_bag = document.createElement('div')
        novi_div_bag.setAttribute('class', 'item_bag_container')

        let img_bag = document.createElement('img')
        img_bag.setAttribute('src', All_movies_in_js[currentPurchase[i].id].cover)

        let item_title = document.createElement('p')
        item_title.innerHTML = All_movies_in_js[currentPurchase[i].id].title + "&nbsp&nbsp(" + currentPurchase[i].quantity + ')' + "<span>" + All_movies_in_js[currentPurchase[i].id].price * currentPurchase[i].quantity + "</span>"

        novi_div_bag.appendChild(img_bag)
        novi_div_bag.appendChild(item_title)

        document.getElementById('div_2').appendChild(novi_div_bag)
    }
}

document.getElementById('div_3').addEventListener('click', function(event) {
    localStorage.setItem("Action_for_MyPage", JSON.stringify({
        "action": true,
        'type': 1
    }));
    window.location.href = 'MyPage.html'

})
/* shopping_bag animacija*/
function shopping_bag_gif_animated() {
    mainNavBar.style.position = "fixed";
    mainNavBar.style.top = "0" + "px";
    continer_for_prediction.classList.remove('hide');

    let bag = document.getElementsByClassName('bag')[0]
    bag.src = 'FILES/Annota-removebg-preview.gif'
    setTimeout(function() {
        bag.src = 'FILES/happy_bag_stag1.png'
    }, 2800)

}

function admin() {
    if (current_user != '') {
        return (All_users_in_js[current_user].admin)
    } else {
        return false
    }
}