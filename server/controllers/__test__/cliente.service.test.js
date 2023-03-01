import cliente from '../../services/cliente.service';

describe('Validacao de getCliente', () => {
   
    test('getClient deve ser uma função', () =>{
        expect(cliente.getClient).toBeInstanceOf(Function)
    })
    
    test('getClient deve retornar um objeto', async () =>{
        const cpf = '11111111111';
        const result = await cliente.getClient(cpf);
        expect(result[0].cpf).toBe(cpf);
    })
})

