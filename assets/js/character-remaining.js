/**
 * Adapted from http://web.archive.org/web/20170712115736/https://dequeuniversity.com/library/aria/counters/sf-characters-remaining
 * The modified / removed code is commented out.
 */
document.addEventListener('DOMContentLoaded', function () {
    $(document).ready(function () {
        charsRemaining("message");
    });

    //var politeIdx = 0;
    let totalChars;

    function charsRemaining(fieldName) {
        let $message = $('#' + fieldName);

        // Si le champ existe.
        if ($message.length) {
            let cachedLength;
            // let politeQueue = true;
            let alreadyAlerted = false;
            // the total number of characters allowed:
            //   let totalChars = 150;
            totalChars = parseInt($message.attr('maxlength'));
            // the number of characters that
            // triggers the polite announcement:
            let politeFlag = totalChars / 2;
            // the number of characters that
            // triggers the assertive announcement:
            let assertiveFlag = totalChars - 20;

            $message.attr('maxlength', totalChars);

            $message.on('keyup', function () {
                // maxlength polyfill:
                // Get the value
                let text = $(this).val();
                // Get the maxlength
                let limit = $(this).attr('maxlength') || totalChars;
                // Check if the length exceeds what is permitted
                if (text.length > limit) {
                    // Truncate the text if necessary
                    $(this).val(text.substr(0, limit));
                }

                // chars remaining / alert dialog:
                let realLength = $message.val().length;
                let remaining = totalChars - realLength;
                updateRemaining(remaining, fieldName);
                if (remaining <= 0) {
                    if (!alreadyAlerted) {
                        // show the dialog
                        cachedLength = null;

                        // On force le .show sinon bootstrap va le cacher...
                        $('#live-region-text').addClass('invalid-feedback').addClass('is-invalid').show();
                    }
                } else {
                    $('#live-region-text').removeClass('invalid-feedback').removeClass('is-invalid');
                }

                // if we have set the cachedLength (when the dialog was closed),
                // lets check if the length has changed, and if it has, reset the
                // alert boolean.
                if (cachedLength && alreadyAlerted) {
                    // check if it has changed...
                    if (cachedLength !== $message.val().length) {
                        alreadyAlerted = false;
                    }
                }

                // 70-60 atomic true
                // 60 set it to false
                // 20 atomic true

                if (realLength >= politeFlag && realLength < assertiveFlag) {
                    // polite announcement...
                    let liveRegion = $('#live-region-text-' + fieldName);
                    liveRegion.attr('aria-live', 'polite');

                    if (realLength >= 90) {
                        liveRegion.attr('aria-atomic', 'false');
                    } else {
                        liveRegion.attr('aria-atomic', 'true');
                    }
                } else if (realLength >= assertiveFlag) {
                    // assertive announcement...
                    $('#live-region-text').attr({
                        'aria-live': 'assertive',
                        'aria-atomic': 'true'
                    });
                } else { // clean up (remove the aria-live and aria-atomic attributes)
                    $('#live-region-text')
                        .removeAttr('aria-live')
                        .removeAttr('aria-atomic');
                }
            });

            $message.keyup();
        }
    }

    function updateRemaining(charsLeft, fieldName) {
        let nbRemaining = new Intl.NumberFormat(text.global.locale, {maximumFractionDigits: 0}).format(charsLeft);
        let totalChars2 = new Intl.NumberFormat(text.global.locale, {maximumFractionDigits: 0}).format(totalChars);
        if (nbRemaining === "0" || nbRemaining === "1") {
            $('#live-region-text-' + fieldName).html(text.characterRemaining.singular.interpolate({
                nbRemaining: nbRemaining,
                totalChars: totalChars2
            }));
        } else {
            $('#live-region-text-' + fieldName).html(text.characterRemaining.plural.interpolate({
                nbRemaining: nbRemaining,
                totalChars: totalChars2
            }));
        }

    }
});