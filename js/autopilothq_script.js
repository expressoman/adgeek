(function(w, j) {
  console.log('Window', w);
  console.log('jQuery', j);
  j.expr[':'].regex = function(elem, index, match) {
    var matchParams = match[3].split(','),
        validLabels = /^(data|css):/,
        attr = {
          method: matchParams[0].match(validLabels) ? 
          matchParams[0].split(':')[0] : 'attr',
          property: j.trim(matchParams.shift().replace(validLabels,''))
        },
        regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), 'ig');
    return regex.test(j(elem)[attr.method](attr.property));
  };

  var pollingEvent = w.setInterval(function() {
    var h = j.('iframe:regex(src, https://api.autopilothq.com/anywhere/headsup)');
    
    if (h.length == 0) {
      return;
    } else {
      var s = h.attr('style');
      h.attr('style', s + 'z-index: 30000000000000 !important');
      w.clearInterval(pollingEvent);
    }
  }, 1000);
})(Window, jQuery);
