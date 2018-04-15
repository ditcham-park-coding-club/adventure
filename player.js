var loc = window.location.href, qMarkIndex = loc.indexOf('?');

have = qMarkIndex > -1 && qMarkIndex < loc.length - 1 ?
  loc.substring(qMarkIndex + 1).split('&').map(decodeURIComponent) : [];

function go(loc) {
  if (loc) {
    window.location.href = loc + '?' + have.map(encodeURIComponent).join('&');
  } else {
    console.log("Sorry, you can't go that way.");
  }
}

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

pickUp = function () {
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
  console.log('You have: ' + have);
};

drop = function () {
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
  console.log('You have: ' + have);
};

console.log('You have: ' + have);
console.log('You can pickUp("x") or drop("x")');
