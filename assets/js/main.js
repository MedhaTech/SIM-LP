;
(function($) {
    "use strict";

    $(document).ready(function() {

        /*-------------------------------
            Navbar Fix
        ------------------------------*/
        if ($(window).width() < 991) {
            navbarFix()
        }
        /*------------------------------
            smoth achor effect
        ------------------------------*/
        $(document).ready(function() {
            // Toggle icon click event to close the navbar
            $('.navbar-toggler').on('click', function() {
                $('.navbar-collapse').collapse('toggle');
            });
        
            // Click event for navbar links
            $(document).on('click', '.navbar-nav li a', function(e) {
                var anchor = $(this).attr('href');
                var link = anchor.slice(0, 1);
        
                if ('#' == link) {
                    e.preventDefault();
                    var top = $(anchor).offset().top;
                    $('html, body').animate({
                        scrollTop: $(anchor).offset().top
                    }, 1000);
        
                    $(this).parent().addClass('current-menu-item').siblings().removeClass('current-menu-item');
                }
        
                // Collapse navbar after selecting an item on mobile view
                if ($(window).width() < 991) {
                    $('.navbar-collapse').collapse('hide');
                }
            });
        
            // Click event for closing the navbar when clicking outside
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.navbar-collapse').length && !$(e.target).closest('.navbar-toggler').length) {
                    $('.navbar-collapse').collapse('hide');
                }
            });
        });
        
        


        /*--------------------
            wow js init
        ---------------------*/
        new WOW().init();

        /*-------------------------
            magnific popup activation
        -------------------------*/
        $('.video-play,.video-popup,.small-vide-play-btn').magnificPopup({
            type: 'video'
        });

        /*------------------
            back to top
        ------------------*/
        $(document).on('click', '.back-to-top', function() {
            $("html,body").animate({
                scrollTop: 0
            }, 2000);
        });
        /*------------------------------
            counter section activation
        -------------------------------*/
        var counternumber = $('.count-num');
        counternumber.counterUp({
            delay: 20,
            time: 1000
        });
        // MouseEvent
        var $mosueOverEffect = $('.outer');
        if ($mosueOverEffect.length > 0) {
            VanillaTilt.init(document.querySelectorAll(".outer"), {
                max: 80,
                speed: 400,
                perspective: 200,
                scale: 1.2,
                reverse: true,
            });
        }
        // Water Effect
        var $waterEffect = $('.water-effect');
        if ($waterEffect.length > 0) {
            $waterEffect.ripples({
                resolution: 256,
                perturbance: 0.05,
                // dropRadius: 50
            });
        }
        /**-----------------------------
         *  countdown
         * ---------------------------*/
        if ($("#mycountdown").length > 0) {
            $("#mycountdown").countdown("2021/09/20", function(event) {
                $('.month').text(
                    event.strftime('%m')
                );
                $('.days').text(
                    event.strftime('%n')
                );
                $('.hours').text(
                    event.strftime('%H')
                );
                $('.mins').text(
                    event.strftime('%M')
                );
                $('.secs').text(
                    event.strftime('%S')
                );
            });

        }
        // Clinet - active
       
        $(document).ready(function(){
            $('.client-active-area').owlCarousel({
                loop: true,
                autoplay: true,
                autoplayTimeout: 2000, // Adjust this as needed
                items: 5,
                nav: true,
                margin: 30, // Adjust margin between items
                dots: false,
                navText: [
                    '<span class="owl-nav-arrow owl-prev-arrow">&#10094;</span>', // left arrow
                    '<span class="owl-nav-arrow owl-next-arrow">&#10095;</span>'  // right arrow
                ],
                responsive: {
                    0: {
                        items: 1,
                        nav: true // Show arrows in mobile view
                    },
                    600: {
                        items: 3,
                        nav: true
                    },
                    992: {
                        items: 4,
                        nav: true
                    },
                    1200: {
                        items: 5,
                        nav: true
                    }
                }
            });
        });
            /*---------------------------
                testimonial carousel
            ---------------------------*/
            var $TestimonialCarousel = $('.testimonial-carousel');
            if ($TestimonialCarousel.length > 0) {
                $TestimonialCarousel.owlCarousel({
                    loop: true,
                    autoplay: true,
                    autoPlayTimeout: 1000,
                    margin: 30,
                    dots: false,  // Disable dots if you only want arrows
                    nav: true,  // Enable navigation arrows
                    navText: [
                        '<div class="nav-arrow nav-left"><i class="fa fa-angle-left"></i></div>', 
                        '<div class="nav-arrow nav-right"><i class="fa fa-angle-right"></i></div>'
                    ],
                    animateOut: 'fadeOut',  // Transition effect when sliding out
                    animateIn: 'fadeIn',  // Transition effect when sliding in
                    responsive: {
                        0: {
                            items: 1
                        },
                        460: {
                            items: 1
                        },
                        599: {
                            items: 1
                        },
                        768: {
                            items: 2
                        },
                        960: {
                            items: 2
                        },
                        1200: {
                            items: 3
                        },
                        1920: {
                            items: 3
                        }
                    }
                });
            }
            
        /*---------------------------
            testimonial carousel Two
        ---------------------------*/
        var $TestimonialCarousel = $('.testimonial-carousel-two');
        if ($TestimonialCarousel.length > 0) {
            $TestimonialCarousel.owlCarousel({
                loop: true,
                autoplay: true,  // Enable autoplay
                autoPlayTimeout: 1000,
                margin: 30,
                dots: false,  // Disable dots
                nav: true,  // Enable navigation arrows
                navText: ['<div class="nav-arrow nav-left"><i class="fa fa-angle-left"></i></div>', '<div class="nav-arrow nav-right"><i class="fa fa-angle-right"></i></div>'],
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                responsive: {
                    0: {
                        items: 1
                    },
                    460: {
                        items: 1
                    },
                    599: {
                        items: 1
                    },
                    768: {
                        items: 1
                    },
                    960: {
                        items: 1
                    },
                    1200: {
                        items: 1
                    },
                    1920: {
                        items: 1
                    }
                }
            });
        }
        
        /*---------------------------
            testimonial carousel Two
        ---------------------------*/
        var $TestimonialCarousel = $('.testimonial-carousel-three');
        if ($TestimonialCarousel.length > 0) {
            $TestimonialCarousel.owlCarousel({
                loop: true,
                autoplay: true, //true if you want enable autoplay
                autoPlayTimeout: 1000,
                margin: 30,
                items: 2,
                dots: false,
                nav: false,
                navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                responsive: {
                    0: {
                        items: 1
                    },
                    460: {
                        items: 1
                    },
                    599: {
                        items: 1
                    },
                    768: {
                        items: 1
                    },
                    960: {
                        items: 2
                    },
                    1200: {
                        items: 2
                    },
                }
            });
        }

    });


    //define variable for store last scrolltop
    var lastScrollTop = '';

    $(window).on('scroll', function() {

        //back to top show/hide
        var ScrollTop = $('.back-to-top');
        if ($(window).scrollTop() > 1000) {
            ScrollTop.fadeIn(1000);
        } else {
            ScrollTop.fadeOut(1000);
        }

        // Sticky-Memu
        if ($(window).width() > 991) {
            StickyMenu();
        }



    });


    $(window).on('resize', function() {
        /*-------------------------------
            Navbar Fix
        ------------------------------*/
        if ($(window).width() < 991) {
            navbarFix()
        }
    });


    $(window).on('load', function() {

        /*-----------------
            preloader
        ------------------*/
        var preLoder = $("#preloader");
        preLoder.fadeOut(1000);

        /*-----------------
            back to top
        ------------------*/
        var backtoTop = $('.back-to-top')
        backtoTop.fadeOut();

    });

    function navbarFix() {
        $(document).on('click', '.navbar-area .navbar-nav li.menu-item-has-children>a, .navbar-area .navbar-nav li.appside-megamenu>a', function(e) {
            e.preventDefault();
        })
    }

    function StickyMenu() {
        var scrollPosition = $(window).scrollTop();
        var mainMenuTop = $('.navbar-area');
    
        if (scrollPosition > 100) {
            mainMenuTop.addClass('nav-fixed');
        } else {
            mainMenuTop.removeClass('nav-fixed');
        }
    }

    
  



})(jQuery);