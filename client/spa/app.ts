import {Kernel} from "../../lib/model/Kernel";
import {StringTemplate} from "../../lib/model/template/StringTemplate";
import {Header} from "./view/Header";
import Landing from './view/Landing.html';
import About from './view/About.html';
import Error from './view/Error.html';
import Contact from './view/Contact.html';
import Search from './view/Search.html';

let kernel = <Kernel>new Kernel();

function generateStateTemplate() {
    let query = window.location.pathname.split("/")[2] || "";
    return {hostname: window.location.hostname, search: decodeURIComponent(query), search_safe: decodeURIComponent(query).replace(/"/g, '&quot;')}
}

kernel.use('/', function () {
    return new Promise(function (resolve, reject) {
        document.body.innerHTML =
            (new StringTemplate(Landing)).apply(generateStateTemplate());
        resolve();
    });
});

kernel.use('/about', function () {
    //TODO use About.ts controller
    return new Promise(function (resolve, reject) {
        document.body.innerHTML = (new Header()).apply(generateStateTemplate()) +
            (new StringTemplate(About)).getContents();
        resolve();
    });
});

kernel.use('/contact', function () {
    return new Promise(function (resolve, reject) {
        document.body.innerHTML = (new Header()).apply(generateStateTemplate()) +
            (new StringTemplate(Contact)).getContents();
        resolve();
    });
});

kernel.use('/search/?(.+)?', function () {
    console.log('SEARCH PAGE');
    return new Promise(function (resolve, reject) {
        document.body.innerHTML = (new Header()).apply(generateStateTemplate()) +
            (new StringTemplate(Search)).apply(generateStateTemplate());
        resolve();
    });
});

kernel.error('/([a-zA-Z0-9-]+)?', function () {
    return new Promise(function (resolve, reject) {
        document.body.innerHTML =
            document.body.innerHTML = (new Header()).apply(generateStateTemplate()) +
                (new StringTemplate(Error)).apply(generateStateTemplate());
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
