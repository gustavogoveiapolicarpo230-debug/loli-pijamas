let carrinho = [];
let total = 0;

function adicionarCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    total += preco;

    atualizarCarrinho();
}

function atualizarCarrinho() {
    let lista = document.getElementById("lista-carrinho");
    let totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    carrinho.forEach(item => {
        let li = document.createElement("li");
        li.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        lista.appendChild(li);
    });

    totalElemento.innerText = total.toFixed(2);
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Quero comprar:\n";

    carrinho.forEach(item => {
        mensagem += `- ${item.nome} (R$ ${item.preco.toFixed(2)})\n`;
    });

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    let url = `https://wa.me/5587991292282?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}
