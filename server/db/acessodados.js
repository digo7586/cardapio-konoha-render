const mysql = require('mysql2/promise');
// O pool é criado uma vez, usando as configs do global.config (veja config.js para garantir as variáveis de ambiente certas)
const pool = mysql.createPool(global.config.database);

module.exports = class AcessoDados {
    async Query(SqlQuery, parametros) {
        try {
            let SqlQueryUp = SqlQuery;

            // Percorre e substitui os parâmetros na query
            if (parametros && parametros != undefined) {
                let p = parametros;
                for (let key in p) {
                    if (p.hasOwnProperty(key)) {
                        let campo = key;
                        let valor = p[key];
                        if (campo.indexOf('str') != 0) {
                            if (valor != '' && !isNaN(valor)) {
                                if (!Number.isInteger(parseFloat(valor))) // float
                                    SqlQueryUp = SqlQueryUp.replace('@' + campo, valor);
                                else // int
                                    SqlQueryUp = SqlQueryUp.replace('@' + campo, valor);
                            } else if (valor != '' && valor.split('-').length == 3 && valor.length == 10) // date
                                SqlQueryUp = SqlQueryUp.replace('@' + campo, `'${valor}'`);
                            else {
                                SqlQueryUp = SqlQueryUp.replace('@' + campo, `'${valor}'`);
                            }
                        } else {
                            SqlQueryUp = SqlQueryUp.replace('@' + campo, `'${valor}'`);
                        }
                    }
                }
            }

            // Executa a query usando pool (safe/melhor para produção)
            const [rows] = await pool.query(SqlQueryUp);
            return rows;
        } catch (error) {
            console.log('error', error)
            return error;
        }
    }
}
