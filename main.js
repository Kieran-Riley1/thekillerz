

let gigs = [
  {
    "date": "30-01-2026",
    "venue": "HMV Empire",
    "city": "Coventry",
    "location": "England",
    "ticket_link": "https://www.eventim.co.uk/event/the-killerz-hmv-empire-coventry-20481516/"
  },
  {
    "date": "31-01-2026",
    "venue": "Tenby De Valence Pavilion",
    "city": "Tenby",
    "location": "Wales",
    "ticket_link": "https://www.devalencepavilion.com/event-details-registration/the-killerz"
  },
  {
    "date": "21-02-2026",
    "venue": "Queens Hall",
    "city": "Nuneaton",
    "location": "England",
    "ticket_link": "https://www.universe.com/events/the-killerz-world-leading-tribute-to-the-killers-tickets-CS5B1T?ref=share-widget-buffer"
  },
  {
    "date": "28-02-2026",
    "venue": "The Old Fire Station",
    "city": "Carlisle",
    "location": "England",
    "ticket_link": "https://www.skiddle.com/whats-on/Carlisle/Old-Fire-Station/The-Killerz/41274928/"
  },
  {
    "date": "21-03-2026",
    "venue": "The Old Woollen",
    "city": "Farsley",
    "location": "England",
    "ticket_link": "https://www.seetickets.com/event/the-killerz/the-old-woollen/3332384"
  },
  {
    "date": "25-04-2026",
    "venue": "Binks Yard",
    "city": "Nottingham",
    "location": "England",
    "ticket_link": "https://www.skiddle.com/whats-on/Nottingham/Binks-Yard/Coldplace--Binks-Yard/41592431/"
  },
  {
    "date": "23-05-2026",
    "venue": "Bromsgrove",
    "city": "Bromsgrove",
    "location": "England",
    "ticket_link": "https://www.skiddle.com/whats-on/Birmingham/Bromsgrove-Rugby-Football-Club/Bromsgrove-Tribute-Festival-2026/41652138/"
  },
  {
    "date": "13-06-2026",
    "venue": "Earlham Park Tribute Festival",
    "city": "Norwich",
    "location": "England",
    "ticket_link": "https://www.skiddle.com/whats-on/Norwich/Earlham-Park/Earlham-Park-Tribute-Festival/41483346/"
  },
  {
    "date": "20-06-2026",
    "venue": "Binks Yard",
    "city": "Nottingham",
    "location": "England",
    "ticket_link": "https://www.skiddle.com/whats-on/Nottingham/Binks-Yard/"
  },
  {
    "date": "27-06-2026",
    "venue": "To be Announced",
    "city": "TBA",
    "location": "England",
    "ticket_link": ""
  },
  {
    "date": "28-06-2026",
    "venue": "Replika",
    "city": "Catton",
    "location": "England",
    "ticket_link": "https://ontick.co.uk/event/replika"
  },
  {
    "date": "15-08-2026",
    "venue": "Dewent Fest",
    "city": "Derwent Reservoir",
    "location": "England",
    "ticket_link": "https://bookwhen.com/derwent-fest"
  },
  {
    "date": "30-08-2026",
    "venue": "Get the Covers on",
    "city": "Stockton",
    "location": "England",
    "ticket_link": "https://www.ticketebo.co.uk/stockton-cc/get-the-covers-on-2026"
  },
  {
    "date": "19-09-2026",
    "venue": "The Music Forum",
    "city": "Darlington",
    "location": "England",
    "ticket_link": "https://theforumonline.co.uk/all-events"
  },
  {
    "date": "23-10-2026",
    "venue": "Tropic at Ruislip",
    "city": "Ruislip",
    "location": "England",
    "ticket_link": "https://www.tropicatruislip.co.uk/i-have-never-booked-before.html"
  },
  {
    "date": "21-11-2026",
    "venue": "Accrington MMC Charity Event",
    "city": "Accrington",
    "location": "England",
    "ticket_link": ""
  },
  {
    "date": "12-12-2026",
    "venue": "Eleven",
    "city": "Stoke on Trent",
    "location": "England",
    "ticket_link": ""
  },
  {
    "date": "13-12-2026",
    "venue": "Replika",
    "city": "Catton",
    "location": "England",
    "ticket_link": ""
  }
];



  // Example
  format = [
    {
      "date": "DD-MM-YYYY",
      "venue": "XXX",
      "city": "XXX",
      "location": "XXX",
      "ticket_link": ""
    },
  ]


// Utility functions
const convertDate = (date) => {
    return date.toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(year, month - 1, day);
};

