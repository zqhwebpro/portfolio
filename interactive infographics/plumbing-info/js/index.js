$(document).ready(function() {
    var scene = $('#scene').get(0);
    var parallax = new Parallax(scene);
    var scene_01 = document.getElementById('scene-01');
    var parallax = new Parallax(scene_01);
    var scene_02 = document.getElementById('scene-02');
    var parallax = new Parallax(scene_02);
    var scene_03 = $('#scene-03').get(0);
    var parallax = new Parallax(scene_03);
    var scene_04 = $('#scene-04').get(0);
    var parallax = new Parallax(scene_04);
    // var scene_05 = $('#scene-05').get(0);
    // var parallax = new Parallax(scene_05);
    var scene_06 = $('#scene-06').get(0);
    var parallax = new Parallax(scene_06);
    var scene_07 = $('#scene-07').get(0);
    var parallax = new Parallax(scene_07);
    var scene_08 = $('#scene-08').get(0);
    var parallax = new Parallax(scene_08);
    var scene_09 = $('#scene-09').get(0);
    var parallax = new Parallax(scene_09);
    var scene_10 = $('#scene-10').get(0);
    var parallax = new Parallax(scene_10);
    var scene_11 = $('#scene-11').get(0);
    var parallax = new Parallax(scene_11);
    var scene_12 = $('#scene-12').get(0);
    var parallax = new Parallax(scene_12);
    var scene_13 = $('#scene-13').get(0);
    var parallax = new Parallax(scene_13);
    var scene_14 = $('#scene-14').get(0);
    var parallax = new Parallax(scene_14);
    var scene_15 = $('#scene-15').get(0);
    var parallax = new Parallax(scene_15);
    var scene_16 = $('#scene-16').get(0);
    var parallax = new Parallax(scene_16);
    var scene_17 = $('#scene-17').get(0);
    var parallax = new Parallax(scene_17);
    var scene_18 = $('#scene-18').get(0);
    var parallax = new Parallax(scene_18);
    var scene_19 = $('#scene-19').get(0);
    var parallax = new Parallax(scene_19);
    var scene_20 = $('#scene-20').get(0);
    var parallax = new Parallax(scene_20);
    var scene_21 = $('#scene-21').get(0);
    var parallax = new Parallax(scene_21);
    var scene_22 = $('#scene-22').get(0);
    var parallax = new Parallax(scene_22);
    var scene_23 = $('#scene-23').get(0);
    var parallax = new Parallax(scene_23);
    var scene_24 = $('#scene-24').get(0);
    var parallax = new Parallax(scene_24);

    jQuery.fn.center = function() {
        var container = $(window);
        var top = -this.height() / 2;
        var bottom = -this.height() / 2;
        var left = -this.width() / 2;
        var right = -this.width() / 2;
        return this.css('position', 'absolute').css({ 'margin-left': left + 'px', 'margin-top': top + 'px', 'margin-right': right + 'px', 'margin-bottom': bottom + 'px','left': '50%', 'top': '50%', 'right': '50%', 'bottom': '50%'});
        }
        $('.center-text').center();

    jQuery.fn.bottom = function() {
        var container = $(window);
        var left = -this.width() / 2;
        var right = -this.width() / 2;
        return this.css('position', 'absolute').css({ 'margin-left': left + 'px', 'margin-right': right + 'px', 'left': '50%', 'right': '50%', 'bottom': '20%'});
        }
        $('.bottom-text').bottom();

    jQuery.fn.bottom_ = function() {
        var container = $(window);
        return this.css('position', 'absolute').css({ 'left': '48%'});
        // if ( window.matchMedia("(max-width: 360px)").matches) { 
        //     return this.css('position', 'absolute').css({ 'left': '44%', 'bottom': '10%'});
        // }
        }
        $('.landing-section .button-explore').bottom_();

    jQuery.fn.left = function() {
        var container = $(window);
        return this.css('position', 'absolute').css({ 'left': '75%'});
        }
        $('.container-submas-02 .king-02').left();

    $("#button-explore").on('click', function (e) {
        e.preventDefault();
        $.scrollify.next();
    });

    $(".landing-page").on('click', function (e) {
        e.preventDefault();
        $('.main-wrapper').slideDown().fadeOut('2500');
        $('.landing-section').slideDown().fadeIn('2500');
        return false
    });

    $('.menu-list #1').click(function(){
        $('.main-wrapper').fadeOut('slide');
        $('.landing-section').fadeIn('slide');
    });
// Landing Scroll
    // window.addEventListener('wheel', function(event){
    //     $('.landing-section').slideUp('2500').fadeOut('2500');
    //     $('.main-wrapper').fadeIn('2500');
    // });
// Menu-Toggle 
    $('.menu-toggle').click(function(){
        $('.menu-list').fadeIn('slide');
        $('#sidebar').fadeIn('slide');
        $('#sidebar').css('width','100%');
        $('.menu-list').fadeIn('slide');
        $('.menu-toggle').fadeOut();
        $('.menu').hide();
        $('#homeSubmenu').fadeOut('slide');
        $('#sidebar .list-group').fadeIn('slide');
        $('#sidebar .logo-plumbing img').css('height', '30px');
    });
// Sidebar---Menu list
    $('.menu-list').hide();
    $('.menu').click(function(){
        $('.menu-list').fadeIn('slide');
        $('#sidebar').css('width','100%');
        $('.menu').hide('2500');
        $('#homeSubmenu').fadeOut('slide');
        $('#sidebar .list-group').fadeIn('slide');
        $('#sidebar .logo-plumbing img').css('height', '30px');
    });
    $('#sidebar .close').click(function(){
        $('.menu-list').fadeOut('slide');
        $('#sidebar').css('width','10%');
        $('.menu').show('2500');
        $('#homeSubmenu').fadeIn('slide');
        $('#sidebar .list-group').fadeOut('slide');
        $('#sidebar .logo-plumbing img').css('height', '20px');
        if ( window.matchMedia("(max-width: 992px)").matches) { 
            $('.menu-toggle').fadeIn('slide');
            $('#sidebar').css('width','0%');
            $('#homeSubmenu').hide('2500');
            $('.menu').hide();
        }
    });
    $("#sidebar .menu-list a").click(function() {
            $('.menu-list').fadeOut('2500');
            $('.menu').show('2500');
            $('#sidebar').css('width','10%');
            $('#homeSubmenu').show();
            $('#sidebar .logo-plumbing img').css('height', '20px');
            if (window.matchMedia("(max-width: 992px)").matches) {
                $('.menu-toggle').fadeIn('slide');
                $('#sidebar').hide();
                $('#homeSubmenu').hide('2500');
                $('.menu').hide();
            }
    });
    $('#sidebar .menu-list ul li').hover(function(){
        $('#picture').removeClass().addClass(
            $(this).attr('rel'));
        $(this).addClass('active').siblings().removeClass('active');
    });
// Sidebar---Button
    $('#homeSubmenu .item').on('click', function() {
        $(this).toggleClass('clicked');
      });
// When the carousel slides, auto update the text
    $('#carouselExampleControls').on('slid', function (e) {
        var id = $('.item.active').data('slide-number');
        $('#carousel-text').html($('#slide-content-'+id).html());
    });

      $('#sidebarCollapse').on('click', function () {
          $('#sidebar, #content').toggleClass('active');
          $('.collapse.in').toggleClass('in');
      });
      $('.mainCollapseMenuWrap .item').on('click', function () {
        $('.mainCollapseMenuWrap').removeClass('show');
      });
      
      let scroll_link = $('.scroll');
 
    //smooth scrolling -----------------------
    scroll_link.click(function(e){
        e.preventDefault();
        let url = $('body').find($(this).attr('href')).offset().top;
        $('html, body').animate({
        scrollTop : url
        },700);
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
        return false;	
    });
    
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    $(".bttn button").hover(function(){
        $('.btn-spn').show();
    },function(){
        $('.btn-spn').hide();
    });
    $('.bttn button').click(function(){
        $('.popup-dyk').toggle('2500');
    })
    $('.popup').hide();
    // $('.side-pop').hide();
    $('.bigger-span').click(function() {
        if (this.id == 'roman') {
            $('.romans .popup').toggle('2500');$('.greece .popup').hide('2500');$('.greece-sidepop').hide('2500');$('.near-east-cultures .popup').hide('2500');$('.near-east-cultures-sidepop').hide('2500');$('.ivc .popup').hide('2500');$('.ivc-sidepop').hide('2500');$('.egypt .popup').hide('2500');$('.egypt-sidepop').hide('1000');
            // $('.romans-sidepop').toggle('1000');
        }
        if (this.id == 'greece') {
            $('.greece .popup').toggle('2500');$('.romans .popup').hide('2500');$('.romans-sidepop').hide('2500');$('.near-east-cultures .popup').hide('2500');$('.near-east-cultures-sidepop').hide('2500');$('.ivc .popup').hide('2500');$('.ivc-sidepop').hide('2500');$('.egypt .popup').hide('2500');$('.egypt-sidepop').hide('2500');
            // $('.greece-sidepop').toggle('2500');
        }
        if (this.id == 'nec') {
            $('.near-east-cultures .popup').toggle('2500');$('.romans .popup').hide('2500');$('.romans-sidepop').hide('2500');$('.greece .popup').hide('2500');$('.greece-sidepop').hide('2500');$('.ivc .popup').hide('2500');$('.ivc-sidepop').hide('2500');$('.egypt .popup').hide('2500');$('.egypt-sidepop').hide('2500');
            // $('.near-east-cultures-sidepop').toggle('2500');
        }
        if (this.id == 'ivc') {
            $('.ivc .popup').toggle('2500');$('.romans .popup').hide('2500');$('.romans-sidepop').hide('2500');$('.near-east-cultures .popup').hide('2500');$('.near-east-cultures-sidepop').hide('2500');$('.greece .popup').hide('2500');$('.greece-sidepop').hide('2500');$('.egypt .popup').hide('2500');$('.egypt-sidepop').hide('2500');
            // $('.ivc-sidepop').toggle('2500');
        }
        if (this.id == 'egypt') {
            $('.egypt .popup').toggle('2500');$('.romans .popup').hide('2500');$('.romans-sidepop').hide('2500');$('.near-east-cultures .popup').hide('2500');$('.near-east-cultures-sidepop').hide('2500');$('.ivc .popup').hide('2500');$('.ivc-sidepop').hide('2500');$('.greece .popup').hide('2500');$('.greece-sidepop').hide('2500');
            // $('.egypt-sidepop').toggle('2500');
        }
        
    });
    $('.side-pop-wrap').hide();
    $('.popup button').click(function(event){
        if( $('.side-pop-wrap').hasClass('side-pop-toggle') ) {
            event.preventDefault();
            var hash = this.id;
            $('.acp-section-wrap .side-pop-wrap').animate({
                scrollTop: $('#sidepop-' + hash).offset().top
            }, 800, function(){ 
                console.log(this.id)
                window.location.hash ='#sidepop-' + hash;
            })
            $('.side-pop-wrap').css('scroll-behavior', 'smooth');
        }
        $('.side-pop-wrap').show().addClass('side-pop-toggle');
        $('.side-pop-wrap').removeClass('side-pop-hide');
        // $('#sidepop-' + this.id).toggleClass('side-pop-toggle');
        $('.popup').hide(1000); 
    });

    $('.moba-list a').click(function(event){
        // alert("clicked");
        $('.menu-toggle').hide("2500");
        if( $('.side-pop-wrap').hasClass('side-pop-toggle') ) {
            event.preventDefault();
            var hash = this.id;
            $('.acp-section-wrap .side-pop-wrap').animate({
                scrollTop: $('#sidepop-' + hash).offset().top
            }, 800, function(){ 
                console.log(this.id)
                window.location.hash ='#sidepop-' + hash;
            })
            $('.side-pop-wrap').css('scroll-behavior', 'smooth');
        }
        $('.side-pop-wrap').show().addClass('side-pop-toggle');
        $('.side-pop-wrap').removeClass('side-pop-hide');
    });
  
    $('.container-submas-01 .bttn').click(function (){
        $('.container-submas-01 .sidepop').toggleClass('sidepop-toggle', '2500');
        $('.container-submas-01 .bttn').toggleClass('bttn-slide', '2500');
        $(".container-submas-01 .sidepop").hover(function() {
                var oldScrollPos = $(window).scrollTop();
            
                $(window).on('scroll.scrolldisabler', function(event) {
                $(window).scrollTop(oldScrollPos);
                event.preventDefault();
                });
            }, function() {
                $(window).off('scroll.scrolldisabler');
            });
    });
    $('.text .btn').click(function(){
        $('.menu-toggle').hide("2500");
        if (this.id == 'btn-1') {
            $('.container-subhac-01').slideUp('2500').fadeOut('2500');
            $('#container-subhac-1').fadeIn('2500');
        }
        if (this.id == 'btn-2') {
            $('.container-subhac-01').slideUp('2500').fadeOut('2500');
            $('#container-subhac-2').fadeIn('2500');
        }
        if (this.id == 'btn-3') {
            $('.container-subhac-01').slideUp('2500').fadeOut('2500');
            $('#container-subhac-3').fadeIn('2500');
        }
    });
    $('#content .close').click(function(){
        $('.side-pop-wrap').removeClass('side-pop-toggle');
        $('.menu-toggle').show('2500');
        $('.side-pop-wrap').addClass('side-pop-hide');
        $('.container-subhac-02').fadeOut('2500');
        $('.container-subhac-01').slideDown().fadeIn('2500');
    });
    $(function() {
        $.scrollify({
            section : ".wrapper",
            afterRender:function() {
                var hash = window.location.hash;
                if ( hash && hash == '#landing') {
                    console.log('true')
                    $('#sidebar').hide();
                }
            },
            after:function() {
                 var hash = window.location.hash;
                if ( hash && hash == '#landing') {
                    console.log('true')
                    $('#sidebar').hide();
                } else {
                    $('#sidebar').fadeIn('slide');
                    if ( window.matchMedia("(max-width: 992px)").matches) { 
                        $('#sidebar').hide();
                        $('.menu-toggle').fadeIn('slide');
                        $('#homeSubmenu').hide('2500');
                        $('.menu').hide();
                    }
                }
            },
            // updateHash: false
        });
    });
// Middle Ages - Biohazard
    // $(".scroll").hover(function() {
    //     var oldScrollPos = $(window).scrollTop();
    
    //     $(window).on('scroll.scrolldisabler', function(event) {
    //     $(window).scrollTop(oldScrollPos);
    //     event.preventDefault();
    //     });
    // }, function() {
    //     $(window).off('scroll.scrolldisabler');
    // });
    
});
