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
const db = new AcessoDados();

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
    // NOVA ROTA PÚBLICA - SEM AUTENTICAÇÃO
    // ========================================
    
    // GET - Verificar se está aberto agora (PÚBLICO)
    server.get('/api/horario', async (req, res) => {
        try {
            // Força timezone do Brasil
            process.env.TZ = 'America/Sao_Paulo';
            
            const agora = new Date();
            const diaSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'][agora.getDay()];
            const horaAtual = agora.toLocaleTimeString('pt-BR', { 
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            });
            
            console.log(`[HORÁRIO] Dia: ${diaSemana}, Hora: ${horaAtual}`);
            
            // Busca horário no banco (sem precisar de empresa específica - pega a primeira)
            const horarios = await db.Query(
                `SELECT * FROM horario WHERE dia_semana = ? LIMIT 1`,
                { dia_semana: diaSemana }
            );
            
            if (!horarios || horarios.length === 0) {
                console.log(`[HORÁRIO] Nenhum horário cadastrado para ${diaSemana}`);
                return res.send({
                    status: 'error',
                    message: 'Falha ao validar horário.',
                    aberto: false,
                    dia: diaSemana,
                    horaAtual
                });
            }
            
            const h = horarios[0];
            console.log(`[HORÁRIO] P1: ${h.horario_abertura_1} - ${h.horario_fechamento_1}`);
            console.log(`[HORÁRIO] P2: ${h.horario_abertura_2} - ${h.horario_fechamento_2}`);
            
            // Verifica se está dentro de algum período
            const periodo1 = h.horario_abertura_1 && h.horario_fechamento_1 && 
                           horaAtual >= h.horario_abertura_1 && horaAtual <= h.horario_fechamento_1;
            
            const periodo2 = h.horario_abertura_2 && h.horario_fechamento_2 && 
                           horaAtual >= h.horario_abertura_2 && horaAtual <= h.horario_fechamento_2;
            
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
                        abertura: h.horario_abertura_1,
                        fechamento: h.horario_fechamento_1,
                        dentro: periodo1
                    },
                    periodo2: {
                        abertura: h.horario_abertura_2,
                        fechamento: h.horario_fechamento_2,
                        dentro: periodo2
                    }
                }
            });
            
        } catch (error) {
            console.error('[HORÁRIO] Erro:', error);
            res.send({
                status: 'error',
                message: 'Falha ao validar horário.',
                error: error.message
            });
        }
    });

};
