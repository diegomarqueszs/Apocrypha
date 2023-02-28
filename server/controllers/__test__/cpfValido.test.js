const cpfValido = require('./cpfValido');

describe('Validacao de CPF', () => {
    test('cpfValido deve ser uma função', () =>{
        expect(cpfValido).toBeInstanceOf(Function)
    })

    test('CPF não pode haver letras', () =>{
        expect(cpfValido('1234567a912')).toBe("CPF deve possuir apenas números!")
    })

    test('CPF deve ter exatamente 11 caracteres', () =>{
        expect(cpfValido('1234567')).toBe("CPF deve possuir 11 caracteres!")
    })

    test('CPF deve haver 11 caracteres e devem ser apenas números', () =>{
        expect(cpfValido('12345678912')).toBe("CPF válido!")
    })
})