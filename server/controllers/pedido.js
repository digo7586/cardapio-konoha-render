const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql.js');
const readCommandSql = new ReadCommandSql();

// Chave da APIKEY - https://www.geoapify.com/
/* const key = '1c4f6098b8144c3aa91d9055eeb4917b'; */
const key = '2d63bfe3670244e7b83320a10349a397';

const controllers = () => {

    // obtem a rota (lat, long) e calcula a taxa do delivery por km (se for taxa por distancia)
    const calcularTaxaDelivery = async (req) => {

        try {

            // primeiro obtem a lat e long do endereço da empresa
            var ComandoSQL = await readCommandSql.retornaStringSql('obterDadosCompletos', 'empresa');
            var empresa = await db.Query(ComandoSQL);

            const enderecoEmpresa = `${empresa[0].endereco}, ${empresa[0].numero}, ${empresa[0].bairro}, ${empresa[0].cidade}-${empresa[0].estado}, ${empresa[0].cep}`;
            const urlEncodeEmpresa = encodeURI(enderecoEmpresa);

                   console.log("ENDEREÇO EMPRESA:", enderecoEmpresa);

            const urlEmpresa = `https://api.geoapify.com/v1/geocode/search?text=${urlEncodeEmpresa}&apiKey=${key}`;
            const responseEmpresa = await fetch(urlEmpresa);
            const responseJsonEmpresa = await responseEmpresa.json();

             console.log('Geoapify empresa:', responseJsonEmpresa);

             // Validação da resposta empresa
            if (!responseJsonEmpresa.features || responseJsonEmpresa.features.length === 0) {
                return {
                status: 'error',
                message: 'Endereço da empresa não encontrado. Verifique os dados da empresa no cadastro!'
                }
            }


            // Agora obtem a lat e long do endereco do cliente
            const endereco = req.body.endereco;
            const urlEncode = encodeURI(endereco);

            console.log("ENDEREÇO CLIENTE:", endereco);

            const urlCliente = `https://api.geoapify.com/v1/geocode/search?text=${urlEncode}&apiKey=${key}`;
            const responseCliente = await fetch(urlCliente);
            const responseJsonCliente = await responseCliente.json();

            console.log('Geoapify cliente:', responseJsonCliente);

            // Validação da resposta cliente
        if (!responseJsonCliente.features || responseJsonCliente.features.length === 0) {
            return {
                status: 'error',
                message: 'Endereço de entrega não encontrado. Verifique o endereço digitado.'
            }
        }

         // Extrai lat/lon
        const latCliente = responseJsonCliente.features[0].properties.lat;
        const lonCliente = responseJsonCliente.features[0].properties.lon;
        const latEmpresa = responseJsonEmpresa.features[0].properties.lat;
        const lonEmpresa = responseJsonEmpresa.features[0].properties.lon;

        // Validação extra lat/lon
        if (latCliente == null || lonCliente == null || latEmpresa == null || lonEmpresa == null) {
            return {
                status: 'error',
                message: 'Não foi possível obter latitude/longitude dos endereços.'
            }
        }

        console.log('lat/lon empresa:', latEmpresa, lonEmpresa);
        console.log('lat/lon cliente:', latCliente, lonCliente);



             // Calcula a rota/distância entre empresa e cliente
        const distancia = await calcularDistancia(latCliente, lonCliente, latEmpresa, lonEmpresa);

        if (distancia.status == 'error') {
            return {
                status: 'error',
                message: 'Falha ao obter rota entre empresas e cliente.'
            }
        }

         // Validação do retorno da distância
        if (!distancia.data.features || distancia.data.features.length === 0) {
            return {
                status: 'error',
                message: 'Não foi possível calcular a distância da rota (API Geo).'
            }
        }
        if (distancia.data.features[0].properties.distance == null) {
            return {
                status: 'error',
                message: 'Distância da rota não encontrada (API Geo).'
            }
        }

            // calcula a distância em KM (a distancia vem em metros da api geo)
            const distanciaKm = (distancia.data.features[0].properties.distance) / 1000;

            console.log('distanciaKm:', distanciaKm);

            // obtem qual taxa se adequa a esta distancia
            var ComandoSQLTaxa = await readCommandSql.retornaStringSql('obterValorTaxaPorKm', 'entrega');
            var taxas = await db.Query(ComandoSQLTaxa, { distancia: distanciaKm });

            if (taxas.length > 0) {
                return {
                    status: 'success',
                    taxa: taxas[0].valor,
                    idtaxa: taxas[0].idtaxaentrega
                }
            }
            else {
                return {
                    status: 'success',
                    taxa: 0,
                    idtaxa: null
                }
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter localização. Por favor, selecione outro endereço ou altere o atual.'
            }
        }

    }

    // obtem a distancia entre a loja e o endereço
    const calcularDistancia = async (lat, lon, latLoja, lonLoja) => {

        try {

            const url = `https://api.geoapify.com/v1/routing?waypoints=${latLoja},${lonLoja}|${lat},${lon}&mode=drive&apiKey=${key}`;
            const response = await fetch(url);
            const responseJson = await response.json();

            return {
                status: 'success',
                data: responseJson,
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter localização. Por favor, selecione outro endereço ou altere o atual.',
                ex: ex
            }
        }

    }

    // salva o novo pedido
    const salvarPedido = async (req) => {

        try {

            var pedido = req.body;

            var idtipoentrega = pedido.entrega ? 1 : 2;

            var total = 0;

            // calcula o total do carrinho
            if (pedido.cart.length > 0) {

                pedido.cart.forEach((e, i) => {

                    let subTotal = 0;

                    if (e.opcionais.length > 0) {
                        for (let index = 0; index < e.opcionais.length; index++) {
                            let element = e.opcionais[index];
                            subTotal += element.valoropcional * e.quantidade;
                        }
                    }

                    subTotal += (e.quantidade * e.valor);
                    total += subTotal;

                });

                // valida se tem taxa 
                if (pedido.taxaentrega > 0) {
                    total += Number(pedido.taxaentrega);
                }

            }

            console.log('total', total);

            const dados = {
                idpedidostatus: 1,
                idtipoentrega: idtipoentrega,
                idtaxaentrega: pedido.idtaxaentrega != undefined ? pedido.idtaxaentrega : null,
                idformapagamento: pedido.idformapagamento,
                troco: pedido.idformapagamento == 2 ? pedido.troco : null,
                total: Number(total).toFixed(2),
                cep: pedido.entrega ? pedido.endereco.cep : null,
                endereco: pedido.entrega ? pedido.endereco.endereco : null,
                numero: pedido.entrega ? pedido.endereco.numero : null,
                bairro: pedido.entrega ? pedido.endereco.bairro : null,
                complemento: pedido.entrega ? pedido.endereco.complemento : null,
                cidade: pedido.entrega ? pedido.endereco.cidade : null,
                estado: pedido.entrega ? pedido.endereco.estado : null,
                nomecliente: pedido.nomecliente,
                telefonecliente: pedido.telefonecliente
            }

            console.log('dados', dados)

            // primeiro, salva o pedido
            var ComandoSQLAddPedido = await readCommandSql.retornaStringSql('salvarPedido', 'pedido');
            var novoPedido = await db.Query(ComandoSQLAddPedido, dados);

            // se tudo der ok, salva as outras informações
            if (novoPedido.insertId != undefined && novoPedido.insertId > 0) {

                var ComandoSQLAddPedidoItem = await readCommandSql.retornaStringSql('salvarPedidoItem', 'pedido');

                // salva os produtos do pedido
                await Promise.all(
                    pedido.cart.map(async (element) => {

                        var novoPedidoItem = await db.Query(ComandoSQLAddPedidoItem, {
                            idpedido: novoPedido.insertId,
                            idproduto: element.idproduto,
                            quantidade: element.quantidade,
                            observacao: element.observacao.length > 0 ? element.observacao : null
                        });

                        // agora salva os opcionais
                        var ComandoSQLAddPedidoItemOpcional = await readCommandSql.retornaStringSql('salvarPedidoItemOpcional', 'pedido');

                        if (novoPedidoItem.insertId != undefined && novoPedidoItem.insertId > 0) {

                            await Promise.all(
                                element.opcionais.map(async (e) => {
                                    await db.Query(ComandoSQLAddPedidoItemOpcional, {
                                        idpedidoitem: novoPedidoItem.insertId,
                                        idopcionalitem: e.idopcionalitem,
                                    });
                                })
                            )

                        }
                    })
                )

                var hash = new Date().getTime() + '' + novoPedido.insertId;

                return {
                    status: 'success',
                    message: 'Pedido realizado!',
                    order: hash
                }

            }

            return {
                status: 'error',
                message: 'Falha ao realizar o pedido. Por favor, tente novamente.'
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao realizar o pedido. Por favor, tente novamente.'
            }
        }

    }

    // obtem o pedido por id
    const obterPedidoPorId = async (req) => {

        try {

            var hash = req.params.idpedido;
            var idpedido = 0;
            var painel = false;

            if (hash.length >= 13) {
                // remove os 13 primeiros numeros aleatorios e pega o ID correto
                idpedido = hash.toString().substr(13, hash.length);
            }
            else {
                idpedido = hash;
                painel = true; //quer dizer que a busca está sendo feita pelo painel
            }

            console.log('idpedido', idpedido)

            var ComandoSQL = await readCommandSql.retornaStringSql('obterPedidoPorId', 'pedido');
            var pedido = await db.Query(ComandoSQL, { idpedido: idpedido });

            // se for pelo painel, retorna o carrinho
            if (painel) {

                // busca os itens do carrinho
                var ComandoSQLItens = await readCommandSql.retornaStringSql('obterItensPedido', 'pedido');
                var itens = await db.Query(ComandoSQLItens, { idpedido: idpedido });

                return {
                    status: 'success',
                    data: pedido[0],
                    cart: itens
                }

            }
            else {
                return {
                    status: 'success',
                    data: pedido[0]
                }
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao realizar o pedido. Por favor, tente novamente.'
            }
        }

    }

    // obtem o pedido por status
    const obterPedidoPorStatus = async (req) => {

        try {

            var idpedidostatus = req.params.idpedidostatus;

            var ComandoSQL = await readCommandSql.retornaStringSql('obterPedidoPorStatus', 'pedido');
            var result = await db.Query(ComandoSQL, { idpedidostatus: idpedidostatus });

            // além disso, já obtem os totais de cada tab e manda no retorno
            var ComandoSQLTotais = await readCommandSql.retornaStringSql('obterTotaisPedidos', 'pedido');
            var totais = await db.Query(ComandoSQLTotais);

            return {
                status: 'success',
                data: result,
                totais: totais[0]
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter os pedidos. Por favor, tente novamente.'
            }
        }

    }

    // atualiza o status do pedido
    const atualizarStatusPedido = async (req) => {

        try {

            if (req.body.tab == 5) {

                // finalizar pedido

                var ComandoSQL = await readCommandSql.retornaStringSql('atualizarStatusPedidoFinalizado', 'pedido');
                await db.Query(ComandoSQL, { idpedidostatus: req.body.tab, idpedido: req.body.idpedido });
            }
            else {
                var ComandoSQL = await readCommandSql.retornaStringSql('atualizarStatusPedido', 'pedido');
                await db.Query(ComandoSQL, { idpedidostatus: req.body.tab, idpedido: req.body.idpedido });
            }

            return {
                status: 'success',
                message: 'Pedido atualizado com sucesso!'
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao atualizar pedido. Por favor, tente novamente.'
            }
        }

    }

    // filtra o histórico de pedidos
    const historicoPedidos = async (req) => {

        try {

            let datainicio = `${req.body.datainicio} 00:00:00`;
            let datafim = `${req.body.datafim} 23:59:59`;

            var ComandoSQL = await readCommandSql.retornaStringSql('historicoPedidos', 'pedido');
            var result = await db.Query(ComandoSQL, {
                datainicio: datainicio,
                datafim: datafim
            });

            return {
                status: 'success',
                data: result
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter o histórico dos pedidos. Por favor, tente novamente.'
            }
        }

    }

    return Object.create({
        calcularTaxaDelivery
        , salvarPedido
        , obterPedidoPorId
        , obterPedidoPorStatus
        , atualizarStatusPedido
        , historicoPedidos
    })

}

module.exports = Object.assign({ controllers })