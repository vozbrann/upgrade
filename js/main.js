$(document).ready(function() {
  if (screen.width <= 1024) {
    let url = window.location.pathname;
    let filename = url.substring(url.lastIndexOf('/')+1);
    document.location.replace("mob/"+ filename);
  }
  cursor();
  mainMenu();
  partnersSlide();
  employeesScrollMenu();
  servicesAccordion();
  refreshEmployee();
  refreshServices();
  mainServices();
  lineMenu();
  orderCanvas();
  model3D();
  contactForm();
  scrollIndicator();
  handleMarquee();
  stickyAboutUs();
  newsBottomHover();
  customSlider();
});



function customSlider() {
  let oldDate = new Date();
  let defaultElement = $(".custom-slider .default").clone();
  $(".main-services-slider .scroll-control").bind("mousewheel", function (event) {
    event.preventDefault();
    if (new Date().getTime() - oldDate.getTime() > 1100) {
      $(".custom-slider .default").fadeOut(300, function() {
        $(".custom-slider .default").remove();
      });
      oldDate = new Date();
      if (event.originalEvent.wheelDelta >= 0) {
        console.log("Scroll up");
        $(".custom-slider > div:nth-child(4)")
        .clone()
        .addClass("slideLeftElementAnim")
        .prependTo(".custom-slider");
        setTimeout(function () {
          $(".custom-slider > div:nth-child(1)").addClass("active");
          $(".custom-slider > div:nth-child(1)").removeClass(
            "slideLeftElementAnim"
          );
        }, 50);
        $(".custom-slider > div:nth-child(2)").removeClass("active");
        setTimeout(function () {
          $(".custom-slider > div:nth-child(5)").remove();
        }, 1000);
      } else {
        console.log("Scroll down");
        $(".custom-slider > div:nth-child(1)")
        .clone()
        .removeClass("active")
        .appendTo(".custom-slider");
        $(".custom-slider > div:nth-child(1)")
        .addClass("slideLeftElementAnim")
        .removeClass("active");
        $(".custom-slider > div:nth-child(2)").addClass("active");
        setTimeout(function () {
          $(".custom-slider > div:nth-child(1)").remove();
        }, 1000);
      }
    }
  });
}
function partnersSlide() {
  $('.partners-slider').slick({
    arrows: false,
    infinite: true,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    variableWidth: true,
  }).bind('mousewheel', (function(e) {
    e.preventDefault();

    if (e.originalEvent.deltaY < 0) {
      $(this).slick('slickNext');
    } else {
      $(this).slick('slickPrev');
    }
  }));
}

function newsBottomHover() {
  $('.suggest-topics .topics-container .topic').hover(function() {
    $('.suggest-topics .topics-container .topic').removeClass('selected');
    $(this).addClass('selected');
  });
}

function stickyAboutUs() {
  let stickyTop = 0;
  if (!!$('#about-sticky').offset()) {
    stickyTop = $('#about-sticky').offset().top;

    $(window).scroll(function() {
      let windowTop = $(window).scrollTop();
      if (stickyTop < windowTop && $("#about-sticky-container").height() + $("#about-sticky-container").offset().top - $("#about-sticky").height() > windowTop) {
        $('#about-sticky').css('position', 'fixed');
      } else {
        $('#about-sticky').css('position', 'relative');
      }
    });
  }
}

function handleMarquee(){
  const marquee = document.querySelectorAll('.marquee');
  let speed = 3;

  marquee.forEach(function(el){
    const container = el.querySelector('.inner');
    const content = el.querySelector('.inner > *');
    //Get total width
    const elWidth = content.offsetWidth;


    //Duplicate content
    let clone = content.cloneNode(true);
    container.appendChild(clone);
    clone = content.cloneNode(true);
    container.appendChild(clone);
    clone = content.cloneNode(true);
    container.appendChild(clone);

    let progress = 1;
    function loop(){
      progress = progress-speed;
      if(progress <= elWidth*-1) {progress=0;}
      container.style.transform = 'translateX(' + progress + 'px)';
      container.style.transform += 'skewX(' + speed*0.4 + 'deg)';

      window.requestAnimationFrame(loop);
    }
    loop();
  });
}

