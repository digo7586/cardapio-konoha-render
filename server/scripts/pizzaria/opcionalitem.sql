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
-- Table structure for table `opcionalitem`
--

DROP TABLE IF EXISTS `opcionalitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opcionalitem` (
  `idopcionalitem` int NOT NULL AUTO_INCREMENT,
  `idopcional` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `apagado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idopcionalitem`),
  KEY `FK_OPCIONAL_ITEM_idx` (`idopcional`),
  CONSTRAINT `FK_OPCIONAL_ITEM` FOREIGN KEY (`idopcional`) REFERENCES `opcional` (`idopcional`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opcionalitem`
--

LOCK TABLES `opcionalitem` WRITE;
/*!40000 ALTER TABLE `opcionalitem` DISABLE KEYS */;
INSERT INTO `opcionalitem` VALUES (1,1,'Catupiry',3.00,0),(2,1,'Chocolate',5.00,0),(3,3,'Bacon',2.50,0),(4,4,'Doce',2.50,1),(5,4,'Salgada',2.50,1),(6,1,'Bacon',2.50,1),(7,5,'Catupiry',2.50,1),(8,5,'Cheddar',2.50,1),(9,1,'Bacon',2.50,1),(10,6,'Catupiry',2.50,1),(11,6,'Cheddar',2.50,1),(12,7,'Cheddar',2.50,1),(13,7,'Catupiry',2.50,1),(14,8,'Tradicional',0.01,1),(15,9,'Provolone',2.50,0),(16,9,'Bacon',2.50,0),(17,10,'Cebola',2.50,0),(18,10,'Bacon',2.50,0),(19,11,'Chocolate extra',3.00,0),(20,12,'Cebola caramelizada',3.00,0),(21,13,'Leite condensado',3.00,0),(22,13,'Doce de leite',3.00,0),(23,14,'Cheddar',3.00,0),(24,14,'Mussarela',3.00,0),(25,15,'Bacon',3.00,0),(26,16,'Bacon',3.00,0),(27,17,'Leite condensado',3.00,0),(28,18,'Leite condensado',3.00,0),(29,18,'Morango extra',3.00,0),(30,19,'Bacon',3.00,0),(31,20,'Palmito Extra',5.00,0);
/*!40000 ALTER TABLE `opcionalitem` ENABLE KEYS */;
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
