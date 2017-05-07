var expect = chai.expect


describe('Arbol', function(){
    
    it ('Prueba', function () {
        expect(PEG.parse("a = b+2")).to.deep.equal({ type: '=',
                                                      left: { type: 'ID', value: 'a' },
                                                      right: 
                                                       { type: '+',
                                                         left: { type: 'ID', value: 'b' },
                                                         right: { type: 'NUMBER', value: '2' } } });
    });
    
});