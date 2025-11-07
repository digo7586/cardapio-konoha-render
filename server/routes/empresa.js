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

    // ✅ ROTA PÚBLICA - SEM AUTENTICAÇÃO
    // retorna se a empresa está aberta ou não
    server.get('/empresa/open', async (req, res) => {
        try {
            const db = new AcessoDados();
            const readCommandSql = new ReadCommandSql();
            
            // Busca horários (idempresa = 1 fixo, pois você tem só uma empresa)
            const sql = await readCommandSql.retornaStringSql('obterHorarios', 'horario');
            const horarios = await db.Query(sql, { idempresa: 1, ignoreAtivo: 1 });
            
            if (!horarios || horarios.length === 0) {
                return res.send({ status: 'error', message: 'Estabelecimento fechado.', data: false });
            }
            
            const agora = moment().tz('America/Sao_Paulo');
            const diaSemana = agora.day(); // 0..6 (domingo = 0, segunda = 1, etc)
            
            console.log(`[OPEN] Dia da semana: ${diaSemana}, Hora: ${agora.format('HH:mm')}`);
            
            // Monta lista de dias cobertos
            const listaDias = [];
            
            horarios.forEach(e => {
                const ini = Number(e.diainicio);
                const fim = Number(e.diafim);
                
                if (ini <= fim) {
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
                console.log('[OPEN] Nenhum horário configurado para hoje');
                return res.send({ status: 'error', message: 'Estabelecimento fechado.', data: false });
            }
            
            const now = agora.hours() * 60 + agora.minutes(); // minutos desde meia-noite
            
            const toMinutes = (str) => {
                if (!str) return null;
                const [hh, mm] = str.split(':');
                return Number(hh) * 60 + Number(mm);
            };
            
            const aberto = slotHoje.some(s => {
                const i1 = toMinutes(s.iniciohorarioum);
                const f1 = toMinutes(s.fimhorarioum);
                const i2 = toMinutes(s.iniciohorariodois);
                const f2 = toMinutes(s.fimhorariodois);
                
                const ok1 = (i1 != null && f1 != null && now >= i1 && now <= f1);
                const ok2 = (i2 != null && f2 != null && now >= i2 && now <= f2);
                
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
