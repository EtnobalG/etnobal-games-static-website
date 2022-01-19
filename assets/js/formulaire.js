const ERROR_PAGE_NOT_FOUND = "PAGE_NOT_FOUND";
const ERROR_INVALID_FIELD_EMPTY = "INVALID_FIELD_EMPTY";
const ERROR_INVALID_RETURN = "INVALID_RETURN";
const ERROR_AJAX_FAILURE = "AJAX_FAILURE";

document.addEventListener('DOMContentLoaded', function () {
    let $form = $('#form');

    /**
     * Immediately update validation information if the form has already been submitted
     */
    $form.find('select, input').each(function () {
        $(this).on('change', function () {
            // The form has already been validated.
            if ($form.hasClass('was-validated') === true) {
                // Revalidate to update the invalid / valid status of the fields.
                validateForm($('#formulaire'));
            }
        });
    });

    $form.on('submit', function (e) {
        // Validation of the honey pot.
        if ($("#name").val() === "" && $("#email").val() === "") {
            // Hide server error.
            $("#serverErrorMessage").hide();

            let form = $(this);
            validateForm(form);

            let isValid = this.checkValidity();

            //isValid = true; //to be able to debug server-side validations
            if (isValid === false) {
                e.preventDefault();
                e.stopPropagation();
                form.addClass("was-validated");
                goBackToTheFirstError($form);
            } else {
                e.preventDefault();
                e.stopPropagation();
                registerServerSide();
            }
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
    });
});

function validateForm(form) {
    $form = $(form);
    // Browse select, input etc,
    $form.find('select, input, textarea').each(function (index, element) {
        element.setCustomValidity(getErrorMessage(element));
        $("#invalid-feedback_" + element.id).html(element.validationMessage);

    });
}


function registerServerSide() {
    let serverScript;

    switch (getPageName()) {
        case "contactUs.php":
            serverScript = "sendEmail.php";
            break;

        default:
            displayServerError(ERROR_PAGE_NOT_FOUND);
            return;
    }

    let formdata = new FormData();

    $form = $(form);
    let elementDansLeFormData = [];
    let valeur;
    // Browse select, input, etc.
    $form.find('select, input, textarea').each(function (index, element) {
        if (element.type === "file") {
            formdata.append(element.id, element.files[0]);
        } else if (element.id === element.name) {
            formdata.append(element.id, element.value);
        } else {
            if (elementDansLeFormData.includes(element.name) === false) {
                elementDansLeFormData.push(element.name);
                valeur = $('input[name="' + element.name + '"]:checked').val();
                if (valeur === undefined) {
                    valeur = "";
                }
                formdata.append(element.name, valeur);
            }
        }
    });

    grecaptcha.ready(function () {
        grecaptcha.execute('6LcGOPkaAAAAAHL8kVSfdkxM_e8tP6oOMI1ljKC1', {action: 'submit'}).then(function (captchaToken) {
            formdata.append("captchaToken", captchaToken);

            $form = $(form);

            $.ajax({
                method: "POST",
                url: "ajax/" + serverScript,
                data: formdata,
                dataType: "json",
                processData: false,
                contentType: false
            }).done(function (data) {
                if (typeof data !== "undefined") {
                    $form = $(form)
                    if (data.success === true) {
                        $form.hide();
                        $("#successMessage").show();
                    } else {
                        if (data.invalidFields.length > 0) {
                            var element;

                            data.invalidFields.forEach(function (item) {
                                element = $('#' + item).get(0);
                                if (element.type !== "fieldset") {
                                    element.setCustomValidity(getErrorMessage(element));
                                    $("#invalid-feedback_" + element.id).html(element.validationMessage);
                                } else {
                                    let message = $("#invalid-feedback_" + item).html();
                                    element.setCustomValidity(message);
                                }
                            });

                            $form.addClass("was-validated");
                            remonterPremiereErreur($form);
                        } else {
                            if (data.returnCode !== "") {
                                displayServerError(data.returnCode);
                            } else {
                                displayServerError(ERROR_INVALID_FIELD_EMPTY);
                            }

                        }
                    }
                } else {
                    displayServerError(ERROR_INVALID_RETURN);
                }
            }).fail(function () {
                displayServerError(ERROR_AJAX_FAILURE);
            });
        });
    });
}

function displayServerError(error) {
    let serverErrorMessage = $('#serverErrorMessage');

    serverErrorMessage.html(text.form.erreurServeur.replace("%s", error));
    serverErrorMessage.show();
}

/**
 *
 * @param element
 * @returns {string}
 */
function getErrorMessage(element) {
    let msgErreur = '';

    // Not validate hidden et honeypot field.
    if (element.disabled === true || element.id === "name" || element.id === "email") {
        msgErreur = '';
    } else if (element.validity.valueMissing === true) {
        if (element.id === 'message') {
            msgErreur = text.form.valueMissing.message;
        } else if (element.id === 'emailAddress') {
            msgErreur = text.form.valueMissing.emailAddress;
        } else {
            switch (element.type) {
                case 'date':
                    msgErreur = text.form.valueMissing.date;
                    break;
                case 'radio':
                    msgErreur = text.form.valueMissing.radio;
                    break;
                case 'file':
                    msgErreur = text.form.valueMissing.file;
                    break;
                case 'number':
                    msgErreur = text.form.valueMissing.number;
                    break;
                case 'select':
                    msgErreur = text.form.valueMissing.select;
                    break;
                case 'textarea':
                    msgErreur = text.form.valueMissing.textarea;
                    break;
                case 'url':
                    msgErreur = text.form.valueMissing.url;
                    break;
                default:
                    msgErreur = text.form.valueMissing.required;
                    break;
            }
        }
    } else if (element.validity.typeMismatch === true) {
        if (element.type === 'email') {
            msgErreur = text.form.typeMismatch.email;
        }
    } else {

    }

    return msgErreur;
}

function goBackToTheFirstError(formulaire) {
    let $form = $(formulaire);
    if ($form.find(':invalid').length > 0) {
        $("html, body").animate({scrollTop: $form.find(':invalid').first().offset().top - 100}, "fast");
    }
}
