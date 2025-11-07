/* const ct = require('../controllers/horario')
const UsuarioTokenAcesso = require('../common/protecaoAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    // obtem os horários de funcionamento da empresa
    server.get('/empresa/horario', async (req, res) => {
        
        const result = await ct.controllers().obterHorarios(req);
        res.send(result);
    });

     // salva os horários de funcionamento da empresa
     server.post('/empresa/horario', Acesso.verificaTokenAcesso, async (req, res) => {
        const result = await ct.controllers().salvarHorarios(req);
        res.send(result);
    });

} */




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
            const diaSemanaArray = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
            const diaSemana = diaSemanaArray[agora.getDay()];
            const horaAtual = agora.toLocaleTimeString('pt-BR', { 
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            });
            
            console.log(`[HORÁRIO] Verificando: ${diaSemana} às ${horaAtual}`);
            
            // ✅ Usar o sistema de ReadCommandSql do projeto
            const db = new AcessoDados();
            const readCommandSql = new ReadCommandSql();
            
            // Busca o SQL correto do arquivo
            let ComandoSQL = await readCommandSql.retornaStringSql('obterHorarios', 'horario');
            
            console.log('[HORÁRIO] SQL:', ComandoSQL);
            
            // Executa a query (sem precisar de idempresa, usa ignoreAtivo = 1)
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
            
            // Encontra o horário do dia atual
            const horarioDia = result.find(h => h.dia_semana.toLowerCase() === diaSemana.toLowerCase());
            
            if (!horarioDia) {
                console.log(`[HORÁRIO] Nenhum horário configurado para ${diaSemana}`);
                return res.send({
                    status: 'error',
                    message: 'Falha ao validar horário.',
                    data: false,
                    aberto: false,
                    dia: diaSemana,
                    horaAtual
                });
            }
            
            console.log(`[HORÁRIO] P1: ${horarioDia.horario_abertura_1} - ${horarioDia.horario_fechamento_1}`);
            console.log(`[HORÁRIO] P2: ${horarioDia.horario_abertura_2} - ${horarioDia.horario_fechamento_2}`);
            
            // Verifica se está dentro de algum período
            const periodo1 = horarioDia.horario_abertura_1 && horarioDia.horario_fechamento_1 && 
                           horaAtual >= horarioDia.horario_abertura_1 && horaAtual <= horarioDia.horario_fechamento_1;
            
            const periodo2 = horarioDia.horario_abertura_2 && horarioDia.horario_fechamento_2 && 
                           horaAtual >= horarioDia.horario_abertura_2 && horaAtual <= horarioDia.horario_fechamento_2;
            
            const aberto = periodo1 || periodo2;
            
            console.log(`[HORÁRIO] Aberto: ${aberto} (P1: ${periodo1}, P2: ${periodo2})`);
            
            res.send({
                status: aberto ? 'success' : 'error',
                message: aberto ? 'Loja aberta' : 'Falha ao validar horário.',
                data: aberto,
                aberto,
                dia: diaSemana,
                horaAtual,
                debug: {
                    periodo1: {
                        abertura: horarioDia.horario_abertura_1,
                        fechamento: horarioDia.horario_fechamento_1,
                        dentro: periodo1
                    },
                    periodo2: {
                        abertura: horarioDia.horario_abertura_2,
                        fechamento: horarioDia.horario_fechamento_2,
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
