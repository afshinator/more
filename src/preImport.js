module homunculus from 'homunculus';
import join from './join';
import ignore from './ignore';

var Token = homunculus.getClass('token', 'css');
var Node = homunculus.getClass('node', 'css');

var index;

function recursion(node, ignores) {
  if(!node.isToken()) {
    if(node.name() == Node.STYLESET) {
      return;
    }
    else if(node.name() == Node.IMPORT) {
      index = ignore(node, ignores, index);
    }
    else {
      node.leaves().forEach(function(leaf) {
        recursion(leaf, ignores);
      });
    }
  }
  else if(!node.token().isVirtual()) {
    while(ignores[++index]) {}
  }
}

export default function(node, ignores, i, ignoreImport) {
  if(ignoreImport) {
    index = i;
    recursion(node, ignores);
  }
  var res = [];
  var leaves = node.leaves();
  for(var i = 0, len = leaves.length; i < len; i++) {
    var leaf = leaves[i];
    if(leaf.name() == Node.STYLESET) {
      return res;
    }
    else if(leaf.name() == Node.IMPORT) {
      var url = leaf.leaf(1);
      if(url.size() == 1) {
        res.push(url.first().token().val());
      }
      else {
        res.push(url.leaf(2).token().val());
      }
    }
  }
  return res;
}