// DOM ready function
$(document).ready(() => {
    getTableData();
    getMarqueeData();
    setupEventListeners();
});

// Sorts gigs by date
const sortByDate = (gigs) => gigs.sort((a, b) => parseDate(a.date) - parseDate(b.date));

// Generates HTML for gig cards
const getTableData = () => {
    let gigHtml = '';
    const today = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    sortByDate(gigs).forEach(gig => {
        const gigDate = parseDate(gig.date);
        if (gigDate < today) return;

        const day = gigDate.getDate();
        const month = months[gigDate.getMonth()];
        const year = gigDate.getFullYear();
        const weekday = weekdays[gigDate.getDay()];

        const cta = gig.ticket_link
            ? `<a href="${gig.ticket_link}" target="_blank" rel="noopener" class="gig-cta gig-cta--book">
                   Book Now
                   <i class="fa-solid fa-arrow-right ml-2"></i>
               </a>`
            : `<span class="gig-cta gig-cta--soon">Coming Soon</span>`;

        gigHtml += `
            <article class="gig-card">
                <div class="gig-date">
                    <span class="gig-date__day">${day}</span>
                    <span class="gig-date__month">${month}</span>
                    <span class="gig-date__year">${weekday} ${year}</span>
                </div>
                <div class="gig-info">
                    <h3 class="gig-venue">${gig.venue}</h3>
                    <p class="gig-location">
                        <i class="fa-solid fa-location-dot mr-1.5 text-white/50"></i>
                        ${gig.city}, ${gig.location}
                    </p>
                </div>
                <div class="gig-action">
                    ${cta}
                </div>
            </article>
        `;
    });
    $("#gig-table").html(gigHtml);
};

// Generates marquee text for upcoming tour dates (CSS-animated ticker)
const getMarqueeData = () => {
    const today = new Date();
    const parts = ['<strong>Upcoming tour dates</strong>'];

    sortByDate(gigs).forEach(gig => {
        const gigDate = parseDate(gig.date);
        if (gigDate > today) {
            const fullDate = gigDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
            parts.push(`${fullDate} — ${gig.venue}, ${gig.city}`);
        }
    });

    const html = parts.join(' &nbsp; • &nbsp; ') + ' &nbsp; • &nbsp; ';
    $("#marquee-text").html(html);
    $("#marquee-text-clone").html(html);
};


// Sets up event listeners for user interactions
const setupEventListeners = () => {

    // Navbar listener
    const header = document.querySelector('.header');

    // Toggle navbar class based on scroll position
    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 0;
        header.classList.toggle('active', isScrolled);
    });

    // Toggle navigation menu open/close on clicking the menu icon
    $('.span').on('click', () => {
        header.classList.toggle('nav-menu-open');
    });

    // Close the navigation menu when a link is clicked
    $('.nav-link').on('click', () => {
        header.classList.remove('nav-menu-open');
    });



    // Sticky marquee on scroll
    $(window).on('scroll', () => {
        $('#marquee').toggleClass('fixed', $(document).scrollTop() > 0);
    });



    // Form submission
    $('#submit_btn').on('click', function () {
        if (validate()) {
            $.ajax({
                url: './contact.php',
                type: 'POST',
                data: {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                    date: $('#date').val(),
                    message: $('#message').val(),
                },
                success: () => {
                    $('#form').slideToggle();
                    $('#success').slideToggle();
                },
                error: () => console.log('error'),
            });
        }
    });


    $('#view-more-btn').on('click', function(e) {
        e.preventDefault(); // Prevent default action if it's a link or a submit button
        // showMoreGigs();
        $('.gallery').css('height', 'auto');
        $('.btn-container').toggle()

        // Optionally, hide the "View More" button if there are no more gigs to show
        if ($('.hidden-gig').length === 0) {
            $(this).hide();
        }
    });

    // Scroll-triggered reveal animations
    const revealEls = document.querySelectorAll('.reveal, .section-head, .reveal-stagger, footer');
    if ('IntersectionObserver' in window && revealEls.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
        revealEls.forEach(el => io.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('is-visible'));
    }

    // Footer copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Auto-hide scrollbar: show only while actively scrolling
    let scrollTimer;
    const htmlEl = document.documentElement;
    window.addEventListener('scroll', () => {
        htmlEl.classList.add('is-scrolling');
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => htmlEl.classList.remove('is-scrolling'), 800);
    }, { passive: true });
};



// Validation function
const validate = () => {
    const acceptedDomains = ['.com', '.co.uk'];
    const email = $('#email').val();
    const message = $('#message').val();

    return $('#nice-try').val() === '' && new RegExp(acceptedDomains.join('|')).test(email) && message;
};
