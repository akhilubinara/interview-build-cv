-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: interview_cv_db
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `m_user`
--

DROP TABLE IF EXISTS `m_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `m_user` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Email` text NOT NULL,
  `Phone` text NOT NULL,
  `Description` text NOT NULL,
  `LastUpdatedOn` datetime NOT NULL,
  `CreatedOn` datetime DEFAULT CURRENT_TIMESTAMP,
  `IsActive` int NOT NULL DEFAULT '1',
  `IsDeleted` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `m_user`
--

LOCK TABLES `m_user` WRITE;
/*!40000 ALTER TABLE `m_user` DISABLE KEYS */;
INSERT INTO `m_user` VALUES (3,'Akhil','User1@gmail.com','9090909090','Test Description','2025-03-17 11:46:02','2025-03-17 11:46:02',1,0),(5,'Akhil Unnikrishnan','akhilunnikrishnan586@gmail.com','9747642929','I am a full stack developer.','2025-03-17 14:09:15','2025-03-17 14:09:15',1,0);
/*!40000 ALTER TABLE `m_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_education`
--

DROP TABLE IF EXISTS `t_education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_education` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `InstitutionName` text NOT NULL,
  `CourseName` text NOT NULL,
  `StartYear` text NOT NULL,
  `EndYear` text NOT NULL,
  `Percentage` decimal(10,0) NOT NULL,
  `Description` text,
  `UserId` bigint NOT NULL,
  `CreatedOn` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `userIdFk_idx` (`UserId`),
  CONSTRAINT `userIdFk` FOREIGN KEY (`UserId`) REFERENCES `m_user` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_education`
--

LOCK TABLES `t_education` WRITE;
/*!40000 ALTER TABLE `t_education` DISABLE KEYS */;
INSERT INTO `t_education` VALUES (3,'Test Institution','Test Course','2019','2022',90,'',3,'2025-03-17 11:46:02'),(6,'Mar Baselious Institude of Technology and Science kothamangalam','Computer Science & Engineering','2019','2022',60,'',5,'2025-03-17 14:09:15');
/*!40000 ALTER TABLE `t_education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_skill`
--

DROP TABLE IF EXISTS `t_skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_skill` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `SkillName` text NOT NULL,
  `Description` text,
  `UserId` bigint DEFAULT NULL,
  `IsActive` int NOT NULL DEFAULT '1',
  `CreatedOn` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_skill`
--

LOCK TABLES `t_skill` WRITE;
/*!40000 ALTER TABLE `t_skill` DISABLE KEYS */;
INSERT INTO `t_skill` VALUES (2,'Test Skill 1','',3,1,'2025-03-17 11:46:02'),(6,'HTML','',5,1,'2025-03-17 14:09:15'),(7,'CSS','',5,1,'2025-03-17 14:09:15'),(8,'Bootstrap','',5,1,'2025-03-17 14:09:15');
/*!40000 ALTER TABLE `t_skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_work_experience`
--

DROP TABLE IF EXISTS `t_work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_work_experience` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `WorkTitle` text NOT NULL,
  `CompantName` text NOT NULL,
  `YearOfExperience` decimal(10,0) NOT NULL,
  `PositionNumber` int DEFAULT NULL,
  `UserId` bigint NOT NULL,
  `CreatedOn` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `userFk1_idx` (`UserId`),
  CONSTRAINT `userFk1` FOREIGN KEY (`UserId`) REFERENCES `m_user` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_work_experience`
--

LOCK TABLES `t_work_experience` WRITE;
/*!40000 ALTER TABLE `t_work_experience` DISABLE KEYS */;
INSERT INTO `t_work_experience` VALUES (1,'Full stack developer','Test Company 001',2,1,3,'2025-03-17 11:46:02'),(2,'Fulstack developer','ABCD Company infopark',2,1,5,'2025-03-17 14:09:15');
/*!40000 ALTER TABLE `t_work_experience` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-17 14:46:41
