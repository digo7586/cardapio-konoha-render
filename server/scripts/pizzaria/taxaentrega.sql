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
-- Table structure for table `taxaentrega`
--

DROP TABLE IF EXISTS `taxaentrega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taxaentrega` (
  `idtaxaentrega` int NOT NULL AUTO_INCREMENT,
  `idtaxaentregatipo` int NOT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `distancia` int DEFAULT NULL,
  `tempominimo` int DEFAULT NULL,
  `tempomaximo` int DEFAULT NULL,
  `ativo` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idtaxaentrega`),
  KEY `FK_TAXA_ENTREGA_TIPO_idx` (`idtaxaentregatipo`),
  CONSTRAINT `FK_TAXA_ENTREGA_TIPO` FOREIGN KEY (`idtaxaentregatipo`) REFERENCES `taxaentregatipo` (`idtaxaentregatipo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxaentrega`
--

LOCK TABLES `taxaentrega` WRITE;
/*!40000 ALTER TABLE `taxaentrega` DISABLE KEYS */;
INSERT INTO `taxaentrega` VALUES (5,1,15.00,NULL,15,35,0),(6,2,20.00,8,30,40,0),(7,2,3.00,5,10,20,1),(8,2,30.00,140,20,20,1),(9,2,5.00,200,45,55,0),(10,1,11.00,NULL,15,35,1),(11,2,20.00,10,30,45,1),(12,2,50.00,150,30,60,1);
/*!40000 ALTER TABLE `taxaentrega` ENABLE KEYS */;
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
