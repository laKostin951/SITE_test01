window.addEventListener('load', function() {
    load_directorsBatman()
})

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

document.getElementById('add_d').addEventListener('click', function() {
    document.getElementsByClassName("log")[0].classList.remove('hide');
})

function close_addD_window() {
    document.getElementsByClassName("log")[0].classList.add('hide');
}


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
var poster_photo_global = false
/*poster photo input*/
document.getElementsByClassName('inpFile')[1].addEventListener('change', function() {
    const file = this.files[0]
    if (file) {
        const reader = new FileReader()


        reader.addEventListener('load', function() {
            localStorage.setItem('slika', this.result)
            poster_photo_global = this.result
            upload_preview(localStorage.getItem('slika'), file.name)
        })

        reader.readAsDataURL(file)
    }
})


function upload_preview(x, y) {
    const test_img = document.getElementById('poster_photo_preview').setAttribute('src', x)

    document.getElementById('poster_photo_preview').onload = function() {
        if (1.7 < (this.width / this.height) && (this.width / this.height) < 1.8) {
            if ((this.width * this.height) < 2073000) {
                alert('Minimalna rezolucja slike je 1920x1080')
                document.getElementById('inpFile').value = ''
            } else {
                document.getElementById('poster_photo').value = y
            }
        } else {
            alert('Slika mora biti u formatu 16:9')
            document.getElementById('poster_photo').value = ''

        }
        localStorage.removeItem('slika')
        document.getElementById('poster_photo_preview').setAttribute('src', '')
    }


}
// cover photo
var cover_photo_global = false
document.getElementsByClassName('inpFile')[0].addEventListener('change', function() {
    const file = this.files[0]
    if (file) {
        const reader = new FileReader()

        reader.addEventListener('load', function() {
            document.getElementById('cover_photo').value = file.name
            cover_photo_global = this.result
            console.log(cover_photo_global)
        })
        reader.readAsDataURL(file)
    }


})

// cancel button

document.getElementById('cancel_button').onclick = function() {
    localStorage.setItem("Action_for_change_movie", JSON.stringify({
        "action": false,
        "id_change": ''
    }))
    window.location.href = 'adminChange.html'
}

//Request button
document.getElementsByClassName('button_request')[0].onclick = function() {
    if (document.getElementById("myForm").checkValidity()) {
        if (this.id == 0) {
            if (duplicate_movie()) {
                send_requestBatman()
                alert("Vas film je dodat u bazu. Hvala na zalaganju ")
            } else {
                alert('Vas film vec postoji u bazi')
            }
        } else {
            if (alert_change()) {
                update_movie_changed(JSON.parse(localStorage.Action_for_change_movie).id_change)
                localStorage.setItem("Action_for_change_movie", JSON.stringify({
                    "action": false
                }));
            } else {
                return false
            }
        }
    }
}



function duplicate_movie() {
    let provera_duplikata = true
    for (let i = 0; i < All_movies_in_js.length; i++) {
        if (document.getElementById('title_input').value == All_movies_in_js[i].title) {
            if (document.getElementById('year_input').value == All_movies_in_js[i].year) {
                provera_duplikata = false
            }
        }
    }

    return provera_duplikata
}



function send_requestBatman() {
    let RequestMovie1 = All_movies_in_js
    RequestMovie1.push({
        "title": document.getElementById('title_input').value,
        "director": document.getElementById('select_direcor').value,
        "genre": document.getElementById('select_genre').value,
        "year": document.getElementById('year_input').value,
        "price": document.getElementById('price_input').value,
        "quantity": document.getElementById('q_input').value,
        "cover": cover_photo_global,
        "poster": poster_photo_global,
        "descrition": ""
    })


    localStorage.setItem("All_movies", JSON.stringify(RequestMovie1));

}

function vrati_poster() {
    return "Null"
}

// Action load
window.addEventListener('load', function() {
    if (JSON.parse(localStorage.Action_for_change_movie).action) {
        let id_f = JSON.parse(localStorage.Action_for_change_movie).id_change
        document.getElementById('title_input').value = All_movies_in_js[id_f].title
        document.getElementById('year_input').value = All_movies_in_js[id_f].year
        document.getElementById('select_genre').value = All_movies_in_js[id_f].genre
        document.getElementById('select_direcor').value = All_movies_in_js[id_f].director
        document.getElementById('cover_photo').value = All_movies_in_js[id_f].cover
        document.getElementById('price_input').value = All_movies_in_js[id_f].price
        document.getElementById('q_input').value = All_movies_in_js[id_f].quantity
        if (All_movies_in_js[id_f].poster) {
            document.getElementById('poster_photo').value = All_movies_in_js[id_f].poster
        }
        document.getElementsByClassName('button_request')[0].innerHTML = 'Save'
        document.getElementsByClassName('button_request')[0].setAttribute('id', 1)

        /*localStorage.setItem("Action_for_change_movie", JSON.stringify({
            "action": false,
            "id_change": id_f
        }));*/
    }

})

