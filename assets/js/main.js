document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("language").addEventListener("change", onLanguageChange);
});

String.prototype.interpolate = function (params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${this}\`;`)(...vals);
}

/**
 * Display the email adresse on screen.
 */
function displayEmailAddress() {
    let emailAddress = "etnobalgames@gmail.com";

    let linkEmailAddress = document.getElementById("linkEmailAddress");
    linkEmailAddress.innerHTML = emailAddress;
    linkEmailAddress.setAttribute("href", "mailto:" + emailAddress);

    let btnEmailAddress = document.getElementById("btnEmailAddress");
    btnEmailAddress.style.display = "none";
}

/**
 *
 * @returns string
 */
function getPageName() {
    let pageURL = window.location.href;
    pageURL = pageURL.split("/");
    pageURL = pageURL[pageURL.length - 1];

    pageURL = pageURL.split("?");
    pageURL = pageURL[0];

    return pageURL;
}

/**
 * @returns string
 */
function getQueryWithoutLanguage() {
    let pageURL = window.location.href;

    if (!pageURL.includes("?")) return "";

    let query = [];
    pageURL = pageURL.split("?");
    pageURL = pageURL[pageURL.length - 1];

    pageURL = pageURL.split("&");
    pageURL.forEach(function (item) {
        if (item.includes("lang=") === false) {
            query.push(item);
        }
    });

    return query.join('&');
}

/**
 * Call the same page in another language
 */
function onLanguageChange() {
    let filename = getPageName();

    if (filename.indexOf(".html") >= 0) {
        let location = window.location.href;
        location = location.replace("/" + $('html')[0].lang + "/", "/" + this.value + "/");
        window.location = location;
    } else {
        let queryString = getQueryWithoutLanguage();
        if (queryString !== "") queryString = "&" + queryString;
        window.location = getPageName() + "?lang=" + this.value + queryString;
    }
}
