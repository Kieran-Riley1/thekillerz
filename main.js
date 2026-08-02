let gigs = [];

// Gigs live in gigs.json so a date can be added without touching this file.
const loadGigs = () => $.getJSON('gigs.json')
    .done((data) => { gigs = data; })
    .fail(() => console.error('Could not load gigs.json'));

// To add a gig, copy this shape into the list above:
// { "date": "DD-MM-YYYY", "venue": "", "city": "", "location": "", "ticket_link": "" }

const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(year, month - 1, day);
};

// "Tenby, Wales" is worth saying; "Coventry, England" is just noise.
const placeOf = (gig) => gig.location === 'England' ? gig.city : `${gig.city}, ${gig.location}`;

// DOM ready function
$(document).ready(() => {
    setupEventListeners();

    loadGigs().always(() => {
        getTableData();
        getMarqueeData();
        renderEventSchema();
    });
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
                   Tickets
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
                        ${placeOf(gig)}
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

// Publishes the tour dates as structured data so search engines can list them as events.
const renderEventSchema = () => {
    const today = new Date();
    const upcoming = sortByDate(gigs).filter(gig => parseDate(gig.date) >= today);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'MusicGroup',
        name: 'The Killerz',
        description: "The UK's No 1 tribute to The Killers.",
        url: 'https://www.thekillerz.co.uk/',
        email: 'info@thekillerz.co.uk',
        sameAs: [
            'https://www.facebook.com/killerstribute/',
            'https://www.instagram.com/killerstribute/',
            'https://www.tiktok.com/@killerstribute',
            'https://www.youtube.com/channel/UCoEnQkjtg8qYyPMfEy3j0LQ'
        ],
        event: upcoming.map(gig => {
            const [day, month, year] = gig.date.split('-');
            return {
                '@type': 'MusicEvent',
                name: `The Killerz at ${gig.venue}`,
                startDate: `${year}-${month}-${day}`,
                eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
                performer: { '@type': 'MusicGroup', name: 'The Killerz' },
                location: {
                    '@type': 'Place',
                    name: gig.venue,
                    address: {
                        '@type': 'PostalAddress',
                        addressLocality: gig.city,
                        addressRegion: gig.location,
                        addressCountry: 'GB'
                    }
                },
                ...(gig.ticket_link ? { offers: { '@type': 'Offer', url: gig.ticket_link, availability: 'https://schema.org/InStock' } } : {})
            };
        })
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
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
    const menuButton = document.querySelector('.span');

    const setMenu = (open) => {
        header.classList.toggle('nav-menu-open', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    $('.span').on('click', () => setMenu(!header.classList.contains('nav-menu-open')));
    $('.nav-link').on('click', () => setMenu(false));
    $(document).on('keydown', (e) => {
        if (e.key === 'Escape') setMenu(false);
    });



    // Sticky marquee on scroll
    $(window).on('scroll', () => {
        $('#marquee').toggleClass('fixed', $(document).scrollTop() > 0);
    });



    // Form submission — bound to submit so Enter/Go on a phone keyboard works too
    $('#form').on('submit', function (event) {
        event.preventDefault();
        const problem = firstProblem();

        if (problem) {
            showFormError(problem.message);
            $(problem.field).trigger('focus');
            return;
        }

        hideFormError();
        $('#submit_btn').prop('disabled', true).find('span').text('Sending');

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
            error: () => {
                $('#submit_btn').prop('disabled', false).find('span').text('Send Message');
                showFormError('That didn\'t send. Please email info@thekillerz.co.uk instead.');
            },
        });
    });


    $('#view-more-btn').on('click', () => {
        $('.gallery').css('height', 'auto');
        $('#gallery-fade').hide();
        $('.btn-container').hide();
    });

    setupGalleryReveal();
    setupViewer();

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
        }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
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



// Each photo fades up once its file has actually decoded, so nothing pops in half-drawn.
const setupGalleryReveal = () => {
    const links = document.querySelectorAll('.example-image-link');

    if (!('IntersectionObserver' in window)) {
        links.forEach(link => link.classList.add('is-loaded'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (!entry.isIntersecting) return;

            const link = entry.target;
            const image = link.querySelector('img');
            const show = () => setTimeout(() => link.classList.add('is-loaded'), index * 70);

            if (image.complete) show();
            else image.addEventListener('load', show, { once: true });

            observer.unobserve(link);
        });
    }, { rootMargin: '0px 0px 10% 0px' });

    links.forEach(link => observer.observe(link));
};

// Full-screen gallery viewer: arrows, swipe, Esc, and the photographer credit.
const setupViewer = () => {
    const links = [...document.querySelectorAll('.example-image-link')];
    if (!links.length) return;

    const viewer = document.createElement('div');
    viewer.className = 'viewer';
    viewer.hidden = true;
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-label', 'Photo viewer');
    viewer.innerHTML = `
        <p class="viewer__count"></p>
        <button type="button" class="viewer__btn viewer__btn--close" aria-label="Close viewer">
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>
        <button type="button" class="viewer__btn viewer__btn--prev" aria-label="Previous photo">
            <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
        </button>
        <button type="button" class="viewer__btn viewer__btn--next" aria-label="Next photo">
            <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
        </button>
        <figure class="viewer__figure">
            <img class="viewer__img" alt="">
            <figcaption class="viewer__caption"></figcaption>
        </figure>`;
    document.body.appendChild(viewer);

    const image = viewer.querySelector('.viewer__img');
    const caption = viewer.querySelector('.viewer__caption');
    const count = viewer.querySelector('.viewer__count');
    let current = 0;
    let opener = null;

    const preload = (index) => {
        const link = links[(index + links.length) % links.length];
        new Image().src = link.getAttribute('href');
    };

    // Most photos carry the band name as their title; only credits are worth showing.
    const creditOf = (link) => {
        const title = link.dataset.title || '';
        return title.includes('The UK\'s No 1 Tribute') ? '' : title;
    };

    const render = () => {
        const link = links[current];
        image.src = link.getAttribute('href');
        image.alt = link.querySelector('img').alt;
        caption.innerHTML = creditOf(link);
        count.textContent = `${current + 1} / ${links.length}`;
        preload(current + 1);
        preload(current - 1);
    };

    const goTo = (index) => {
        current = (index + links.length) % links.length;
        viewer.classList.add('is-swapping');
        setTimeout(() => {
            render();
            viewer.classList.remove('is-swapping');
        }, 180);
    };

    const open = (index) => {
        opener = links[index];
        current = index;
        render();
        viewer.hidden = false;
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => viewer.classList.add('is-open'));
        viewer.querySelector('.viewer__btn--close').focus();
    };

    const close = () => {
        viewer.classList.remove('is-open');
        document.body.style.overflow = '';
        setTimeout(() => { viewer.hidden = true; }, 220);
        if (opener) opener.focus();
    };

    links.forEach((link, index) => link.addEventListener('click', (event) => {
        event.preventDefault();
        open(index);
    }));

    viewer.querySelector('.viewer__btn--close').addEventListener('click', close);
    viewer.querySelector('.viewer__btn--prev').addEventListener('click', () => goTo(current - 1));
    viewer.querySelector('.viewer__btn--next').addEventListener('click', () => goTo(current + 1));

    viewer.addEventListener('click', (event) => {
        if (event.target === viewer || event.target.classList.contains('viewer__figure')) close();
    });

    document.addEventListener('keydown', (event) => {
        if (viewer.hidden) return;
        if (event.key === 'Escape') close();
        if (event.key === 'ArrowLeft') goTo(current - 1);
        if (event.key === 'ArrowRight') goTo(current + 1);
    });

    let touchStartX = null;
    viewer.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    viewer.addEventListener('touchend', (e) => {
        if (touchStartX === null) return;
        const distance = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(distance) > 50) goTo(current + (distance < 0 ? 1 : -1));
        touchStartX = null;
    }, { passive: true });
};

const showFormError = (message) => $('#form-error').text(message).prop('hidden', false);
const hideFormError = () => $('#form-error').prop('hidden', true);

// Returns the first thing stopping the enquiry from being sent, or null.
const firstProblem = () => {
    if ($('#nice-try').val() !== '') return { field: '#nice-try', message: '' };

    const required = [
        ['#name', 'Please add your name.'],
        ['#email', 'Please add an email address so we can reply.'],
        ['#phone', 'Please add a phone number.'],
        ['#date', 'Please add the date of your event.'],
        ['#message', 'Please tell us a little about your event.'],
    ];

    const empty = required.find(([field]) => !$(field).val().trim());
    if (empty) return { field: empty[0], message: empty[1] };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test($('#email').val().trim())) {
        return { field: '#email', message: 'That email address doesn\'t look right.' };
    }

    return null;
};
