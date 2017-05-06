
statement
  = left:ID ASSIGN right:expresion {
      return {
        type: '=', 
        left: left, 
        right: right
      };
    }
  / CALL id:ID {
    return {
      type: 'CALL', 
      function: id.value
    };
  }
  / IF c:condition THEN s:statement {
    return {
      type: 'IFTHEN', 
      condition: c, 
      statement: s
    };
  }
  / WHILE c:condition DO s:statement {
    return {
      type: 'WHILEDO', 
      condition: c, 
      statement: s
    };
  }
  / BEGIN first:statement rest:(SEMICOLON statement)* END {
    var s = [first];
    
    if(rest.length > 0) {
      rest.forEach(function(st) {
        s.push(st[1]);
      });
    }
    
    return {
      type: 'BEGINEND', 
      statements: s
    };
  }

condition
  = left:expresion comparison:COMPARISON right:expresion {
      return {
        type: comparison,
        left: left,
        right: right
      };
    }

expresion
  = first:term rest:(ADDOP term)* {
     if (rest.length != 0) {
      var op = rest[0][0];
      var rightNode = rest[rest.length-1][1];
      
      for(var i = rest.length - 1; i > 0; i--) {
        op = rest[i][0]
        rightNode = {
          type: op, 
          left: rest[i-1][1], 
          right: rightNode
        }
      }
      
      return {
        type: op, 
        left: first, 
        right: rightNode
      };
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
        rightNode = {
          type: op, 
          left: rest[i-1][1], 
          right: rightNode
        }
      }
      
      return {
        type: op, 
        left: first, 
        right: rightNode
      };
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
COMPARISON = _ comparison:("=="/"!="/"<="/">="/"<"/">") _ { return comparison; }
ASSIGN   = _ op:'=' _
CALL = _"call"  _
IF = _ "if" _
THEN = _ "then" _
WHILE = _ "while" _
DO = _ "do" _
BEGIN = _ "begin" _
END = _ "end" _
SEMICOLON = _ ";" _