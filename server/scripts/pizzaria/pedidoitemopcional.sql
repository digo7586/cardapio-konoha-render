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
-- Table structure for table `pedidoitemopcional`
--

DROP TABLE IF EXISTS `pedidoitemopcional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidoitemopcional` (
  `idpedidoitemopcional` int NOT NULL AUTO_INCREMENT,
  `idpedidoitem` int NOT NULL,
  `idopcionalitem` int NOT NULL,
  PRIMARY KEY (`idpedidoitemopcional`),
  KEY `FK_ITEM_OPC_PEDIDO_ITEM_idx` (`idpedidoitem`),
  KEY `FK_ITEM_OPC_PEDIDO_OPC_idx` (`idopcionalitem`),
  CONSTRAINT `FK_ITEM_OPC_PEDIDO_ITEM` FOREIGN KEY (`idpedidoitem`) REFERENCES `pedidoitem` (`idpedidoitem`),
  CONSTRAINT `FK_ITEM_OPC_PEDIDO_OPC` FOREIGN KEY (`idopcionalitem`) REFERENCES `opcionalitem` (`idopcionalitem`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidoitemopcional`
--

LOCK TABLES `pedidoitemopcional` WRITE;
/*!40000 ALTER TABLE `pedidoitemopcional` DISABLE KEYS */;
INSERT INTO `pedidoitemopcional` VALUES (1,3,1),(2,8,1),(3,18,1),(4,19,1),(5,21,1),(6,23,1),(7,25,25),(8,27,24),(9,29,21),(10,28,16),(11,31,25),(12,37,19),(13,38,18),(14,38,17),(15,43,17),(16,43,18),(17,45,17),(18,45,18),(19,46,17),(20,46,18);
/*!40000 ALTER TABLE `pedidoitemopcional` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-27 17:24:10
