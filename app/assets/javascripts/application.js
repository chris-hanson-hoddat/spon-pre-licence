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


// Change logo link to route of proto rather than gov.uk
$('#logo').attr('href', '/');

// Change service title link to relevant location based on sponsor or casework
if( /sponsor/.test(window.location.href) ){
  $('#proposition-name').attr('href', '/sponsor/start');
}
else if( /casework/.test(window.location.href) ){
  $('#proposition-name').attr('href', '/casework/workstack');
}




$("#js-searchtoggle").click(function(e) {
  e.preventDefault();
  $("#js-searchfilters").toggle();
  $(this)
  .toggleText('Show search', 'Close search')
  .toggleClass('open');
});




/////// TOGGLE ADDITIONAL
// Toggles an additional entry with a remove option
// e.g. dual nationality
$('.js-toggle-content').hide();

$('.js-toggle-open').click(function(e) {
  e.preventDefault();

  $('.js-toggle-content').show();
  $('.js-toggle-open').hide();

});

$('.js-toggle-close').click(function(e) {
  e.preventDefault();

  $('.js-toggle-content').hide();
  $('.js-toggle-open').show();

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




var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};


/////// COUNTRIES TYPEAHEAD
// storing in a JSON file wasn't working consistently so I've moved here
var countries = ["Andorra","United Arab Emirates","Afghanistan","Antigua and Barbuda","Anguilla","Albania","Armenia","Angola","Antarctica","Argentina","American Samoa","Austria","Australia","Aruba","Åland","Azerbaijan","Bosnia and Herzegovina","Barbados","Bangladesh","Belgium","Burkina Faso","Bulgaria","Bahrain","Burundi","Benin","Saint Barthélemy","Bermuda","Brunei","Bolivia","Bonaire","Brazil","Bahamas","Bhutan","Bouvet Island","Botswana","Belarus","Belize","Canada","Cocos [Keeling] Islands","Democratic Republic of the Congo","Central African Republic","Republic of the Congo","Switzerland","Ivory Coast","Cook Islands","Chile","Cameroon","China","Colombia","Costa Rica","Cuba","Cape Verde","Curacao","Christmas Island","Cyprus","Czechia","Germany","Djibouti","Denmark","Dominica","Dominican Republic","Algeria","Ecuador","Estonia","Egypt","Western Sahara","Eritrea","Spain","Ethiopia","Finland","Fiji","Falkland Islands","Micronesia","Faroe Islands","France","Gabon","United Kingdom","Grenada","Georgia","French Guiana","Guernsey","Ghana","Gibraltar","Greenland","Gambia","Guinea","Guadeloupe","Equatorial Guinea","Greece","South Georgia and the South Sandwich Islands","Guatemala","Guam","Guinea-Bissau","Guyana","Hong Kong","Heard Island and McDonald Islands","Honduras","Croatia","Haiti","Hungary","Indonesia","Ireland","Israel","Isle of Man","India","British Indian Ocean Territory","Iraq","Iran","Iceland","Italy","Jersey","Jamaica","Jordan","Japan","Kenya","Kyrgyzstan","Cambodia","Kiribati","Comoros","Saint Kitts and Nevis","North Korea","South Korea","Kuwait","Cayman Islands","Kazakhstan","Laos","Lebanon","Saint Lucia","Liechtenstein","Sri Lanka","Liberia","Lesotho","Lithuania","Luxembourg","Latvia","Libya","Morocco","Monaco","Moldova","Montenegro","Saint Martin","Madagascar","Marshall Islands","Macedonia","Mali","Myanmar [Burma]","Mongolia","Macao","Northern Mariana Islands","Martinique","Mauritania","Montserrat","Malta","Mauritius","Maldives","Malawi","Mexico","Malaysia","Mozambique","Namibia","New Caledonia","Niger","Norfolk Island","Nigeria","Nicaragua","Netherlands","Norway","Nepal","Nauru","Niue","New Zealand","Oman","Panama","Peru","French Polynesia","Papua New Guinea","Philippines","Pakistan","Poland","Saint Pierre and Miquelon","Pitcairn Islands","Puerto Rico","Palestine","Portugal","Palau","Paraguay","Qatar","Réunion","Romania","Serbia","Russia","Rwanda","Saudi Arabia","Solomon Islands","Seychelles","Sudan","Sweden","Singapore","Saint Helena","Slovenia","Svalbard and Jan Mayen","Slovakia","Sierra Leone","San Marino","Senegal","Somalia","Suriname","South Sudan","São Tomé and Príncipe","El Salvador","Sint Maarten","Syria","Swaziland","Turks and Caicos Islands","Chad","French Southern Territories","Togo","Thailand","Tajikistan","Tokelau","East Timor","Turkmenistan","Tunisia","Tonga","Turkey","Trinidad and Tobago","Tuvalu","Taiwan","Tanzania","Ukraine","Uganda","U.S. Minor Outlying Islands","United States","Uruguay","Uzbekistan","Vatican City","Saint Vincent and the Grenadines","Venezuela","British Virgin Islands","U.S. Virgin Islands","Vietnam","Vanuatu","Wallis and Futuna","Samoa","Kosovo","Yemen","Mayotte","South Africa","Zambia","Zimbabwe"];

$('.country-typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 3
},
{
  name: 'countries',
  source: substringMatcher(countries),
  templates: {
    empty: [
      '<p class="tt-suggestion">No matches found - please search again</p>'].join('\n')
    }
});
