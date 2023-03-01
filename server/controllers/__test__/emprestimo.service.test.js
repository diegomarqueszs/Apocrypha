import emprestimo from '../../services/emprestimo.service';

describe('Validacao de getLoan', () => {
    test('getLoan deve ser uma função', () =>{
        expect(emprestimo.getLoan).toBeInstanceOf(Function)
    })

    test('getLoan deve retornar um objeto', async () =>{
        const id = 23;
        const result = await emprestimo.getLoan(id);
        expect(result[0].id).toBe(id);
    })
})