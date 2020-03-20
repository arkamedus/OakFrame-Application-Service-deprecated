import {ApplicationRouter} from "../../lib/model/ApplicationRouter";
import {StringTemplate} from "../../lib/model/template/StringTemplate";
import HeaderView from "./view/Header.html";
import ErrorView from './view/Error.html';
import SearchView from './view/Search.html';
import {Account} from "./model/Account";
import {SignUpController} from "./controller/SignUpController";
import {LogInController} from "./controller/LoginController";
import {ResetController} from "./controller/ResetController";
import {PrivacyController} from "./controller/PrivacyController";
import {AboutController} from "./controller/AboutController";
import {LandingController} from "./controller/LandingController";
import {ContactController} from "./controller/ContactController";
import {CounterController} from "./controller/CounterController";
import {GraphController} from "./controller/GraphController";
import {Searcher} from "../../lib/model/Searcher";
import {CameraController} from "./controller/CameraController";

export const app: ApplicationRouter = new ApplicationRouter();

let account: Account = new Account();
export const search_handler = new Searcher();

let controller_landing = new LandingController();
let controller_signup = new SignUpController();
let controller_login = new LogInController();
let controller_reset = new ResetController();
let controller_privacy = new PrivacyController();
let controller_about = new AboutController();
let controller_contact = new ContactController();
let controller_counter = new CounterController();
let controller_graph = new GraphController();
let controller_camera = new CameraController();

export function generateStateTemplate() {
    let query = window.location.pathname.split("/")[2] || "";

    let dat: any = {
        hostname: window.location.hostname,
        search: decodeURIComponent(query),
        search_safe: decodeURIComponent(query).replace(/"/g, '&quot;')
    };

    if (!account.isAuthenticated()) {
        dat.profile_link = "login";
    } else {
        dat.profile_link = "profile";
    }
    return dat;
}

app.use('/', controller_landing.use);
app.use('/about', controller_about.use);
app.use('/signup', controller_signup.use);
app.use('/login', controller_login.use);
app.use('/reset', controller_reset.use);
app.use('/privacy', controller_privacy.use);
app.use('/contact', controller_contact.use);
app.use('/counter', controller_counter.use);
app.use('/graph', controller_graph.use);
app.use('/camera', controller_camera.use);

app.use('/search/?(.+)?', function () {
    return new Promise(function (resolve, reject) {

        let search_results = search_handler.search(generateStateTemplate().search);

        let data: any = {};
        Object.assign(data, generateStateTemplate());

        if (search_results.length === 0) {
            data.results = `No results found for "${data.search_safe}".`;
        } else {
            data.results = "";
            search_results.forEach(function (result) {
                result.id = ((Math.random() * 100000) | 0) + "";
                data.results += `<div id="${result.id}"><h4>${result.title}</h4><p>${result.desc}</p></div>`;
            });
        }

        document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
            (new StringTemplate(SearchView)).apply(data);
        search_results.forEach(function (result) {
            document.getElementById(result.id).onclick = result.fn;
        });

        resolve();
    });
});

app.error('/([a-zA-Z0-9-]+)?', function () {
    return new Promise(function (resolve, reject) {
        document.body.innerHTML =
            document.body.innerHTML = (new StringTemplate(HeaderView)).apply(generateStateTemplate()) +
                (new StringTemplate(ErrorView)).apply(generateStateTemplate());
        resolve();
    });
});

app.subscribe('route', function () {

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
                    window.history.pushState({data: "okay"}, "unknown", `//${window.location.hostname}:8080/search/${encodeURIComponent(search_pill_input.value)}`);
                }
                app.route(`/search/${encodeURIComponent(search_pill_input.value)}`);
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
                window.history.pushState({data: "okay"}, "unknown", `//${window.location.hostname}:8080/search/${encodeURIComponent(search_pill_input.value)}`);
            }
            app.route(`/search/${encodeURIComponent(search_pill_input.value)}`);
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

app.route();

/*
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
*/