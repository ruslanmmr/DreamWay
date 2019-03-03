$(document).ready(function () {
  lazy();
  //nav();
  advantSlider();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth();


//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: true,
    threshold: '',
    effect: 'fadeIn',
    effectTime: '300'
  });
}

//mobile nav
function nav() {
  var navButton = $('.mobile-button, .mobile-nav__close'),
      nav = $('.mobile-nav'),
      overlay = $('.header__overlay');

  navButton.click(function(event) {
    event.preventDefault();
    nav.toggleClass('mobile-nav_active');
    stateCheck();
  })
  mobileLink.click(function() {
    nav.removeClass('mobile-nav_active');
    stateCheck();
  })

  function stateCheck() {
    if(nav.hasClass('mobile-nav_active')) {
      navButton.addClass('mobile-button_active');
      overlay.fadeIn(300);
      scrollLock.hide($("body"));
      $('body').css('overflow', 'hidden')
    } else {
      navButton.removeClass('mobile-button_active');
      overlay.fadeOut(300);
      scrollLock.show($("body"));
      $('body').css('overflow', 'visible')
    }
  }
  $(window).resize(function () {
    if(innerWidth>768) {
      nav.removeClass('mobile-nav_active');
      stateCheck();
    }
  });
}
//якорные ссылки
function landingScroll() {
  var headerHeight = $(".header").height();
  var body = $("body");
  var scrollLink = $('.scroll-link')
  var desctopLink = $(".nav__link");

  function scroll() {
    if(body.hasClass("in-scroll")) {} else {
      scrollLink.each(function () {
        var window_top = $(window).scrollTop();
        var div_1 = $(this).attr('href');
        if($(div_1).length > 0) {
          var div_top = $(div_1).offset().top;
          var blockHeight = $(div_1).height();
          if (window_top > (div_top - headerHeight) && window_top < (div_top - headerHeight) + blockHeight){
            $('.nav__item').find('a').removeClass('scroll-link_active');
            $('.nav__item').find('a[href="'+div_1+'"]').addClass('scroll-link_active');
          } else {
            $('.nav__item').find('a[href="'+div_1+'"]').removeClass('scroll-link_active');
          };
        }
      });
    }
  }
  $(window).scroll(function(){
    scroll();
  });
  scrollLink.click(function (event) {
    var id  = $(this).attr('href'),
        top = $(id).offset().top - headerHeight + 1;
    event.preventDefault();
    scrollLink.removeClass('nav__link_active');
    $(this).addClass('nav__link_active');

    if (mobileLink.is(event.target)) {
      setTimeout(function() {
        $('body,html').animate({scrollTop: top}, 400);
      }, 300)
    } else if (desctopLink.is(event.target)) {
      $('body,html').animate({scrollTop: top}, 400);
      body.addClass("in-scroll");
      setTimeout(function() {
        body.removeClass("in-scroll");
      }, 400)
    }
  })
}
//слайдер преимуществ
function advantSlider() {
  var slider = $('.advantages-slider');

  if(innerWidth < 576) {
    slider.slick({
      arrows: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      dots: false,
      adaptiveHeight: true
    });
    slider.on('beforeChange', function(){
      lazy();
    });
    slider.on('afterChange', function(){
      lazy();
    });
  }
}