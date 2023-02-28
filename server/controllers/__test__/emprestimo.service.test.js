import emprestimo from '../../services/emprestimo.service';

describe('Validacao de getLoan', () => {
    test('getLoan deve ser uma função', () =>{
        expect(emprestimo.getLoan).toBeInstanceOf(Function)
    })
})