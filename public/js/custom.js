// Page loading animation
$(window).on('load', function () {

    $('#js-preloader').addClass('loaded');

});


// Page loading animation
$(window).on('load', function () {

    $("#preloader").animate({
        'opacity': '0'
    }, 600, function () {
        setTimeout(function () {
            $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
    });
});

