let carrinho = {};

// 🔄 Carregar carrinho salvo
let carrinhoSalvo = localStorage.getItem("carrinho");

if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
}

// 🎁 Adicionar com presente
function adicionarCarrinhoComPresente(nome, preco, idCheckbox) {
    let checkbox = document.getElementById(idCheckbox);
    let presente = checkbox ? checkbox.checked : false;

    if (presente) {
        nome += " 🎁 (Presente)";
    }

    adicionarCarrinho(nome, preco);
}

// 📏 Adicionar com tamanho
function adicionarComTamanho(nome, preco, grupoTamanho) {
    let tamanhoSelecionado = document.querySelector(`input[name="${grupoTamanho}"]:checked`);

    if (!tamanhoSelecionado) {
        alert("Selecione um tamanho!");
        return;
    }

    let tamanho = tamanhoSelecionado.value;

    let nomeFinal = `${nome} (${tamanho})`;

    adicionarCarrinho(nomeFinal, preco);
}

// 🛒 Adicionar
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

// ➕
function aumentar(nome) {
    carrinho[nome].quantidade++;
    atualizarCarrinho();
}

// ➖
function diminuir(nome) {
    carrinho[nome].quantidade--;

    if (carrinho[nome].quantidade <= 0) {
        delete carrinho[nome];
    }

    atualizarCarrinho();
}

// ❌ remover
function removerItem(nome) {
    delete carrinho[nome];
    atualizarCarrinho();
}

// 🔄 atualizar tudo
function atualizarCarrinho() {
    let listas = document.querySelectorAll("#lista-carrinho");
    let totais = document.querySelectorAll("#total");

    let total = 0;

    listas.forEach(lista => lista.innerHTML = "");

    for (let nome in carrinho) {
        let item = carrinho[nome];
        let subtotal = item.preco * item.quantidade;
        total += subtotal;

        listas.forEach(lista => {
            let li = document.createElement("li");

            li.innerHTML = `
                ${nome} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
                <br>
                <button onclick="aumentar('${nome}')">+</button>
                <button onclick="diminuir('${nome}')">-</button>
                <button onclick="removerItem('${nome}')">Remover</button>
            `;

            lista.appendChild(li);
        });
    }

    totais.forEach(t => t.innerText = total.toFixed(2));

    // 💾 salvar
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    // 🛒 contador
    let contadorElemento = document.getElementById("contador-carrinho");

    if (contadorElemento) {
        let totalItens = 0;

        for (let nome in carrinho) {
            totalItens += carrinho[nome].quantidade;
        }

        contadorElemento.innerText = totalItens;
    }
}

// 📦 endereço
function mostrarEndereco(mostrar) {
    let campo = document.getElementById("campo-endereco");

    if (campo) {
        campo.style.display = mostrar ? "block" : "none";
    }
}

// 📲 finalizar
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

    let enderecoInput = document.getElementById("endereco");
    let endereco = enderecoInput ? enderecoInput.value : "";

    if (tipoEntrega.value === "Entrega" && endereco.trim() === "") {
        alert("Digite o endereço!");
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

// 🛒 abrir/fechar
function toggleCarrinho() {
    let carrinhoEl = document.getElementById("carrinho-lateral");
    carrinhoEl.classList.toggle("ativo");
}

// fechar ao clicar fora
window.onclick = function(event) {
    let carrinhoEl = document.getElementById("carrinho-lateral");

    if (carrinhoEl && !carrinhoEl.contains(event.target) && !event.target.closest(".carrinho-topo")) {
        carrinhoEl.classList.remove("ativo");
    }
}

// 🔁 carregar ao abrir
atualizarCarrinho();
// 🔎 FILTRO DE PRODUTOS
function filtrar(categoria) {
    let produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {
        let cat = produto.getAttribute("data-categoria");

        if (categoria === "todos" || cat === categoria) {
            produto.style.display = "inline-block";
        } else {
            produto.style.display = "none";
        }
    });
}
