function open_RegIn_window_button() {
    open_logIn_window()
    open_RegIn_window()
}

function open_RegIn_window() {
    document.getElementById("register_fieldset").style.opacity = "1";
    document.getElementById("register_fieldset").style.top = "50%";
    document.getElementById("log_fieldset").style.opacity = "0";
    document.getElementById("log_fieldset").style.top = "-50%";
    if (admin() == false) {
        document.getElementsByClassName('regiter_div')[5].style.display = 'none'
    }
}

function register_in_button() {
    if (register_check() == 1) {
        alert('Username koji ste izabrali je vez zauzet')
    }
    if (register_check() == 2) {
        alert('Morate popuniti sva polja')
    }
    if (register_check() == 3) {
        alert('Lozinke se ne podudaraju')
    }
    if (register_check() == 0) {
        if (admin()) {
            close_logIn_window()
        } else {
            document.getElementById("register_fieldset").style.opacity = "0";
            document.getElementById("register_fieldset").style.top = "150%";
            document.getElementById("log_fieldset").style.opacity = "1";
            document.getElementById("log_fieldset").style.top = "50%";
        }
        update_All_Users()
        clean_register_form()
    }

}

function register_check() {
    let provera = 0;

    for (let i = 0; i < 5; i++) {
        if (document.getElementsByClassName("register_in_input")[i].value == '') {
            provera = 2
        }
    }

    if (document.getElementsByClassName("register_in_input")[3].value != document.getElementsByClassName("register_in_input")[4].value) {
        provera = 3
    }

    for (let i = 0; i < All_users_in_js.length; i++) {
        if (document.getElementsByClassName("register_in_input")[2].value == All_users_in_js[i].username)
            provera = 1
    }


    return provera

}

function clean_register_form() {

    for (let i = 0; i < 5; i++) {
        document.getElementsByClassName("register_in_input")[i].value = '';
    }
}

function update_All_Users() {
    let newUserUpdate = All_users_in_js
    newUserUpdate.push({
        "name": document.getElementsByClassName("register_in_input")[0].value,
        "surname": document.getElementsByClassName("register_in_input")[1].value,
        "password": document.getElementsByClassName("register_in_input")[3].value,
        "admin": vrati_admin(),
        "username": document.getElementsByClassName("register_in_input")[2].value,
        "purchase": [],
    })


    localStorage.setItem("All_users", JSON.stringify(newUserUpdate));
    newUserUpdate = ''
}
sessionStorage.setItem("admin_count", 0);

function set_Admin_Batman(x) {

    if (sessionStorage.getItem("admin_count") == 0) {
        x.src = 'check-mark-9-32.png'
        sessionStorage.setItem("admin_count", 1);
    } else {
        x.src = 'FILES/x-mark.png'
        sessionStorage.setItem("admin_count", 0);
    }
}

function vrati_admin() {
    let adminX
    if (sessionStorage.getItem("admin_count") == 1) {
        adminX = true
    } else {
        adminX = false
    }
    return adminX
}