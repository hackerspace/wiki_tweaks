/* Any JavaScript here will be loaded for all users on every page load. */
// General purpose functions
// (none)

// Namespace B48NS
var B48NS = {
  log : function(msg) {
    if( window['console'] ) {
      console.log(msg);
    }
  }
};

B48NS.shortenIsoDates = function() {
  $('.Last-Modified').each(function(i,e){
      orig = $(e).html();
      $(e).html(orig.replace(/T\d\d:\d\d:\d\d/, ''));
  })
}

var base48 = function() {
  // private

  var isMainPage = function() {
      return location.href.indexOf('/Main_Page') != -1;
  };

  // public
  return {
    init: function(){
      if( isMainPage() ) {
        B48NS.shortenIsoDates();
      }
    }
  }
}();

$(base48.init);
