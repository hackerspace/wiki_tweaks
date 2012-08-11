/* Any JavaScript here will be loaded for all users on every page load. */
// General purpose functions
if( typeof(String.prototype.capitalize) === "undefined" )
{
  String.prototype.capitalize = function()
  {
    return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
  };
}

if(typeof(String.prototype.trimRight) === "undefined")
{
    String.prototype.trimRight = function()
    {
        return String(this).replace(/\s+$/g, '');
    };
}

if(typeof(String.prototype.trimLeft) === "undefined")
{
    String.prototype.trimLeft = function()
    {
        return String(this).replace(/^\s+/g, '');
    };
}

if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function()
    {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

if(typeof(Date.prototype.getHours2) === "undefined")
{
  Date.prototype.getHours2 = function()
  {
    var h = this.getHours();
    if( h < 10 ) {
      return "0" + h.toString();
    }
    return h.toString();
  }
}

if(typeof(Date.prototype.getMinutes2) === "undefined")
{
  Date.prototype.getMinutes2 = function()
  {
    var h = this.getMinutes();
    if( h < 10 ) {
      return "0" + h.toString();
    }
    return h.toString();
  }
}

///////////////////////////////////////////////////////////////////////
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
  var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
    timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
    timezoneClip = /[^-+\dA-Z]/g,
    pad = function (val, len) {
      val = String(val);
      len = len || 2;
      while (val.length < len) val = "0" + val;
      return val;
    };

  // Regexes and supporting functions are cached through closure
  return function (date, mask, utc) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) throw SyntaxError("invalid date");

    mask = String(dF.masks[mask] || mask || dF.masks["default"]);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == "UTC:") {
      mask = mask.slice(4);
      utc = true;
    }

    var _ = utc ? "getUTC" : "get",
      d = date[_ + "Date"](),
      D = date[_ + "Day"](),
      m = date[_ + "Month"](),
      y = date[_ + "FullYear"](),
      H = date[_ + "Hours"](),
      M = date[_ + "Minutes"](),
      s = date[_ + "Seconds"](),
      L = date[_ + "Milliseconds"](),
      o = utc ? 0 : date.getTimezoneOffset(),
      flags = {
        d:    d,
        dd:   pad(d),
        ddd:  dF.i18n.dayNames[D],
        dddd: dF.i18n.dayNames[D + 7],
        m:    m + 1,
        mm:   pad(m + 1),
        mmm:  dF.i18n.monthNames[m],
        mmmm: dF.i18n.monthNames[m + 12],
        yy:   String(y).slice(2),
        yyyy: y,
        h:    H % 12 || 12,
        hh:   pad(H % 12 || 12),
        H:    H,
        HH:   pad(H),
        M:    M,
        MM:   pad(M),
        s:    s,
        ss:   pad(s),
        l:    pad(L, 3),
        L:    pad(L > 99 ? Math.round(L / 10) : L),
        t:    H < 12 ? "a"  : "p",
        tt:   H < 12 ? "am" : "pm",
        T:    H < 12 ? "A"  : "P",
        TT:   H < 12 ? "AM" : "PM",
        Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
        o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
        S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
      };

    return mask.replace(token, function ($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
  };
}();

// Some common format strings
dateFormat.masks = {
  "default":      "ddd mmm dd yyyy HH:MM:ss",
  shortDate:      "m/d/yy",
  mediumDate:     "mmm d, yyyy",
  longDate:       "mmmm d, yyyy",
  fullDate:       "dddd, mmmm d, yyyy",
  shortTime:      "h:MM TT",
  mediumTime:     "h:MM:ss TT",
  longTime:       "h:MM:ss TT Z",
  isoDate:        "yyyy-mm-dd",
  isoTime:        "HH:MM:ss",
  isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
  dayNames: [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ],
  monthNames: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
  return dateFormat(this, mask, utc);
};
///////////////////////////////////////////////////////////////////////////////////////



// Namespace B48NS
var B48NS = {
  log : function(msg) {
    if( window['console'] ) {
      console.log(msg);
    }
  }
};

B48NS.projectTablesDefaultSort = function() {
  $('.project-last-modified').click();
  $('.project-last-modified').click();
}

