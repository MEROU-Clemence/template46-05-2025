$(document).ready(function () {
    // ****** Variables globales pour les sélecteurs
    const $navbarToggler = $('.navbar-toggler');
    const $widgetBeToggler = $('.btn-resa-and-widget .booking-contain');
    const $subMenus = $('.clic-sub-menu');
    const $description = $('.description');

    // ****** Fonction pour ajuster la hauteur du menu mobile en fonction de .first-nav
    function adjustHeightMenuMobile() {
        // Sélectionner l'élément .first-nav
        const firstNav = document.querySelector('.first-nav');
        // Sélectionner les éléments du menu
        const menuHeightDuplicate = document.querySelectorAll('.mobile-nav');

        if (firstNav) {
            // Calculer la hauteur de l'élément
            const firstNavHeight = firstNav.offsetHeight;

            // Appliquer la hauteur calculée
            menuHeightDuplicate.forEach(heightDuplicate => {
                heightDuplicate.style.top = `${firstNavHeight}px`;
                heightDuplicate.style.height = `calc(100% - ${firstNavHeight}px)`;
            });
            
        } else {
            console.log('Élément .first-nav non trouvé.');
        }

        // Appeler la fonction au chargement de la page
        window.addEventListener('load', adjustHeightMenuMobile);

        // Appeler la fonction au redimensionnement de la fenêtre
        window.addEventListener('resize', adjustHeightMenuMobile);
    }

    // ****** Menu actif/inactif
    function initMenu() {
        $navbarToggler.on('click', function () {
            $('.navbar-toggler .btn-menu').toggleClass('d-none');
            $('.mobile-nav').toggleClass('mobile-nav-active');
            $('.header-global').toggleClass('header-global-bg');
        });
    }

    // ****** Sous-menu
    function initSubMenu() {
        $subMenus.on('click', function () {
            let $this = $(this);
            let $subMenu = $this.children('.sub-menu');
            let $link = $this.children('a');

            if ($subMenu.hasClass('sub-menu-active')) {
                $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
                $('.clic-sub-menu a').removeClass('a-active');
            } else {
                $('.clic-sub-menu .sub-menu').removeClass('sub-menu-active');
                $('.clic-sub-menu a').removeClass('a-active');

                $subMenu.addClass('sub-menu-active');
                $link.addClass('a-active');
            }
        });
    }

    // ****** Widget open/close
    function openWidgetBe() {
        $widgetBeToggler.on('click', function () {
            $('.btn-resa-and-widget').toggleClass('open');
            $('.i-booking').toggleClass('d-none');
        });
    }

    // ****** Texte présentation page Home
    function initDescriptionToggle() {
        if ($description.length) {
            const $seeMore2 = $('#seeMore2');
            const $seeLess2 = $('#seeLess2');

            // Vérifie hauteur description
            if ($description[0].scrollHeight <= $description.height()) {
                $seeMore2.hide();
                $seeLess2.hide();
            } else {
                $seeMore2.show();
                $seeLess2.hide();
            }

            // Voir plus
            $seeMore2.on('click', function (e) {
                e.preventDefault();
                $description.css('height', 'auto').addClass('expanded');
                $seeMore2.hide();
                $seeLess2.show();
            });

            // Voir moins
            $seeLess2.on('click', function (e) {
                e.preventDefault();
                $description.css('height', '').removeClass('expanded');
                $seeMore2.show();
                $seeLess2.hide();
            });
        }
    }

    // ****** Calcul de la marge de droite pour le bg du titre
    function updateGradient() {
        const contentSection = document.querySelector('.content-section');
        const titleSection = document.querySelector('.section-title-3');

        if (contentSection && titleSection) {
            const screenWidth = window.innerWidth;

            if (screenWidth >= 1220) {
                // Calcul de la marge de droite + 30px
                const contentMarginRight = parseInt(window.getComputedStyle(contentSection).marginRight, 10) + 30;

                // Application du gradient avec une séparation dynamique
                titleSection.style.background = `
                linear-gradient(
                    to right,
                    var(--color-bg-2) calc(100% - ${contentMarginRight}px),
                    var(--color-bg-1) calc(100% - ${contentMarginRight}px)
                )
            `;
            } else {
                // Réinitialise le style si la taille est inférieure à 1220px
                titleSection.style.background = '';
            }
        }
    }

    // Appeler la fonction au chargement de la page
    window.addEventListener('load', updateGradient);

    // Si la mise en page est responsive, écouter les redimensionnements
    window.addEventListener('resize', updateGradient);

    // ****** Pour transtion fluide vers les links
    function smoothTransitionLink() {
        document.querySelectorAll('a.scroll-contain[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // ****** SCEA
    function initSceaToggle() {
        // Cacher tous les éléments par défaut sauf les 7 premiers
        $(".options-scea span").hide();
        $(".options-scea span").slice(0, 7).show();

        // Vérifie le nombre total d'éléments et ajuste la visibilité des boutons
        function updateButtonVisibility() {
            const totalItems = $(".options-scea span").length;
            const hiddenItems = $(".options-scea span:hidden").length;

            if (totalItems <= 7 || hiddenItems === 0) {
                $("#seeMore1").hide();
                $("#seeLess1").hide();
            } else {
                $("#seeMore1").show();
                $("#seeLess1").hide();
            }
        }

        // Initialisation de la visibilité des boutons
        updateButtonVisibility();

        // Voir plus SCEA
        $("#seeMore1").on('click', function (e) {
            e.preventDefault();

            $(".options-scea span:hidden").slideDown();
            $("#seeMore1").hide();
            $("#seeLess1").show();
        });

        // Voir moins SCEA
        $("#seeLess1").on('click', function (e) {
            e.preventDefault();

            $(".options-scea span").not(":lt(7)").slideUp(function () {
                updateButtonVisibility();
            });

            $("#seeMore1").show();
            $("#seeLess1").hide();
        });
    }

    // ****** Fonction pour ajuster la marge de la banner en fonction de .first-nav
    function adjustHeightBannerMarginTop() {
        // Sélectionner l'élément .first-nav
        const firstNav = document.querySelector('.first-nav');
        // Sélectionner les éléments du menu
        const bannerHeightDuplicate = document.querySelectorAll('.section-title-BG.bg-img');

        if (firstNav) {
            // Calculer la hauteur de l'élément
            const firstNavHeight = firstNav.offsetHeight;

            // Appliquer la hauteur calculée
            bannerHeightDuplicate.forEach(heightDuplicate => {
                heightDuplicate.style.marginTop = `${firstNavHeight}px`;
            });
            
        } else {
            console.log('Élément .first-nav non trouvé.');
        }

        // Appeler la fonction au chargement de la page
        window.addEventListener('load', adjustHeightBannerMarginTop);

        // Appeler la fonction au redimensionnement de la fenêtre
        window.addEventListener('resize', adjustHeightBannerMarginTop);
    }

    // ****** Slider autres pages sur page
    $('.slider-other-pages').owlCarousel({
        loop: false,
        rewind: true,
        autoWidth: true,
        navText: ["<i class='las la-angle-left'></i>", "<i class='las la-angle-right'></i>"],
        responsiveClass: true,
        dots: false,
        nav: true,
        margin: 20,
        responsive: {
            0: {
                items: 1,
                autoWidth: false,
                touchDrag: true,
                mouseDrag: true,
            },
            768: {
                autoWidth: true,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                autoWidth: true,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });

    // ****** Slider pages
    $('.slider-page-page').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        items: 1,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        dots: false,
        nav: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });

    // ****** Slider page news
    $('.slider-page-news').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        items: 1,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        dots: false,
        nav: true,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });

    // ****** Fonction pour ajuster le padding-left et le transform des éléments .date-news-in-news
    function adjustDistanceNewsLeft() {
        const dateNewsElements = document.querySelectorAll('.date-news-in-news');

        dateNewsElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const distanceFromLeft = rect.left; // Distance depuis le bord gauche de l'écran

            // Appliquer la distance calculée comme une variable CSS
            element.style.setProperty('--distance-from-left', `${distanceFromLeft}px`);
        });

        // Appeler la fonction au chargement et au redimensionnement
        window.addEventListener('load', adjustDistanceFromLeft);
        window.addEventListener('resize', adjustDistanceFromLeft);
    }

    // ****** Slider galerie detail
    $('.slider-gallery-detail').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        dots: false,
        nav: true,
        items: 1,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        },
    });

    // ****** Slider galerie detail
    $('.slider-gallery-detail-2').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        dots: false,
        nav: true,
        items: 1,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        },
    });

    // ****** Slider autres prestations detail
    $('.slider-other-prestas').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        autoWidth: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        dots: false,
        nav: true,
        margin: 15,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });

    // ****** Prix cheques cadeaux
    function allPriceVouchersAndSlider() {
        // Clics sur les liens des prix chèques cadeaux
        $('.all-prices-vouchers a').on('click', function (event) {
            event.preventDefault();

            var targetId = $(this).attr('id');

            // Trouver l'élément correspondant dans le slider
            var targetElement = $(targetId);
            if (targetElement.length) {
                var index = $('.slider-vouchers').find('.owl-item').filter(function () {
                    return $(this).find(targetId).length > 0;
                }).index();

                // Si un index valide est trouvé, déplacer le slider
                if (index !== -1) {
                    $('.slider-vouchers').trigger('to.owl.carousel', [index, 600]);
                } else {
                    console.error("Impossible de trouver l'index dans Owl Carousel pour :", targetId);
                }
            } else {
                console.error("Cible non trouvée pour :", targetId);
            }
        });

        // ****** Slider vouchers
        $('.slider-vouchers').owlCarousel({
            loop: false,
            rewind: true,
            autoplay: false,
            navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
            autoHeight: true,
            responsiveClass: true,
            dots: false,
            nav: false,
            items: 1,
            responsive: {
                0: {
                    touchDrag: true,
                    mouseDrag: true,
                },
                1220: {
                    touchDrag: false,
                    mouseDrag: true,
                },
            }
        });
    }

    // ****** Initialisation des modules
    adjustHeightMenuMobile();
    initMenu();
    openWidgetBe();
    initSubMenu();
    initDescriptionToggle();
    smoothTransitionLink();
    initSceaToggle();

    // Appel des fonctions spécifiques au chargement complet
    $(window).on('load', function () {
        adjustHeightBannerMarginTop();

        if ($('main').hasClass('news')) {
            adjustDistanceNewsLeft();
        }
        if ($('main').hasClass('gifts')) {
            allPriceVouchersAndSlider();
        }
    });
});

$(document).ready(function () {
    $('.slider-prestas').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        autoWidth: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        dots: false,
        nav: true,
        margin: 15,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-gallery').owlCarousel({
        loop: true,
        rewind: false,
        autoplay: true,
        autoplayHoverPause: true,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        dots: false,
        nav: true,
        items: 1,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        },
    });
    $('.avis-slider').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        dots: false,
        nav: true,
        items: 1,
        responsive: {
            0: {
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
    $('.slider-special-offers').owlCarousel({
        loop: false,
        rewind: true,
        autoplay: false,
        navText: ["<i class='las la-arrow-left'></i>", "<i class='las la-arrow-right'></i>"],
        responsiveClass: true,
        dots: false,
        nav: true,
        margin: 15,
        responsive: {
            0: {
                items: 1,
                touchDrag: true,
                mouseDrag: true,
            },
            1024: {
                items: 2,
                touchDrag: true,
                mouseDrag: true,
            },
            1220: {
                items: 2,
                touchDrag: false,
                mouseDrag: true,
            },
        }
    });
});