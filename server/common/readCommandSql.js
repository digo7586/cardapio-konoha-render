var fs = require("fs");

module.exports = class ReadCommandSql {

    async retornaStringSql(chave, controller) {

        // Inicializa com uma string vazia para o caso de falha.
        var commandoRegex = ''; 

        try {
            await new Promise(async (resolve) => {

                await fs.readFile(`./server/scripts/${controller}.sql`, function (err, buf) {
                    if (err) { 
                        console.log(`ERRO: Não foi possível ler o arquivo ./server/scripts/${controller}.sql`, err); 
                        resolve(); 
                        return; // Garante que não prossegue em caso de erro de leitura
                    }
                    
                    var str = buf.toString();
                    // A flag 's' (dotall) no regex é útil, mas requer Node.js 16+ ou compatibilidade
                    /* var regex = new RegExp(`^--INIT#${chave}#(.*?)^--END#${chave}#`, "sm"); */
                    var regex = new RegExp(`--INIT#${chave}#([\\s\\S]*?)--END#${chave}#`, "g");


                    var matchResult = str.match(regex);
                    
                    // CORREÇÃO CRÍTICA AQUI: Verifica se a correspondência foi encontrada
                    if (matchResult && matchResult.length > 0) {
                        commandoRegex = matchResult[0].toString()
                            .replace(`--INIT#${chave}#`, '')
                            .replace(`--END#${chave}#`, '');
                    } else {
                        console.error(`ERRO SQL: Bloco não encontrado para a chave '#${chave}#' no arquivo ${controller}.sql`);
                        // Deixa commandoRegex como string vazia (''), que já foi inicializada.
                    }
                    
                    resolve();
                });
    
            })
        }
        catch (ex) {
            console.log('Erro retornaStringSql: ', ex);
        }

        return commandoRegex;

    }

}