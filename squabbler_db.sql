-- MySQL dump 10.13  Distrib 8.0.30, for Linux (x86_64)
--
-- Host: localhost    Database: squabblerusers
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` varchar(30) NOT NULL,
  `username` varchar(18) NOT NULL,
  `passwordhash` varchar(150) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `site` varchar(80) DEFAULT NULL,
  `description` varchar(1200) DEFAULT NULL,
  `type` char(1) DEFAULT 'B',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('401648612010101194201439838387','Connor','pbkdf2:sha256:260000$QakDGe4sXxkIqziB$fc1cb12638154ac38ac7172375aa794f14c7ec382e830cfba9a9463a63c1dc5f',NULL,'Connor Fulbright','www.squabbler.com','None','B'),('760191857815844961337597906280','testingaccount','pbkdf2:sha256:260000$Zp8SHQzsbwdVAVBf$f225ebbec48c21025d15075ae4a60e72a329016e69c694a926e6dc9d1640f144',NULL,'test',NULL,NULL,'B');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentdownvotes`
--

DROP TABLE IF EXISTS `commentdownvotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentdownvotes` (
  `id` varchar(100) DEFAULT NULL,
  `commentid` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentdownvotes`
--

LOCK TABLES `commentdownvotes` WRITE;
/*!40000 ALTER TABLE `commentdownvotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentdownvotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentreplies`
--

DROP TABLE IF EXISTS `commentreplies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentreplies` (
  `replydate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `replierid` varchar(100) DEFAULT NULL,
  `content` text,
  `commentid` int DEFAULT NULL,
  `replyid` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`replyid`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentreplies`
--

LOCK TABLES `commentreplies` WRITE;
/*!40000 ALTER TABLE `commentreplies` DISABLE KEYS */;
INSERT INTO `commentreplies` VALUES ('2022-08-25 01:13:50','401648612010101194201439838387','tset',113,85),('2022-08-26 17:45:53','401648612010101194201439838387','commne',115,86),('2022-09-02 18:16:56','760191857815844961337597906280','test',0,87),('2022-09-06 13:54:26','401648612010101194201439838387','test',118,88),('2022-09-15 03:05:17','401648612010101194201439838387','fuck you',121,89),('2022-09-16 02:58:09','401648612010101194201439838387','test',122,90),('2022-09-16 02:58:57','401648612010101194201439838387','test',122,91),('2022-09-16 03:00:13','401648612010101194201439838387','test',122,92),('2022-09-16 03:08:19','401648612010101194201439838387','test',122,93);
/*!40000 ALTER TABLE `commentreplies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentupvotes`
--

DROP TABLE IF EXISTS `commentupvotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentupvotes` (
  `id` varchar(100) DEFAULT NULL,
  `commentid` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentupvotes`
--

LOCK TABLES `commentupvotes` WRITE;
/*!40000 ALTER TABLE `commentupvotes` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentupvotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `follower` varchar(100) DEFAULT NULL,
  `following` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES ('1','602860455678633332647015510009'),('2','602860455678633332647015510009'),('2','602860455678633332647015510009');
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `livesolo`
--

DROP TABLE IF EXISTS `livesolo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `livesolo` (
  `roomid` text,
  `user1id` text,
  `user2id` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `livesolo`
--

LOCK TABLES `livesolo` WRITE;
/*!40000 ALTER TABLE `livesolo` DISABLE KEYS */;
/*!40000 ALTER TABLE `livesolo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postcomments`
--

DROP TABLE IF EXISTS `postcomments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postcomments` (
  `commenterid` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `commentdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `postid` int NOT NULL,
  `commentid` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`commentid`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postcomments`
--

LOCK TABLES `postcomments` WRITE;
/*!40000 ALTER TABLE `postcomments` DISABLE KEYS */;
INSERT INTO `postcomments` VALUES ('401648612010101194201439838387','ahahaha','2022-08-24 20:33:39',107,112),('401648612010101194201439838387','test','2022-08-25 01:13:46',117,113),('401648612010101194201439838387','test','2022-08-25 01:34:08',116,114),('401648612010101194201439838387','test','2022-08-25 19:24:22',133,115),('401648612010101194201439838387','test','2022-08-28 14:07:58',134,116),('401648612010101194201439838387','this is a commend','2022-09-01 14:33:34',136,117),('401648612010101194201439838387','test','2022-09-06 13:43:08',139,118),('401648612010101194201439838387','test','2022-09-06 17:36:47',139,119),('401648612010101194201439838387','oorah','2022-09-06 18:03:05',139,120),('401648612010101194201439838387','comment','2022-09-15 03:05:11',139,121),('401648612010101194201439838387','test','2022-09-16 02:57:34',139,122);
/*!40000 ALTER TABLE `postcomments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postdownvotes`
--

DROP TABLE IF EXISTS `postdownvotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postdownvotes` (
  `id` varchar(100) DEFAULT NULL,
  `postid` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postdownvotes`
--

LOCK TABLES `postdownvotes` WRITE;
/*!40000 ALTER TABLE `postdownvotes` DISABLE KEYS */;
INSERT INTO `postdownvotes` VALUES ('401648612010101194201439838387',139);
/*!40000 ALTER TABLE `postdownvotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `postid` int NOT NULL AUTO_INCREMENT,
  `postdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `content` text,
  `posterid` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`postid`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (105,'2022-08-23 13:24:32','test','401648612010101194201439838387'),(106,'2022-08-23 13:24:38','test','401648612010101194201439838387'),(107,'2022-08-23 13:24:50','another test post','401648612010101194201439838387'),(108,'2022-08-24 20:48:39','test','401648612010101194201439838387'),(109,'2022-08-24 20:49:56','test','401648612010101194201439838387'),(110,'2022-08-24 20:50:05','gesf','401648612010101194201439838387'),(111,'2022-08-24 20:50:47','d','401648612010101194201439838387'),(112,'2022-08-24 20:55:28','aaa','401648612010101194201439838387'),(113,'2022-08-24 20:58:30','test','401648612010101194201439838387'),(114,'2022-08-24 20:59:26','aaaa','401648612010101194201439838387'),(115,'2022-08-24 20:59:45','aaa','401648612010101194201439838387'),(116,'2022-08-24 21:00:03','aaa','401648612010101194201439838387'),(117,'2022-08-25 00:59:12','test','401648612010101194201439838387'),(118,'2022-08-25 13:46:03','oooooo','401648612010101194201439838387'),(119,'2022-08-25 13:46:12','aaaaa','401648612010101194201439838387'),(120,'2022-08-25 13:48:48','test','401648612010101194201439838387'),(121,'2022-08-25 13:48:54','tset','401648612010101194201439838387'),(122,'2022-08-25 13:49:13','aaaa','401648612010101194201439838387'),(123,'2022-08-25 13:49:45','test','401648612010101194201439838387'),(124,'2022-08-25 13:49:51','test','401648612010101194201439838387'),(125,'2022-08-25 13:49:58','aaaa','401648612010101194201439838387'),(126,'2022-08-25 13:50:39','test','401648612010101194201439838387'),(127,'2022-08-25 13:51:41','trst','401648612010101194201439838387'),(128,'2022-08-25 13:51:47','test','401648612010101194201439838387'),(129,'2022-08-25 13:52:54','trset','401648612010101194201439838387'),(130,'2022-08-25 13:52:59','test','401648612010101194201439838387'),(131,'2022-08-25 13:53:01','aa','401648612010101194201439838387'),(132,'2022-08-25 13:53:08','aaaa','401648612010101194201439838387'),(133,'2022-08-25 13:53:35','aaa','401648612010101194201439838387'),(134,'2022-08-28 14:07:51','teat','401648612010101194201439838387'),(135,'2022-08-30 14:20:46','reet','401648612010101194201439838387'),(136,'2022-08-30 14:20:49','neat','401648612010101194201439838387'),(137,'2022-09-01 14:35:27','oorah','760191857815844961337597906280'),(138,'2022-09-01 14:35:38','another testg','760191857815844961337597906280'),(139,'2022-09-01 14:35:41','oooooooo','760191857815844961337597906280');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postupvotes`
--

DROP TABLE IF EXISTS `postupvotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postupvotes` (
  `id` varchar(100) DEFAULT NULL,
  `postid` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postupvotes`
--

LOCK TABLES `postupvotes` WRITE;
/*!40000 ALTER TABLE `postupvotes` DISABLE KEYS */;
INSERT INTO `postupvotes` VALUES ('602860455678633332647015510009','55'),('602860455678633332647015510009','56'),('602860455678633332647015510009','63'),('602860455678633332647015510009','64'),('602860455678633332647015510009','65'),('602860455678633332647015510009','66'),('602860455678633332647015510009','67'),('602860455678633332647015510009','74'),('602860455678633332647015510009','3'),('602860455678633332647015510009','90'),('602860455678633332647015510009','94'),('602860455678633332647015510009','95'),('602860455678633332647015510009','96'),('602860455678633332647015510009','97'),('602860455678633332647015510009','98'),('602860455678633332647015510009','104'),('401648612010101194201439838387','107'),('401648612010101194201439838387','117'),('401648612010101194201439838387','116'),('401648612010101194201439838387','3'),('401648612010101194201439838387','132'),('401648612010101194201439838387','133'),('760191857815844961337597906280','139'),('760191857815844961337597906280','0'),('401648612010101194201439838387','0'),('401648612010101194201439838387','135'),('401648612010101194201439838387','131'),('401648612010101194201439838387','136'),('401648612010101194201439838387','134'),('401648612010101194201439838387','130'),('401648612010101194201439838387','129'),('401648612010101194201439838387','128'),('401648612010101194201439838387','138'),('401648612010101194201439838387','137');
/*!40000 ALTER TABLE `postupvotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solorooms`
--

DROP TABLE IF EXISTS `solorooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solorooms` (
  `roomid` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `user1id` varchar(100) DEFAULT NULL,
  `user2id` varchar(100) DEFAULT NULL,
  `anon` char(1) DEFAULT NULL,
  `basic` char(1) DEFAULT NULL,
  `trusted` char(1) DEFAULT NULL,
  `scholar` char(1) DEFAULT NULL,
  PRIMARY KEY (`roomid`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solorooms`
--

LOCK TABLES `solorooms` WRITE;
/*!40000 ALTER TABLE `solorooms` DISABLE KEYS */;
INSERT INTO `solorooms` VALUES (15,'yrsyse','estset','602860455678633332647015510009','none',NULL,NULL,NULL,NULL),(16,'test','test','602860455678633332647015510009','none','1','1','1','1'),(17,'','','602860455678633332647015510009','none','1','1','1','1'),(18,'','','602860455678633332647015510009','none','1','1','1','1'),(19,'','','602860455678633332647015510009','none','1','1','1','1'),(20,'test','test','602860455678633332647015510009','none','1','1','1','1'),(21,'test','test','602860455678633332647015510009','none','1','1','1','1'),(22,'','','602860455678633332647015510009','none','1','1','1','1'),(23,'','','602860455678633332647015510009','none','1','1','1','1'),(24,'','','602860455678633332647015510009','none','1','1','1','1'),(25,'','','602860455678633332647015510009','none','1','1','1','1'),(26,'test','test','602860455678633332647015510009','none','1','1','1','1'),(27,'test','test','602860455678633332647015510009','none','1','1','1','1'),(28,'test','tewst','602860455678633332647015510009','none','1','1','1','1'),(29,'abortion','fuck abortion','602860455678633332647015510009','none','1','1','1','1'),(30,'testsetset','set','602860455678633332647015510009','none','1','1','1','1'),(31,'test','test','602860455678633332647015510009','none','1','1','1','1'),(32,'test','test','602860455678633332647015510009','none','1','1','1','1'),(33,'test','test','602860455678633332647015510009','none','1','1','1','1'),(34,'tset','test','602860455678633332647015510009','none','1','1','1','1'),(35,'test','tset','602860455678633332647015510009','none','1','1','1','1'),(36,'test','test','602860455678633332647015510009','none','1','1','1','1'),(37,'test','trsetset','602860455678633332647015510009','none','1','1','1','1'),(38,'p;,','iugbjk','602860455678633332647015510009','none','1','1','1','1');
/*!40000 ALTER TABLE `solorooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-01 14:31:43
