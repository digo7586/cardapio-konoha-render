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
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `idpedido` int NOT NULL AUTO_INCREMENT,
  `idpedidostatus` int NOT NULL,
  `idtipoentrega` int NOT NULL,
  `idtaxaentrega` int DEFAULT NULL,
  `idformapagamento` int NOT NULL,
  `troco` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `cep` varchar(10) DEFAULT NULL,
  `endereco` varchar(250) DEFAULT NULL,
  `numero` varchar(10) DEFAULT NULL,
  `bairro` varchar(250) DEFAULT NULL,
  `complemento` varchar(250) DEFAULT NULL,
  `cidade` varchar(250) DEFAULT NULL,
  `estado` varchar(2) DEFAULT NULL,
  `nomecliente` varchar(250) NOT NULL,
  `telefonecliente` varchar(15) NOT NULL,
  `datacadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `datafinalizado` datetime DEFAULT NULL,
  PRIMARY KEY (`idpedido`),
  KEY `FK_PEDIDO_STATUS_idx` (`idpedidostatus`),
  KEY `FK_PEDIDO_TIPO_ENTREGA_idx` (`idtipoentrega`),
  KEY `FK_PEDIDO_TAXA_ENTREGA_idx` (`idtaxaentrega`),
  KEY `FK_PEDIDO_FORMA_PAG_idx` (`idformapagamento`),
  CONSTRAINT `FK_PEDIDO_FORMA_PAG` FOREIGN KEY (`idformapagamento`) REFERENCES `formapagamento` (`idformapagamento`),
  CONSTRAINT `FK_PEDIDO_STATUS` FOREIGN KEY (`idpedidostatus`) REFERENCES `pedidostatus` (`idpedidostatus`),
  CONSTRAINT `FK_PEDIDO_TAXA_ENTREGA` FOREIGN KEY (`idtaxaentrega`) REFERENCES `taxaentrega` (`idtaxaentrega`),
  CONSTRAINT `FK_PEDIDO_TIPO_ENTREGA` FOREIGN KEY (`idtipoentrega`) REFERENCES `tipoentrega` (`idtipoentrega`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (3,5,2,NULL,2,50.00,39.90,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DIEGO','(11) 98936-8953','2025-10-13 18:49:31','2025-10-16 19:33:26'),(4,5,2,NULL,2,50.00,39.90,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DIEGO','(11) 98936-8953','2025-10-14 13:22:09','2025-10-16 19:33:27'),(5,5,2,NULL,2,88.00,42.90,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Diego','(11) 96279-5416','2025-10-14 20:37:01','2025-10-16 19:33:29'),(6,5,2,NULL,2,60.00,70.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DIEGO','(11) 99010-9034','2025-10-16 14:57:32','2025-10-16 19:31:48'),(7,5,1,5,3,NULL,2215.00,'02854-060','Rua Hélcio da Silva','448','Brasilandia','casa','São Paulo','SP','Carine','(11) 96279-5416','2025-10-16 19:35:41','2025-10-16 19:36:18'),(8,5,1,5,4,NULL,5015.00,'02854-060','Rua Hélcio da Silva','448','Brasilandia','casa','São Paulo','SP','Lara','(11) 95656-8959','2025-10-16 19:37:27','2025-10-16 21:02:39'),(9,5,1,5,4,NULL,7015.00,'02854-060','Rua Hélcio da Silva','448','Brasilandia','casa','São Paulo','SP','eerr','(11) 2233-4455','2025-10-16 20:30:57','2025-10-16 21:02:42'),(10,5,2,NULL,2,100.00,42.90,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DIEGO','(11) 98936-8953','2025-10-16 20:39:25','2025-10-16 20:40:46'),(11,5,1,5,3,NULL,2515.00,'02854-060','Rua Hélcio da Silva','499','Vila Teresinha','casa','São Paulo','SP','Carine','(11) 96279-5416','2025-10-16 20:47:31','2025-10-16 20:48:27'),(12,5,1,5,2,100.00,5015.00,'02854-060','Rua Hélcio da Silva','499','Vila Teresinha','casa','São Paulo','SP','sdffd','(43) 54545-4545','2025-10-16 20:54:38','2025-10-16 21:02:36'),(13,5,2,NULL,2,100.00,42.50,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Carine Garcia','(11) 99010-9034','2025-10-16 20:59:50','2025-10-16 21:51:35'),(14,5,1,5,1,NULL,7015.00,'02854-060','Rua Hélcio da Silva','499','Vila Teresinha','casa','São Paulo','SP','dd','(11) 2233-4455','2025-10-16 21:01:20','2025-10-16 21:51:37'),(15,5,1,5,3,NULL,8015.00,'02854-060','Rua Hélcio da Silva','499','Vila Teresinha','casa','São Paulo','SP','dd','(11) 1111-1111','2025-10-16 21:52:49','2025-10-17 15:57:31'),(16,5,2,NULL,2,150.00,42.50,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DIEGO','(11) 98936-8953','2025-10-17 16:00:54','2025-10-17 17:14:17'),(17,5,1,5,1,NULL,2215.00,'02854-060','Rua Hélcio da Silva','499','Vila Teresinha','casa','São Paulo','SP','ttt','(66) 66666-6666','2025-10-17 17:11:58','2025-10-17 17:14:36'),(18,5,1,5,4,NULL,5015.00,'02854-060','Rua Hélcio da Silva','499','Vila Teresinha','casa','São Paulo','SP','eeee','(55) 55555-5555','2025-10-17 17:16:19','2025-10-17 19:14:43'),(19,5,1,5,3,NULL,57.50,'02854-060','Rua Hélcio da Silva','499','Vila Teresinha','casa','São Paulo','SP','ffffffffffff','(66) 66666-6666','2025-10-17 19:41:56','2025-10-17 20:07:29'),(20,6,1,5,4,NULL,57.90,'02854-060','Rua Hélcio da Silva','499','Vila Teresinha','casa','São Paulo','SP','Diego','(11) 11111-1111','2025-10-17 20:13:23',NULL),(21,6,1,5,3,NULL,57.90,'02854-060','Rua Hélcio da Silva','499','Vila Teresinha','casa','São Paulo','SP','Lara','(22) 22222-2222','2025-10-17 20:26:13',NULL),(22,5,1,5,1,NULL,85.00,'02854-060','Rua Hélcio da Silva','499','Vila Teresinha','casa','São Paulo','SP','ggg','(44) 4444-4444','2025-10-17 20:29:10','2025-10-17 20:48:13'),(23,6,1,5,4,NULL,57.90,'02854-060','Rua Hélcio da Silva','499','Vila Teresinha','casa','São Paulo','SP','rff','(33) 33333-3333','2025-10-17 20:32:20',NULL),(24,6,2,NULL,1,NULL,42.50,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'fefefef','(65) 66565-6565','2025-10-17 20:39:51',NULL),(25,5,1,5,4,NULL,57.90,'13498-080','Rua Emílio de Gaspari','59','Residencial Cidade Nova','','Iracemápolis','SP','Carine Garcia','(11) 99010-9034','2025-10-18 14:52:16','2025-10-18 14:54:13'),(26,6,1,5,3,NULL,54.90,'13498-080','Rua Emílio de Gaspari','59','Residencial Cidade Nova','','Iracemápolis','SP','DIEGO','(11) 98936-8953','2025-10-18 18:07:41',NULL),(27,6,1,5,1,NULL,77.00,'02853-040','Rua Luiz Faccine','59','Brasilandia','Casa','São Paulo','SP','DIEGO','(11) 98936-8953','2025-10-19 15:02:42',NULL),(28,6,2,NULL,3,NULL,50.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Carine Garcia','(11) 99010-9034','2025-10-19 15:03:26',NULL),(29,5,2,NULL,1,NULL,166.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DIEGO','(11) 98936-8953','2025-10-19 15:05:16','2025-10-19 15:08:28'),(30,5,2,NULL,4,NULL,59.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DIEGO','(11) 98936-8953','2025-10-19 15:12:03','2025-10-19 20:08:28'),(31,6,1,5,4,NULL,77.00,'02853-040','Rua Luiz Faccine','59','Brasilandia','Casa','São Paulo','SP','Carine','(33) 33333-3333','2025-10-19 15:12:39',NULL),(32,5,2,NULL,3,NULL,59.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Carine','(11) 96279-5416','2025-10-19 20:10:20','2025-10-19 20:11:30'),(33,6,1,NULL,3,NULL,59.00,'02853-040','Rua Luiz Faccine','59','Vila Teresinha','Casa','São Paulo','SP','DIEGO','(11) 98936-8953','2025-10-20 16:44:37',NULL),(34,5,1,9,4,NULL,55.00,'02854-060','Rua Hélcio da Silva','345','Vila Teresinha','','São Paulo','SP','Carine Garcia','(11) 99010-9034','2025-10-20 19:39:19','2025-10-20 19:58:18'),(35,5,1,9,4,NULL,55.00,'02854-060','Rua Hélcio da Silva','345','Vila Teresinha','','São Paulo','SP','Carine','(11) 96279-5416','2025-10-20 19:43:47','2025-10-20 19:58:23'),(36,5,1,8,3,NULL,89.00,'13484-646','Rua Narciso Gonçalves','59','Jardim Cidade Universitária I','softer house','Limeira','SP','Carine','(11) 96279-5416','2025-10-20 20:22:57','2025-10-23 18:19:19'),(37,5,1,8,3,NULL,100.00,'13400-765','Rua Tiradentes','1200','Centro','softer house','Piracicaba','SP','DIEGO','(11) 98936-8953','2025-10-20 20:25:12','2025-10-23 18:19:17'),(38,5,1,10,4,NULL,66.00,'13521-476','Rua Espanha','8','Água Mineral','casa','São Pedro','SP','teste','(00) 0000-0000','2025-10-23 20:48:24','2025-10-23 21:03:22'),(39,5,2,NULL,2,100.00,65.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'diego','(11) 11111-1111','2025-10-23 21:07:07','2025-10-23 21:07:46'),(40,6,2,NULL,4,NULL,65.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Diego','(11) 11111-1111','2025-10-23 21:10:55',NULL),(41,5,2,NULL,3,NULL,63.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Diego','(33) 33333-3333','2025-10-23 21:13:00','2025-10-24 15:24:22'),(42,6,1,10,4,NULL,35.00,'02854-060','Rua do hamburguer','59','Vila do Lanche','Casa','São Paulo','SP','Carine','(11) 96279-5416','2025-10-23 21:17:13',NULL),(43,5,1,10,4,NULL,66.00,'13498-080','Rua Emílio de Gaspari','59','Residencial Cidade Nova','','Iracemápolis','SP','Carine Garcia','(11) 99010-9034','2025-10-23 21:28:09','2025-10-23 21:29:54'),(44,6,2,NULL,3,NULL,65.00,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Carine Garcia','(11) 99010-9034','2025-10-23 21:30:48',NULL),(45,5,1,10,4,NULL,66.00,'02853-040','Rua Luiz Faccini','448','Vila Teresinha','','São Paulo','SP','Diego','(11) 99999-9999','2025-10-24 15:23:46','2025-10-24 15:24:20'),(46,5,1,10,4,NULL,121.00,'13498-000','Rua Jerônymo Ometto','448','Jardim Carolina Ometto Pavan','','Iracemápolis','SP','DIEGO','(11) 99999-9999','2025-10-24 15:36:00','2025-10-24 15:38:43');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-27 17:24:08
