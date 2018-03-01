/* Table of Contents
==================================================
# Navigation Height
# Counter
# Progress Bar
# EasyPieChart
# MagnificPopup
# onePageNav
# Sticky Nav
# Mobile Toggle Control

==================================================
*/

$(document).ready(function(){
    $('.email-dynamic').text('lmitchell524@gmail.com');
    var navMain = $(".collapse");
    $('.scroll a').click(function(){
        navMain.collapse('hide');
    });
    $('#contact-form').on('submit',sendFormData);
    $('.logo a').click(function() {

    })
});

// -------------------------------------------------------------
//  Navigation Height
// -------------------------------------------------------------

(function() {

    var height = $(window).height();
     $(".menu-one .navbar-nav").innerHeight(height);

}());

// -------------------------------------------------------------
//Mobile Toggle Control
// -------------------------------------------------------------

$(function(){
    var navMain = $(".collapse");
    var mainBody = $('.main-wrapper');
    navMain.on("click", "a", null, function () {
        // var menuHeight = $("#mainmenu > .navbar-nav").height();
        // if(!$("#navigation > .navbar").hasClass('navbar-fixed-top')){
        //     menuHeight *= 2;
        // }
        // console.log('height is '+ menuHeight);
        // $('html').animate({scrollTop: $(this.hash).offset().top -1-menuHeight}, 1000);

        navMain.collapse('hide');
    });
    mainBody.on('click', function() {
        navMain.collapse('hide');
    })
});

// -------------------------------------------------------------
// Counter
// -------------------------------------------------------------

(function () {

    $('.counter').counterUp({
        delay: 10,
        time: 1000

    });

}());

// -------------------------------------------------------------
// Navigation Scroll
// -------------------------------------------------------------

$(window).scroll(function(event) {
    Scroll();
});

$('.scroll a').on('click touchend', function() {
    $('html, body').animate({scrollTop: $(this.hash).offset().top -1}, 1000);
    $('.collapse').collapse('hide');
    // var menuHeight = $("#mainmenu > .navbar-nav").height();
    // if(!$("#navigation > .navbar").hasClass('navbar-fixed-top')){
    //     menuHeight *= 2;
    // }
    // console.log('height is '+ menuHeight);
    // $('html').animate({scrollTop: $(this.hash).offset().top -1-menuHeight}, 1000);
    return false;
});

// User define function
function Scroll() {
    var contentTop      =   [];
    var contentBottom   =   [];
    var winTop      =   $(window).scrollTop();
    var rangeTop    =   200;
    var rangeBottom =   500;
    $('.navbar').find('.scroll a').each(function(){
        contentTop.push( $( $(this).attr('href') ).offset().top);
        contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
    })
    $.each( contentTop, function(i){
        if ( winTop > contentTop[i] - rangeTop ){
            $('.navbar .scroll')
            .removeClass('current')
            .eq(i).addClass('current');
        }
    })
};

// -------------------------------------------------------------
//  Sticky Nav
// -------------------------------------------------------------
(function () {
    function menuToggle(){
        var windowWidth = $(window).width();
        if(windowWidth > 991 ){
            $(window).on('scroll', function(){
                if( $(window).scrollTop()>735 ){
                    $('.home-two .navbar').addClass('navbar-fixed-top fadeInDown');
                    $('.home-two .navbar').removeClass('navbar-absolute fadeInUp');
                } else {
                    $('.home-two .navbar').removeClass('navbar-fixed-top fadeInDown');
                    $('.home-two .navbar').addClass('navbar-absolute fadeInUp');
                };
            });
        } else{

            $('.home-two .navbar').addClass('navbar-fixed-top');

        };
    }

    menuToggle();
}());

// -------------------------------------------------------------
//  Form
// -------------------------------------------------------------

$('.submit-btn').click(function(event){
    var inpObj = $('.email').val();
    var inpObj2 = $('.message');
    var inpObj3 = $('.name');
       if (!inpObj3["0"].validity.valid) {
           document.getElementById('name-message').innerHTML = "Please include your name";
           return;
       } else{
           document.getElementById('name-message').innerHTML = null;

       }
       if (!inpObj.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
           document.getElementById('email-message').innerHTML = "Please enter a valid email";
           return;
       } else{
           document.getElementById('email-message').innerHTML = null;

       }
       if (!inpObj2["0"].checkValidity()) {
           document.getElementById('message').innerHTML = "Please include a message";
           return;
       } else{
           document.getElementById('message').innerHTML = null;

       }

       sendFormData(event);
});

function sendFormData(event){
    var dataToSend = {
        name: $('.name').val(),
        email: $('.email').val(),
        subject: $('.subject').val(),
        message: $('.message').val()
    }

    $.ajax({
        method: 'POST',
        dataType: 'json',
        data: dataToSend,
        url: 'server/php_mailer/mail_handler.php',
        success: function(data){
            console.log('success:', data);
            $('.name').val('');
            $('.email').val('');
            $('.subject').val('');
            $('.message').val('');
        },
        error: function(error){
            console.log('fail', error);
        }
    })
    event.preventDefault();
}
