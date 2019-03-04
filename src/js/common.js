$(document).ready(function () {
  lazy();
  modals();
  Slider();
  landingScroll();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth(),
  mobileLink = $('.mobile-nav__link'),
  scrollLink = $('.scroll-link');


//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: true,
    threshold: '',
    effect: 'fadeIn',
    effectTime: '300'
  });
}

//nav, modals
function modals() {
  var navButton = $('.mobile-button'),
    nav = $('.mobile-nav'),
    overlay = $('.overlay');

  navButton.click(function (event) {
    event.preventDefault();
    nav.toggleClass('mobile-nav_active');
    navState();
  })

  mobileLink.click(function () {
    nav.removeClass('mobile-nav_active');
    navState();
  })

  function navState() {
    if (nav.hasClass('mobile-nav_active')) {
      navButton.addClass('mobile-button_active');
      overlay.fadeIn(300);
      scrollLock.hide($("body"));
      $('body').addClass('body_hidden').addClass('body_active')
    } else {
      navButton.removeClass('mobile-button_active');
      overlay.fadeOut(300);
      scrollLock.show($("body"));
      $('body').removeClass('body_hidden').removeClass('body_active');
    }
  }
  $(window).resize(function () {
    if (innerWidth > 1199) {
      nav.removeClass('mobile-nav_active');
      navState();
    }
  });


  overlay.on('click', function () {
    if (nav.hasClass('mobile-nav_active')) {
      nav.removeClass('mobile-nav_active');
      navState();
    }
  })
}

//якорные ссылки
function landingScroll() {
  scrollLink.click(function (event) {
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    event.preventDefault();

    if (mobileLink.is(event.target)) {
      setTimeout(function () {
        $('body,html').animate({
          scrollTop: top
        }, 400);
      }, 300)
    } else {
      $('body,html').animate({
        scrollTop: top
      }, 400);
    }
  })
}

//слайдеры
function Slider() {
  var slider1 = $('.advantages-slider');
  var slider2 = $('.reviews-slider');
  var flag = true;

  checkInit();

  $(window).resize(function () {
    checkInit();
  });

  function checkInit() {
    if (innerWidth < 768) {
      if (flag == true) {
        sliderInit();
        flag = false;
      }
    } else {
      if (flag == false) {
        slider1.slick('unslick');
        slider2.slick('unslick');
        flag = true;
      }
    }
  }

  function sliderInit() {
    slider1.slick({
      arrows: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      dots: false,
      adaptiveHeight: true
    });
    slider2.slick({
      arrows: true,
      slidesToScroll: 1,
      dots: false,
      adaptiveHeight: true,
      responsive: [{
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });
  }

  slider1.on('beforeChange', function () {
    lazy();
  });
  slider1.on('afterChange', function () {
    lazy();
  });
  slider2.on('beforeChange', function () {
    lazy();
  });
  slider2.on('afterChange', function () {
    lazy();
  });
}