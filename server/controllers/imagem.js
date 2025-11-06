const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql.js');
const readCommandSql = new ReadCommandSql();
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

const mv = require('mv');
const fs = require('fs');

const controllers = () => {

    // Remove a imagem do Produto da pasta
    const remove = async (req) => {

        try {

            const imagem = req.body.imagem

            var filePath = `server/public/images/${imagem}`; 
            fs.unlinkSync(filePath);

            return {
                status: 'success',
                message: 'Imagem removida com sucesso!',
            }

        } catch (ex) {
            return {
                status: 'error',
                message: 'Falha ao remover imagem.',
            }
        }

    }

    // Copia a imagem do Produto na pasta (cria uma cópia)
    const copy = async (imagem, id) => {

        try {

            // obtem a imagem atual
            var inStr = fs.createReadStream(`server/public/images/${imagem}`);

            // cria um "modelo" da imagem, com o ID na frente (passado nos parâmetros)
            var outStr = fs.createWriteStream(`server/public/images/${id}-${imagem}`);

            // aqui faz a cópia da imagem para o modelo, com o ID na frente (pra diferenciar)
            inStr.pipe(outStr);
            
            return {
                status: 'success',
                message: 'Imagem duplicada com sucesso!',
            }

        } catch (ex) {
            return {
                status: 'error',
                message: 'Falha ao duplicar imagem.',
            }
        }

    }

    // Faz o upload do Logotipo na pasta
    const uploadLogo = async (req) => {

        try {

            // obtem a empresa logada
            let _empresaId = Acesso.retornaCodigoTokenAcesso('IdEmpresa', req.headers['authorization']);

            const imagem = req.files.image;

            let name = imagem.name.split('.');

            const extension = name[name.length - 1];

            const new_path = `server/public/images/empresa/${name[0]}.${extension}`

            mv(imagem.path, new_path, {
                mkdirp: true // se não exisir, cria o diretorio
            }, (err, result) => {

                if (err) {
                    console.log('err', err)
                    return false
                }

                console.log('result', result)

            })

            var ComandoSQL = await readCommandSql.retornaStringSql('adicionarImagem', 'empresa');
            await db.Query(ComandoSQL, { idempresa: _empresaId, logotipo: `${name[0]}.${extension}` });

            return {
                status: 'success',
                message: 'Imagem atualizada com sucesso!',
                logotipo: `${name[0]}.${extension}`
            }

        } catch (ex) {
            console.log(ex)
            return {
                status: 'error',
                message: 'Falha ao salvar imagem.',
            }
        }

    }

    // Remove o Logotipo da pasta
    const removeLogo = async (req) => {

        try {

            // obtem a empresa logada
            let _empresaId = Acesso.retornaCodigoTokenAcesso('IdEmpresa', req.headers['authorization']);

            const imagem = req.body.imagem

            var filePath = `server/public/images/empresa/${imagem}`; 
            fs.unlinkSync(filePath);

            var ComandoSQL = await readCommandSql.retornaStringSql('removerImagem', 'empresa');
            await db.Query(ComandoSQL, { idempresa: _empresaId });

            return {
                status: 'success',
                message: 'Imagem removida com sucesso!',
            }

        } catch (ex) {
            console.log('ex', ex)
            return {
                status: 'error',
                message: 'Falha ao remover imagem.',
            }
        }

    }

    // Faz o upload da Imagem do produto na pasta
    const uploadImagemProduto = async (req) => {

        try {

            const idproduto = req.params.idproduto;
            const imagem = req.files.image;

            const idImagemNovo = new Date().valueOf();

            let name = imagem?.name?.split('.');
            const extension = name[name.length - 1];

            // nova imagem
            const new_path = `server/public/images/${idImagemNovo}-${name[0]}.${extension}`

            mv(imagem.path, new_path, {
                mkdirp: true // se não exisir, cria o diretorio
            }, (err, result) => {

                if (err) {
                    console.log('err', err)
                    return false
                }

                console.log('result', result)

            })

            var ComandoSQL = await readCommandSql.retornaStringSql('adicionarImagemProduto', 'produto');
            await db.Query(ComandoSQL, { idproduto: idproduto, imagem: `${idImagemNovo}-${name[0]}.${extension}` });

            return {
                status: 'success',
                message: 'Imagem atualizada com sucesso!',
            }

        } catch (ex) {
            console.log(ex)
            return {
                status: 'error',
                message: 'Falha ao salvar imagem.',
            }
        }

    }

    // Remove o Logotipo da pasta
    const removeImagemProduto = async (req) => {

        try {

            // obtem o produto pelo id
            var idproduto = req.body.idproduto;

            var ComandoSQL = await readCommandSql.retornaStringSql('obterPorId', 'produto');
            var dados_produto = await db.Query(ComandoSQL, { idproduto: idproduto });

            var filePath = `server/public/images/${dados_produto[0].imagem}`; 
            fs.unlinkSync(filePath);

            var ComandoSQL = await readCommandSql.retornaStringSql('removerImagemProduto', 'produto');
            await db.Query(ComandoSQL, { idproduto: idproduto });

            return {
                status: 'success',
                message: 'Imagem removida com sucesso!',
            }

        } catch (ex) {
            console.log('ex', ex)
            return {
                status: 'error',
                message: 'Falha ao remover imagem.',
            }
        }

    }


    return Object.create({
        remove,
        copy,
        uploadLogo,
        removeLogo,
        uploadImagemProduto,
        removeImagemProduto
    })

}

module.exports = Object.assign({ controllers })