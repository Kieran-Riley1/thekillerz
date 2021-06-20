$(window).on('load', function () {
    $(".loader-wrapper").fadeOut("slow");
});

// Navbar
let header = document.querySelector('.header');
let span = document.querySelector('.span');

window.addEventListener('scroll', function(){
    let windowPos = window.scrollY > 0;
    header.classList.toggle('active', windowPos)
})

span.addEventListener('click', function () {
    header.classList.toggle('nav-menu-open');
    $('#marquee').toggle()
})

// Marquee
window.addEventListener('scroll', function(){
    if ($(document).scrollTop() > 0) {
        $('#marquee').addClass('fixed')
    } else {
        $('#marquee').removeClass('fixed')
    }

});

$(function () {
    $("#gall-img").slice(0, 10).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $("gall-img:hidden").slice(0, 4).slideDown();
        if ($("gall-img:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
});

$('form').on('submit', function(e) {

    var dataString = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "thekillerz.php",
      data: dataString,
      success: function () {
        $("form").html("<div id='message'></div>");
        $("#message")
          .html("<h2>Contact Form Submitted!</h2>")
          .append("<p>We will be in touch soon.</p>")
          .hide()
          .fadeIn(1500, function () {
            $("#message").append(
              "<img id='checkmark' src='images/check.png' />"
            );
          });
      }
    });

    e.preventDefault();

});