function alert_change() {
    let id_a = JSON.parse(localStorage.Action_for_change_movie).id_change
    let string = ' Da li zelite da sacuvate promene\n\n'
    if (document.getElementById('title_input').value != All_movies_in_js[id_a].title) {
        string = string.concat("Change Title:" + " " + All_movies_in_js[id_a].title + "      ")
        string = string.concat("New Title:" + " " + document.getElementById('title_input').value + "\n")
    }
    if (document.getElementById('year_input').value != All_movies_in_js[id_a].year) {
        string = string.concat("Change Year:" + " " + All_movies_in_js[id_a].year + "      ")
        string = string.concat("New Year:" + " " + document.getElementById('year_input').value + "\n")
    }
    if (document.getElementById('select_genre').value != All_movies_in_js[id_a].genre) {
        string = string.concat("Change Genre:" + " " + All_movies_in_js[id_a].title + "      ")
        string = string.concat("New Genre:" + " " + document.getElementById('select_genre').value + "\n")
    }
    if (document.getElementById('select_direcor').value != All_movies_in_js[id_a].director) {
        string = string.concat("Change Dirctor:" + " " + All_movies_in_js[id_a].director + "      ")
        string = string.concat("New Director:" + " " + document.getElementById('title_input').value + "\n")
    }
    if (document.getElementById('price_input').value != All_movies_in_js[id_a].price) {
        string = string.concat("Change Price:" + " " + All_movies_in_js[id_a].price + "      ")
        string = string.concat("New Price:" + " " + document.getElementById('price_input').value + "\n")
    }
    if (document.getElementById('q_input').value != All_movies_in_js[id_a].quantity) {
        string = string.concat("Change Quantity:" + " " + All_movies_in_js[id_a].quantity + "      ")
        string = string.concat("New Quantity:" + " " + document.getElementById('q_input').value + "\n")
    }
    if (document.getElementById('cover_photo').value != All_movies_in_js[id_a].cover) {
        string = string.concat("New Cover photo\n")
    }
    if (All_movies_in_js[id_a].poster) {
        if (document.getElementById('poster_photo').value != All_movies_in_js[id_a].poster) {
            string = string.concat("Poster photo was deleted\n")
        }
    }
    if (document.getElementById('poster_photo').value) {
        if (document.getElementById('poster_photo').value != All_movies_in_js[id_a].poster) {
            string = string.concat("New Poster photo\n")
        }
    }
    let provera = confirm(string)
    return provera

}

function update_movie_changed(x) {
    let updateMovieChange = []
    for (let i = 0; i < All_movies_in_js.length; i++) {
        if (i != x) {
            updateMovieChange.push(All_movies_in_js[i])
        } else {
            updateMovieChange.push({

                "title": document.getElementById('title_input').value,
                "director": document.getElementById('select_direcor').value,
                "genre": document.getElementById('select_genre').value,
                "year": document.getElementById('year_input').value,
                "price": document.getElementById('price_input').value,
                "quantity": document.getElementById('q_input').value,
                "cover": vrati_poster_photo(),
                "poster": vrati_chage_poster(),
                "descrition": ""

            });
        }
    }

    update_poster_array()

    localStorage.setItem("All_movies", JSON.stringify(updateMovieChange));
    window.location.href = 'index.html'
}

function vrati_chage_poster() {
    if (document.getElementById('poster_photo').value != '') {
        return poster_photo_global
    } else {
        return null
    }

}

function vrati_poster_photo() {
    if (cover_photo_global) {
        return cover_photo_global
    } else {
        return document.getElementById('cover_photo').value
    }
}

function update_poster_array() {
    let updatePosterArray = []

    for (let i = 0; i < All_movies_in_js.length; i++) {
        if (All_movies_in_js[i].poster != null) {
            updatePosterArray.push({
                "poster": All_movies_in_js[i].poster,
                "title": All_movies_in_js[i].title,
                "id": i
            })
        }
    }


    localStorage.setItem("poster_movies", JSON.stringify(updatePosterArray));
}

// Dirctor


function load_directorsBatman() {

    for (let i = 0; i < JSON.parse(localStorage.All_director_in).length; i++) {
        let novi_director = document.createElement('option')
        novi_director.value = JSON.parse(localStorage.All_director_in)[i]
        novi_director.innerHTML = JSON.parse(localStorage.All_director_in)[i]

        document.getElementById('select_direcor').appendChild(novi_director)
    }
}

function add_directorBatman() {
    let firstName = document.getElementsByClassName('log_in_input')[2].value
    let lastName = document.getElementsByClassName('log_in_input')[3].value
    let FulName = firstName.concat(" ", lastName)
    if (document.getElementsByClassName("log_in_button")[1].checkValidity()) {
        if (duplicate_director(FulName)) {
            let updateDirector = JSON.parse(localStorage.All_director_in)

            updateDirector.push(
                FulName
            )
            localStorage.setItem("All_director_in", JSON.stringify(updateDirector));
            document.getElementById('select_direcor').innerHTML = ''
            document.getElementById('select_direcor').innerHTML = "<option selected disabled hidden>Director</option>"
            load_directorsBatman()
            close_addD_window()

            document.getElementsByClassName('log_in_input')[2].value = ''
            document.getElementsByClassName('log_in_input')[3].value = ''
        } else {

            alert('Reziser koji ste uneli vec postoji u bazi')
        }
    }

}

function duplicate_director(x) {
    let provera = true
    for (let i = 0; i < JSON.parse(localStorage.All_director_in).length; i++) {
        let curentDirecor = JSON.parse(localStorage.All_director_in)[i]
        if (curentDirecor.replace(/\s/g, '').toLocaleUpperCase() == x.replace(/\s/g, '').toLocaleUpperCase())
            provera = false
    }
    return provera
}