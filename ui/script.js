//Ler o arquivo JSON
var emprestimo = JSON.parse(emprestimo);

//Selecionar a tabela HTML
var table = document.getElementById("minhaTabela");

//Iterar sobre cada objeto do arquivo JSON
emprestimo.forEach(function(emprestimo){
  //Adicionar uma linha na tabela
  var row = table.insertRow();
  
  //Adicionar células com os dados do objeto
  var id_usuario = row.insertCell(0);
  var id_livro = row.insertCell(1);
  var id_funcionario = row.insertCell(2);
  var situacao = row.insertCell(3);
  var pendencia = row.insertCell(4);
  
  //Atribuir os valores dos dados aos elementos HTML
  id_usuario.innerHTML = emprestimo.id_usuario;
  id_livro.innerHTML = emprestimo.id_livro;
  id_funcionario.innerHTML = emprestimo.id_funcionario;
  situacao.innerHTML = emprestimo.situacao;
  pendencia.innerHTML = emprestimo.pendencia;
});
