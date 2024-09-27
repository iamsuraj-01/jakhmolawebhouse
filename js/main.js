(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Typed Initiate
if ($('.typed-text-output').length == 1) {
    // Extract text and icon data
    var typed_strings = $('.typed-text').text().split(', ');
    var icon_classes = [
        'fas fa-code',
        'fas fa-bullhorn',
        'fas fa-user-graduate',
        'fas fa-bullseye',
        'fas fa-share-alt',
        'fas fa-wallet'
    ];    

    // Combine text and icons into HTML strings with inline styles
    var combined_strings = typed_strings.map(function(text, index) {
        return '<i class="' + icon_classes[index].trim() + '" style="color: #FFC448;"></i> ' + text;
    });

    // Initialize Typed.js with HTML contentType
    var typed = new Typed('.typed-text-output', {
        strings: combined_strings,
        typeSpeed: 100,
        backSpeed: 20,
        smartBackspace: false,
        loop: true,
        contentType: 'html'  // Enable HTML rendering
    });
}


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});

    // Portfolio isotope and filter
    $(window).on('load', function () {
        // Initialize Isotope after all images have loaded
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });
    
        // Filter items on click
        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('active');
            $(this).addClass('active');
    
            portfolioIsotope.isotope({ filter: $(this).data('filter') });
        });
    });

    // Testimonials carousel
    var owl = $(".testimonial-carousel").owlCarousel({
        autoplay: false, // Disable autoplay to control manually
        smartSpeed: 1000, // Speed of the transition
        items: 1, // Display one item at a time
        loop: true, // Enable looping
        dots: true, // Enable dots for navigation
        animateOut: 'fadeOut', // Add fade out effect
        animateIn: 'fadeIn' // Add fade in effect
    });

    // Click event for left images
    $('.testimonial-left .image-wrapper').click(function() {
        var index = $(this).index(); // Get the index of the clicked wrapper
        owl.trigger('to.owl.carousel', [index, 300]); // Go to the corresponding testimonial
    });

    // Click event for right images
    $('.testimonial-right .image-wrapper').click(function() {
        var index = $(this).index() + 3; // Get the index of the clicked wrapper and offset by 3
        owl.trigger('to.owl.carousel', [index, 300]); // Go to the corresponding testimonial
    });

    // Course
    $(document).ready(function() {
        $("#enrollForm").on("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission
    
            const fullName = $("input[name='name']").val();
            const email = $("input[name='email']").val();
            const phone = $("input[name='phone']").val();
            const course = $("select[name='course']").val();
            const query = $("textarea[name='query']").val(); // New field for user query
    
            // Create an array for the message lines
            const messageLines = [
                `Course Enrollment Request:`,
                `Name:               ${fullName}`,
                `Email:              ${email}`,
                `Phone:              ${phone}`,
                `Course:             ${course}`,
                `Query:              ${query}` // Include the query in the WhatsApp message
            ];
    
            // Join the message lines with line breaks
            const message = messageLines.join('\n');
    
            // Detect if the user is on mobile or desktop
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const whatsappUrl = isMobile 
                ? `https://wa.me/8477924401?text=${encodeURIComponent(message)}`  // Mobile link
                : `https://web.whatsapp.com/send?phone=8477924401&text=${encodeURIComponent(message)}`; // WhatsApp Web link
    
            // Open WhatsApp link
            window.open(whatsappUrl, '_blank');
    
            // Insert the selected course name in the thank you modal
            $("#selectedCourse").text(course);
    
            // Close the enrollment modal
            var enrollModal = bootstrap.Modal.getInstance(document.getElementById('enrollModal'));
            enrollModal.hide();
    
            // Show the thank you modal after the enrollment modal is hidden
            $('#thankYouModal').modal('show');
        });
    });

    // Contact Us
    $(document).ready(function() {
        $("#contactForm").on("submit", function(event) {
            event.preventDefault(); // Prevent the default form submission

            const fullName = $("input[name='name']").val();
            const email = $("input[name='email']").val();
            const phone = $("input[name='phone']").val();
            const userMessage = $("textarea[name='message']").val();

            // Create an array for the message lines
            const messageLines = [
                `Contact Request:`,
                `Name:     ${fullName}`,
                `Email:    ${email}`,
                `Phone:    ${phone}`,
                `Message:  ${userMessage}`
            ];

            // Join the message lines with line breaks
            const message = messageLines.join('\n');

            // Detect if the user is on mobile or desktop
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const whatsappUrl = isMobile 
                ? `https://wa.me/8477924401?text=${encodeURIComponent(message)}`  // Mobile link
                : `https://web.whatsapp.com/send?phone=8477924401&text=${encodeURIComponent(message)}`; // WhatsApp Web link

            // Open WhatsApp link
            window.open(whatsappUrl, '_blank');

            // Show the thank you modal
            $('#contactthankYouModal').modal('show');
        });
    });

})(jQuery);
