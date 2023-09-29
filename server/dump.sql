-- MariaDB dump 10.19  Distrib 10.6.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: vucar
-- ------------------------------------------------------
-- Server version	10.6.12-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_car`
--

DROP TABLE IF EXISTS `tbl_car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_car` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(255) DEFAULT NULL,
  `car_name` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_car`
--

LOCK TABLES `tbl_car` WRITE;
/*!40000 ALTER TABLE `tbl_car` DISABLE KEYS */;
INSERT INTO `tbl_car` VALUES (1,'500E','Mercedes-Benz','https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Mercedes_W124_E-Class.jpg/280px-Mercedes_W124_E-Class.jpg',NULL,NULL,NULL),(2,'F150','Ford','https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/2018_Ford_F-150_XLT_Crew_Cab%2C_front_11.10.19.jpg/280px-2018_Ford_F-150_XLT_Crew_Cab%2C_front_11.10.19.jpg',NULL,NULL,NULL),(3,'G6','Pontiac','https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/2007_Black_Pontiac_G6_GT.jpg/280px-2007_Black_Pontiac_G6_GT.jpg',NULL,NULL,NULL),(4,'Continental Flying Spur','Bentley','https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/2019_Bentley_Flying_Spur_W12_Front.jpg/280px-2019_Bentley_Flying_Spur_W12_Front.jpg',NULL,NULL,NULL),(5,'CLK-Class','Mercedes-Benz','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/CLK_209_%28Cabriolet%29.jpg/280px-CLK_209_%28Cabriolet%29.jpg',NULL,NULL,NULL),(6,'Focus','Ford','https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/2018_Ford_Focus_ST-Line_X_1.0.jpg/280px-2018_Ford_Focus_ST-Line_X_1.0.jpg',NULL,NULL,NULL),(7,'Journey','Dodge','https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/2012_Dodge_Journey_--_NHTSA_3.jpg/280px-2012_Dodge_Journey_--_NHTSA_3.jpg',NULL,NULL,NULL),(8,'Express 1500','Chevrolet','http://dummyimage.com/241x237.png/5fa2dd/ffffff',NULL,NULL,NULL),(9,'Frontier','Nissan','https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Nissan_Frontier_%28D41%29_Pro-4X_Automesse_Ludwigsburg_2022_1X7A5885.jpg/280px-Nissan_Frontier_%28D41%29_Pro-4X_Automesse_Ludwigsburg_2022_1X7A5885.jpg',NULL,NULL,NULL),(10,'Mustang','Ford','https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/2018_Ford_Mustang_GT_5.0.jpg/280px-2018_Ford_Mustang_GT_5.0.jpg',NULL,NULL,NULL);
/*!40000 ALTER TABLE `tbl_car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_criterion`
--

DROP TABLE IF EXISTS `tbl_criterion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_criterion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent` (`parent`),
  CONSTRAINT `tbl_criterion_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `tbl_criterion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=255 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_criterion`
--

LOCK TABLES `tbl_criterion` WRITE;
/*!40000 ALTER TABLE `tbl_criterion` DISABLE KEYS */;
INSERT INTO `tbl_criterion` VALUES (1,'Hồ sơ và giấy tờ xe',NULL,NULL,NULL,NULL),(2,'Lịch sử sở hữu',1,NULL,NULL,NULL),(3,'Phạt nguội chưa xử lý',1,NULL,NULL,NULL),(4,'Cầm cố thế chấp',1,NULL,NULL,NULL),(5,'Đăng kiểm',1,NULL,NULL,NULL),(6,'Đăng ký xe',1,NULL,NULL,NULL),(7,'Số VIN',1,NULL,NULL,NULL),(8,'Số máy',1,NULL,NULL,NULL),(9,'Sổ bảo hành',1,NULL,NULL,NULL),(10,'Sổ hướng dẫn sử dụng xe',1,NULL,NULL,NULL),(11,'Sổ bảo dưỡng định kỳ',1,NULL,NULL,NULL),(12,'Lịch sử đâm đụng nặng',1,NULL,NULL,NULL),(13,'Hệ thống chẩn đoán lỗi OBD (On–Board Diagnostics)',NULL,NULL,NULL,NULL),(14,'Cổng kết nối OBD',13,NULL,NULL,NULL),(15,'Mã lỗi chẩn đoán (DTCs)',13,NULL,NULL,NULL),(16,'Kiểm tra trên đường',NULL,NULL,NULL,NULL),(17,'Tiếng ồn của động cơ',16,NULL,NULL,NULL),(18,'Hoạt động hộp số',16,NULL,NULL,NULL),(19,'Tiếng ồn của hộp số',16,NULL,NULL,NULL),(20,'Tiếng ồn vận hành cầu dẫn động/hộp số phụ',16,NULL,NULL,NULL),(21,'Hoạt động hệ thống lái (cân bằng, độ khớp)',16,NULL,NULL,NULL),(22,'Tiếng kêu thân xe/hệ thống treo',16,NULL,NULL,NULL),(23,'Hoạt động đồng hồ cảnh báo',16,NULL,NULL,NULL),(24,'Phanh và ABS',16,NULL,NULL,NULL),(25,'Tiếng ồn thanh cân bằng',16,NULL,NULL,NULL),(26,'Tiếng ồn giảm sóc',16,NULL,NULL,NULL),(27,'Không có tiếng ồn gió',16,NULL,NULL,NULL),(28,'Ghi nhớ vị trí ghế lái',16,NULL,NULL,NULL),(29,'Ga tự động',16,NULL,NULL,NULL),(30,'Hoạt động của ly hợp',16,NULL,NULL,NULL),(31,'Hoạt động cơ cấu khóa cần số',16,NULL,NULL,NULL),(32,'Chế độ khởi động/cầm chừng',16,NULL,NULL,NULL),(33,'Hệ thống khởi động từ xa',16,NULL,NULL,NULL),(34,'Hệ thống hỗ trợ lái',16,NULL,NULL,NULL),(35,'Hệ thống giữ tốc độ',16,NULL,NULL,NULL),(36,'Hệ thống giữ lane đường tự động',16,NULL,NULL,NULL),(37,'Ngoại thất và thân xe',NULL,NULL,NULL,NULL),(38,'Kết cấu thân xe',37,NULL,NULL,NULL),(39,'Thân vỏ (hình dạng, gân chỉ, bề mặt sơn)',38,NULL,NULL,NULL),(40,'Mối ghép, gioăng',38,NULL,NULL,NULL),(41,'Cản trước',38,NULL,NULL,NULL),(42,'Cản sau',38,NULL,NULL,NULL),(43,'Cột A bên tài',38,NULL,NULL,NULL),(44,'Cột A bên phụ',38,NULL,NULL,NULL),(45,'Cột B bên tài',38,NULL,NULL,NULL),(46,'Cột B bên phụ',38,NULL,NULL,NULL),(47,'Nẹp trang trí',38,NULL,NULL,NULL),(48,'Thanh baga mui',38,NULL,NULL,NULL),(49,'Hệ thống cửa',37,NULL,NULL,NULL),(50,'Cánh cửa trước tài',49,NULL,NULL,NULL),(51,'Cánh cửa trước phụ',49,NULL,NULL,NULL),(52,'Cánh cửa sau tài',49,NULL,NULL,NULL),(53,'Cánh cửa sau phụ',49,NULL,NULL,NULL),(54,'Tay nắm cửa',49,NULL,NULL,NULL),(55,'Tai xe bên tài',49,NULL,NULL,NULL),(56,'Tai xe bên phụ',49,NULL,NULL,NULL),(57,'Thanh ốp hông bên tài',49,NULL,NULL,NULL),(58,'Thanh ốp hông bên phụ',49,NULL,NULL,NULL),(59,'Hông xe bên tài',49,NULL,NULL,NULL),(60,'Hông xe bên phụ',49,NULL,NULL,NULL),(61,'Bậc bước chân lên xuống',49,NULL,NULL,NULL),(62,'Capo',49,NULL,NULL,NULL),(63,'Cốp sau',49,NULL,NULL,NULL),(64,'Hệ thống đèn',37,NULL,NULL,NULL),(65,'Đèn chiếu sáng trước bên tài',64,NULL,NULL,NULL),(66,'Đèn chiếu sáng trước bên phụ',64,NULL,NULL,NULL),(67,'Đèn hậu bên tài',64,NULL,NULL,NULL),(68,'Đèn hậu bên phụ',64,NULL,NULL,NULL),(69,'Hệ thống kính',37,NULL,NULL,NULL),(70,'Gương chiếu hậu bên tài',69,NULL,NULL,NULL),(71,'Gương chiếu hậu bên phụ',69,NULL,NULL,NULL),(72,'Kính chắn gió trước',69,NULL,NULL,NULL),(73,'Kính chắn gió trước ZIN',69,NULL,NULL,NULL),(74,'Kính chắn gió sau',69,NULL,NULL,NULL),(75,'Kính chắn gió sau ZIN',69,NULL,NULL,NULL),(76,'Kính cửa trước bên tài',69,NULL,NULL,NULL),(77,'Kính cửa trước bên tài ZIN',69,NULL,NULL,NULL),(78,'Kính cửa trước bên phụ',69,NULL,NULL,NULL),(79,'Kính cửa trước bên phụ ZIN',69,NULL,NULL,NULL),(80,'Kính cửa sau bên tài',69,NULL,NULL,NULL),(81,'Kính cửa sau bên tài ZIN',69,NULL,NULL,NULL),(82,'Kính cửa sau bên phụ',69,NULL,NULL,NULL),(83,'Kính cửa sau bên phụ ZIN',69,NULL,NULL,NULL),(84,'Hệ thống tản nhiệt',37,NULL,NULL,NULL),(85,'Lưới tản nhiệt',84,NULL,NULL,NULL),(86,'Luỡi gạt mưa',37,NULL,NULL,NULL),(87,'Thanh gạt mưa',86,NULL,NULL,NULL),(88,'Cao su gạt mưa',86,NULL,NULL,NULL),(89,'Tấm trần xe, cửa sổ trời',37,NULL,NULL,NULL),(90,'Hoạt động cửa lật/Cửa trượt',89,NULL,NULL,NULL),(91,'Mui xe',89,NULL,NULL,NULL),(92,'Cửa sổ trời',89,NULL,NULL,NULL),(93,'Nắp bình xăng',37,NULL,NULL,NULL),(94,'Nắp bình xăng',93,NULL,NULL,NULL),(95,'Sơn xe',37,NULL,NULL,NULL),(96,'Bề mặt sơn',95,NULL,NULL,NULL),(97,'Tính đồng nhất của màu sơn',95,NULL,NULL,NULL),(98,'Độ dày lớp sơn',95,NULL,NULL,NULL),(99,'Bảo vệ sơn PPF',95,NULL,NULL,NULL),(100,'Hệ thống khung gầm',NULL,NULL,NULL,NULL),(101,'Hệ thống khung xe và giảm xóc',100,NULL,NULL,NULL),(102,'Khung xương đầu xe',101,NULL,NULL,NULL),(103,'Khung xương két nước',101,NULL,NULL,NULL),(104,'Ụ giảm xóc trước bên tài',101,NULL,NULL,NULL),(105,'Ụ giảm xóc trước bên phụ',101,NULL,NULL,NULL),(106,'Hệ thống giảm chấn trước bên tài',101,NULL,NULL,NULL),(107,'Hệ thống giảm chấn trước bên phụ',101,NULL,NULL,NULL),(108,'Hệ thống giảm chấn sau bên tài',101,NULL,NULL,NULL),(109,'Hệ thống giảm chấn sau bên phụ',101,NULL,NULL,NULL),(110,'Chân, xương, giá bắt các loại đèn',101,NULL,NULL,NULL),(111,'Giá đỡ động cơ',101,NULL,NULL,NULL),(112,'Sắt xi bên tài',101,NULL,NULL,NULL),(113,'Sắt xi bên phụ',101,NULL,NULL,NULL),(114,'Cao su chụp bụi',101,NULL,NULL,NULL),(115,'Khớp các đăng, khớp trục láp',101,NULL,NULL,NULL),(116,'Cao su chân đỡ hộp số',101,NULL,NULL,NULL),(117,'Hệ thống ống xả',100,NULL,NULL,NULL),(118,'Hệ thống ống nhiên liệu dưới gầm',117,NULL,NULL,NULL),(119,'Hệ thống ống xả',117,NULL,NULL,NULL),(120,'Nguyên bản của bulong cổ pô',117,NULL,NULL,NULL),(121,'Hệ thống lốp xe',100,NULL,NULL,NULL),(122,'Bề mặt lốp trước bên tài',121,NULL,NULL,NULL),(123,'Bề mặt lốp trước bên phụ',121,NULL,NULL,NULL),(124,'Bề mặt lốp sau bên tài',121,NULL,NULL,NULL),(125,'Bề mặt lốp sau bên phụ',121,NULL,NULL,NULL),(126,'Độ lão hóa cao su của lốp trước bên tài',121,NULL,NULL,NULL),(127,'Độ lão hóa cao su của lốp trước bên phụ',121,NULL,NULL,NULL),(128,'Độ lão hóa cao su của lốp sau bên tài',121,NULL,NULL,NULL),(129,'Độ lão hóa cao su của lốp sau bên phụ',121,NULL,NULL,NULL),(130,'Độ mòn lốp trước bên tài',121,NULL,NULL,NULL),(131,'Độ mòn lốp trước bên phụ',121,NULL,NULL,NULL),(132,'Độ mòn lốp sau bên tài',121,NULL,NULL,NULL),(133,'Độ mòn lốp sau bên phụ',121,NULL,NULL,NULL),(134,'Bề mặt la-zăng trước bên tài',121,NULL,NULL,NULL),(135,'Bề mặt la-zăng trước bên phụ',121,NULL,NULL,NULL),(136,'Bề mặt la-zăng sau bên tài',121,NULL,NULL,NULL),(137,'Bề mặt la-zăng sau bên phụ',121,NULL,NULL,NULL),(138,'Chụp la-zăng',121,NULL,NULL,NULL),(139,'Hệ thống cân bằng xe',100,NULL,NULL,NULL),(140,'Thước lái',139,NULL,NULL,NULL),(141,'Rô-tuyn lái trong',139,NULL,NULL,NULL),(142,'Rô-tuyn lái ngoài',139,NULL,NULL,NULL),(143,'Rô-tuyn cân bằng',139,NULL,NULL,NULL),(144,'Thanh cân bằng',139,NULL,NULL,NULL),(145,'Bơm trợ lực lái',139,NULL,NULL,NULL),(146,'Hệ thống phanh',100,NULL,NULL,NULL),(147,'Má phanh trước bên tài',146,NULL,NULL,NULL),(148,'Má phanh trước bên phụ',146,NULL,NULL,NULL),(149,'Má phanh sau bên tài',146,NULL,NULL,NULL),(150,'Má phanh sau bên phụ',146,NULL,NULL,NULL),(151,'Đĩa phanh /tang trống trước bên tài',146,NULL,NULL,NULL),(152,'Đĩa phanh /tang trống trước bên phụ',146,NULL,NULL,NULL),(153,'Đĩa phanh /tang trống sau bên tài',146,NULL,NULL,NULL),(154,'Đĩa phanh /tang trống sau bên phụ',146,NULL,NULL,NULL),(155,'Đường ống dầu phanh',146,NULL,NULL,NULL),(156,'Phanh tay',146,NULL,NULL,NULL),(157,'Xy lanh tổng phanh',146,NULL,NULL,NULL),(158,'Tình trạng rò rỉ dầu',146,NULL,NULL,NULL),(159,'Hộp số tự động (sàn)',146,NULL,NULL,NULL),(160,'Nội Thất',NULL,NULL,NULL,NULL),(161,'Hệ thống an toàn',160,NULL,NULL,NULL),(162,'Túi khí',161,NULL,NULL,NULL),(163,'Dây đai an toàn',161,NULL,NULL,NULL),(164,'Chức năng bật đèn báo khẩn cấp',161,NULL,NULL,NULL),(165,'Chức năng xe',160,NULL,NULL,NULL),(166,'Hệ thống chống trộm/báo động',165,NULL,NULL,NULL),(167,'Hệ thống điều hòa',165,NULL,NULL,NULL),(168,'Hệ thống sưởi',165,NULL,NULL,NULL),(169,'Bề mặt táp-lô',165,NULL,NULL,NULL),(170,'Đồng hồ và đèn cảnh báo trên táp-lô',165,NULL,NULL,NULL),(171,'Điều chỉnh góc/ khoảng cách vô-lăng',165,NULL,NULL,NULL),(172,'Khóa tay lái',165,NULL,NULL,NULL),(173,'Nút điều khiển chức năng trên vô-lăng',165,NULL,NULL,NULL),(174,'Còi (kèn)',165,NULL,NULL,NULL),(175,'Gương trong xe',165,NULL,NULL,NULL),(176,'Hộc găng tay, tựa tay',165,NULL,NULL,NULL),(177,'Tấm che nắng, gương trang điểm và đèn',165,NULL,NULL,NULL),(178,'Chức năng bật đèn pha/ cos/ sương mù',165,NULL,NULL,NULL),(179,'Hệ thống điều khiển từ xa và khởi động bằng nút nhấn',165,NULL,NULL,NULL),(180,'Hệ thống giải trí phía sau',165,NULL,NULL,NULL),(181,'Điểm cấp nguồn/mồi thuốc',165,NULL,NULL,NULL),(182,'Chức năng điều chỉnh gương chiếu hậu ngoài',165,NULL,NULL,NULL),(183,'Cơ cấu mở nắp nhiên liệu',165,NULL,NULL,NULL),(184,'Hệ thống hỗ trợ lái (Cruise Control)',165,NULL,NULL,NULL),(185,'Radio, CD và loa',165,NULL,NULL,NULL),(186,'Khóa trẻ em',165,NULL,NULL,NULL),(187,'Ăng ten',165,NULL,NULL,NULL),(188,'Đèn chiếu sáng nội thất',165,NULL,NULL,NULL),(189,'Hệ thống gạt mưa',160,NULL,NULL,NULL),(190,'Chức năng rửa kính',189,NULL,NULL,NULL),(191,'Chức năng gạt mưa',189,NULL,NULL,NULL),(192,'Ghế ngồi',160,NULL,NULL,NULL),(193,'Điều chỉnh ghế và tựa đầu',192,NULL,NULL,NULL),(194,'Gập ghế',192,NULL,NULL,NULL),(195,'Sưởi ghế',192,NULL,NULL,NULL),(196,'Hệ thống cửa khóa + kính',160,NULL,NULL,NULL),(197,'Điều khiển kính lên xuống trước bên tài',196,NULL,NULL,NULL),(198,'Điều khiển kính lên xuống trước bên phụ',196,NULL,NULL,NULL),(199,'Điều khiển kính lên xuống sau bên tài',196,NULL,NULL,NULL),(200,'Điều khiển kính lên xuống sau bên phụ',196,NULL,NULL,NULL),(201,'Cơ cấu đóng/mở cửa trước tài',196,NULL,NULL,NULL),(202,'Cơ cấu đóng/mở cửa trước phụ',196,NULL,NULL,NULL),(203,'Cơ cấu đóng/mở cửa sau tài',196,NULL,NULL,NULL),(204,'Cơ cấu đóng/mở cửa sau phụ',196,NULL,NULL,NULL),(205,'Hệ thống cảm biến + camera',160,NULL,NULL,NULL),(206,'Hệ thống theo dõi áp suất lốp',205,NULL,NULL,NULL),(207,'Hệ thống camera quan sát',205,NULL,NULL,NULL),(208,'Cảm biến khoảng cách',205,NULL,NULL,NULL),(209,'Khoang hành lý/cốp',160,NULL,NULL,NULL),(210,'Mở cốp sau điều khiển từ xa',209,NULL,NULL,NULL),(211,'Xương tang cứng đuôi xe',209,NULL,NULL,NULL),(212,'Xương hốc đặt bánh xe dự phòng',209,NULL,NULL,NULL),(213,'Đèn khoang hành lý',209,NULL,NULL,NULL),(214,'Bộ dụng cụ và kích nâng',209,NULL,NULL,NULL),(215,'Tình trạng lốp dự phòng',209,NULL,NULL,NULL),(216,'Bộ dụng cụ sửa chữa dự phòng',209,NULL,NULL,NULL),(217,'Cơ cấu mở khoang hành lý khẩn cấp',209,NULL,NULL,NULL),(218,'Chức năng cửa sổ trời',209,NULL,NULL,NULL),(219,'Chất lượng vật liệu',160,NULL,NULL,NULL),(220,'Táp-pi cửa trước bên tài',219,NULL,NULL,NULL),(221,'Táp-pi cửa trước bên phụ',219,NULL,NULL,NULL),(222,'Táp-pi cửa sau bên tài',219,NULL,NULL,NULL),(223,'Táp-pi cửa sau bên phụ',219,NULL,NULL,NULL),(224,'Tấm trần',219,NULL,NULL,NULL),(225,'Chất lượng vật liệu bọc ghế',219,NULL,NULL,NULL),(226,'Chất lượng vật liệu bọc vô lăng',219,NULL,NULL,NULL),(227,'Chất lượng vật liệu bọc cần số',219,NULL,NULL,NULL),(228,'Bề mặt ốp nhựa nội thất',219,NULL,NULL,NULL),(229,'Bề mặt ốp da nội thất',219,NULL,NULL,NULL),(230,'Khoang động cơ',NULL,NULL,NULL,NULL),(231,'Động cơ & hộp số',230,NULL,NULL,NULL),(232,'Gioăng, phớt động cơ',231,NULL,NULL,NULL),(233,'Đai dẫn động',231,NULL,NULL,NULL),(234,'Độ rung động cơ',231,NULL,NULL,NULL),(235,'Mô-tơ đề',231,NULL,NULL,NULL),(236,'Hộp cầu chì',231,NULL,NULL,NULL),(237,'Ắc quy',231,NULL,NULL,NULL),(238,'Dây đai cam',231,NULL,NULL,NULL),(239,'Máy phát điện',231,NULL,NULL,NULL),(240,'Cao su chân máy',231,NULL,NULL,NULL),(241,'Các bó dây điện',231,NULL,NULL,NULL),(242,'Hệ thống Turbo',231,NULL,NULL,NULL),(243,'Dầu (nhớt) động cơ',231,NULL,NULL,NULL),(244,'Dung dịch lạ trong dầu động cơ',231,NULL,NULL,NULL),(245,'Tình trạng rò rỉ dầu',231,NULL,NULL,NULL),(246,'Ống sao su và mối lắp',231,NULL,NULL,NULL),(247,'Hệ thống làm mát',230,NULL,NULL,NULL),(248,'Nước làm mát',245,NULL,NULL,NULL),(249,'Két nước',245,NULL,NULL,NULL),(250,'Quạt làm mát',245,NULL,NULL,NULL),(251,'Dung dịch',230,NULL,NULL,NULL),(252,'Dầu phanh',250,NULL,NULL,NULL),(253,'Dầu trợ lực lái',250,NULL,NULL,NULL),(254,'Dung dịch nước rửa kính',250,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tbl_criterion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_result`
--

DROP TABLE IF EXISTS `tbl_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_result` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `car_id` int(11) DEFAULT NULL,
  `criterion_id` int(11) DEFAULT NULL,
  `is_good` tinyint(1) DEFAULT 0,
  `note` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `car_id` (`car_id`),
  KEY `criterion_id` (`criterion_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `tbl_result_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_result_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `tbl_car` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_result_ibfk_3` FOREIGN KEY (`criterion_id`) REFERENCES `tbl_criterion` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tbl_result_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `tbl_user` (`id`),
  CONSTRAINT `tbl_result_ibfk_5` FOREIGN KEY (`updated_by`) REFERENCES `tbl_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_result`
--

LOCK TABLES `tbl_result` WRITE;
/*!40000 ALTER TABLE `tbl_result` DISABLE KEYS */;
INSERT INTO `tbl_result` VALUES (1,NULL,1,2,1,'note',1,1,'2023-09-29 09:52:39','2023-09-29 09:57:08',NULL),(2,NULL,1,3,1,'1 củ',1,1,'2023-09-29 10:05:59','2023-09-29 11:03:25',NULL),(3,NULL,1,4,1,'',1,1,'2023-09-29 10:35:56','2023-09-29 10:35:56',NULL),(4,NULL,1,5,1,'',1,1,'2023-09-29 10:50:35','2023-09-29 10:50:35',NULL),(5,NULL,1,6,1,'',1,1,'2023-09-29 10:50:36','2023-09-29 10:50:36',NULL),(6,NULL,2,2,1,'',1,1,'2023-09-29 11:01:37','2023-09-29 11:01:37',NULL),(7,NULL,2,3,1,'500K',1,1,'2023-09-29 11:01:38','2023-09-29 11:01:45',NULL),(8,NULL,1,14,1,'dqd',1,1,'2023-09-29 14:22:20','2023-09-29 14:22:23',NULL),(9,NULL,2,15,1,'',1,1,'2023-09-29 14:22:34','2023-09-29 14:22:34',NULL),(10,NULL,2,14,1,'qweqwe',1,1,'2023-09-29 14:22:41','2023-09-29 14:22:44',NULL);
/*!40000 ALTER TABLE `tbl_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` char(128) DEFAULT NULL,
  `role` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_user`
--

LOCK TABLES `tbl_user` WRITE;
/*!40000 ALTER TABLE `tbl_user` DISABLE KEYS */;
INSERT INTO `tbl_user` VALUES (1,'dang','$2a$10$Ui2KIzvCSyvq.mcoSyG2kOs9BZBZI06QO8S3NpG10.FwzibGyN7z6',1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tbl_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-29 22:04:05
