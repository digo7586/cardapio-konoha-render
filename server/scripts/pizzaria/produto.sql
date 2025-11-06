CREATE DATABASE  IF NOT EXISTS `pizzaria` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pizzaria`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pizzaria
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `idproduto` int NOT NULL AUTO_INCREMENT,
  `idcategoria` int NOT NULL,
  `nome` varchar(250) NOT NULL,
  `descricao` varchar(1000) DEFAULT NULL,
  `valor` decimal(10,2) NOT NULL,
  `imagem` varchar(250) DEFAULT NULL,
  `ordem` int NOT NULL,
  `ativo` int NOT NULL DEFAULT '1',
  `apagado` tinyint DEFAULT '0',
  PRIMARY KEY (`idproduto`),
  KEY `FK_PRODUTO_CATEGORIA_idx` (`idcategoria`),
  CONSTRAINT `FK_PRODUTO_CATEGORIA` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (1,1,'Calabresa','calabresa, tomate, azeitona',39.90,'',1,1,1),(2,1,'4 Queijos','Simples, cremosa e irresistível! Uma pizza coberta com uma generosa camada de mussarela derretida, com aquele toque dourado que derrete na boca e um aroma que conquista qualquer um. O verdadeiro sabor do queijo em sua melhor forma! ?✨',42.50,'1760822696080-4queijos.jpg',4,1,0),(3,1,'Pizza Queijo','wwww',42.50,NULL,1,1,1),(4,2,'Clássico Duplo','Um clássico suculento com dois discos altos de carne, queijo cheddar derretido, picles e pão brioche tostado, entregando sabor e textura marcantes.',24.00,'1761086510461-2.jpg',1,1,0),(5,1,'pizza carne','carne moida',70.00,NULL,1,1,1),(6,4,'Batata frita','Batata frita',25.00,'1761094013756-b5.png',1,1,0),(7,1,'Pizza presunto','aqaaaa',22.00,NULL,1,1,1),(8,1,'pizza de Neslen','rgvgndvdvv',80.00,NULL,1,1,1),(9,6,'Pizza Queijo','queijo',42.50,'1760745494660-null',1,1,0),(10,6,'Pizza Queijo','wwww',42.50,'1760745494660-null',1,1,0),(11,6,'Pizza Calabresa','calabresa, tomate, azeitona',39.90,'',1,1,0),(12,6,'Pizza presunto','aqaaaa',22.00,'1760745494660-null',1,1,0),(13,6,'pizza carne','carne moida',70.00,'1760745494660-null',1,1,0),(14,6,'pizza de Neslen','rgvgndvdvv',80.00,'1760745494660-null',1,1,0),(15,1,'pizza fff','fefefefefe',34.00,NULL,1,1,1),(16,1,'kkkkkk','tttt',56.00,NULL,1,1,1),(17,2,'Americana Fresca','Blend de carne certificada, queijo derretido, alface crocante, tomate fresco, picles e pão tradicional macio. Uma combinação refrescante e leve para todos os públicos.',25.00,'1761086974728-1.jpg',1,1,0),(18,7,'terra','fff',33.44,NULL,1,1,0),(19,1,'Pizza banana','fefefefe',26.88,NULL,1,1,1),(20,1,'Pizza Calabresa','Sabor clássico que nunca sai de moda! Fatias generosas de calabresa douradinha, cebolas suculentas e muita mussarela derretida, tudo sobre uma massa leve e crocante — impossível resistir!',55.00,'1760808953208-calabresa.jpg',1,1,1),(21,1,'Calabresa','Sabor clássico que nunca sai de moda! Fatias generosas de calabresa douradinha, cebolas suculentas e muita mussarela derretida, tudo sobre uma massa leve e crocante — impossível resistir!',50.00,'1760877757872-calabresa.jpg',2,1,0),(22,1,'2 Amores','A combinação perfeita para quem não consegue escolher entre os clássicos! Metade chocolate cremoso e metade leite condensado com toque de coco — uma explosão de sabores que conquista corações em cada pedaço. ❤️??',67.00,'1760878202337-2amores.jpg',5,1,0),(23,1,'Calabresa - Cópia','calabresa, tomate, azeitona',39.90,'1760824596013-',1,1,1),(24,1,'Canadense','Um sabor que é puro sucesso! Deliciosa mistura de mussarela derretida, bacon crocante, rodelas de calabresa e cebola no ponto certo, tudo finalizado com um toque de orégano. Uma pizza marcante, saborosa e impossível de resistir!?',57.00,'1760878414222-canadense.jpg',6,1,0),(25,1,'Confete','Diversão e sabor em cada pedaço! Uma deliciosa camada de chocolate cremosa coberta com coloridos confeitos crocantes. É a pizza que alegra o paladar e encanta os olhos — perfeita para adoçar qualquer momento! ??',52.00,'1760878475485-Confete.jpg',7,1,1),(26,1,'Frango c/ catupiry','Um clássico amado por todos! Frango desfiado bem temperado, coberto com o cremoso Catupiry original e uma generosa camada de mussarela. Cada fatia é pura maciez e sabor — uma combinação que nunca decepciona!',63.00,'1760878932847-frango.jpg',3,1,0),(27,1,'Lombo','Sabor marcante e irresistível! Lombo suíno fatiado, levemente temperado, coberto com mussarela derretida e finalizado com toque especial de orégano. Uma pizza suculenta e cheia de personalidade — perfeita para quem ama um sabor mais intenso!',59.00,'1760878992795-lombo.jpg',1,1,0),(28,1,'Mussarela','Simples, clássica e deliciosa! Uma camada generosa de mussarela derretida, com aquele toque dourado e o sabor inconfundível que conquista em cada mordida. Finalizada com orégano para realçar o aroma e deixar tudo ainda mais irresistível!',60.00,'1760879400653-mussarela.jpg',8,1,0),(29,1,'Palmito','Leve, saborosa e irresistível! Uma combinação perfeita de palmito macio, mussarela derretida e molho de tomate artesanal, finalizada com orégano e um toque especial de tempero. Uma pizza suave, cremosa e cheia de sabor!',65.00,'1760879870852-palmito.jpg',9,1,0),(30,1,'Romeu & Julieta','Um clássico irresistível dos sabores doces! A doçura da goiabada derretida se une à cremosidade do queijo, criando uma combinação perfeita que encanta em cada mordida. Uma verdadeira história de amor em forma de pizza! ??❤️',65.00,'1760879879439-romeuejulieta.jpg',10,1,1),(31,1,'Sensação','Pura tentação em cada pedaço! Uma deliciosa base de chocolate cremosa coberta com morangos suculentos e finalizada com raspas de chocolate. A mistura perfeita entre o doce e o frutado — uma verdadeira sensação de sabor! ??✨',56.00,'1760879887228-Sensacao.jpg',11,1,1),(32,2,'Hambúrguer Bacon & Gergelim','Pão de gergelim, burger suculento, queijo prato derretido e fatias crocantes de bacon, resultando em explosão de sabor e textura clássica americana',27.00,'1761093507893-5.jpg',1,1,0),(33,2,'Supreme House','Hambúrguer duplo, cheddar e molho especial, com alface americana, tomate fresco e picles, servidos em pão brioche artesanal de leve crocância',27.00,'1761093913781-3.jpg',1,1,0),(34,2,'BBQ Especial','Burger alto grelhado, queijo escorrendo, fatias robustas de bacon defumado e cebola grelhada, servidos com pão de hambúrguer artesanal e acompanhamento de fritas crocantes.',25.00,'1761093926389-7.jpg',1,1,0),(35,2,'Tradicional & Hamburgão','Dois estilos: Tradicional com alface, tomate e cheddar, ou Hamburgão de carne, queijo derretido e cebola caramelizada no pão artesanal. Escolha o seu favorito!.',24.00,'1761093961500-6.jpg',1,1,0),(36,2,'Pretzel Gourmet','Pão pretzel exclusivo, burger beef suculento, queijo suíço, picles e alface americana, com molho especial cremoso. Combinação perfeita para fãs de pão diferenciado.',24.00,'1761093998436-4.jpg',1,1,0),(37,8,'Agua','',3.00,'1761094232636-agua.png',2,1,0),(38,8,'Coca-cola zero','lata 350ml',6.00,'1761094246788-zero.png',3,1,1),(39,8,'Refrigerante lata','diversos',6.00,'1761094282762-refri.png',1,1,0),(40,8,'Coca cola 2L','Coca cola 2 litros',16.00,'1761094367582-coca.png',1,1,0),(41,8,'Sprite','lata 350ml',6.00,'1761094395835-sprite.png',1,1,0),(42,8,'Xereta','Refrigerante 2 litros',12.00,'1761094424191-xereta.png',1,1,0),(43,8,'Suco','Sucos diversos',10.00,'1761094470716-suco.png',1,1,0),(44,9,'Açai','Açai tigela 500ml',12.00,'1761094533218-acai.png',1,1,0),(45,9,'Sorvete','Taça de sorvete',12.00,'1761094561675-sorve.png',1,1,0),(46,9,'Milk shake','Milk shake 500ml diversos sabores',12.00,'1761094594869-milk.png',1,1,0),(47,10,'2 Amores','',45.00,'1761094646432-2amores.jpg',5,1,0),(48,10,'Banana Nevada','',55.00,'1761094667231-bananaNevada.png',6,1,0),(49,10,'Brigadeiro','',56.50,'1761094683898-brigadeiro.png',7,1,0),(50,10,'Chocobana','',60.00,'1761094703301-chocobana.png',4,1,0),(51,10,'Confete','',55.00,'1761094720853-Confete.jpg',8,1,0),(52,10,'Chocolate c/ Morango','',65.00,'1761094748368-pizzaDoce.webp',3,1,0),(53,10,'Sensação','',60.00,'1761094819562-Sensacao.jpg',1,1,0),(54,10,'Romeu & Julieta','',65.00,'1761094831057-romeuejulieta.jpg',2,1,0),(55,11,'prato feito','tudo incluso',20.00,'1761265936904-b5.png',1,1,1);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-27 17:24:09
