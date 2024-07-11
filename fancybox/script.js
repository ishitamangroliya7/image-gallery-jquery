$(document).ready(function () {
    $('.folder').on('click', function () {
        var folderId = $(this).attr('id');
        if (folderId === 'folder1') {
            window.location.href = 'fancybox.html';
        } else if (folderId === 'folder2') {
            window.location.href = 'fancybox2.html';
        } else if (folderId === 'folder3') {
            window.location.href = 'fancybox3.html';
        }
    });

    const toggleClass = 'is-sticky';
    $(window).on('scroll', function () {
        $('.page-header').toggleClass(toggleClass, $(document).scrollTop() > 10);
    });

    var modal = $('#myModal');
    var modalImg = $('.modal-image');
    var thumbnails = $('.thumbnail');
    var closeBtn = $('.close');
    var currentIndex = 0;
    var imageCounter = $('#imageCounter');
    var autoplayInterval;
    var isAutoplaying = false;

    $('.slide img').on('click', function () {
        currentIndex = $(this).parent().index();
        showImage(currentIndex);
        modal.show();
    });

    closeBtn.on('click', function () {
        modal.hide();
        stopAutoplay();
    });

    $('#prev').on('click', function () {
        currentIndex = (currentIndex === 0) ? modalImg.length - 1 : currentIndex - 1;
        showImage(currentIndex);
    });

    $('#next').on('click', function () {
        currentIndex = (currentIndex === modalImg.length - 1) ? 0 : currentIndex + 1;
        showImage(currentIndex);
    });

    $('#autoplayBtn').on('click', function () {
        if (isAutoplaying) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    });

    $('#prev, #next').on('mousedown', function () {
        if (isAutoplaying) {
            stopAutoplay();
            startAutoplay();
        }
    });

    function startAutoplay() {
        isAutoplaying = true;
        $('#autoplayBtn').html(`<i class="fa-solid fa-pause"></i>`);
        autoplayInterval = setInterval(function () {
            $('#next').click();
        }, 3000);
    }

    function stopAutoplay() {
        isAutoplaying = false;
        $('#autoplayBtn').html(`<i class="fa-solid fa-play"></i>`);
        clearInterval(autoplayInterval);
    }

    function showImage(index) {
        modalImg.removeClass('active');
        thumbnails.removeClass('active-thumb');
        modalImg.eq(index).addClass('active');
        thumbnails.eq(index).addClass('active-thumb');
        updateCounter(index + 1, modalImg.length);
    }

    function updateCounter(current, total) {
        imageCounter.text(current + " / " + total);
    }

    $(document).on('keydown', function (e) {
        if (e.key === "Escape") {
            modal.hide();
            stopAutoplay();
            startAutoplay();
        } else if (e.key === "ArrowLeft") {
            $('#prev').click();
            stopAutoplay();
            startAutoplay();
        } else if (e.key === "ArrowRight") {
            $('#next').click();
            stopAutoplay();
            startAutoplay();
        }
    });

    modal.on('click', function (e) {
        if ($(e.target).hasClass('modal')) {
            modal.hide();
            stopAutoplay();
        }
    });
});
