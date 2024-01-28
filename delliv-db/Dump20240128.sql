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
-- Table structure for table `delivery_people`
--

DROP TABLE IF EXISTS `delivery_people`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery_people` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_people`
--

LOCK TABLES `delivery_people` WRITE;
/*!40000 ALTER TABLE `delivery_people` DISABLE KEYS */;
INSERT INTO `delivery_people` VALUES (1,'Fernando Akira','fakira','$2b$10$1F7hXj1hsjQ5XMSf4mxFVuPV2L6.dKKh/SCRVrMkjhPo47DYmxYMq'),(2,'Lucas Fazio','lfazio','$2b$10$YFn7EUCcGtZtAaKtXHXxg.W1aYPGRkkaQch6aReVzAL1VlC4lM5AS'),(3,'Brenda Brandão','bbrandao','$2b$10$cq6z1bfUo6z0I8GxMEeOCObeykmRqtU2ZueXFlvzjgJ3zSHeycaKC'),(4,'Gabriel Amorim','gamorim','$2b$10$Rd83VpcojYfO.yPQkg.jS.NZsKX2N5L1pWtHs2dAUNrnPuOwBUtb2'),(5,'Caio Zamboni','czamboni','$2b$10$az1nwVG4XcbkfNheYLWxEusHmU0VtH/Fe7oVQ/S2rzJoEiiXmGWd.'),(6,'Vitor Sales','vsales','$2b$10$eDrE0RP1hIF28flWggBUQeSN6zAhTsVelt8ymfvvfPBfkjvT/N6wO'),(7,'Caio Arisseto','carisseto','$2b$10$2nRqY7gAr4kKM1hTZqjI9eMXv03ApCNeq3PMR4qHMgpbm6cYo7PiW'),(8,'Ernesto Rangel','erangel','$2b$10$2Kz0DpwEiRtZHLCTzMvz3.8TP8MXKoCbOXXWRJm5WaUZJ9A2JvqO2'),(9,'Alexandre Alves','aalves','$2b$10$O5UC3MNpEipYkA7meWILHOj1phH91ASlqhiMk1dpZBsxC2RFVDItO'),(10,'Juliana Melo','jmelo','$2b$10$v8Rl54hZupl6rkGUpDwrDOcgzZACM5LFQvW/njO5ziAIDzQw7PRmK');
/*!40000 ALTER TABLE `delivery_people` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_person_socket_id`
--

DROP TABLE IF EXISTS `delivery_person_socket_id`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery_person_socket_id` (
  `id` int(11) NOT NULL,
  `idSocket` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_person_socket_id`
--

LOCK TABLES `delivery_person_socket_id` WRITE;
/*!40000 ALTER TABLE `delivery_person_socket_id` DISABLE KEYS */;
INSERT INTO `delivery_person_socket_id` VALUES (3,'Itfc_6yeaOhOOnrYAAAD'),(8,'0f7KJDK2zfIrNpGaAAAD');
/*!40000 ALTER TABLE `delivery_person_socket_id` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
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
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'CAN01','Caneta Preta',150,'Caneta Esferográfica Preta',1),(2,'CAN02','Caneta Azul',150,'Caneta Esferográfica Azul',1),(3,'CAN03','Caneta Vermelha',150,'Caneta Esferográfica Vermelha',1),(4,'LAP01','Lápis Preto nº2',50,'Lapis Preto nº2 sextavado',1),(5,'BOR01','Borracha Branca - Capa Vermelha',100,'Borracha Média Branca - Capa Vermelha',1),(6,'PACFOLA401','Pacote Folha A4',3200,'Pacote 500 Folhas Brancas',1);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idItem` int(11) NOT NULL,
  `idStore` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `uuid` varchar(250) NOT NULL,
  `idStatus` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (82,1,1,1,'2658f15a-aebf-40a1-abcc-740580f66f0c',1),(83,2,1,1,'2658f15a-aebf-40a1-abcc-740580f66f0c',1),(84,3,1,1,'250947e9-62aa-48fa-8472-7aa5139e2267',1),(85,4,1,1,'250947e9-62aa-48fa-8472-7aa5139e2267',1),(86,5,1,1,'7552b4f6-a056-4853-af79-b5830bc58906',0),(87,6,1,1,'7552b4f6-a056-4853-af79-b5830bc58906',0),(88,1,1,1,'58ff1dfd-6e5d-49a1-819e-65310ce9042e',0),(89,3,1,1,'58ff1dfd-6e5d-49a1-819e-65310ce9042e',0),(90,5,1,1,'58ff1dfd-6e5d-49a1-819e-65310ce9042e',0),(91,2,1,1,'cab13e05-bd94-4d9c-b3c7-fdd752c9749a',0),(92,4,1,1,'cab13e05-bd94-4d9c-b3c7-fdd752c9749a',0),(93,6,1,1,'cab13e05-bd94-4d9c-b3c7-fdd752c9749a',0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_in_route`
--

DROP TABLE IF EXISTS `orders_in_route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_in_route` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idRoute` int(11) NOT NULL,
  `uuidOrder` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_in_route`
--

LOCK TABLES `orders_in_route` WRITE;
/*!40000 ALTER TABLE `orders_in_route` DISABLE KEYS */;
INSERT INTO `orders_in_route` VALUES (7,38,'ae577d57-bacb-44ee-8280-0be39d14a1b8'),(8,38,'5a055f81-7bf8-4221-b365-f371dfca9bfc'),(9,38,'ae577d57-bacb-44ee-8280-0be39d14a1b8'),(10,38,'5a055f81-7bf8-4221-b365-f371dfca9bfc'),(11,38,'a47d7134-1544-4441-8e47-0b7500747503'),(12,42,'2658f15a-aebf-40a1-abcc-740580f66f0c'),(13,42,'250947e9-62aa-48fa-8472-7aa5139e2267');
/*!40000 ALTER TABLE `orders_in_route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_status`
--

DROP TABLE IF EXISTS `orders_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_status` (
  `id` int(11) NOT NULL,
  `status` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_status`
--

LOCK TABLES `orders_status` WRITE;
/*!40000 ALTER TABLE `orders_status` DISABLE KEYS */;
INSERT INTO `orders_status` VALUES (0,'open'),(1,'assigned'),(2,'onRoute'),(3,'delivered'),(4,'cancelled');
/*!40000 ALTER TABLE `orders_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route_status`
--

DROP TABLE IF EXISTS `route_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `route_status` (
  `id` int(11) NOT NULL,
  `status` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_status`
--

LOCK TABLES `route_status` WRITE;
/*!40000 ALTER TABLE `route_status` DISABLE KEYS */;
INSERT INTO `route_status` VALUES (0,'requested'),(1,'accepted'),(2,'arrived'),(3,'loaded'),(4,'started'),(5,'finished'),(6,'cancelled');
/*!40000 ALTER TABLE `route_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `routes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idStore` int(11) NOT NULL,
  `idDeliveryPerson` int(11) DEFAULT NULL,
  `idStatus` int(11) NOT NULL,
  `storeRequestDatetime` datetime DEFAULT NULL,
  `deliveryPersonAcceptDatetime` datetime DEFAULT NULL,
  `deliveryPersonArrivalDatetime` datetime DEFAULT NULL,
  `storeArrivalConfirmationDatetime` datetime DEFAULT NULL,
  `storeLoadDatetime` datetime DEFAULT NULL,
  `deliveryPersonLoadConfirmationDatetime` datetime DEFAULT NULL,
  `routeStartDatetime` datetime DEFAULT NULL,
  `deliveryPersonFinishDatetime` datetime DEFAULT NULL,
  `storeFinishConfirmationDatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (42,1,8,1,'2024-01-28 01:40:09','2024-01-28 01:40:21',NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_socket_id`
--

DROP TABLE IF EXISTS `store_socket_id`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `store_socket_id` (
  `id` int(11) NOT NULL,
  `idSocket` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_socket_id`
--

LOCK TABLES `store_socket_id` WRITE;
/*!40000 ALTER TABLE `store_socket_id` DISABLE KEYS */;
INSERT INTO `store_socket_id` VALUES (1,'-qqLVqoC2_ncoaC4AAAF');
/*!40000 ALTER TABLE `store_socket_id` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (1,'Papelaria do Ernesto','papelariadoernesto','$2b$10$7kICZwwiDJyl5c/uwC6XnuIN/sqi3OawAtki71z7/FqOwJL1XUUGa'),(2,'Churrascaria do Lucas','lucaschurras','$2b$10$/JDRspcpjp6g1sCUR290Ue15aXv7Cop7uucLik1Pfk1lCBZKJsiEK');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-28  1:44:45
