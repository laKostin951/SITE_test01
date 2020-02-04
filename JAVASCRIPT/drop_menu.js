/*dodavanje niza zanrova u drop menu*/

window.addEventListener('load', function() {
    for (let i = 2020; i > 1900; i--) {
        let year_li = document.createElement('li')
        year_li.innerHTML = i
        year_li.setAttribute('onclick', 'load_this_year(this.innerHTML)')
        document.getElementById("YEAR").appendChild(year_li)
    }
    for (let i = 0; i < (JSON.parse(localStorage.getItem('All_genres_in'))).length; i++) {
        let genre_li = document.createElement('li')
        genre_li.innerHTML = (JSON.parse(localStorage.getItem('All_genres_in')))[i]
        genre_li.setAttribute('onclick', 'load_this_genre(this.innerHTML)')
        document.getElementById("GENRES").appendChild(genre_li)
    }
    for (let i = 0; i < (JSON.parse(localStorage.getItem('All_director_in'))).length; i++) {
        let director_li = document.createElement('li')
        director_li.innerHTML = (JSON.parse(localStorage.getItem('All_director_in')))[i]
        director_li.setAttribute('id', i)
        director_li.setAttribute('onclick', 'load_this_director(this.id)')
        document.getElementById("DIRECTOR").appendChild(director_li)
    }
    if (admin() == false) {
        document.getElementById("adminPart").style.display = 'none';
        document.getElementById('rateing').style.display = 'inline-block'
    } else {
        document.getElementById('rateing').style.display = 'none'
    }
    if (current_user == '') {
        document.getElementById("ProfilePart").children[5].style.display = 'none'

    }

})


function load_this_director(x) {
    change_gif()
    if (window.location.href.includes('index.html')) {
        load_movies_batman_for_director(x)
        let newFirstElement = document.createElement('legend')
        newFirstElement.innerHTML = "by &nbsp" + JSON.parse(localStorage.All_director_in)[x] + "&nbsp";
        document.getElementsByClassName('movie_container')[0].insertBefore(newFirstElement, document.getElementsByClassName('movie_container')[0].firstChild);
    } else {
        localStorage.setItem("Action_for_load_movie", JSON.stringify({
            "action": true,
            'type': 1,
            "id_change": x
        }));
        window.location.href = 'index.html'
    }
}


function load_this_year(x) {

    change_gif()

    let j = 0;
    let movie_container = document.getElementsByClassName('movie_container')[0]
    if (window.location.href.includes('index.html')) {
        movie_container.innerHTML = ''
        for (let i = 0; i < All_movies_in_js.length; i++) {
            if (parseInt(x) == All_movies_in_js[i].year) {
                load_movies_batman(i);
                scale_upBatman(j)
                j++
            }
        }
        scrol_for_movie()
        let newFirstElement = document.createElement('legend')
        newFirstElement.innerHTML = "by &nbsp" + x + "&nbsp";
        movie_container.insertBefore(newFirstElement, movie_container.firstChild);
    } else {

        localStorage.setItem("Action_for_load_movie", JSON.stringify({
            "action": true,
            'type': 2,
            "id_change": x
        }));
        window.location.href = 'index.html'
    }

}

function load_this_genre(x) {
    change_gif()

    let j = 0;
    let movie_container = document.getElementsByClassName('movie_container')[0]
    if (window.location.href.includes('index.html')) {
        movie_container.innerHTML = ''
        for (let i = 0; i < All_movies_in_js.length; i++) {
            if (x == All_movies_in_js[i].genre) {
                load_movies_batman(i);
                scale_upBatman(j)
                j++
            }
        }

        scrol_for_movie()

        let newFirstElement = document.createElement('legend')
        newFirstElement.innerHTML = "by &nbsp" + x + "&nbsp";

        movie_container.insertBefore(newFirstElement, movie_container.firstChild);
    } else {

        localStorage.setItem("Action_for_load_movie", JSON.stringify({
            "action": true,
            'type': 3,
            "id_change": x
        }));
        window.location.href = 'index.html'
    }
}

function load_MyBag() {
    if (current_user == '') {
        open_logIn_window()
    } else {
        localStorage.setItem("Action_for_MyPage", JSON.stringify({
            "action": true,
            'type': 1
        }));
        window.location.href = 'MyPage.html'
    }


}

function load_MyProfile() {
    if (current_user == '') {
        open_logIn_window()
    } else {
        localStorage.setItem("Action_for_MyPage", JSON.stringify({
            "action": true,
            'type': 3
        }));
        window.location.href = 'MyPage.html'
    }
}

function load_MyPurchase() {
    if (current_user == '') {
        open_logIn_window()
    } else {
        localStorage.setItem("Action_for_MyPage", JSON.stringify({
            "action": true,
            'type': 2
        }));
        window.location.href = 'MyPage.html'
    }
}

function logOutBatman() {
    localStorage.setItem('Current_user', '');
    localStorage.setItem('current_purchuase', '[]')
    window.location.href = 'index.html'
}

// rate us stars
/*document.getElementById('rateing').addEventListener('mouseover', (event) => {
    document.getElementById('rateing').replace()
})*/


function rate_site(x) {
    let elementRateing = document.getElementById('rateing')
    elementRateing.innerHTML = ''
    elementRateing.innerHTML = "<br><br> <br><br><br>Thanks for vote<br> 😍"
    let rating = ((parseFloat(JSON.parse(localStorage.Site_rating).all_value) + parseFloat(x)) / JSON.parse(localStorage.Site_rating).count).toFixed(2)

    localStorage.setItem('Site_rating', JSON.stringify({
        "value": rating,
        "all_value": JSON.parse(localStorage.Site_rating).all_value + parseFloat(x),
        "count": JSON.parse(localStorage.Site_rating).count + 1
    }));
}

function loadAddMovie_Page(x) {
    window.location.href = 'adminChange.html'
}