function scrollIndicator() {
  var indicator = $('#indicator');
  var win = jQuery(window);
  if (indicator.length) {
    var moveIndicator = debounce(function() {
      var viewportHeight = $(window).height();
      var documentHeight = $(document).height();
      var hasScrolled = $(window).scrollTop();

      var percent = (hasScrolled / (documentHeight - viewportHeight)) * 100;
      indicator.css("top", percent + "%");

    }, 10);

  }

  win.on("resize scroll", moveIndicator);

  function debounce(func, wait, immediate) {
    var timeout;

    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
}

function contactForm() {
  $('.open-contact-form').click(function() {
    $('.full-screen-form').show();
    animateCSS('.full-screen-form', 'fadeInRight', '', function() {});
  });
  $('.close-contact-form').click(function() {
    animateCSS('.full-screen-form', 'fadeOutRight', '', function() {
      $('.full-screen-form').hide();
    });
  });
  $('.send-contact-button').click(function() {
    $('.full-screen-form').addClass('sent');
    handleMarquee();
  })
}

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

function animateCSS(element, animationName, speed = '', callback) {
  $(element).addClass(`animated ${speed} ` + animationName);
  const node = document.querySelector(element);

  function handleAnimationEnd() {
    $(element).removeClass(`animated ${speed} ` + animationName);
    node.removeEventListener('animationend', handleAnimationEnd);

    if (typeof callback === 'function') callback();
  }

  node.addEventListener('animationend', handleAnimationEnd);
}

function mainMenu() {
  $('.to-top .button').click(function() {
    scrollToTop();
  });

  $('.menu-btn').click(function() {
    $('#menu').css('display', 'flex');
    animateCSS('.menu-btn', 'fadeOutLeftBig', '', function() {
      $('.menu-btn').hide();
    });
    animateCSS('#menu', 'fadeInRight', '', function() {

    });
  });
  $('.close-menu-container').click(function() {

    animateCSS('#menu', 'fadeOutRight', '', function() {
      $('.menu-btn').show();
      animateCSS('.menu-btn', 'fadeIn', '', function() {});
      $('#menu').hide();
    });
  });
}

let currEmployeeIndex = 0;
const employees = [
  {
    img: 'https://i.ytimg.com/vi/fUWrhetZh9M/maxresdefault.jpg',
    name: 'Іван Іванов',
    description: 'Lorem Ipsum is simply dummy text of the printing and ' +
      'typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
    facebook: '#facebook1',
    linkedin: '#',
    instagram: '#',
    twitter: '#',
  },
  {
    img: 'https://proexpress.com.ua/wp-content/uploads/2019/05/film-mstiteli-4-obognal-avatar-v-prokate.jpg',
    name: 'Петро Петренко',
    description: 'Lorem Ipsum is simply dummy text of the printing and ' +
      'typesetting industry. Lorem Ipsum has been the industry\'s standard dummy',
    facebook: '#facebook2',
    linkedin: '#',
    instagram: '#',
    twitter: '#',
  },
  {
    img: 'data:image/png;base64,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',
    name: 'Test Testtest',
    description: 'Lorem Ipsum is simply dummy text of the printing and ' +
      'typesetting industry',
    facebook: '#facebook3',
    linkedin: '#',
    instagram: '#',
    twitter: '#',
  },
];

function refreshEmployee() {
  $('.employees .left .image img').
    attr('src', employees[currEmployeeIndex].img);
  $('.employees .left .shadow img').
    attr('src', employees[currEmployeeIndex].img);
  $('.employees .right .name').text(employees[currEmployeeIndex].name);
  $('.employees .right .description').
    text(employees[currEmployeeIndex].description);
  $('.employees .right .facebook').
    attr('href', employees[currEmployeeIndex].facebook);
  $('.employees .right .linkedin').
    attr('href', employees[currEmployeeIndex].linkedin);
  $('.employees .right .instagram').
    attr('href', employees[currEmployeeIndex].instagram);
  $('.employees .right .twitter').
    attr('href', employees[currEmployeeIndex].twitter);
}

function employeesScrollMenu() {
  let oldDate = new Date();
  $('.employees .right').bind('mousewheel', (function(e) {
    e.preventDefault();
    if (new Date().getTime() - oldDate.getTime() > 500) {
      oldDate = new Date();
      if (e.originalEvent.deltaY < 0) {
        if (currEmployeeIndex === 0) {
          currEmployeeIndex = employees.length - 1;
        } else {
          currEmployeeIndex--;
        }
      } else {
        if (currEmployeeIndex === employees.length - 1) {
          currEmployeeIndex = 0;
        } else {
          currEmployeeIndex++;
        }
      }
      refreshEmployee();
    }
  }));

  $('.employees .right .end').click(() => {
    currEmployeeIndex = employees.length - 1;

    refreshEmployee();
  });
  $('.employees .right .start').click(() => {
    currEmployeeIndex = 0;

    refreshEmployee();
  });
}

function servicesAccordion() {
  $('.services-acordeon .item').hover(function() {
    if ( !$(this).hasClass( "selected" )) {
      animateCSS('.services-acordeon .item .content', 'fadeInRight', '',
        function() {});
      $('.services-acordeon .item').removeClass('selected');
      $(this).addClass('selected');
    }
  });
}

const services = [
  {
    img: './img/1.svg',
    title: 'E-COMMERCE',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,',
  },
  {
    img: './img/2.svg',
    title: 'Landing page',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,',
  },
  {
    img: './img/3.svg',
    title: 'Корпоративний сайт',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,',
  },
  {
    img: './img/4.svg',
    title: 'test test',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,',
  },
];

let currServiceIndex = 0;

function refreshServices() {
  // $('.main-services .selected .service').animate({
  //   opacity: 0,
  // }, 100, function() {
  //   // Animation complete.
  //   $('.main-services .selected .service .heading').
  //     text(services[currServiceIndex].title);
  //   $('.main-services .selected .service .image').
  //     attr('src', services[currServiceIndex].img);
  //   $('.main-services .selected .service .description').
  //     text(services[currServiceIndex].description);
  //
  //   $('.main-services .selected .service').animate({
  //     opacity: 1,
  //   }, 100, function() {
  //
  //   });
  // });

  $('.main-services .selected .service .heading').
    text(services[currServiceIndex].title);
  $('.main-services .selected .service .image').
    attr('src', services[currServiceIndex].img);
  $('.main-services .selected .service .description').
    text(services[currServiceIndex].description);

  // $('.main-services .option-list .option .content').animate({
  //   opacity: 0,
  // }, 100, function() {
  //   // Animation complete.
  //   let optionIndex = currServiceIndex;
  //   $('.main-services .option-list .option').each(function() {
  //     if (optionIndex === services.length - 1) {
  //       optionIndex = 0;
  //     } else {
  //       optionIndex++;
  //     }
  //
  //     $(this).find('img').attr('src', services[optionIndex].img);
  //     $(this).find('.heading').text(services[optionIndex].title);
  //     $(this).find('.description').text(services[optionIndex].description);
  //   });
  //
  //   $('.main-services .option-list .option .content').animate({
  //     opacity: 1,
  //   }, 100, function() {
  //
  //   });
  // });

  let optionIndex = currServiceIndex;
  $('.main-services .option-list .option').each(function() {
    if (optionIndex === services.length - 1) {
      optionIndex = 0;
    } else {
      optionIndex++;
    }

    $(this).find('img').attr('src', services[optionIndex].img);
    $(this).find('.heading').text(services[optionIndex].title);
    $(this).find('.description').text(services[optionIndex].description);
  });
}

function mainServices() {
  let oldDate = new Date();
  // $('.main-services .selected .default').hide();
  // $('.main-services .option-list').bind("mouseleave", function() {
  //   mainServicesIsSwitching = true;
  //   if (currServiceIndex === 0) {
  //     currServiceIndex = services.length - 1;
  //   } else {
  //     currServiceIndex--;
  //   }
  //   $('.main-services .selected .default').fadeIn( 100, function() {
  //     refreshServices();
  //   });
  // });

  // $('.main-services .option-list').bind("mouseenter", function() {
  //   if (currServiceIndex === services.length - 1) {
  //     currServiceIndex = 0;
  //   } else {
  //     currServiceIndex++;
  //   }
  //   refreshServices();
  //   $('.main-services .selected .default').fadeOut( 100, function() {
  //
  //   });
  // });

  $('.main-services .option-list').bind('mousewheel', (function(e) {
    e.preventDefault();
    if (new Date().getTime() - oldDate.getTime() > 500) {
      oldDate = new Date();
      if (e.originalEvent.deltaY < 0) {
        if (currServiceIndex === 0) {
          currServiceIndex = services.length - 1;
        } else {
          currServiceIndex--;
        }
      } else {
        if (currServiceIndex === services.length - 1) {
          currServiceIndex = 0;
        } else {
          currServiceIndex++;
        }
      }
      refreshServices();
      $('.main-services .selected .default').fadeOut( 100, function() {

      });
    }
  }));
}

function lineMenu() {
  let leftLineWidth = 0;
  let curveHeight = 50;
  let toTop = true;
  let curvePosition = 0;
  let paddingTop = 20;
  let guy_image = new Image();
  guy_image.src = './img/guy.svg';

  var c = document.getElementById('menuCanvas');
  if (c) {
    var ctx = c.getContext('2d');
    function lineCurveHandle() {
      let contentContainerNode = document.getElementById('menuCanvasContainer');
      c.width = contentContainerNode.offsetWidth;
      ctx.beginPath();
      ctx.moveTo(0, paddingTop);

      let curveWidth = 50;
      if (!toTop) {
        curveHeight += (50 - curveHeight)*0.03;
      } else {
        curveHeight -= (curveHeight)*0.2;
        if (Math.abs(((curvePosition * (contentContainerNode.offsetWidth / 4) +
          contentContainerNode.offsetWidth / 16 - curveWidth / 4) - leftLineWidth)) <= 150) {
          toTop = false;
        }
      }
      leftLineWidth += (curvePosition * (contentContainerNode.offsetWidth / 4) - curveWidth*2 + (contentContainerNode.offsetWidth / 8) - leftLineWidth) * 0.03;
      let rightLineWidth = 3000;

      ctx.drawImage(guy_image, leftLineWidth + curveWidth*2 - guy_image.width/2, paddingTop + curveHeight - guy_image.height);

      ctx.lineTo(leftLineWidth, paddingTop);
      ctx.bezierCurveTo(
        leftLineWidth + curveWidth,
        paddingTop,
        leftLineWidth + curveWidth,
        paddingTop + curveHeight,
        leftLineWidth + curveWidth * 2,
        paddingTop + curveHeight,
      );
      ctx.bezierCurveTo(
        leftLineWidth + curveWidth * 3,
        paddingTop + curveHeight,
        leftLineWidth + curveWidth * 3,
        paddingTop,
        leftLineWidth + curveWidth * 4,
        paddingTop,
      );
      ctx.lineTo(leftLineWidth + curveWidth * 4 + rightLineWidth, paddingTop);

      ctx.strokeStyle = 'white';
      ctx.stroke();
    }

    function loop() {
      let contentContainerNode = document.getElementById('menuCanvasContainer');
      c.width = contentContainerNode.offsetWidth;
      ctx.clearRect(0, 0, c.width, c.height);
      lineCurveHandle();
      requestAnimationFrame(loop);
    }

    loop();

    $('.curve-menu .menu-item').click(function() {
      $('.menu-item').removeClass('selected');
      $('.select-option').removeClass('selected');
      $(this).addClass('selected');

      $('.curve-line-img').removeClass('item-1 item-2 item-3 item-4');

      if ($(this).hasClass('item-1')) {
        if (curvePosition !== 0){
          curvePosition = 0;
          toTop = true;
        }
        $('.curve-line-img').addClass('item-1');
      } else if ($(this).hasClass('item-2')) {
        if (curvePosition !== 1){
          curvePosition = 1;
          toTop = true;
        }
        $('.curve-line-img').addClass('item-2');
      } else if ($(this).hasClass('item-3')) {
        if (curvePosition !== 2){
          curvePosition = 2;
          toTop = true;
        }
        $('.curve-line-img').addClass('item-3');
      } else if ($(this).hasClass('item-4')) {
        if (curvePosition !== 3){
          curvePosition = 3;
          toTop = true;
        }
        $('.curve-line-img').addClass('item-4');
      }
    });
  }
}

function model3D() {

  $(window).bind("mousemove",
    function(e){
      $(".model-container .model").css({
        "transform": `rotateX(${-(e.clientY/$(".model-container").first().outerHeight()) * 45}deg) rotateY(${(e.clientX/$(".model-container").first().outerWidth()) * 45 - 10}deg)`,
      });
    }
  );
}

function orderCanvas() {
  let leftLineWidth = 0;
  let curveHeight = 50;
  let paddingTop = 0;
  let guy_image = new Image();

  let cursorX = 600;
  let cursorY = 0;

  guy_image.src = './img/order-guy.svg';

  var c = document.getElementById('orderCanvas');
  if (c) {
    var ctx = c.getContext('2d');
    c.addEventListener(
      "mousemove", function(e){
        let rect = c.getBoundingClientRect();
        cursorX = e.clientX - rect.left;
        cursorY = e.clientY - rect.top;
      }
    );
    c.addEventListener(
      "mouseout", function(e){
        cursorY = c.offsetHeight;
      }
    );

    function lineCurveHandle() {
      let contentContainerNode = document.getElementById('orderCanvasContainer');
      c.width = contentContainerNode.offsetWidth;
      c.height = contentContainerNode.offsetHeight;
      paddingTop = c.offsetHeight+1;
      ctx.beginPath();
      ctx.moveTo(0, paddingTop);
      let curveWidth = 50;

      leftLineWidth += (cursorX - leftLineWidth - curveWidth*2) * 0.02;
      curveHeight += ((paddingTop-cursorY)/5 - curveHeight  ) * 0.03;

      let rightLineWidth = 3000;
      ctx.drawImage(guy_image, leftLineWidth + curveWidth*2 - guy_image.width/2, paddingTop - curveHeight - guy_image.height + 1.3);

      ctx.lineTo(leftLineWidth, paddingTop);
      ctx.bezierCurveTo(
        leftLineWidth + curveWidth,
        paddingTop,
        leftLineWidth + curveWidth,
        paddingTop - curveHeight,
        leftLineWidth + curveWidth * 2,
        paddingTop - curveHeight,
      );
      ctx.bezierCurveTo(
        leftLineWidth + curveWidth * 3,
        paddingTop - curveHeight,
        leftLineWidth + curveWidth * 3,
        paddingTop,
        leftLineWidth + curveWidth * 4,
        paddingTop,
      );
      ctx.lineTo(leftLineWidth + curveWidth * 4 + rightLineWidth, paddingTop);

      ctx.strokeStyle = 'white';
      ctx.stroke();
    }

    function loop() {
      let contentContainerNode = document.getElementById('orderCanvasContainer');
      c.width = contentContainerNode.offsetWidth;
      ctx.clearRect(0, 0, c.width, c.height);
      lineCurveHandle();
      requestAnimationFrame(loop);
    }

    loop();
  }
}

function cursor(){
  let cursor = $(".cursor");

  $(window).mousemove(function(e) {
    cursor.css({
      top: e.clientY - cursor.height() / 2,
      left: e.clientX - cursor.width() / 2
    });
  });

  $(window)
  .mouseleave(function() {
    cursor.css({
      opacity: "0"
    });
  })
  .mouseenter(function() {
    cursor.css({
      opacity: "1"
    });
  });

  $(".link")
  .mouseover(function() {
    cursor.css({
      transform: "scale(2)"
    });
    cursor.removeClass('scroll-cursor-hint');
  })
  .mouseout(function() {
    cursor.css({
      transform: "scale(1)"
    });
    if ($('.cursor-scroll:hover').length !== 0) {
      cursor.css({
        transform: "scale(4)"
      });
      cursor.addClass('scroll-cursor-hint');
    }
  });

  $(".cursor-scroll")
  .mouseenter(function() {
    cursor.css({
      transform: "scale(4)"
    });
    cursor.addClass('scroll-cursor-hint');
  })
  .mouseleave(function() {
    cursor.css({
      transform: "scale(1)"
    });
    cursor.removeClass('scroll-cursor-hint');
  });

  $(window)
  .mousedown(function() {
    if (!cursor.hasClass('scroll-cursor-hint')){
      cursor.css({
        transform: "scale(.2)"
      });
    }
  })
  .mouseup(function() {
    if (!cursor.hasClass('scroll-cursor-hint')){
      cursor.css({
        transform: "scale(1)"
      });
    }
  });
};
