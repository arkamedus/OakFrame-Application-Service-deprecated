import {Kernel} from "../../lib/model/Kernel";
import {StringTemplate} from "../../lib/model/template/StringTemplate";
import {Header} from "./view/Header";
import LandingView from './view/Landing.html';
import AboutView from './view/About.html';
import ErrorView from './view/Error.html';
import ContactView from './view/Contact.html';
import SearchView from './view/Search.html';
import {Account} from "./model/Account";
import {SignUp} from "./controller/SignUp";
import {LogIn} from "./controller/Login";
import {Reset} from "./controller/Reset";
import {Privacy} from "./controller/Privacy";

let kernel = <Kernel>new Kernel();

let account = new Account();

let controller_signup = new SignUp();
let controller_login = new LogIn();
let controller_reset = new Reset();
let controller_privacy = new Privacy();

export function generateStateTemplate() {
    let query = window.location.pathname.split("/")[2] || "";

    let dat:any = {hostname: window.location.hostname, search: decodeURIComponent(query), search_safe: decodeURIComponent(query).replace(/"/g, '&quot;')};

    if (!account.isAuthenticated()){
        dat.profile_link = "login";
    }else{
        dat.profile_link = "profile";
    }
    return dat;
}

kernel.use('/', function () {
    return new Promise(function (resolve, reject) {
        document.body.innerHTML =
            (new StringTemplate(LandingView)).apply(generateStateTemplate());
        resolve();
    });
});

kernel.use('/about', function () {
    //TODO use About.ts controller
    return new Promise(function (resolve, reject) {
        document.body.innerHTML = (new Header()).apply(generateStateTemplate()) +
            (new StringTemplate(AboutView)).getContents();
        resolve();
    });
});

kernel.use('/signup', controller_signup.use);
kernel.use('/login', controller_login.use);
kernel.use('/reset', controller_reset.use);
kernel.use('/privacy', controller_privacy.use);

kernel.use('/contact', function () {
    return new Promise(function (resolve, reject) {
        document.body.innerHTML = (new Header()).apply(generateStateTemplate()) +
            (new StringTemplate(ContactView)).getContents();
        resolve();
    });
});

kernel.use('/search/?(.+)?', function () {
    console.log('SEARCH PAGE');
    return new Promise(function (resolve, reject) {
        document.body.innerHTML = (new Header()).apply(generateStateTemplate()) +
            (new StringTemplate(SearchView)).apply(generateStateTemplate());
        resolve();
    });
});

kernel.error('/([a-zA-Z0-9-]+)?', function () {
    return new Promise(function (resolve, reject) {
        document.body.innerHTML =
            document.body.innerHTML = (new Header()).apply(generateStateTemplate()) +
                (new StringTemplate(ErrorView)).apply(generateStateTemplate());
        resolve();
    });
});

kernel.subscribe('route', function () {

    const search_pill: any = document.getElementById('pill-search-expand');
    const search_pill_input: any = document.getElementById('pill-search');
    const search_pill_icon: any = document.getElementById('pill-search-icon');
    const navbar = document.getElementById('navbar');

    if (!navbar) {
        return false;
    }

    search_pill.onmouseenter = updatePillSearchBar;
    navbar.onmouseleave = updatePillSearchBar;
    search_pill_input.onblur = updatePillSearchBar;

    search_pill.onclick = function () {
        search_pill_input.focus();
        updatePillSearchBar();
    };
    search_pill_input.onkeypress = function (e) {
        if (e.keyCode === 13 || e.which === 13 || e.key === 'Enter') {
            if (search_pill_input.value !== "") {
                if (!window.navigator['standalone']) {
                    /* iOS hides Safari address bar */
                    window.history.pushState({data: "okay"}, "unknown", `//${window.location.hostname}:8084/search/${encodeURIComponent(search_pill_input.value)}`);
                }
                kernel.route(`/search/${encodeURIComponent(search_pill_input.value)}`);
            } else {
                this.blur();

            }
        } else {
            // return true;
        }
        updatePillSearchBar();
    };

    search_pill_icon.onclick = function (e) {
        e.preventDefault();
        if (search_pill_input.value !== "") {
            if (!window.navigator['standalone']) {
                /* iOS hides Safari address bar */
                window.history.pushState({data: "okay"}, "unknown", `//${window.location.hostname}:8084/search/${encodeURIComponent(search_pill_input.value)}`);
            }
            kernel.route(`/search/${encodeURIComponent(search_pill_input.value)}`);
        }
    };

    function isHover(e) {
        return (e.parentElement.querySelector(':hover') === e);
    }

    function updatePillSearchBar() {
        if (search_pill_input.value !== '' || document.activeElement === search_pill_input || isHover(search_pill)) {
            search_pill_input.className = 'pill-search-open';
        } else {
            search_pill_input.className = '';
        }

        if (search_pill_input.value !== '') {
            search_pill_icon.className = 'fas fa-arrow-right';
        } else {
            search_pill_icon.className = 'fas fa-search';
        }

    }

    updatePillSearchBar();

});

kernel.route();

document.body.addEventListener('click', function (event) {
    const clickedElem: any = event.target;
    let target = clickedElem.closest("a");
    console.log('CLICKED ON', clickedElem, target);
    if (target && target.hasAttribute('href')) {
        let rel_route = target.getAttribute('href').replace(`//${window.location.hostname}:8084`, "");
        if (!window.navigator['standalone']) {
            /* iOS hides Safari address bar */
            window.history.pushState({data: "okay"}, "unknown", target.getAttribute('href'));
        }
        kernel.route(rel_route);
        /* iOS re-orientation fix */
        event.preventDefault();
    }
}, false);

window.addEventListener('popstate', function (e) {
    kernel.route();
});

function logEvent(event) {
    console.log(event.type);
}

window.applicationCache.addEventListener('checking', logEvent, false);
window.applicationCache.addEventListener('noupdate', logEvent, false);
window.applicationCache.addEventListener('downloading', logEvent, false);
window.applicationCache.addEventListener('cached', logEvent, false);
window.applicationCache.addEventListener('updateready', logEvent, false);
window.applicationCache.addEventListener('obsolete', logEvent, false);
window.applicationCache.addEventListener('error', logEvent, false);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function () {
            console.log("Service Worker Registered");
        });
}
