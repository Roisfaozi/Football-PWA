document.addEventListener("DOMContentLoaded", function () {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        const http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = http.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };

        http.open("GET", "nav.html", true);
        http.send();
    }
});

// Load page content

let page = window.location.hash.substr(1);
if (page == '') page = 'home';
loadPage(page);

function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
            const content = document.querySelector("#body-content");
            if (page === 'home') {
                loadContent();
            } else if (page === 'teams') {
                loadTeam();
            } else if (page === 'favorite') {
                getFavoriteTeam();
            }
            if (this.status === 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status === 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups... halaman tidak dapat diakses.</p>";
            }
        }
    };

    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();
}