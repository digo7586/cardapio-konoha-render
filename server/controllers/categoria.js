const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql.js');
const readCommandSql = new ReadCommandSql();

const ctImagem = require('../controllers/imagem')

const controllers = () => {

    // Lista as categorias no cardápio
    const listarTodas = async (req) => {

        try {

            var ComandoSQL = await readCommandSql.retornaStringSql('listarTodas', 'categoria');
            var result = await db.Query(ComandoSQL);

            return {
                status: 'success',
                data: result,
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter as categorias.'
            }
        }

    }

    // Salva os dados da categoria
    const salvarDados = async (req) => {

        try {

            // valida se é pra adicionar ou atualizar uma categoria

            var idcategoria = req.body.idcategoria;

            if (idcategoria > 0) {

                // atualizar categoria

                var ComandoSQL = await readCommandSql.retornaStringSql('atualizarCategoria', 'categoria');
                var result = await db.Query(ComandoSQL, req.body);

                console.log(result);

                return {
                    status: "success",
                    message: "Categoria atualizada com sucesso!"
                }

            }
            else {

                // adicionar categoria

                var ComandoSQL = await readCommandSql.retornaStringSql('adicionarCategoria', 'categoria');
                var result = await db.Query(ComandoSQL, req.body);

                console.log(result);

                return {
                    status: "success",
                    message: "Categoria adicionada com sucesso!"
                }

            }

        } catch (ex) {
            return {
                status: "error",
                message: "Falha ao salvar categoria. Tente novamente.",
                ex: ex
            }
        }

    }

    // Ordena as categorias
    const ordenarCategorias = async (req) => {

        try {

            var lista = req.body;

            console.log('Inicio')

            const promises = await lista.map(async elem => {
                new Promise(async (resolve, reject) => {

                    var ComandoSQL = await readCommandSql.retornaStringSql('atualizarOrdemCategoria', 'categoria');
                    await db.Query(ComandoSQL, elem);

                    resolve(elem);

                });
            })

            console.log('Fim')

            await Promise.all(promises);

            return {
                status: 'success',
                message: 'Categorias ordenadas com sucesso.'
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao ordenar as categorias.'
            }
        }

    }

    // Duplica a categoria
    const duplicarCategoria = async (req) => {

        try {

            var idcategoria = req.body.idcategoria;

            // primeiro, obtem todos os produtos da categoria

            var ComandoSQLProdutos = await readCommandSql.retornaStringSql('obterPorCategoriaIdSemOrdenacao', 'produto');
            var produtos_categoria = await db.Query(ComandoSQLProdutos, { idcategoria: idcategoria });

            // depois, obtem as informações da categoria

            var ComandoSQLCategoria = await readCommandSql.retornaStringSql('obterPorId', 'categoria');
            var dados_categoria = await db.Query(ComandoSQLCategoria, { idcategoria: idcategoria });

            // altera o nome para "Cópia" e insere no banco de dados

            dados_categoria[0].nome = dados_categoria[0].nome + " - Cópia";

            var ComandoSQLAddCategoria = await readCommandSql.retornaStringSql('adicionarCategoria', 'categoria');
            var nova_categoria = await db.Query(ComandoSQLAddCategoria, dados_categoria[0]);

            if (nova_categoria.insertId != undefined && nova_categoria.insertId > 0) {

                // percorre os produtos e adiciona na nova categoria

                console.log('Inicio')

                const promises = await produtos_categoria.map(async elem => {

                    const idImagemNovo = new Date().valueOf();

                    var ComandoSQLAddProduto = await readCommandSql.retornaStringSql('adicionarProduto', 'produto');
                    await db.Query(ComandoSQLAddProduto, {
                        idcategoria: nova_categoria.insertId,
                        nome: elem.nome,
                        descricao: elem.descricao,
                        valor: elem.valor,
                        imagem: idImagemNovo + "-" + elem.imagem,
                        ordem: elem.ordem
                    });

                    // faz uma cópia da imagem para pasta
                    await ctImagem.controllers().copy(elem.imagem, idImagemNovo);

                })

                await Promise.all(promises);

                console.log('fim')

                return {
                    status: 'success',
                    message: 'Categoria duplicada com sucesso.'
                }

            }
            else {
                return {
                    status: 'error',
                    message: 'Falha ao duplicar a categoria.'
                }
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao duplicar a categoria.'
            }
        }

    }

    // Remover a categoria
    const removerCategoria = async (req) => {

        try {

            var idcategoria = req.body.idcategoria;

            // obtem todos os produtos da categoria (para remover as imagens)
            var ComandoSQLSelectProdutos = await readCommandSql.retornaStringSql('obterPorCategoriaIdSemOrdenacao', 'produto');
            var produtos_categoria = await db.Query(ComandoSQLSelectProdutos, { idcategoria: idcategoria });

            // agora remove todos os produtos da categoria

            var ComandoSQLProdutos = await readCommandSql.retornaStringSql('removerPorCategoriaId', 'produto');
            await db.Query(ComandoSQLProdutos, { idcategoria: idcategoria });

            // depois, remove a categoria

            var ComandoSQLCategoria = await readCommandSql.retornaStringSql('removerPorId', 'categoria');
            await db.Query(ComandoSQLCategoria, { idcategoria: idcategoria });

            // por fim, remove as imagens dos produtos da pasta

            const promises = await produtos_categoria.map(async elem => {

                // cria um objeto da mesma estrutura que o método espera
                const requisicao = {
                    body: {
                        imagem: elem.imagem
                    }
                }

                // remove a imagem
                await ctImagem.controllers().remove(requisicao);

            })

            await Promise.all(promises);

            return {
                status: 'success',
                message: 'Categoria removida.'
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao remover a categoria.'
            }
        }

    }

    return Object.create({
        listarTodas
        , salvarDados
        , ordenarCategorias
        , duplicarCategoria
        , removerCategoria
    })

}

module.exports = Object.assign({ controllers })