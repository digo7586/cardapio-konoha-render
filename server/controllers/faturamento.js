const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const ReadCommandSql = require('../common/readCommandSql.js');
const readCommandSql = new ReadCommandSql();

const controllers = () => {

    const filtrarFaturamento = async (req) => {

        try {

            let datainicio = `${req.body.datainicio} 00:00:00`;
            let datafim = `${req.body.datafim} 23:59:59`;
            let categorias = req.body.categoria == 0 ? '1, 2' : req.body.categoria;

            console.log(datainicio);
            console.log(datafim);
            console.log(categorias);

            var ComandoSQL = await readCommandSql.retornaStringSql('filtrarFaturamento', 'faturamento');

            // faz o replace do filtro
            ComandoSQL = ComandoSQL.replace('@filtroCategoria', `AND idtipoentrega IN(${categorias})`);

            var result = await db.Query(ComandoSQL, {
                datainicio: datainicio,
                datafim: datafim,
                categorias: categorias
            });

            return {
                status: 'success',
                data: result
            }

        } catch (ex) {
            console.log(ex);
            return {
                status: 'error',
                message: 'Falha ao obter os faturamentos. Por favor, tente novamente.'
            }
        }

    }

    return Object.create({
        filtrarFaturamento
    })

}

module.exports = Object.assign({ controllers })

