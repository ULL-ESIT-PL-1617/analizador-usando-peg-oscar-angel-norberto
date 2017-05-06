


expresion
  = first:term rest:(ADDOP term)* {
     if (rest.length != 0) {
      var op = rest[0][0];
      var rightNode = rest[rest.length-1][1];
      
      for(var i = rest.length - 1; i > 0; i--) {
        op = rest[i][0]
        rightNode = {type: op, left: rest[i-1][1], right: rightNode}
      }
      
      return {type: op, left: first, right: rightNode};
    }
    else {
      return first;
    }
  }

term
  = first:factor rest:(MULOP factor)* {
    if (rest.length != 0) {
      var op = rest[0][0];
      var rightNode = rest[rest.length-1][1];
      
      for(var i = rest.length - 1; i > 0; i--) {
        op = rest[i][0]
        rightNode = {type: op, left: rest[i-1][1], right: rightNode}
      }
      
      return {type: op, left: first, right: rightNode};
    }
    else {
      return first;
    }
  }

factor
  = LEFTPAR exp:expresion RIGHTPAR {
    return exp;
  }
  / NUM
  / ID
  
_ = $[ \t\n\r]*
  
LEFTPAR = _"("_
RIGHTPAR = _")"_
NUM = _ n:$[0-9]+ _ { return {type: 'NUMBER', value: n}; }
ID = _ id:$([a-z_]i$([a-z0-9_]i*)) _ { return {type: 'ID', value: id}; }

ADDOP = _ op:[+-] _ { return op; }
MULOP = _ op:[*/] _ { return op; }

  
