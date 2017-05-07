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
    
});