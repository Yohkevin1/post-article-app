/*
SQLyog Ultimate v12.5.1 (64 bit)
MySQL - 8.0.30 : Database - article_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`article_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

/*Table structure for table `posts` */

DROP TABLE IF EXISTS `posts`;

CREATE TABLE `posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `content` text,
  `category` varchar(100) DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `posts` */

insert  into `posts`(`id`,`title`,`content`,`category`,`status`) values 
(2,'Panduan Lengkap Belajar Pemrograman Golang untuk Pemula','Golang adalah bahasa pemrograman yang dikembangkan oleh Google. Bahasa ini dikenal karena kesederhanaannya dan performanya yang tinggi. Dalam artikel ini, kita akan membahas dasar-dasar pemrograman Golang, mulai dari instalasi, sintaks dasar, hingga pembuatan aplikasi sederhana. Golang sangat cocok untuk pengembangan backend, microservices, dan aplikasi berbasis cloud.','Pemrograman','publish'),
(3,'Mengenal Machine Learning untuk Pemula','Machine learning adalah salah satu bidang paling menarik dalam dunia teknologi saat ini. Artikel ini akan membahas dasar-dasar machine learning untuk pemula, mulai dari pengertian, jenis-jenis algoritma, hingga contoh penerapannya dalam kehidupan sehari-hari. Kita juga akan membahas tools dan library populer seperti TensorFlow dan Scikit-learn. Jika Anda tertarik mempelajari machine learning, artikel ini adalah titik awal yang baik untuk memulai perjalanan Anda.','Machine Learning','publish');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
