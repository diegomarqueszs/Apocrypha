import cliente from '../../services/cliente.service';

describe('Validacao de getCliente', () => {
    test('getClient deve ser uma função', () =>{
        expect(cliente.getClient).toBeInstanceOf(Function)
    })
})