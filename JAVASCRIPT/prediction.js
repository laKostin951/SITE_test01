/* sakrivanje liste na focus out*/
document.getElementsByClassName('search')[0].addEventListener('focusout', (event) => {
    setTimeout(function() {
        continer_for_prediction.classList.add('hide');
    }, 500)
});

document.getElementsByClassName('search')[0].addEventListener('focusin', (event) => {
    if (sessionStorage.getItem("gif_count") == 1) {
        change_gif()
    }
    continer_for_prediction.classList.remove('hide');
});

/*kreiranje liste*/
prediction_input = document.getElementsByClassName("search")[0];


prediction_input.onkeyup = function() {
    continer_for_prediction.innerHTML = '';
    let lista = document.createElement('ol')
    let lista_id_for_enter_seaerch = []
    let lista_id_for_enter_director_seaerch = []
    lista.classList.add('prediction');
    broj_filmova = 0;
    for (let i = 0; i < All_movies_in_js.length; i++)
        if (((All_movies_in_js[i].title).toUpperCase()).includes((prediction_input.value).toUpperCase())) {
            let novi_li = document.createElement('li');
            novi_li.innerHTML = All_movies_in_js[i].title;
            novi_li.id = i;
            novi_li.setAttribute('onclick', "load_movies_batman_from_search(this.id)");

            broj_filmova += 1

            lista.appendChild(novi_li);

            lista_id_for_enter_seaerch.push(i);
        }
    for (let i = 0; i < JSON.parse(localStorage.All_director_in).length; i++)
        if (((JSON.parse(localStorage.All_director_in)[i]).toUpperCase()).includes((prediction_input.value).toUpperCase())) {
            let novi_li = document.createElement('li');
            novi_li.innerHTML = "Director/ &nbsp " + JSON.parse(localStorage.All_director_in)[i];
            novi_li.id = i;
            novi_li.setAttribute("class", "director_li")
            novi_li.setAttribute('onclick', "load_movies_batman_for_director(this.id)");

            broj_filmova += 1

            lista.appendChild(novi_li);

            lista_id_for_enter_director_seaerch.push(i);
        }
    lista.style.height = lista.clientHeight + (30 * broj_filmova) + 'px';

    continer_for_prediction.appendChild(lista);


    document.getElementsByClassName('search')[0].addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            if (window.location.href.includes('index.html')) {
                document.getElementsByClassName('movie_container')[0].innerHTML = '';
                load_moviesByName_from_serach(lista_id_for_enter_seaerch)
                load_moviesByDirector_from_serach(lista_id_for_enter_director_seaerch)
            } else {
                localStorage.setItem("Action_for_load_movie", JSON.stringify({
                    "action": true,
                    'type': 4,
                    "id_change": lista_id_for_enter_seaerch,
                    "id_change2": lista_id_for_enter_director_seaerch
                }));
                window.location.href = 'index.html'
            }
        }

        if (event.keyCode == 8 || event.keyCode == 46) {
            continer_for_prediction.innerHTML = '';
        }
    })

}

function load_moviesByName_from_serach(x) {
    for (let i = 0; i < x.length; i++) {
        load_movies_batman(x[i]);
        scrol_for_movie();
        clean_search();

    }
}

function load_moviesByDirector_from_serach(x) {
    for (let i = 0; i < x.length; i++) {
        document.getElementsByClassName('movie_container')[0].innerHTML += "<legend>by &nbsp" + JSON.parse(localStorage.All_director_in)[x[i]] + "&nbsp/<legend>"; {
            for (let i2 = 0; i2 < All_movies_in_js.length; i2++) {
                let director1 = All_movies_in_js[i2].director
                let director2 = JSON.parse(localStorage.All_director_in)[x[i]]
                console.log(director2)
                if (director1.replace(/\s/g, '').toLocaleUpperCase() == director2.replace(/\s/g, '').toLocaleUpperCase()) {
                    load_movies_batman(i2);

                }
            }
        }
    }
}


function clean_search() {
    document.getElementsByClassName("search")[0].value = ''
    continer_for_prediction.innerHTML = '';
}

function load_movies_batman_from_search(i) {
    if (window.location.href.includes('index.html')) {
        clean_search()
        document.getElementsByClassName('movie_container')[0].innerHTML = ''
        load_movies_batman(i);
        scale_upBatman(0)
        scrol_for_movie()
    } else {
        localStorage.setItem("Action_for_load_movie", JSON.stringify({
            "action": true,
            'type': 5,
            "id_change": i
        }));
        window.location.href = 'index.html'
    }
}

function load_movies_batman_for_director(id) {
    if (window.location.href.includes('index.html')) {
        clean_search()
        document.getElementsByClassName('movie_container')[0].innerHTML = ''
        let j = 0
        for (let i = 0; i < All_movies_in_js.length; i++) {
            let director1 = All_movies_in_js[i].director
            let director2 = JSON.parse(localStorage.All_director_in)[id]
            if (director1.replace(/\s/g, '').toLocaleUpperCase() == director2.replace(/\s/g, '').toLocaleUpperCase()) {
                load_movies_batman(i);
                scale_upBatman(j)
                j++
            }
            scrol_for_movie()
        }
    } else {
        localStorage.setItem("Action_for_load_movie", JSON.stringify({
            "action": true,
            'type': 1,
            "id_change": id
        }));
        window.location.href = 'index.html'
    }

}