/* dodavanje poster filmova u poster niz */


poster_movies_in_js = JSON.parse(localStorage.poster_movies)
for (let i = 0; i < poster_movies_in_js.length; i++) {
    imageParent = document.getElementsByClassName("img-container")[0]

    let img = document.createElement("img");

    img.src = poster_movies_in_js[i].poster
    img.style.width = (100 / (poster_movies_in_js.length + 1)) + "%";
    img.className = "slider-img";
    imageParent.appendChild(img);
}
/*postavljanje vrednosti img container*/

var img_container = document.getElementsByClassName("img-container")[0]
img_container.style.width = (poster_movies_in_js.length + 1) * 100 + "%";

/* img slider ANIMACIJA */
window.onload = function start() {
    slide();

}
/*animacij slajdova*/
function slide() {
    title_change(0);
    button_change()
    var num = 0,
        style = document.getElementsByClassName("img-container")[0].style;
    window.setInterval(function() {
        num = (num + 1) % poster_movies_in_js.length;

        style.marginLeft = (-100 * num) + "%";
        title_change(num);
        button_change();
        setTimeout(function() {
            document.getElementsByClassName("img-slider-button")[0].setAttribute("id", JSON.parse(localStorage.poster_movies)[num].id);
        }, 1000);
    }, 6500);
}

function title_change(i) {
    let slider_titleX = document.getElementById('movie_slider_title')
    slider_titleX.innerHTML = poster_movies_in_js[i].title;

    setTimeout(function() {
        slider_titleX.style.opacity = 1;
    }, 1000);
    setTimeout(function() {
        slider_titleX.style.opacity = 0;
    }, 5000);

}

function button_change() {
    setTimeout(function() {
        document.getElementsByClassName("img-slider-button")[0].style.opacity = 1;
    }, 1000);
    setTimeout(function() {
        document.getElementsByClassName("img-slider-button")[0].style.opacity = 0;
    }, 5000);
}



/*localStorage.All_movies = JSON.stringify(movies_json)*/


var check = true

function vrati_check() {
    return check
}
window.addEventListener('load', function() {
    if (JSON.parse(localStorage.Action_for_load_movie).action) {
        check = false
        if (JSON.parse(localStorage.Action_for_load_movie).type == 1) {
            load_this_director(JSON.parse(localStorage.Action_for_load_movie).id_change)
            change_gif()
        }
        if (JSON.parse(localStorage.Action_for_load_movie).type == 2) {
            load_this_year(JSON.parse(localStorage.Action_for_load_movie).id_change)
            change_gif()
        }
        if (JSON.parse(localStorage.Action_for_load_movie).type == 3) {
            load_this_genre(JSON.parse(localStorage.Action_for_load_movie).id_change)
            change_gif()
        }
        if (JSON.parse(localStorage.Action_for_load_movie).type == 5) {
            load_movies_batman_from_search(JSON.parse(localStorage.Action_for_load_movie).id_change)
        }
        if (JSON.parse(localStorage.Action_for_load_movie).type == 4) {
            load_moviesByName_from_serach(JSON.parse(localStorage.Action_for_load_movie).id_change)
            load_moviesByDirector_from_serach(JSON.parse(localStorage.Action_for_load_movie).id_change2)
        }

        localStorage.setItem("Action_for_load_movie", JSON.stringify({
            "action": false
        }));
    } else {
        for (let i = 0; i < All_movies_in_js.length; i++) {
            (function(i) {
                setTimeout(function() {
                    if (vrati_check()) {
                        load_movies_batman(i);
                        scale_upBatman(i)
                    }
                }, 250 * i);
            })(i);

            /*for (let i = 0; i < All_movies_in.length; i++) {
                setTimeout(function() {
                    load_movies_batman(i);
                    scale_upBatman(i);
                }, 250 * i)
            }*/
        }
    }

})


function scale_upBatman(i_for_scale) {

    document.getElementsByClassName('movie_img_container')[i_for_scale].style.transform = "scale(0,0)"
    setTimeout(function() {
        document.getElementsByClassName('movie_img_container')[i_for_scale].style.transform = "scale(1,1)"
    }, 15)


}

function load_movies_batman(i) {
    p_img_container = document.createElement('p');
    p_img_container.innerHTML = All_movies_in_js[i].title

    button_img_container = document.createElement('button');
    button_img_container.setAttribute("id", i);
    button_img_container.setAttribute("onclick", "show_full_movie_spec_batman(this.id)");
    if (admin()) {
        button_img_container.innerHTML = "Change";
        button_img_container.style.width = '100px'
        button_img_container.style.left = '70px'
    } else {
        button_img_container.innerHTML = "Buy";
    }

    div_1_img_container = document.createElement('div');
    div_1_img_container.appendChild(button_img_container);
    div_1_img_container.appendChild(p_img_container);

    div2_img_container = document.createElement('div');
    div2_img_container.classList.add('layer');
    div2_img_container.appendChild(div_1_img_container);

    img_img_container = document.createElement('img');
    img_img_container.src = All_movies_in_js[i].cover

    div3_img_container = document.createElement('div');
    div3_img_container.classList.add('movie_img_container')
    div3_img_container.appendChild(img_img_container);
    div3_img_container.appendChild(div2_img_container);

    document.getElementsByClassName('movie_container')[0].appendChild(div3_img_container);

}





function scrol_for_movie() {
    window.scrollTo({
        top: 600,
        left: 0,
        behavior: 'smooth'
    });
    check = false;
}

/*movie preview*/

document.getElementById("preview_close_button").addEventListener('click', function() {
    close_preview()
})

function close_preview() {
    document.getElementById("preview_page").style.top = "100%";
    document.getElementById("preview_close_button").style.transform = "rotate(225deg)"
    setTimeout(function() {
        document.getElementById("preview_close_button").style.transform = "rotate(45deg)"
    }, 1000)
}