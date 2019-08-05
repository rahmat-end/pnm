(function ($) {
  "use strict";
  $(document).ready(function () {
    // Get started!
    //Menu Mobile
    $(".burger").on("click", function (e) {
      e.preventDefault();
      if (!$(this).hasClass("open")) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    function openMenu() {
      $(".menu-bg").addClass("animate");
      $(".burger").addClass("open");
      $(".x, .z").addClass("collapse-icon");
      $(".menu-navigation").addClass("animate");
      $("body").css({
        overflow: "hidden",
        height: "100vh"
      });
      // var header = $('.header').outerHeight();
      // console.log(header)
      // $('.menu-navigation').css({
      //   'top': header
      // });
      setTimeout(function () {
        $(".y").hide();
        $(".x").addClass("rotate30");
        $(".z").addClass("rotate150");
      }, 70);
      setTimeout(function () {
        $(".x").addClass("rotate45");
        $(".z").addClass("rotate135");
      }, 120);
    }

    function closeMenu() {
      $(".menu-navigation").removeClass("animate");
      $("body").css({
        overflow: "",
        height: ""
      });
      // $('.menu-navigation').css({
      //   'top': ''
      // });

      setTimeout(function () {
        $(".burger").removeClass("open");
        $(".x")
          .removeClass("rotate45")
          .addClass("rotate30");
        $(".z")
          .removeClass("rotate135")
          .addClass("rotate150");
        $(".menu-bg").removeClass("animate");

        setTimeout(function () {
          $(".x").removeClass("rotate30");
          $(".z").removeClass("rotate150");
        }, 50);
        setTimeout(function () {
          $(".y").show();
          $(".x, .z").removeClass("collapse-icon");
        }, 70);
      }, 100);
    }
    $('img.svg').each(function () {
      var $img = $(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var imgURL = $img.attr('src');

      $.get(imgURL, function (data) {
        // Get the SVG tag, ignore the rest
        var $svg = jQuery(data).find('svg');

        // Add replaced image's ID to the new SVG
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        $svg = $svg.removeAttr('xmlns:a');

        // Check if the viewport is set, else we gonna set it if we can.
        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
          $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
        }

        // Replace image with new SVG
        $img.replaceWith($svg);

      }, 'xml');
    });

    $('.home-slider').slick({
      dots: true,
      autoplay: true,
      responsive: [{
        breakpoint: 768,
        settings: {
          adaptiveHeight: true
        }
      }]
    })

    $('.dropdown-menu a.link-menu').on('click', function (e) {
      var $el = $(this);
      $el.toggleClass('active-dropdown');
      var $parent = $(this).offsetParent(".dropdown-menu");
      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      var $subMenu = $(this).next(".dropdown-menu");
      $subMenu.toggleClass('show');

      $(this).parent("li").toggleClass('show');

      $(this).parents('li.dropdown.show').on('hidden.bs.dropdown', function (e) {
        $('.dropdown-menu .show').removeClass("show");
        $el.removeClass('active-dropdown');
      });

      return false;
    });


    $('.dropdown').on("show.bs.dropdown", function (event) {
      $('.header').addClass('bob')
    });

    $('.dropdown').on('hidden.bs.dropdown', function () {
      $('.header').removeClass('bob')
      $(this).removeClass('show')
      $('.dropdown-submenu').removeClass('show')
      $('.dropdown-menu').removeClass('show')
      $('.a.link-menu').removeClass('active-dropdown')
    });
    $('select').select2();
    var $radioButtons = $('.select-filter-offices input[type="radio"]');
    $radioButtons.click(function () {
      $radioButtons.each(function () {
        $(this).parent().toggleClass('color-checked', this.checked);
      });
    });


    var $imageSrc;
    var $content;
    // $(".list-reksadana .btn-outline-primary").each(function(e){
    $('.list-reksadana .btn-outline-primary').on("click", function (e) {
      // e.preventDefault();
      $imageSrc = $(this).parents('.list-unduh-wrapper').find('img').attr("src")
      $content = $(this).parents('.list-unduh-wrapper').find('p').text()
    });
    // })

    $("#modalReksadana").on("shown.bs.modal", function (e) {
      $(this).find('img').attr("src", $imageSrc)
      $(this).find('h3').text($content)
    });

    $("#modalReksadana").on("hide.bs.modal", function (e) {
      $("#popup-display").attr("src", "");
      $(this).find('img').attr("src", "")
      $(this).find('h3').text("")
    });

    iziToast.settings({
      timeout: 3000, // default timeout
      // resetOnHover: true,
      // icon: '', // icon class
      transitionIn: 'flipInX',
      transitionOut: 'flipOutX',
      position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      color: '#93bb3a',
      theme: 'dark',
      onOpen: function () {
        console.log('callback abriu!');
      },
      onClose: function () {
        console.log("callback fechou!");
      }
    });

    $('.infoClick').click(function (e) {
      e.preventDefault()
      iziToast.info({
        title: 'UNDER DEEVELOPMENT'
      });
    });

    $.each($(".news-wrapper .news"), function () {
      var descHeight =  $(this).find($('.desc')).height();
      $(this).mouseenter(function () {
        $(this).find($('.desc')).stop().animate({
          height: 0,
          opacity: 0,
        }, 300);
        $(this).find($(".news-content")).stop().animate({
          height: '50%'
        }, 0, function () {
          // Callback
          $(this).css("background", "linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(0,0,0,1) 100%)")
        });
      })
      $(this).mouseleave(function () {
        
        $(this).find($('.desc')).stop().animate({
          height: descHeight,
          opacity: 1,
        }, 300);
        $(this).find($(".news-content")).stop().animate({
          height: '100%',
        }, 0, function () {
          // Callback
          $(this).css("background", "rgba(0, 0, 0, 0.6)")
        });
      });
    });

  });
})(jQuery);