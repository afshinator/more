module homunculus from 'homunculus';

var Token = homunculus.getClass('token');
var Node = homunculus.getClass('node', 'css');

function concat(arr, res = [], index = 0, temp = '') {
  if(index == arr.length) {
    res.push(temp.trim());
  }
  else {
    for(var i = 0, se = arr[index], len = se.length; i < len; i++) {console.log(se[i])
      var newTemp = temp + (temp.length && !/\s$/.test(temp) && se[i].charAt(0) != '&' ? ' ' : '') + se[i].replace(/^&/, '');
      concat(arr, res, index + 1, newTemp);
    }
  }
  if(index == 0) {
    return res.join(',').trim();
  }
}

export default concat;