$(document).ready(function () {
    "use strict";

    // NAVBAR RESIZE FUNCTION
    $(window).scroll(function () {
        let value = $(this).scrollTop();
        if (value > $(window).height() * 1)
            $(".navbar-light").addClass("scrolled");
        else
            $(".navbar-light").removeClass("scrolled");
    });

    //HAMBURGER MENU ANIMATION
    $('#hamburger').on("click", function () {
        $(this).toggleClass('collapsed');
    });


    //PARTICLES
    particlesJS("particles-web",
        {
            "particles": {
                "number": {
                    "value": 120,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#222222"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.8017060304327615,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#bbbbbb",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 4,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "bounce",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": false,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 200,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });

    // SMOOTH SCROLLING TO ANCHORS
    $('a[href*=\\#]:not([href=\\#]):not(.control-right, .control-left, .carousel-control-prev, .carousel-control-next)').on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 100
                }, 1000);
                return false;
            }
        }
    });

    // LAZY LOADING IMAGES
    let bLazy = new Blazy();

    // ANIMATIONS
    let $animation_elements = $('.animation-element');
    let $window = $(window);

    function check_if_in_view() {
        let window_height = $window.height();
        let window_top_position = $window.scrollTop();
        let window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            let $element = $(this);
            let element_height = $element.outerHeight();
            let element_top_position = $element.offset().top + 150;
            let element_bottom_position = (element_top_position + element_height);

            //check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
            }
        });
    }

    $window.on('scroll resize', check_if_in_view);
    $window.trigger('scroll');

    //STOP VIDEO FROM PLAYING AFTER CLOSING A MODAL
    $("body").on('hidden.bs.modal', function (e) {
        let $iframes = $(e.target).find("iframe");
        $iframes.each(function (index, iframe) {
            $(iframe).attr("src", $(iframe).attr("src"));
        });
    });

    // DISPLAY EMAIL ADDRESS
    $('#btnEmailAddress').on("click", function () {
        let emailAddress = "etnobalgames@gmail.com";

        let linkEmailAddress = document.getElementById("linkEmailAddress");
        linkEmailAddress.innerHTML = emailAddress;
        linkEmailAddress.setAttribute("href", "mailto:" + emailAddress);

        let btnEmailAddress = document.getElementById("btnEmailAddress");
        btnEmailAddress.style.display = "none";
    });

});