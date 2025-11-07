var app = {};

app.event = {

    /* validar se empresa esta aberta */
    init: (home = false) => {

        app.method.validarEmpresaAberta(home);

    }

}

app.method = {

    // centraliza as chamadas de get
    get: (url, callbackSuccess, callbackError, login = false) => {

        try {
            if (app.method.validaToken(login)) {

                let xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.setRequestHeader("Content-Type", 'application/json;charset=utf-8');
                xhr.setRequestHeader("Authorization", app.method.obterValorSessao('token'));

                xhr.onreadystatechange = function () {

                    if (this.readyState == 4) {

                        if (this.status == 200) {
                            return callbackSuccess(JSON.parse(xhr.responseText))
                        }
                        else {

                            // se o retorno for não autorizado, redireciona o usuário para o login
                            if (xhr.status == 401) app.method.logout();

                            return callbackError(xhr.responseText);
                        }

                    }

                }

                xhr.send();

            }
        }
        catch (ex) {
            return callbackError(ex);
        }

    },

    // centraliza as chamadas de post
    post: (url, dados, callbackSuccess, callbackError, login = false) => {

        try {
            if (app.method.validaToken(login)) {

                let xhr = new XMLHttpRequest();
                xhr.open('POST', url);
                xhr.setRequestHeader("Content-Type", 'application/json;charset=utf-8');
                xhr.setRequestHeader("Authorization", app.method.obterValorSessao('token'));

                xhr.onreadystatechange = function () {

                    if (this.readyState == 4) {

                        if (this.status == 200) {
                            return callbackSuccess(JSON.parse(xhr.responseText))
                        }
                        else {

                            // se o retorno for não autorizado, redireciona o usuário para o login
                            if (xhr.status == 401) app.method.logout();

                            return callbackError(xhr.responseText);
                        }

                    }

                }

                xhr.send(dados);

            }
        }
        catch (ex) {
            return callbackError(ex);
        }

    },

    // centraliza as chamadas de post
    upload: (url, dados, callbackSuccess, callbackError, login = false) => {

        try {
            if (app.method.validaToken(login)) {

                // document.querySelector.ajax({
                //     url: url,
                //     method: 'POST',
                //     processData: false,
                //     contentType: false,
                //     data: dados,
                //     mimeType: 'multipart/form-data',
                //     async: true,
                //     crossDomain: true,
                //     beforeSend: (request) => { request.setRequestHeader("authorization", app.method.obterValorSessao('token')); },
                //     success: (response) => callbackSuccess(JSON.parse(response)),
                //     error: (xhr, ajaxOptions, error) => {

                //         // se o retorno for não autorizado, redireciona o usuário para o login
                //         if (xhr.status == 401) app.method.logout();

                //         callbackError(xhr, ajaxOptions, error)
                //     },
                // });

                let xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.setRequestHeader("Mime-Type", 'multipart/form-data');
                xhr.setRequestHeader("Authorization", app.method.obterValorSessao('token'));

                xhr.onreadystatechange = function () {

                    if (this.readyState == 4) {

                        if (this.status == 200) {
                            return callbackSuccess(JSON.parse(xhr.responseText))
                        }
                        else {

                            // se o retorno for não autorizado, redireciona o usuário para o login
                            if (xhr.status == 401) app.method.logout();

                            return callbackError(xhr.responseText);
                        }

                    }

                }

                xhr.send(dados);

            }
        }
        catch (ex) {
            return callbackError(ex);
        }

    },

    // método para validar se o token existe. É chamado em todas as requisições internas
    validaToken: (login = false) => {

        var tokenAtual = app.method.obterValorSessao('token');

        if ((tokenAtual == undefined || tokenAtual == null || tokenAtual == "" || tokenAtual == 'null') && !login) {
            window.location.href = '/painel/login.html';
            return false;
        }

        return true;
    },

    // grava o token no localstorage
    gravarValorSessao: (valor, local) => {
        localStorage[local] = valor;
    },

    // retorna o token atual
    obterValorSessao: (local) => {

        // Valores Sessão -> [token] [nomeUsuario]
        return localStorage[local];

    },

    // remove uma sessao 
    removerSessao: (local) => {
        localStorage.removeItem(local);
    },

    // método que limpa toda o localStorage e redireciona para o login
    logout: () => {
        localStorage.clear();
        window.location.href = '/painel/login.html';
    },

    // método genérico para mensagens
    mensagem: (texto, cor = 'red', tempo = 3500) => {

        let container = document.querySelector('#container-mensagens');

        // Travar até 3 mensagens
        if (container.childElementCount === 3) {
            return;
        }

        let id = Math.floor(Date.now() * Math.random()).toString();

        let msg = `<div id="msg-${id}" class="animated fadeInDown toast ${cor}">${texto}</div>`;

        container.innerHTML += msg;

        setTimeout(() => {
            document.querySelector(`#msg-${id}`).classList.remove('fadeInDown');
            document.querySelector(`#msg-${id}`).classList.add('fadeOutUp');
            setTimeout(() => {
                document.querySelector(`#msg-${id}`).remove();
            }, 800);
        }, tempo);

    },

    // método que exibe o loader
    loading: (running = false) => {

        if (running) {
            document.querySelector(".loader-full").classList.remove('hidden');
        }
        else {
            document.querySelector(".loader-full").classList.add('hidden');
        }

    },

    // valida se a empresa está aberta
   /*  validarEmpresaAberta: (home = false) => {

        app.method.loading(true);

        app.method.get('/empresa/open',
            (response) => {

                app.method.loading(false);

                // Se estiver na tela principal do cardápio
                if (home) {
                    document.querySelector(".status-open").classList.remove('hidden');
                }

                if (response.status == "error") {

                    // Altera o label de Aberto/Fechado (se estiver na tela principal do cardápio)
                    if (home) {
                        document.querySelector(".status-open").classList.add('closed');
                        document.querySelector("#lblLojaAberta").innerText = 'Fechado';
                    }

                    // Exibe o menu de loja fechada
                    document.querySelector("#menu-bottom").remove();
                    document.querySelector("#menu-bottom-closed").classList.remove('hidden');
                    return;
                }

                // Se estiver na tela principal do cardápio
                if (home) {
                    document.querySelector(".status-open").classList.remove('closed');
                    document.querySelector("#lblLojaAberta").innerText = 'Aberto';
                }

                document.querySelector("#menu-bottom").classList.remove('hidden');
                document.querySelector("#menu-bottom-closed").remove();

            },
            (xhr, ajaxOptions, error) => {
                console.log('xhr', xhr)
                console.log('ajaxOptions', ajaxOptions)
                console.log('error', error)
            }, true
        )

    }, */


    validarEmpresaAberta: (home = false) => {

    app.method.loading(true);

    // ✅ MUDANÇA 1: Troca /empresa/open por /api/horario
    // ✅ MUDANÇA 2: Remove o parâmetro "true" (não precisa autenticação)
    // ✅ MUDANÇA 3: Usa XMLHttpRequest direto (sem método get que exige token)
    
    try {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/horario');  // ✅ Rota pública nova
        xhr.setRequestHeader("Content-Type", 'application/json;charset=utf-8');
        // ✅ NÃO adiciona Authorization header!

        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                app.method.loading(false);

                if (this.status == 200) {
                    const response = JSON.parse(xhr.responseText);

                    // Se estiver na tela principal do cardápio
                    if (home) {
                        document.querySelector(".status-open").classList.remove('hidden');
                    }

                    // ✅ MUDANÇA 4: Verifica o campo "aberto" em vez de "status"
                    if (response.status == "error" || !response.aberto) {

                        // Altera o label de Aberto/Fechado
                        if (home) {
                            document.querySelector(".status-open").classList.add('closed');
                            document.querySelector("#lblLojaAberta").innerText = 'Fechado';
                        }

                        // Exibe o menu de loja fechada
                        document.querySelector("#menu-bottom").remove();
                        document.querySelector("#menu-bottom-closed").classList.remove('hidden');
                        return;
                    }

                    // Loja está aberta
                    if (home) {
                        document.querySelector(".status-open").classList.remove('closed');
                        document.querySelector("#lblLojaAberta").innerText = 'Aberto';
                    }

                    document.querySelector("#menu-bottom").classList.remove('hidden');
                    document.querySelector("#menu-bottom-closed").remove();

                } else {
                    // Erro na requisição - assume loja fechada
                    if (home) {
                        document.querySelector(".status-open").classList.remove('hidden');
                        document.querySelector(".status-open").classList.add('closed');
                        document.querySelector("#lblLojaAberta").innerText = 'Fechado';
                    }
                    document.querySelector("#menu-bottom").remove();
                    document.querySelector("#menu-bottom-closed").classList.remove('hidden');
                }
            }
        };

        xhr.send();

    } catch (ex) {
        console.error('Erro ao verificar horário:', ex);
        app.method.loading(false);
    }

},

    // carregar empresa
    carregarDadosEmpresa: () => {
        const get = (k) => app.method.obterValorSessao(k);
        const $ = (sel) => document.querySelector(sel);

        const setText = (sel, txt = '') => { const el = $(sel); if (el) el.innerText = txt; };
        const setSrc = (sel, src) => { const el = $(sel); if (el) el.src = src; };

        // Nome e e-mail (se os elementos existirem na página atual)
        setText('.nome-empresa', get('Nome') || '');
        setText('.email-empresa', get('Email') || '');

        // Logotipo
        const logo = get('Logo');
        setSrc('.logo-empresa', logo ? `/public/images/empresa/${logo}` : '/public/images/empresa/default.jpg');

        // Troco para (se houver campo/label na tela de pedido)
        // Ex.: <span id="lblTrocoPara"></span> ou <input id="txtTrocoPara">
        const trocoSessao = get('Troco'); // garanta que salvou isso na sessão ao montar o pedido
        const trocoNum = Number(String(trocoSessao ?? '').replace(',', '.'));
        const trocoFmt = Number.isFinite(trocoNum) ? `R$ ${trocoNum.toFixed(2).replace('.', ',')}` : '';

        // Se for label
        setText('#lblTrocoPara', trocoFmt);

        // Se for input (use um dos dois conforme seu HTML)
        const txtTroco = $('#txtTrocoPara');
        if (txtTroco) txtTroco.value = Number.isFinite(trocoNum) ? trocoNum.toFixed(2) : '';
    },


    // cria um id aleatório
    criarGuid: () => {
        return "00000000-0000-0000-0000-000000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    },

}
