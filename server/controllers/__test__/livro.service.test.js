import livro from '../../services/livro.service';

describe('Validacao de getLivro', () => {
    test('getLivro deve ser uma função', () =>{
        expect(livro.getLivro).toBeInstanceOf(Function)
    })
})