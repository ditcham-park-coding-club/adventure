var loc = window.location.href, qMarkIndex = loc.indexOf('?');

have = qMarkIndex > -1 && qMarkIndex < loc.length - 1 ?
  loc.substring(qMarkIndex + 1).split('&').map(decodeURIComponent) : [];

function go(loc) {
  window.location.href = loc + '?' + have.map(encodeURIComponent).join('&');
}

console.log('You have: ' + have);
