import livro from '../../services/livro.service';

describe('Validacao de getLivro', () => {
    test('getLivro deve ser uma função', () =>{
        expect(livro.getLivro).toBeInstanceOf(Function)
    })
    test('getLivro deve retornar um objeto', async () =>{
        const nome = 'LOTR';
        const result = await livro.getLivro(nome);
        expect(result[0].nome).toBe(nome);
    })
})