let carrinho = {};

function adicionarCarrinhoComPresente(nome, preco, idCheckbox) {
    let presente = document.getElementById(idCheckbox).checked;

    if (presente) {
        nome += " 🎁 (Presente)";
    }

    adicionarCarrinho(nome, preco);
}

function adicionarCarrinho(nome, preco) {
    if (carrinho[nome]) {
        carrinho[nome].quantidade++;
    } else {
        carrinho[nome] = {
            preco: preco,
            quantidade: 1
        };
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

function removerItem(nome) {
    delete carrinho[nome];
    atualizarCarrinho();
}

function atualizarCarrinho() {
    let lista = document.getElementById("lista-carrinho");
    let totalElemento = document.getElementById("total");

    lista.innerHTML = "";
    let total = 0;

    for (let nome in carrinho) {
        let item = carrinho[nome];
        let subtotal = item.preco * item.quantidade;
        total += subtotal;

        let li = document.createElement("li");

        li.innerHTML = `
            ${nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
            <br>
            <button onclick="aumentar('${nome}')">+</button>
            <button onclick="diminuir('${nome}')">-</button>
            <button onclick="removerItem('${nome}')">Remover</button>
        `;

        lista.appendChild(li);
    }

    totalElemento.innerText = total.toFixed(2);
}

function mostrarEndereco(mostrar) {
    let campo = document.getElementById("campo-endereco");

    if (mostrar) {
        campo.style.display = "block";
    } else {
        campo.style.display = "none";
    }
}

function finalizarCompra() {
    if (Object.keys(carrinho).length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let pagamento = document.querySelector('input[name="pagamento"]:checked');

    if (!pagamento) {
        alert("Selecione a forma de pagamento!");
        return;
    }

    let tipoEntrega = document.querySelector('input[name="tipoEntrega"]:checked');

    if (!tipoEntrega) {
        alert("Selecione entrega ou retirada!");
        return;
    }

    let endereco = document.getElementById("endereco").value;

    if (tipoEntrega.value === "Entrega" && endereco.trim() === "") {
        alert("Digite o endereço para entrega!");
        return;
    }

    let mensagem = "Olá! Quero fazer este pedido:%0A%0A";
    let total = 0;

    for (let nome in carrinho) {
        let item = carrinho[nome];
        let subtotal = item.preco * item.quantidade;

        mensagem += `- ${nome} x${item.quantidade} - R$ ${subtotal.toFixed(2)}%0A`;
        total += subtotal;
    }

    mensagem += `%0ATotal: R$ ${total.toFixed(2)}`;
    mensagem += `%0AForma de pagamento: ${pagamento.value}`;
    mensagem += `%0AOpção: ${tipoEntrega.value}`;

    if (tipoEntrega.value === "Entrega") {
        mensagem += `%0AEndereço: ${endereco}`;
    }

        window.open(`https://wa.me/5587991292282?text=${mensagem}`, "_blank");
}