B48NS.applyStyleToEventBox = function() {
  var data = [];  // other events
  var rdata = []; // regular events
  var box = $('#b48mw-events-box li')
  $(box).each(
    function(i,e) {
                        var evdata = $(e).html().trim();
      if (evdata.length && evdata[0] == 'R') {
        rdata[rdata.length] = evdata;
      }
      else {
        data[data.length] = evdata;
      }
    }
  );
  var dateIcon = '<i class="icon-calendar"></i>'

  // Timestamp values for sorting the events
  var datesList = [];
  // Timestamp : content
  var datesMap = {};

  var dayMapping = {
    'SUN':0,
    'MON':1,
    'TUE':2,
    'WED':3,
    'THU':4,
    'FRI':5,
    'SAT':6
  };

  var today = new Date();
  var dateBase = today;
  if( today.getDay() != 0 )
  {
    dateBase = new Date( today.getTime() );
    dateBase.setDate( today.getDate() - today.getDay() );
    // dateBase will be always the previous sunday or today
    dateBase.setHours(0);
    dateBase.setMinutes(0);
    dateBase.setSeconds(0);
    dateBase.setMilliseconds(0);
  }

  // Generate 4 weeks
  var regularWeekGenerationCount = 4;
  for ( idx in rdata ) {
    var mres = rdata[idx].match(/^R(SUN|MON|TUE|WED|THU|FRI|SAT)\s+(\d\d):(\d\d)\s+(.*)$/);
    if ( mres ) {
      var dayValue = dayMapping[mres[1]];

      var timeOffset = 0;
      if ( dayValue > 0 ) {
        var toffset = new Date(0);
        toffset.setDate( dayValue + 1 );
        timeOffset = toffset.getTime();
      }
      // Day adjustment relatively to the previous sunday (might be today)
      var evdate = new Date( dateBase.getTime() + timeOffset );
      evdate.setHours( mres[2] );
      evdate.setMinutes( mres[3] );

      for( week = 0; week < regularWeekGenerationCount; ++week ) {
        if( week > 0 ) {
          evdate.setDate( evdate.getDate() + 7 );
          // Daylight saving adjustment
          if ( evdate.getHours() < mres[2] ) {
            evdate.setHours( evdate.getHours() + 1 );
          }
          else if ( evdate.getHours() > mres[2] ) {
            evdate.setHours( evdate.getHours() - 1 );
          }
        }
        var stamp = evdate.getTime();
        datesList[datesList.length] = stamp;
        if( !(evdate.getTime() in datesMap) ) {
            datesMap[stamp] = [];
        }        
        datesMap[stamp][datesMap[stamp].length] = { title: mres[4], regular: true };
      }
    }
  }

  // Process non regular events after the regular events - so those get overwritten and not the non-regular ones
  for( idx in data ) {
    var mres = data[idx].match(/^(\d\d\d\d)-(\d\d)-(\d\d)\s+(\d\d):(\d\d)\s+(.*)$/);
    if( mres ) {
      var d = new Date(mres[1], mres[2]-1, mres[3], mres[4], mres[5], 0, 0);
      var stamp = d.getTime();
      datesList[datesList.length] = stamp;
      if( !(evdate.getTime() in datesMap) ) {
        datesMap[stamp] = [];
      }        
      datesMap[stamp][datesMap[stamp].length] = { title: mres[4], regular: false };
    }
  }

  // bring the events in order by time and date ( using the timestamp value :) )
  datesList.sort();

  // Generate events list
  var evlist = '';
  for( idx in datesList ) {    
    var ts = datesList[idx];
    for( didx in datesMap[ts] ) {
      var highlightClass = '';
      if( datesMap[ts][didx].regular === true ) {
        highlightClass = ' b48mw-highlighted-event';
      }
      var d = new Date(ts);
      var evname = datesmap[ts][didx].title;


      // datesList is ordered by time and date => If there's an event before
      // we don't put a <dt> anymore
      var dstr = d.toDateString();
      if ( evlist.search(dstr) == -1 ) {
        evlist += '<dt class="b48mw-event-date' + highlightClass + '">' + dateIcon + ' ' + d.format('dddd, mmmm dS, yyyy') + '</dt>';
      }

      evlist += '<dd class="b48mw-event-info' + highlightClass + '"><span class="b48mw-event-time">' + d.getHours2() + ':' + d.getMinutes2() + '</span> - ' + evname + '</dd>';
    }
  }

  var evbox = '<dl class="b48mw-event-list">' + evlist + '</dl>';

  $('#b48mw-events-box').html(evbox);
}

