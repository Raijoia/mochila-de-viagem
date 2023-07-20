// pegando o form
const form = document.getElementById('novoItem')

// pegando a lista
const lista = document.getElementById('lista')

// array object
// pegando o localStorage, se for falso(não tiver itens no localStorage), ele retorna uma array object vazia
// JSON.parse, usado para voltar como javascript, poruqe estava voltando como string, devido a mudança para string na function
const itens = JSON.parse(localStorage.getItem("itens")) || []

// pegando o index do elemento
itens.forEach( (elemento) => {
  criaElemento(elemento)
});

// adicionando evento de enviar
form.addEventListener("submit", (evento) => {
  // interrompendo o envio, para o envio ficar na aplicação e não no site
  evento.preventDefault()

  // evento.target.elements["nome"].value, pega o valor do input pelo id dele, usando o evento e acessando o elements para pegar como um objeto e conseguir pegar pelo ID
  // evento.target.elements["quantidade"].value, pega o valor do input pelo id dele, usando o evento e acessando o elements para pegar como um objeto e conseguir pegar pelo ID
  const nome = evento.target.elements["nome"]
  const quantidade = evento.target.elements["quantidade"]

  // para ver se existe itens com o mesmo nome
  const existe = itens.find( elemento => elemento.nome === nome.value )

  // transformando em object para o localstorage não se sobrescrevendo o outro
  const itemAtual = {
   "nome": nome.value,
   "quantidade": quantidade.value,
  }

  // se existir o msm id
  if (existe) {
    itemAtual.id = existe.id
    
    atualizaElemento(itemAtual)

    itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
  } else {
    itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;

    criaElemento(itemAtual)
  
    // inserindo o object dentro da array object fora da function
    itens.push(itemAtual)
  }


  // usando o localstorage para armazenar dados no navegador da nossa página
  // localStorage.getItem() quando quiser acessar um item
  // localStorage.setItem("nome", valor que quer armazenar no localstorage)
  localStorage.setItem("itens", JSON.stringify(itens)) // JSON.stringify faz o object virar uma string

  // zerando o formulário após envia-lo
  nome.value = ""
  quantidade.value = ""
})

function criaElemento(item) {
  // criando a tag li pelo js
  const novoItem = document.createElement("li")
  // adicionando a classe item pelo js
  novoItem.classList.add("item")

  const numeroItem = document.createElement("strong")
  numeroItem.innerHTML = item.quantidade

  // adicionando um id
  numeroItem.dataset.id = item.id

  // appenChild adicionou a tag em outra tag
  novoItem.appendChild(numeroItem)
  // adicionando o nome na tag, após ja ter adicionando a quantidade pelo appenChild
  novoItem.innerHTML += item.nome

  // adicionando o botão
  novoItem.appendChild(botaoDeleta(item.id))

  // adicionando o li na lista, pelo appenChild pois novoItem contem uma tag html
  lista.appendChild(novoItem)
}

function atualizaElemento(item) {
  // sobrescrevendo o localstorage
  document.querySelector("[data-id='"+ item.id + "']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
  // criando botão
  const elementoBotao = document.createElement('button')
  elementoBotao.innerText = "X"

  // não foi feita a arrow function, pois ela não segue o this
  elementoBotao.addEventListener('click', function () {
    // this para pegar o botão e this.parentNode para pegar o filho do botão
    deletaElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletaElemento(tag, id) {
  tag.remove()

  // removendo da array pelo splice pelo index, removendo pegando o elemento para pegar o id do elemento e comparando com o id recebido no parametro
  itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

  localStorage.setItem("itens", JSON.stringify(itens)) // JSON.stringify faz o object virar uma string
}