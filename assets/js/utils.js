/**
 * Created by Joel on 22/08/2016.
 */

$(document).on('click', 'a[href*="#"]:not([href="#"])', function(e) {

    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {

        var target = $(this.hash);

        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        if (target.length) {

            $('html, body').animate({

                scrollTop: target.offset().top

            }, 1000);

            e.preventDefault();

        }

    }

});