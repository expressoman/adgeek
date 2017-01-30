jQuery.expr[':'].regex = function(elem, index, match) {
  var matchParams = match[3].split(','),
      validLabels = /^(data|css):/,
      attr = {
        method: matchParams[0].match(validLabels) ? 
        matchParams[0].split(':')[0] : 'attr',
        property: jQuery.trim(matchParams.shift().replace(validLabels,''))
      },
      regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), 'ig');
  return regex.test(jQuery(elem)[attr.method](attr.property));
};

var pollingEvent = setInterval(function() {
  var h = $('iframe:regex(src, https://api.autopilothq.com/anywhere/headsup)');
  
  if (h.length == 0) {
    return;
  } else {
    var s = h.attr('style');
    h.attr('style', s + 'z-index: 30000000000000 !important');
    clearInterval(pollingEvent);
  }
}, 1000);
