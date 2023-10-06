$(document).ready(function () {
    let pageURL = $(location).attr("href");
    let h1 = $("h1");
    let container = $("h3");
    let button = $("#takeMeBack");

    if (pageURL.includes("/es/") === true) {
        h1.html('PAGINA <span class=\"colored\">NO ENCONTRADA</span>');
        container.html("Error 404: esta página no fue encontrada.");
        button.html("Volver al inicio");
    } else if (pageURL.includes("/fr/") === true) {
        h1.html('PAGE <span class=\"colored\">NON TROUVEE</span>');
        container.html("Erreur 404 : cette page n'a pas pu être trouvée.");
        button.html("Revenir à l'accueil");
    }
});