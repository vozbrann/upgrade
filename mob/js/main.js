$(document).ready(function() {
  if (screen.width > 1024) {
    let url = window.location.pathname;
    let filename = url.substring(url.lastIndexOf('/')+1);
    document.location.replace("../"+filename);
  }
  mainMenu();
  partnersSlide();
  servicesSlider();
  mainServices();
  lineMenu();
  contactForm();
  handleMarquee();
  newsBottomSlider();
  mainNews();
  aboutSlider();
  aboutEmployeesSlider();
});


function servicesSlider() {
  $('.services-slider').bind("touchstart", dragMouseDown);

  let elWidth = $('.services-slider').outerWidth();
  let slideWidth = $('.services-slider .item:nth-child(4)').outerWidth();

  let startX = 0;
  let dragX = 0;

  let position = 0;

  function dragMouseDown(e) {
    startX = e.touches[0].pageX;
    document.ontouchend = closeDragElement;
    document.ontouchmove = elementDrag;
  }


  function elementDrag(e) {
    dragX = e.touches[0].pageX;
    position += (dragX - startX);
    if (position < -slideWidth * 4) {
      position = -slideWidth * 4;
    } else if(position > 0) {
      position = 0;
    }
    startX = dragX;

    if(position < -slideWidth - 2*slideWidth + slideWidth * 3/7) {

    } else if (position < -slideWidth - slideWidth + slideWidth*2/7) {
      $('.services-slider .item:nth-child(2)').css({
        left: position + slideWidth*2,
      });
    } else if (position < -slideWidth + slideWidth/7) {
      $('.services-slider .item:nth-child(3)').css({
        left: position + slideWidth,
      });
    } else {
      $('.services-slider .item:nth-child(4)').css({
        left: position,
      });
    }
  }

  function closeDragElement() {
    document.ontouchend = null;
    document.ontouchmove = null;

    if(position < -slideWidth - 2*slideWidth + slideWidth * 3/7) {

    } else if (position < -slideWidth - slideWidth + slideWidth*2/7) {
      if (position < -slideWidth - slideWidth -slideWidth/2  + slideWidth*2/7) {
        position = -slideWidth - slideWidth*2 + slideWidth*3/7;
        $('.services-slider .item:nth-child(2)').animate({
            left: position + slideWidth*2,
        }, 300);
      } else {
        position = -slideWidth - slideWidth + slideWidth*2/7;
        $('.services-slider .item:nth-child(2)').animate({
          left: position + slideWidth*2,
        }, 300);
      }

    } else if (position < -slideWidth + slideWidth/7) {
      if (position < -slideWidth - slideWidth/2 + slideWidth/7) {
        position = -slideWidth - slideWidth + slideWidth*2/7;
        $('.services-slider .item:nth-child(3)').animate({
          left: position + slideWidth,
        }, 300);
      } else {
        position = -slideWidth + slideWidth/7;
        $('.services-slider .item:nth-child(3)').animate({
          left: position + slideWidth,
        }, 300);
      }
    } else {
      if (position < - slideWidth/2 + slideWidth/7) {
        position = -slideWidth + slideWidth/7;
        $('.services-slider .item:nth-child(4)').animate({
          left: position,
        }, 300);
      } else {
        position = 0;
        $('.services-slider .item:nth-child(4)').animate({
          left: position,
        }, 300);
      }
    }
  }
}

function aboutEmployeesSlider(){
  $('.employees .slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  });
}

function aboutSlider(){
  $('.target-section .targets-container').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  });
}

function mainNews(){
  $('.news .slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  });
}

function mainServices() {
  $('.main-services-slider .slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
  });
}

function newsBottomSlider() {
  $('.suggest-topics .slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
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

function handleMarquee(){
  const marquee = document.querySelectorAll('.marquee');
  let speed = 1.5;

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

function contactForm() {
  $('.open-contact-form').click(function() {
    $('.full-screen-form').css('display', 'flex');
    animateCSS('.full-screen-form', 'fadeInRight', '', function() {});
  });
  $('.close-contact-form').click(function() {
    animateCSS('.full-screen-form', 'fadeOutRight', '', function() {
      $('.full-screen-form').css('display', 'none').removeClass('sent');
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

function lineMenu() {
  let leftLineWidth = 0;
  let curveHeight = 0;
  let curveNewHeight = 40;
  let curvePosition = 1;
  let paddingTop = 20;
  let guy_image = new Image();
  guy_image.src = './img/guy.svg';

  var c = document.getElementById('menuCanvas');

  $('.curve-menu').bind("pointerdown",function() {
    curveNewHeight = 0;
    $(window).bind("pointerup",function() {
      curveNewHeight = 40;
    });
  });

  if (c) {
    var ctx = c.getContext('2d');
    function lineCurveHandle() {
      let contentContainerNode = document.getElementById('menuCanvasContainer');
      c.width = contentContainerNode.offsetWidth;
      ctx.beginPath();
      ctx.moveTo(0, paddingTop);

      let curveWidth = 40;
      curveHeight += (curveNewHeight - curveHeight)*0.05;

      leftLineWidth += (curvePosition * (contentContainerNode.offsetWidth / 3) - curveWidth*2 + (contentContainerNode.offsetWidth / 6) - leftLineWidth) * 0.03;
      let rightLineWidth = 3000;

      ctx.drawImage(guy_image, leftLineWidth + curveWidth*2 - guy_image.width* 0.8/2, paddingTop + curveHeight - guy_image.height* 0.8, guy_image.width * 0.8, guy_image.height * 0.8);

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

    $('.curve-menu .slider').slick({
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
  }
}
