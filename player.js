function locId(loc) {
  if (loc) {
    var url = document.createElement('a');
    url.href = loc;
    var path = url.pathname.split('/').map(decodeURIComponent);
    return path.slice(-2).join('/');
  } else {
    return locId(window.location.href);
  }
}

function go(loc) {
  if (loc) {
    var id = locId(loc);
    if (id !== 'george/home.html' && been.indexOf(id) > -1) {
      console.log("You have already been there.");
    } else {
      window.location.href = loc + '?'
        + 'have=' + have.map(encodeURIComponent).join(',')
        + '&been=' + been.map(encodeURIComponent).concat(locId(window.location.href)).join(',');
    }
  } else {
    console.log("Sorry, you can't go that way.");
  }
}

function pickUp() {
  for (var i = 0; i < arguments.length; i++) {
    var what = arguments[i];
    var inHere = here.indexOf(what);
    if (inHere > -1) {
      have.push(what);
      here.splice(inHere, 1);
    } else {
      console.log('What ' + what + '?');
    }
  }
  logHave();
};

function drop() {
  for (var i = 0; i < arguments.length; i++) {
    var what = arguments[i];
    var inHave = have.indexOf(what);
    if (inHave > -1) {
      here.push(what);
      have.splice(inHave, 1);
    } else {
      console.log('What ' + what + '?');
    }
  }
  logHave();
};

function logHave() {
  console.log(have.length ? 'You have: ' + have : 'You have nothing with you');
}

(function (loc) {
  var qMarkIndex = loc.indexOf('?');
  var params = (qMarkIndex > -1 && qMarkIndex < loc.length - 1 ?
    loc.substring(qMarkIndex + 1).split('&') : []).reduce(function (params, param) {
      var eq = param.split('='), lhs = eq[0], rhs = eq[1];
      if (lhs && rhs) {
        params[decodeURIComponent(lhs)] = rhs.split(',').map(decodeURIComponent);
      }
      return params;
    }, {});

  have = params.have || [];
  been = params.been || [];

  north = east = west = south = null;
  // Pick up the page's directions on the next tick
  setTimeout(function () {
    var directions = { north: north, east: east, west: west, south: south };
    var available = Object.keys(directions).filter(dir => directions[dir]);
    if (available.length) {
      console.log('You can go(' + available.join('/') + ')');
    }
  }, 0);

  here = []; // To be overridden in the page

  logHave();
  console.log('You can pickUp("something") or drop("something")');
})(window.location.href);
