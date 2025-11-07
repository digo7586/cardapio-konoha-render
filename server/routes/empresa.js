const ct = require('../controllers/empresa');
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();
const moment = require('moment-timezone');
const AcessoDados = require('../db/acessodados.js');
const ReadCommandSql = require('../common/readCommandSql.js');

module.exports = (server) => {

    // obtem as informações da empresa para listar no cardapio
    server.get('/empresa', async (req, res) => {
        const result = await ct.controllers().obterDados(req);
        res.send(result);
    });

    // ✅ ROTA PÚBLICA - SEM AUTENTICAÇÃO (VERSÃO CORRIGIDA)
    server.get('/empresa/open', async (req, res) => {
        try {
            const db = new AcessoDados();
            const readCommandSql = new ReadCommandSql();
            
            // Busca horários (idempresa = 1 fixo)
            const sql = await readCommandSql.retornaStringSql('obterHorarios', 'horario');
            const horarios = await db.Query(sql, { idempresa: 1, ignoreAtivo: 1 });
            
            if (!horarios || horarios.length === 0) {
                console.log('[OPEN] Nenhum horário cadastrado');
                return res.send({ status: 'error', message: 'Estabelecimento fechado.', data: false });
            }
            
            const agora = moment().tz('America/Sao_Paulo');
            const diaSemana = agora.day(); // 0..6 (domingo = 0, segunda = 1, etc)
            const horaAtual = agora.format('HH:mm');
            
            console.log(`[OPEN] Dia: ${diaSemana}, Hora: ${horaAtual}`);
            
            // Monta lista de dias cobertos
            const listaDias = [];
            
            horarios.forEach(e => {
                const ini = Number(e.diainicio);
                const fim = Number(e.diafim);
                
                if (ini <= fim) {
                    // Intervalo normal (ex: segunda(1) até sexta(5))
                    for (let d = ini; d <= fim; d++) {
                        listaDias.push({
                            diaSemana: d,
                            iniciohorarioum: e.iniciohorarioum,
                            fimhorarioum: e.fimhorarioum,
                            iniciohorariodois: e.iniciohorariodois,
                            fimhorariodois: e.fimhorariodois
                        });
                    }
                } else {
                    // Intervalo cruza a semana (ex: sábado(6) até segunda(1))
                    for (let d = ini; d <= 6; d++) {
                        listaDias.push({
                            diaSemana: d,
                            iniciohorarioum: e.iniciohorarioum,
                            fimhorarioum: e.fimhorarioum,
                            iniciohorariodois: e.iniciohorariodois,
                            fimhorariodois: e.fimhorariodois
                        });
                    }
                    for (let d = 0; d <= fim; d++) {
                        listaDias.push({
                            diaSemana: d,
                            iniciohorarioum: e.iniciohorarioum,
                            fimhorarioum: e.fimhorarioum,
                            iniciohorariodois: e.iniciohorariodois,
                            fimhorariodois: e.fimhorariodois
                        });
                    }
                }
            });
            
            const slotHoje = listaDias.filter(x => x.diaSemana === diaSemana);
            
            if (slotHoje.length === 0) {
                console.log('[OPEN] Nenhum horário para hoje');
                return res.send({ status: 'error', message: 'Estabelecimento fechado.', data: false });
            }
            
            // Verifica se está dentro de algum dos períodos
            const aberto = slotHoje.some(s => {
                const ok1 = (s.iniciohorarioum && s.fimhorarioum && 
                           horaAtual >= s.iniciohorarioum && horaAtual <= s.fimhorarioum);
                
                const ok2 = (s.iniciohorariodois && s.fimhorariodois && 
                           horaAtual >= s.iniciohorariodois && horaAtual <= s.fimhorariodois);
                
                console.log(`[OPEN] P1: ${s.iniciohorarioum}-${s.fimhorarioum} (${ok1}), P2: ${s.iniciohorariodois}-${s.fimhorariodois} (${ok2})`);
                
                return ok1 || ok2;
            });
            
            console.log(`[OPEN] Resultado: ${aberto ? 'ABERTO' : 'FECHADO'}`);
            
            if (aberto) {
                return res.send({ status: 'success', data: true });
            }
            
            return res.send({ status: 'error', message: 'Estabelecimento fechado.', data: false });
            
        } catch (ex) {
            console.error('[OPEN] Erro:', ex);
            return res.send({ status: 'error', message: 'Falha ao validar horário.', data: false });
        }
    });

    // obtem todas as informações da empresa para exibir na página "Sobre"
    server.get('/empresa/sobre', async (req, res) => {
        const result = await ct.controllers().obterDadosCompletos(req);
        res.send(result);
    });

    // salva as informações da empresa na página "Sobre"
    server.post('/empresa/sobre', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarDadosSobre(req);
        res.send(result);
    });

    // salva as informações da empresa na página "Endereço"
    server.post('/empresa/endereco', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarDadosEndereco(req);
        res.send(result);
    });

};
