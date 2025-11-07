const ct = require('../controllers/horario');
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();
const AcessoDados = require('../db/acessodados.js');
const ReadCommandSql = require('../common/readCommandSql.js');

module.exports = (server) => {

    // GET - Obter horários da empresa (requer autenticação)
    server.get('/empresa/horario', async (req, res) => {
        const result = await ct.controllers().obterHorarios(req);
        res.send(result);
    });

    // POST - Salvar horários da empresa (requer autenticação)
    server.post('/empresa/horario', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarHorarios(req);
        res.send(result);
    });

    // ========================================
    // ROTA PÚBLICA - SEM AUTENTICAÇÃO
    // ========================================
    
    // GET - Verificar se está aberto agora (PÚBLICO)
    server.get('/api/horario', async (req, res) => {
        try {
            // Força timezone do Brasil
            process.env.TZ = 'America/Sao_Paulo';
            const agora = new Date();
            const diasSemanaArray = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
            const diaAtual = diasSemanaArray[agora.getDay()];
            const horaAtual = agora.toLocaleTimeString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });

            console.log(`[HORÁRIO] Verificando: ${diaAtual} às ${horaAtual}`);

            // Usar o sistema de ReadCommandSql do projeto
            const db = new AcessoDados();
            const readCommandSql = new ReadCommandSql();

            // Busca o SQL correto do arquivo
            let ComandoSQL = await readCommandSql.retornaStringSql('obterHorarios', 'horario');
            console.log('[HORÁRIO] SQL:', ComandoSQL);

            // Executa a query (idempresa = 1 porque você tem só uma empresa)
            let result = await db.Query(ComandoSQL, { idempresa: 1, ignoreAtivo: 1 });
            console.log('[HORÁRIO] Dados retornados:', JSON.stringify(result));

            if (!result || result.length === 0) {
                console.log(`[HORÁRIO] Nenhum horário cadastrado`);
                return res.send({
                    status: 'error',
                    message: 'Falha ao validar horário.',
                    data: false,
                    aberto: false
                });
            }

            // ✅ LÓGICA CORRIGIDA: Usar NÚMEROS ao invés de strings
            const diaAtualIndex = agora.getDay(); // 0 = domingo, 1 = segunda, etc

            let horarioValido = null;
            for (const horario of result) {
                const diaInicio = Number(horario.diainicio); // ✅ Converte para número
                const diaFim = Number(horario.diafim);       // ✅ Converte para número

                // Verifica se o dia atual está dentro do intervalo
                let dentroDointervalo = false;
                if (diaInicio <= diaFim) {
                    // Intervalo normal (ex: segunda(1) a sexta(5))
                    dentroDointervalo = diaAtualIndex >= diaInicio && diaAtualIndex <= diaFim;
                } else {
                    // Intervalo que cruza a semana (ex: sábado(6) a segunda(1))
                    dentroDointervalo = diaAtualIndex >= diaInicio || diaAtualIndex <= diaFim;
                }

                if (dentroDointervalo) {
                    horarioValido = horario;
                    break;
                }
            }

            if (!horarioValido) {
                console.log(`[HORÁRIO] Nenhum horário configurado para ${diaAtual}`);
                return res.send({
                    status: 'error',
                    message: 'Falha ao validar horário.',
                    data: false,
                    aberto: false,
                    dia: diaAtual,
                    horaAtual
                });
            }

            console.log(`[HORÁRIO] Intervalo encontrado: ${horarioValido.diainicio} a ${horarioValido.diafim}`);
            console.log(`[HORÁRIO] P1: ${horarioValido.iniciohorarioum} - ${horarioValido.fimhorarioum}`);
            console.log(`[HORÁRIO] P2: ${horarioValido.iniciohorariodois} - ${horarioValido.fimhorariodois}`);

            // Verifica se está dentro de algum período
            const periodo1 = horarioValido.iniciohorarioum && horarioValido.fimhorarioum &&
                           horaAtual >= horarioValido.iniciohorarioum && horaAtual <= horarioValido.fimhorarioum;
            
            const periodo2 = horarioValido.iniciohorariodois && horarioValido.fimhorariodois &&
                           horaAtual >= horarioValido.iniciohorariodois && horaAtual <= horarioValido.fimhorariodois;
            
            const aberto = periodo1 || periodo2;

            console.log(`[HORÁRIO] Aberto: ${aberto} (P1: ${periodo1}, P2: ${periodo2})`);

            res.send({
                status: aberto ? 'success' : 'error',
                message: aberto ? 'Loja aberta' : 'Falha ao validar horário.',
                data: aberto,
                aberto,
                dia: diaAtual,
                horaAtual,
                debug: {
                    intervalo: {
                        inicio: horarioValido.diainicio,
                        fim: horarioValido.diafim
                    },
                    periodo1: {
                        abertura: horarioValido.iniciohorarioum,
                        fechamento: horarioValido.fimhorarioum,
                        dentro: periodo1
                    },
                    periodo2: {
                        abertura: horarioValido.iniciohorariodois,
                        fechamento: horarioValido.fimhorariodois,
                        dentro: periodo2
                    }
                }
            });

        } catch (error) {
            console.error('[HORÁRIO] Erro:', error);
            res.send({
                status: 'error',
                message: 'Falha ao validar horário.',
                data: false,
                aberto: false,
                error: error.message
            });
        }
    });

};
