
let gigs = [
   {
        "date": "01-07-2022",
        "venue": "Camper Jam",
        "city": "Shropshire",
        "location": "England",
        "ticket_link": "https://www.camperjam.com/tickets/"
   },
   {
        "date": "15-07-2022",
        "venue": "Napton Festival",
        "city": "Warwicksire",
        "location": "England",
        "ticket_link": "https://naptonfestival.co.uk/tickets.php"
    },
    {
        "date": "12-07-2022",
        "venue": "Todd in the Hole",
        "city": "Stevenage",
        "location": "England",
        "ticket_link": "https://toddinthehole.ticketline.co.uk/"
   },
   {
        "date": "30-07-2022",
        "venue": "BFest",
        "city": "Braithwell",
        "location": "England",
        "ticket_link": "https://bfestbraithwell.com/product/bfest-2022-ticket/"
    },
    {
        "date": "06-07-2022",
        "venue": "Rock the Park",
        "city": "Wrexham",
        "location": "Wales",
        "ticket_link": "https://www.rockthepark.co.uk/tickets"
   },
   {
        "date": "12-08-2022",
        "venue": "Gloworm Festival",
        "city": "Newark",
        "location": "England",
        "ticket_link": "https://www.gigantic.com/gloworm-festival-tickets"
    },
    {
        "date": "28-08-2022",
        "venue": "Sommerset Tribute Festival",
        "city": "Yeovil",
        "location": "England",
        "ticket_link": "https://www.eventbrite.co.uk/e/somerset-tribute-festival-2022-tickets-246885730867"
    },
    {
        "date": "10-09-2022",
        "venue": "Whitwell Festival",
        "city": "Derbyshire",
        "location": "England",
        "ticket_link": "https://www.whitwellfestivalofmusic.org.uk/shop"
    },
    {
        "date": "08-10-2022",
        "venue": "Milton Rooms",
        "city": "Yorkshire",
        "location": "England",
        "ticket_link": "https://themiltonrooms.com/event/the-killerz/"
    },
    {
        "date": "26-11-2022",
        "venue": "The Formum Music Centre",
        "city": "Darlington",
        "location": "England",
        "ticket_link": ""
    },

]

format = [

    {
        "date": "DD-MM-YYYY",
        "venue": "XXX",
        "city": "XXX",
        "location": "XXX",
        "ticket_link": ""
    },

]

var today = new Date();

$(window).on('load', function () {
    getTableData();
    getMarqueeData();
    $(".loader-wrapper").fadeOut("slow");
});

function sortByDate(arr) {
    const sorter = (a, b) => {
       return new Date.parse(a.date).getTime() - new Date.parse(b.date).getTime();
    };
    arr["DATA"].sort(sorter);
    return arr;
};


function getTableData() {

    let gigHtml = '';

    for (x in gigs) {
        let gig = gigs[x]

        var dateParts = gig.date.split("-");
        var dateFormat = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        var gigDate =  new Date(dateFormat);

        if (gigDate > today) {
            gigHtml += `
                <tr>
                    <td class="t-date">
                        ${convertDate(gigDate)}
                    </td>
                    <td class="t-name">
                        ${gig.venue}<br>
                        <div id="breaker"><hr></div>
                    </td>
                    <td class="t-subname">
                        ${gig.city}
                        <br>
                        <p class="t-subname2">
                            ${gig.location}
                        </p>
                    </td>
                `;
                if (gig.ticket_link) {
                    gigHtml += `
                            <td>
                                <button class="table-btn" onclick="window.open('${gig.ticket_link}' + location.search)">
                                    BOOK NOW
                                </button>
                            </td>
                        </tr>
                    `;
                } else {
                    gigHtml += `
                        <td>
                            <button class="table-btn" disabled>
                                COMING SOON
                            </button>
                        </td>
                    </tr>
                `;}
        } else {
            continue
        }
    }
    $("#gig-table").html(gigHtml)

};

function getMarqueeData() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                  'August', 'September', 'October', 'November', 'December'];

    let marqueeText = '<h7><strong>Upcoming tour dates:</strong></h7>\
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    const lineBreak = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

    for (x in gigs) {
        let gig = gigs[x]

        var dateParts = gig.date.split("-");
        var dateFormat = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        var gigDate =  new Date(dateFormat);

        var fullDate = `${days[gigDate.getDay()]} ${gigDate.getDate()}th \
                        ${months[gigDate.getMonth()]} ${gigDate.getFullYear()} `

        if (gigDate > today) {
            marqueeText += `${fullDate} - ${gig.venue}, ${gig.city}`
            marqueeText += lineBreak
        } else {
            continue
        }
    }
    $("#marquee-text").html(marqueeText)

};

function convertDate(s) {
    return s.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
  }

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

    if (validate()) {

        // TODO: Add form logic

        action="contact.php">
        e.preventDefault();
    }

});

function isValidURL(string) {
    if (new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test
        (string) || !$('#email').val().includes("http")) {
        return true
    }
    return false
};

function validate() {
    var acceptedDomains = ['.com', '.co.uk'];

    var dummy = $('#nice-try').val() == ''
    var email = (new RegExp(acceptedDomains.join('|')).test($('#email').val()))

    var message = isValidURL($('#message').val());

    if (dummy && email && !message) {
        return true
    }
    return false
};

$('#submit_btn').on('click', function () {
    $('#dialog').dialog({
        title: 'Disconnect User',
        width: '400px',
        modal: true
    });
})


$('#view-more-btn').on('click', function () {
    if ($(window).width() < 800) {
        $('.gallery').css('height', 'auto');
    }
    else {
        $('.gallery').css('height', '2700px');
    }
    $('.btn-container').toggle()
});


$('.band-info').hover(function() {
    bandName = $(this).attr('id')
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




