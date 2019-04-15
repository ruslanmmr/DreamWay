$(document).ready(function () {
  lazy();
  nav();
  Slider();
  landingScroll();
  popup();
  $(".phone-input").mask("+7 (999) 999-9999");
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth(),
  mobileLink = $('.mobile-nav__link'),
  scrollLink = $('.scroll-link'),
  overlay = $('.overlay');


//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: true,
    threshold: '',
    effect: 'fadeIn',
    effectTime: '300'
  });
}

//nav
function nav() {
  var navButton = $('.mobile-button'),
    nav = $('.mobile-nav');

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
    if (innerWidth > 767) {
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

function popup() {
  var openButton = $('.popup-link');
  var closeButton = $('.popup__close-button, .popup__close');
  var popup = $('.popup');

  function closePopup() {
    popup 
      .animate({opacity: 0}, 300, 
        function(){ 
          $(this).css('display', 'none');
      });
    $('body').css('overflow', 'visible');
  }

  openButton.click( function(event){
    event.preventDefault();
    var index = $(this).parents('.catalogue-block').index();
    $('#modal1').find('.form__option').removeAttr('selected');
    $('#modal1').find('.form__option').eq(index).attr('selected', 'selected');
    $($(this).attr('href')).css('display', 'block').animate({opacity: 1}, 300);
    $('body').css('overflow', 'hidden');
  });

  closeButton.click( function(){
    closePopup();
  });

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
      slidesToShow: 1,
      dots: false,
      adaptiveHeight: true,
      mobileFirst: true,
      responsive: [{
          breakpoint: 0,
          settings: {
            slidesToShow: 1
          }
        },
        {
          breakpoint: 576,
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