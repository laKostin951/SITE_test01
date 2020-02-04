window.addEventListener('load', function() {

    if (current_user == '') {
        update_site_no_uss();
    } else {
        update_site_uss();
        if (currentPurchase != '') {
            shopping_bag_gif_animated()
        }
    }

})

/*Log in novog trenutnog kosrinika*/
//localStorage.setItem('Current_user', '');
document.getElementsByClassName("log_in_button")[0].addEventListener("click", function(event) {
    for (let i = 0; i < All_users_in_js.length; i++) {
        if (document.getElementsByClassName("log_in_input")[0].value == All_users_in_js[i].username) {
            if (document.getElementsByClassName("log_in_input")[1].value == All_users_in_js[i].password) {
                localStorage.setItem('Current_user', i);
                update_site_uss()
                close_logIn_window()
            }
        }
    }
})
/* promene u nav baru prilikom logovanja korisnika*/


function update_site_uss() {

    let bag_icon_logIn = document.createElement('img');
    bag_icon_logIn.src = "FILES/Annota-removebg-preview.png";
    bag_icon_logIn.classList.add("bag");
    bag_icon_logIn.setAttribute('onclick', 'show_shopping_bag()')

    let profile_icon_logIn = document.createElement('img');
    profile_icon_logIn.src = "FILES/user_male2-512.png";
    profile_icon_logIn.classList.add('user');

    let user_name_logIn = document.createElement('h3');
    user_name_logIn.innerHTML = (All_users_in_js[current_user].username) /*zasto mora da bude od [0]*/

    document.getElementById("nav-bar-3").innerHTML = ''
    document.getElementById("nav-bar-3").appendChild(bag_icon_logIn);
    document.getElementById("nav-bar-3").appendChild(profile_icon_logIn);
    document.getElementById("nav-bar-3").appendChild(user_name_logIn);
}

function update_site_no_uss() {

    let logIn_button_no_uss = document.createElement('button');

    logIn_button_no_uss.setAttribute('onclick', "open_logIn_window()");
    logIn_button_no_uss.classList.add("btn", "logbtn");
    logIn_button_no_uss.innerHTML = 'Log In';

    let register_button_no_uss = document.createElement('button');
    register_button_no_uss.setAttribute('onclick', "open_RegIn_window_button()");
    register_button_no_uss.classList.add('btn', 'register');
    register_button_no_uss.innerHTML = 'Register';

    let register_button_div_no_uss = document.createElement('div');
    register_button_div_no_uss.appendChild(register_button_no_uss)

    document.getElementById("nav-bar-3").innerHTML = ''
    document.getElementById("nav-bar-3").appendChild(logIn_button_no_uss);
    document.getElementById("nav-bar-3").appendChild(register_button_div_no_uss);

}