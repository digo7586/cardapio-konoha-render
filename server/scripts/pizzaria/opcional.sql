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
-- Table structure for table `opcional`
--

DROP TABLE IF EXISTS `opcional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opcional` (
  `idopcional` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) NOT NULL,
  `tiposimples` int NOT NULL DEFAULT '1',
  `minimo` int NOT NULL DEFAULT '0',
  `maximo` int NOT NULL DEFAULT '0',
  `apagado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idopcional`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opcional`
--

LOCK TABLES `opcional` WRITE;
/*!40000 ALTER TABLE `opcional` DISABLE KEYS */;
INSERT INTO `opcional` VALUES (1,'Catupiry',1,0,0,0),(2,'Chocolate',1,0,0,0),(3,'Deseja borda recheada?',0,0,1,0),(4,'Deseja borda recheada?',0,0,1,0),(5,'Deseja borda recheada?',0,0,1,0),(6,'Deseja borda recheada?',0,0,1,0),(7,'Deseja borda recheada?',0,0,0,0),(8,'Deseja borda recheada?',0,0,1,0),(9,'Opcionais',1,0,0,0),(10,'Opcionais',1,0,0,0),(11,'Opcionais',1,0,0,0),(12,'Opcionais',1,0,0,0),(13,'Opcionais',1,0,0,0),(14,'Opcionais',1,0,0,0),(15,'Opcionais',1,0,0,0),(16,'Opcionais',1,0,0,0),(17,'Opcionais',1,0,0,0),(18,'Opcionais',1,0,0,0),(19,'Opcionais',1,0,0,0),(20,'Opcionais',1,0,0,0);
/*!40000 ALTER TABLE `opcional` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-27 17:24:11
