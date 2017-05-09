var expect = chai.expect


describe('Arbol', function(){
    
    it ('Se pueden hacer asignaciones', function () {
        expect(PEG.parse("a = b + 2.")).to.deep.equal({ program: 
                                                       { declarations: { constants: null, variables: null },
                                                         functions: null,
                                                         statements: 
                                                          { type: '=',
                                                            left: { type: 'ID', value: 'a' },
                                                            right: 
                                                             { type: '+',
                                                               left: { type: 'ID', value: 'b' },
                                                               right: { type: 'NUMBER', value: '2' } } } } });
    });
    
    it ('Se pueden hacer llamadas a funciones y su declaracion', function () {
        expect(PEG.parse(`procedure b
                            begin
                            var b;
                             b = b * 2
                            end
                            call b.`)).to.deep.equal({ program: 
                                                       { declarations: { constants: null, variables: null },
                                                         functions: 
                                                          { type: 'function',
                                                            id: { type: 'ID', value: 'b' },
                                                            body: 
                                                             { declarations: 
                                                                { constants: null,
                                                                  variables: [ { type: 'variable', id: { type: 'ID', value: 'b' } } ] },
                                                               functions: null,
                                                               statements: 
                                                                { type: '=',
                                                                  left: { type: 'ID', value: 'b' },
                                                                  right: 
                                                                   { type: '*',
                                                                     left: { type: 'ID', value: 'b' },
                                                                     right: { type: 'NUMBER', value: '2' } } } } },
                                                         statements: { type: 'CALL', function: 'b' } } });
    });
    
     it ('Se puede usar el bucle while', function () {
        expect(PEG.parse(`begin
                                while x <= 10 do
                                begin     
                                  x = x + 1
                                end
                            end.`)).to.deep.equal({ program: 
                                                   { declarations: { constants: null, variables: null },
                                                     functions: null,
                                                     statements: 
                                                      { type: 'BEGINEND',
                                                        statements: 
                                                         [ { type: 'WHILEDO',
                                                             condition: 
                                                              { type: '<=',
                                                                left: { type: 'ID', value: 'x' },
                                                                right: { type: 'NUMBER', value: '10' } },
                                                             statement: 
                                                              { type: 'BEGINEND',
                                                                statements: 
                                                                 [ { type: '=',
                                                                     left: { type: 'ID', value: 'x' },
                                                                     right: 
                                                                      { type: '+',
                                                                        left: { type: 'ID', value: 'x' },
                                                                        right: { type: 'NUMBER', value: '1' } } } ] } } ] } } });
    });
    
     it ('Existe la sentencia if then', function () {
        expect(PEG.parse(`var a;
                            begin 
                                a = 4;
                                if a ==4 then a = 4 / 2
                            end.`)).to.deep.equal({ program: 
                                                   { declarations: 
                                                      { constants: null,
                                                        variables: [ { type: 'variable', id: { type: 'ID', value: 'a' } } ] },
                                                     functions: null,
                                                     statements: 
                                                      { type: 'BEGINEND',
                                                        statements: 
                                                         [ { type: '=',
                                                             left: { type: 'ID', value: 'a' },
                                                             right: { type: 'NUMBER', value: '4' } },
                                                           { type: 'IFTHEN',
                                                             condition: 
                                                              { type: '==',
                                                                left: { type: 'ID', value: 'a' },
                                                                right: { type: 'NUMBER', value: '4' } },
                                                             statement: 
                                                              { type: '=',
                                                                left: { type: 'ID', value: 'a' },
                                                                right: 
                                                                 { type: '/',
                                                                   left: { type: 'NUMBER', value: '4' },
                                                                   right: { type: 'NUMBER', value: '2' } } } } ] } } });
    });
    
     it ('Se pueden declarar constantes', function () {
        expect(PEG.parse(`const a = 5, pi = 3.14;
                            var b;
                            begin
                            b = a * a
                            end.`)).to.deep.equal({ program: 
                                                   { declarations: 
                                                      { constants: 
                                                         [ { type: 'constant',
                                                             left: { type: 'ID', value: 'a' },
                                                             right: { type: 'NUMBER', value: '5' } },
                                                           { type: 'constant',
                                                             left: { type: 'ID', value: 'pi' },
                                                             right: { type: 'NUMBER', value: '3.14' } } ],
                                                        variables: [ { type: 'variable', id: { type: 'ID', value: 'b' } } ] },
                                                     functions: null,
                                                     statements: 
                                                      { type: 'BEGINEND',
                                                        statements: 
                                                         [ { type: '=',
                                                             left: { type: 'ID', value: 'b' },
                                                             right: 
                                                              { type: '*',
                                                                left: { type: 'ID', value: 'a' },
                                                                right: { type: 'ID', value: 'a' } } } ] } } });
    });
    
      it ('Se pueden declarar variables', function () {
            expect(PEG.parse(`var x, y, z;
                                begin
                                if z == 100 then z = x + y / 100
                                end.`)).to.deep.equal({ program: 
                                                       { declarations: 
                                                          { constants: null,
                                                            variables: 
                                                             [ { type: 'variable', id: { type: 'ID', value: 'x' } },
                                                               { type: 'variable', id: { type: 'ID', value: 'y' } },
                                                               { type: 'variable', id: { type: 'ID', value: 'z' } } ] },
                                                         functions: null,
                                                         statements: 
                                                          { type: 'BEGINEND',
                                                            statements: 
                                                             [ { type: 'IFTHEN',
                                                                 condition: 
                                                                  { type: '==',
                                                                    left: { type: 'ID', value: 'z' },
                                                                    right: { type: 'NUMBER', value: '100' } },
                                                                 statement: 
                                                                  { type: '=',
                                                                    left: { type: 'ID', value: 'z' },
                                                                    right: 
                                                                     { type: '+',
                                                                       left: { type: 'ID', value: 'x' },
                                                                       right: 
                                                                        { type: '/',
                                                                          left: { type: 'ID', value: 'y' },
                                                                          right: { type: 'NUMBER', value: '100' } } } } } ] } } });
    });
    
      it ('Sentencia return', function () {
        expect(PEG.parse(`var x;
                            begin    
                                a = 0;
                                while x <= 10 do
                                begin
                                 
                                  x = x + 1
                                end;
                                a = x * x;
                                return a + x
                            end.`)).to.deep.equal({ program: 
                                                   { declarations: 
                                                      { constants: null,
                                                        variables: [ { type: 'variable', id: { type: 'ID', value: 'x' } } ] },
                                                     functions: null,
                                                     statements: 
                                                      { type: 'BEGINEND',
                                                        statements: 
                                                         [ { type: '=',
                                                             left: { type: 'ID', value: 'a' },
                                                             right: { type: 'NUMBER', value: '0' } },
                                                           { type: 'WHILEDO',
                                                             condition: 
                                                              { type: '<=',
                                                                left: { type: 'ID', value: 'x' },
                                                                right: { type: 'NUMBER', value: '10' } },
                                                             statement: 
                                                              { type: 'BEGINEND',
                                                                statements: 
                                                                 [ { type: '=',
                                                                     left: { type: 'ID', value: 'x' },
                                                                     right: 
                                                                      { type: '+',
                                                                        left: { type: 'ID', value: 'x' },
                                                                        right: { type: 'NUMBER', value: '1' } } } ] } },
                                                           { type: '=',
                                                             left: { type: 'ID', value: 'a' },
                                                             right: 
                                                              { type: '*',
                                                                left: { type: 'ID', value: 'x' },
                                                                right: { type: 'ID', value: 'x' } } },
                                                           { type: 'RETURN',
                                                             value: 
                                                              { type: '+',
                                                                left: { type: 'ID', value: 'a' },
                                                                right: { type: 'ID', value: 'x' } } } ] } } });
    });
    
});