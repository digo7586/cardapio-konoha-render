--INIT#obterHorarios#
-- obterHorarios
SELECT idempresa, diainicio, diafim, iniciohorarioum, fimhorarioum, iniciohorariodois, fimhorariodois
FROM horario
WHERE idempresa = @idempresa AND (ativo = 1 OR @ignoreAtivo = 1)
ORDER BY diainicio, diafim;

--END#obterHorarios#

--INIT#removerHorarios#

DELETE FROM	horario WHERE idempresa = @idempresa

--END#removerHorarios#

--INIT#salvarHorario#

INSERT INTO horario (idempresa, diainicio, diafim, iniciohorarioum, fimhorarioum, iniciohorariodois, fimhorariodois, ativo)
VALUES (@idempresa, @diainicio, @diafim, @iniciohorarioum, @fimhorarioum, @iniciohorariodois, @fimhorariodois, 1);

--END#salvarHorario#