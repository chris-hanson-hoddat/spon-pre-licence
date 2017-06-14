/* global $ */
/* global GOVUK */

// Warn about using the kit in production
if (
  window.sessionStorage && window.sessionStorage.getItem('prototypeWarning') !== 'false' &&
  window.console && window.console.info
) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
  window.sessionStorage.setItem('prototypeWarning', true)
}

$(document).ready(function () {
  // Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
  // with role="button" when the space key is pressed.
  GOVUK.shimLinksWithButtonRole.init()

  // Show and hide toggled content
  // Where .multiple-choice uses the data-target attribute
  // to toggle hidden content
  var showHideContent = new GOVUK.ShowHideContent()
  showHideContent.init()
})

$.fn.extend({
  toggleText: function(a, b){
    return this.text(this.text() == b ? a : b);
  }
});




$("#js-searchtoggle").click(function(e) {
  e.preventDefault();
  $("#js-searchfilters").toggle();
  $(this)
  .toggleText('Show search', 'Close search')
  .toggleClass('open');
});





// Set dates dynamically so they stay useful throughout prototyping
$('.date').each(function() {
  var days = $(this).data('days');
  var currentTime = new Date();
  currentTime.setDate(currentTime.getDate()+days);
  var month = currentTime.getMonth();

  var months = [ "January", "February", "March", "April", "May", "June",
                 "July", "August", "September", "October", "November", "December", "January" ];

  var monthName = months[month];

  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  $(this).text(day + " " + monthName + " " + year);
});




// Left nav
// Left hand tab navigation, e.g. case screen
$('.leftnavlinks').click(function(e) {
  e.preventDefault();
  var current = $('.leftnavlinks.active').data('target');
  var target = $(this).data('target');

  // If the continue button is selected
  if ( $(this).hasClass('button') ) {
    $('.leftnavcontent').hide();
    $('#'+target).show();
    $('.leftnavlinks').removeClass('active');
    $('.'+target).addClass('active');
    $('html,body').scrollTop(0);
    $('.'+target).parent().prev().find('.tag--complete').show();

    // remove all if this is a resubmit
    $('.'+current+'-results').find('tr').remove();

    // Store and display case details
    // loop through any form input with class of .store...
    $('#'+current+' .store').each(function (index, value) {
      //store the name attribute (key) and the value entered (value)...
      var thisKey = $(this).attr('name');
      var thisVal = $(this).val();

      if ( thisVal.length > 0 ) {
        $('.results-title').removeClass('visuallyhidden');
        $('.'+current+'-results')
          .append(
            '<tr><th>' + thisKey + '</th><td>' + thisVal + '</td></tr>'
            )
          .show();
      }
    });
  }
  else {
    $('.leftnavcontent').hide();
    $('#'+target).show();
    $('.leftnavlinks').removeClass('active');
    $('.'+target).addClass('active');
  }


}); // /left links
