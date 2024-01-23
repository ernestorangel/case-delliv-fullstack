CREATE DATABASE  IF NOT EXISTS `delliv_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `delliv_db`;
-- MySQL dump 10.13  Distrib 5.7.39, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: delliv_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `delivery_person`
--

DROP TABLE IF EXISTS `delivery_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery_person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_person`
--

LOCK TABLES `delivery_person` WRITE;
/*!40000 ALTER TABLE `delivery_person` DISABLE KEYS */;
INSERT INTO `delivery_person` VALUES (1,'Fernando Akira','fakira','$2b$10$1F7hXj1hsjQ5XMSf4mxFVuPV2L6.dKKh/SCRVrMkjhPo47DYmxYMq'),(2,'Lucas Fazio','lfazio','$2b$10$YFn7EUCcGtZtAaKtXHXxg.W1aYPGRkkaQch6aReVzAL1VlC4lM5AS'),(3,'Brenda Brandão','bbrandao','$2b$10$cq6z1bfUo6z0I8GxMEeOCObeykmRqtU2ZueXFlvzjgJ3zSHeycaKC'),(4,'Gabriel Amorim','gamorim','$2b$10$Rd83VpcojYfO.yPQkg.jS.NZsKX2N5L1pWtHs2dAUNrnPuOwBUtb2'),(5,'Caio Zamboni','czamboni','$2b$10$az1nwVG4XcbkfNheYLWxEusHmU0VtH/Fe7oVQ/S2rzJoEiiXmGWd.'),(6,'Vitor Sales','vsales','$2b$10$eDrE0RP1hIF28flWggBUQeSN6zAhTsVelt8ymfvvfPBfkjvT/N6wO'),(7,'Caio Arisseto','carisseto','$2b$10$2nRqY7gAr4kKM1hTZqjI9eMXv03ApCNeq3PMR4qHMgpbm6cYo7PiW'),(8,'Ernesto Rangel','erangel','$2b$10$2Kz0DpwEiRtZHLCTzMvz3.8TP8MXKoCbOXXWRJm5WaUZJ9A2JvqO2'),(9,'Alexandre Alves','aalves','$2b$10$O5UC3MNpEipYkA7meWILHOj1phH91ASlqhiMk1dpZBsxC2RFVDItO'),(10,'Juliana Melo','jmelo','$2b$10$v8Rl54hZupl6rkGUpDwrDOcgzZACM5LFQvW/njO5ziAIDzQw7PRmK');
/*!40000 ALTER TABLE `delivery_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sku` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(400) DEFAULT NULL,
  `idStore` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'CAN01','Caneta Preta',150,'Caneta Esferográfica Preta',0),(2,'CAN02','Caneta Azul',150,'Caneta Esferográfica Azul',0),(3,'CAN03','Caneta Vermelha',150,'Caneta Esferográfica Vermelha',0),(4,'LAP01','Lápis Preto nº2',50,'Lapis Preto nº2 sextavado',0),(5,'BOR01','Borracha Branca - Capa Vermelha',100,'Borracha Média Branca - Capa Vermelha',0),(6,'PACFOLA401','Pacote Folha A4',3200,'Pacote 500 Folhas Brancas',0);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idItem` int(11) NOT NULL,
  `idStore` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `uuid` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (39,1,0,1,'f15d801b-8087-4361-ac38-552a0d5e4292'),(40,2,0,1,'f15d801b-8087-4361-ac38-552a0d5e4292'),(41,5,0,1,'f15d801b-8087-4361-ac38-552a0d5e4292'),(42,6,0,1,'f15d801b-8087-4361-ac38-552a0d5e4292'),(43,1,0,2,'64cf7ef6-ca3c-4ffa-b724-b62514cb1127'),(44,2,0,2,'64cf7ef6-ca3c-4ffa-b724-b62514cb1127'),(45,3,0,2,'64cf7ef6-ca3c-4ffa-b724-b62514cb1127'),(46,4,0,2,'64cf7ef6-ca3c-4ffa-b724-b62514cb1127'),(47,5,0,2,'64cf7ef6-ca3c-4ffa-b724-b62514cb1127'),(48,6,0,2,'64cf7ef6-ca3c-4ffa-b724-b62514cb1127'),(52,1,0,3,'0e57ea89-a7a4-473e-80b8-84a586faa250'),(53,2,0,2,'6b3c1fe4-158e-4a91-86b7-49efad7593db'),(54,5,0,5,'f117339a-30cd-4f2f-b64a-7aa02417df3e'),(55,6,0,5,'f117339a-30cd-4f2f-b64a-7aa02417df3e'),(56,4,0,4,'c5e8704f-445d-4217-aff2-9bb558b35fd9'),(57,6,0,3,'c5e8704f-445d-4217-aff2-9bb558b35fd9'),(58,1,1,1,'2435ed09-96de-471b-87c1-db8c2b3e310e'),(59,2,1,1,'2435ed09-96de-471b-87c1-db8c2b3e310e'),(60,3,1,1,'2fb429d5-994e-4d8b-a9c1-cde59fa605dd'),(61,4,1,1,'2fb429d5-994e-4d8b-a9c1-cde59fa605dd'),(62,5,1,1,'2fb429d5-994e-4d8b-a9c1-cde59fa605dd'),(63,5,1,3,'2d793521-f498-4953-8062-a6633665292f'),(64,6,1,3,'2d793521-f498-4953-8062-a6633665292f'),(65,2,1,1,'321bf510-a42d-409c-b10d-c93b41777943'),(66,3,1,1,'321bf510-a42d-409c-b10d-c93b41777943'),(67,4,1,1,'321bf510-a42d-409c-b10d-c93b41777943'),(68,6,1,2,'07739a11-2fa7-42fa-bc38-a0a6013e9f37');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'Papelaria do Ernesto','papelariadoernesto','$2b$10$7kICZwwiDJyl5c/uwC6XnuIN/sqi3OawAtki71z7/FqOwJL1XUUGa'),(2,'Churrascaria do Lucas','lucaschurras','$2b$10$/JDRspcpjp6g1sCUR290Ue15aXv7Cop7uucLik1Pfk1lCBZKJsiEK');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-22 22:37:31
