let carrinho = {};

function adicionarCarrinho(nome, preco) {
    if (carrinho[nome]) {
        carrinho[nome].quantidade++;
    } else {
        carrinho[nome] = { preco: preco, quantidade: 1 };
    }

    atualizarCarrinho();
}

function aumentar(nome) {
    carrinho[nome].quantidade++;
    atualizarCarrinho();
}

function diminuir(nome) {
    carrinho[nome].quantidade--;

    if (carrinho[nome].quantidade <= 0) {
        delete carrinho[nome];
    }

    atualizarCarrinho();
}

function atualizarCarrinho() {
    let lista = document.getElementById("lista-carrinho");
    let totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    let total = 0;

    for (let nome in carrinho) {
        let item = carrinho[nome];

        total += item.preco * item.quantidade;

        let li = document.createElement("li");

        li.innerHTML = `
            ${nome} - R$ ${item.preco.toFixed(2)} 
            x ${item.quantidade}
            
            <button onclick="aumentar('${nome}')">+</button>
            <button onclick="diminuir('${nome}')">-</button>
            <button onclick="removerItem('${nome}')">❌</button>
        `;

        lista.appendChild(li);
    }

    totalElemento.innerText = total.toFixed(2);
}

function removerItem(nome) {
    delete carrinho[nome];
    atualizarCarrinho();
}

function finalizarCompra() {
    let mensagem = "Olá! Quero comprar:\n";
    let total = 0;

    for (let nome in carrinho) {
        let item = carrinho[nome];
        let subtotal = item.preco * item.quantidade;

        mensagem += `- ${nome} x${item.quantidade} (R$ ${subtotal.toFixed(2)})\n`;
        total += subtotal;
    }

    mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

    let url = `https://wa.me/5587991292282?text=${encodeURIComponent(mensagem)}`;
    window.open(url, "_blank");
}