B48NS.applyStyleToNewsList = function() {
  var newsIcon = '<i class="icon-pushpin"></i>';

  var newsList = '<dl class="b48mw-news-list">';
  $('#b48mw-news-box li').each(
    function(i,e) {
      var mres = $(e).html().trim().match(/(\d\d\d\d-\d\d-\d\d)\s+(.*)$/);
      if( mres ) {
        var date = new Date(Date.parse(mres[1]));
        newsList += '<dt class="b48mw-news-date">' + newsIcon + ' ' + date.format('dddd, mmmm dS, yyyy') + '</dt>';
        newsList += '<dd class="b48mw-news-content"><div class="b48mw-news-content-wrap">' + mres[2] + '</div></dd>';
      }
    }
  );
  $('#b48mw-news-box').html( newsList + '</dl>' ).toggle();
}



// Makes User: links for usernames in meta fields
B48NS.linkifyUsers = function() {

  // Base48 Wiki test
  $(".base48-wiki-users").each(
    function(e,i) {
      var c = $(i).html();
      if ( c.search('TODO')  != -1 ) {
        return;
      }
      var r = c.replace(/[,\s]+/, function($0, $1){ return $1 ? ',' : ''; });
      var result = r.split(',');
      var newText = "";
      for(x = 0; x < result.length; x++) {
        if( newText.length > 0 ) {
          newText += ", ";
        }
        newText += '<a href="/User:' + result[x].capitalize() + '">' + result[x] + '</a>'
      }
      $(i).html(newText);
    }
    );
}

B48NS.fixFloatingImageThumbs = function() {
    $('#b48mw-news-box .thumb').each(
      function(i,e) {
        if( $(e).hasClass('tright') ) {
          $(e).removeClass('tright');
        }
      }
    );
}

var base48 = function() {
  // private

  var isMainPage = function() {
      return location.href.indexOf('wiki.base48.cz/Main_Page') != -1;
  };

  var restyleMainPage = function() {
    $('#firstHeading').hide();
    $('#left-navigation').hide(); // Page|Discussion
    //$('#p-cactions').hide();  // page actions (protect, delete, move)
    $('#ca-view').hide();  // read button
    //$('#ca-history').hide(); // history button
  };

  var restyleFeaturedProject = function() {
    // Current Featured project details retrieval
                var cont = $('#b48mw-featured-project');
    var imageLocation     = cont.find('.img img').attr('src');
    var projectLink     = cont.find('.link a');
    var projectLinkTitle          = $(projectLink).attr('title');
    var projectLinkName           = $(projectLink).text();
    var projectLink     = $(projectLink).attr('href');
    var description     = cont.find('.desc').html();
    var github            = cont.find('.github').html();
    var modifiedDate    = cont.find('.modif').text().trim();

    // New style generation
    var heading = '<h2 class="b48mw-featured-project-heading">Featured Project</h2>';
                if(github) {
                                github = '<li><i class="icon-github-sign"></i>'+github+'</li>';
                }
    var details = '<h3 class="b48mw-title">' + projectLinkName + '</h3>'
          + '<a href="' + projectLink + '">'
          + '<img src="' + imageLocation + '" alt="' + projectLinkTitle + ' project image" /></a>'
          + '<div class="b48mw-project-description">' + description + ''
          + '<ul>'
          + '<li><i class="icon-file"></i> <a href="' + projectLink + '">Project page</a></li>'
          + github
          + '<li><i class="icon-time"></i> Updated: ' + dateFormat( modifiedDate, 'dddd, mmmm dS, yyyy') + '</li>'
          + '</div>'
          + '</ul>'
          ;
    var content = '<div class="b48mw-featured-project-container">' + details + '</div>';

    $('#b48mw-featured-project').html(heading + content);
    /*$('#b48mw-featured-project').click(function() {
      window.location.href = projectLink;
    });*/
  }

  // public
  return {
    init: function(){
      if( $('.b48mw-code-box') ) {
      }

      if( isMainPage() ) {
        B48NS.linkifyUsers();
        setTimeout(B48NS.projectTablesDefaultSort, 500);
        B48NS.applyStyleToEventBox();
        B48NS.applyStyleToNewsList();
        B48NS.fixFloatingImageThumbs();
        restyleMainPage();
        restyleFeaturedProject();
      }
    }
  }
}();

$(base48.init);
