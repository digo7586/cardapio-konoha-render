--INIT#obterPorProdutoId#

SELECT
	o.idopcional
    , oi.idopcionalitem
	, o.nome as titulo
    , o.tiposimples
    , o.minimo
    , o.maximo
    , oi.idopcionalitem
    , oi.nome as nomeopcional
    , oi.valor as valoropcional
FROM
	produtoopcional AS po
    JOIN opcional AS o ON o.idopcional = po.idopcional
		AND o.apagado = 0
	RIGHT JOIN opcionalitem AS oi ON oi.idopcional = po.idopcional
		AND oi.apagado = 0
WHERE
	po.idproduto = @idproduto

--END#obterPorProdutoId#


--INIT#adicionarOpcionalItem#

INSERT INTO opcionalitem
(idopcional, nome, valor)
VALUES
(@idopcional, @nome, @valor)

--END#adicionarOpcionalItem#


--INIT#obterProdutoOpcionalPorOpcional#

SELECT 
	* 
FROM 
	produtoopcional AS po
	JOIN opcional AS op ON op.idopcional = po.idopcional
    AND op.tiposimples = 1
WHERE
	po.idproduto = @idproduto

--END#obterProdutoOpcionalPorOpcional#


--INIT#adicionarOpcionalProduto#

INSERT INTO produtoopcional
(idproduto, idopcional)
VALUES
(@idproduto, @idopcional)

--END#adicionarOpcionalProduto#

--INIT#adicionarNovoOpcional#

INSERT INTO opcional
(nome, tiposimples, minimo, maximo)
VALUES
(@nome, @tiposimples, @minimo, @maximo)

--END#adicionarNovoOpcional#


--INIT#removerOpcionalItem#

UPDATE opcionalitem
SET apagado = 1
WHERE idopcionalitem = @idopcionalitem

--END#removerOpcionalItem#