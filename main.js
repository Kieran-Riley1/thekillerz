$(window).on('load', function () {
    $(".loader-wrapper").fadeOut("slow");
});

// Navbar
let header = document.querySelector('.header');

window.addEventListener('scroll', function(){
    let windowPos = window.scrollY > 0;
    header.classList.toggle('active', windowPos)
})


$('.span').on('click', function () {
    header.classList.toggle('nav-menu-open');
    $('#marquee').toggle()
})
$('.nav-link').on('click', function () {
    header.classList.toggle('nav-menu-open');
    $('#marquee').hide()
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

$('.band-info').hover(function() {
    bandName = $(this).attr('id')
    console.log(bandName)
    $(`#${bandName}-info`).slideDown("slow");
}, function(){
    bandName = $(this).attr('id')
    $(`#${bandName}-info`).toggle();
})

$('.band-info').on('click', function() {
    bandName = $(this).attr('id')
    $(`#${bandName}-info`).toggle();
})


var mikeHTML = `
    <div class="band-member" id="mike-info" hidden>
        <div class="form">
            <div class="form-row">
                <div class="form-column">
                    <img src="images/mike3.jpg" style="width: 100%;">
                </div>
                <div class="form-column">
                    <div class="about-us-text">
                        <h1>Mike</h1><br>
                        <p>
                            Mike has always had a huge passion for music. Starting off singing musical theatre and contemporary music, going on to pass all of his grades with a distinction.
                            Since then he has been a solo performer and part of many different bands covering most genres at a pro level.
                            <br>
                            Mike also writes his own original music and has a large following on his iTunes and YouTube accounts. Mike's passion for music and love of The Killers is obvious
                            to all when he’s up on stage performing with The Killerz.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    </div>

`
var aidenHTML = `
    <div class="band-member" id="aiden-info" hidden>
        <div class="form">
            <div class="form-row">
                <div class="form-column">
                    <img src="images/AIDEN2.jpg" style="width: 100%;">
                </div>
                <div class="form-column">
                    <div class="about-us-text">
                        <h1>AIDEN</h1><br>
                        <p>
                            Aiden first started learning to play the drums at the age of 7, showing a natural talent for it. He went on to study Pop Music & Music Technology at Wolverhampton
                            University, passing his grade 8 exam.
                            <br>
                            Aiden has drummed in various local bands up until he joined The Killerz and has made his mark on the band with his drumming and technical skills over the years.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    </div>

`

var lewisHTML = `
    <div class="band-member" id="lewis-info" hidden>
        <div class="form">
            <div class="form-row">
                <div class="form-column">
                    <img src="images/LEWIS2.jpg" style="width: 100%;">
                </div>
                <div class="form-column">
                    <div class="about-us-text">
                        <h1>LEWIS</h1><br>
                        <p>
                            Music runs through Lewis’ blood. He learnt saxophone whilst at junior school and keyboard throughout high school, reaching grade 4. It was at the age of 17 that he started learning guitar, taking lessons and even being taught by legendary Killerz guitarist Paul Humphreys for a while before deciding to teach himself.
                            <br>
                            Lewis played in an originals college band before forming rock band Speaking in Shadows that he and band mate Sam played in for 8 years.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    </div>

`

var samHTML = `
    <div class="band-member" id="sam-info" hidden>
        <div class="form">
            <div class="form-row">
                <div class="form-column">
                    <img src="images/sam1.jpg" style="width: 100%;">
                </div>
                <div class="form-column">
                    <div class="about-us-text">
                        <h1>SAM</h1><br>
                        <p>
                            Sam started playing bass at the age of 13. He studied music at school but has no formal training instead teaching himself everything he knows.
                            <br>
                            Sam played in various Midlands based rock bands throughout his teenage years. From 2010-2018 he played bass in successful unsigned band Speaking in Shadows with bandmate Lewis.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    </div>

`

$(window).on("load resize",function(e){
    if ($(window).width() <= 780) {
        $('#select-1').append(mikeHTML)
        $('#select-2').append(aidenHTML)
        $('#select-3').append(lewisHTML)
        $('#select-4').append(samHTML)
    } else {
        $('.toggle').toggle()
        $('#main-web').html(`
            ${mikeHTML}
            ${aidenHTML}
            ${lewisHTML}
            ${samHTML}
        `)
    }
})





