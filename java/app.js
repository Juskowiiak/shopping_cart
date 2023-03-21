const telaProdutos = document.querySelector(".tela-produtos");
const telaCarrinho = document.querySelector(".tela-carinho-compra");

//1- VAMOS VER TODOS OS PRODUTOS DA LOJA
function showProdutos() {
  produtos.forEach((item) => {
    telaProdutos.innerHTML += `
    <li class="tela-produtos-product">
    <div class="tela-produtos-product-pict">
      <img src="${item.imagem}" />
    </div>
    <h3 class="tela-produtos-product-nome">${item.nome}</h3>
    <h4 class="tela-produtos-product-price">$${item.preco}</h4>
    <p class="tela-produtos-product-descrip">${item.descript}</p>
    <h4 class="tela-produtos-product-compra" onclick="addCarinho(${item.id})">Buy It</h4>
  </li>
    `;
  });
}
showProdutos();

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
atualizarCarrinho();

//2- ADD PRODUTOS NO CART
function addCarinho(id) {
  //se o produto ja estiver no carrinho, mostra msg
  if (carrinho.some((item) => item.id === id)) {
    alert("Ja foi add na lista");
  } else {
    //caso contrario add no carrinho
    let add = produtos.find((item) => item.id === id);
    carrinho.push({ ...add, quantidade: 1 });
    console.log(carrinho);
  }
  //sempre que produto for adicionado

  atualizarCarrinho();
}

//3- FUNCOES NA TELA CARRINHO
function atualizarCarrinho() {
  addTelaCarrinho();
  somarprodutos();

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

//4- ADD PRODUTOS NA TELA CARRINHO
function addTelaCarrinho() {
  //sempre que um produto for adicionado, a tela sera atualizada
  telaCarrinho.innerHTML = "";
  carrinho.forEach((item) => {
    telaCarrinho.innerHTML += `
    <li class="tela-carinho-compra-items">
    <div class="tela-carinho-compra-items-pict">
      <img src="${item.imagem}" />
    </div>
    <div class="tela-carinho-compra-items-box">
      <div class="tela-carinho-compra-items-box-b1">
        <h3 class="tela-carinho-compra-items-box-b1-nome">${item.nome}</h3>
        <h3 class="tela-carinho-compra-items-box-b1-preco">$${item.preco}</h3>
      </div>
      <div class="tela-carinho-compra-items-box-b2">
        <p onclick="mudarQuantidade('diminuir', ${item.id})">-</p>
        <h4 class="tela-carinho-compra-items-box-b2-quant">
          Quant: <span class="b2-quantidade">${item.quantidade}</span>
        </h4>
        <p onclick="mudarQuantidade('aumentar', ${item.id})">+</p>
      </div>
    </div>

    <p class="tela-carinho-compra-items-fecho" onclick="eliminarProduto(${item.id})">x</p>
  </li>
  `;
  });
}

//5- ALTERAR A QUANTIDADE DO PRODUTO
function mudarQuantidade(opcao, id) {
  carrinho = carrinho.map((item) => {
    let quantidade = item.quantidade;
    if (item.id === id) {
      if (opcao === "diminuir" && item.quantidade > 1) {
        quantidade--;
      } else if (opcao === "aumentar" && item.stock > item.quantidade) {
        quantidade++;
      } else if (opcao === "aumentar" && item.stock == item.quantidade) {
        alert("atingiu o stock max");
      }
    }
    return {
      ...item,
      quantidade,
    };
  });
  atualizarCarrinho();
}

//6-  SOMAR OS ITEMS E PRECO
function somarprodutos() {
  let precoTotal = 0;
  let itemsTotal = 0;

  carrinho.forEach((item) => {
    precoTotal += item.preco * item.quantidade;
    itemsTotal += item.quantidade;
  });
  document.querySelector(".prod-quant").innerHTML = itemsTotal;
  document.querySelector(".prod-total").innerHTML = precoTotal;
}

//7- ELIMINAR PRODUTO
function eliminarProduto(id) {
  carrinho = carrinho.filter((item) => item.id !== id);
  atualizarCarrinho();
}
