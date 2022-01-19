$(document).ready(function () {
    $("#language").change(function () {
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
    });
});

String.prototype.interpolate = function(params) {
    const names = Object.keys(params);
    const vals = Object.values(params);
    return new Function(...names, `return \`${this}\`;`)(...vals);
}

/**
 *
 * @returns string
 */
function getPageName() {
    let pageURL = $(location).attr("href");
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
    let pageURL = $(location).attr("href");

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