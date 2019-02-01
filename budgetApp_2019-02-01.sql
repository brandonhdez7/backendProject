# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.25)
# Database: budgetApp
# Generation Time: 2019-02-01 18:02:21 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table bankAccounts
# ------------------------------------------------------------

DROP TABLE IF EXISTS `bankAccounts`;

CREATE TABLE `bankAccounts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `accountName` varchar(85) DEFAULT NULL,
  `accountType` varchar(85) DEFAULT NULL,
  `beginningBal` int(11) DEFAULT NULL,
  `debit` int(11) DEFAULT NULL,
  `credit` int(11) DEFAULT NULL,
  `endingBalance` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table budget
# ------------------------------------------------------------

DROP TABLE IF EXISTS `budget`;

CREATE TABLE `budget` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `categoryName` int(11) DEFAULT NULL,
  `monthlyBudget` int(11) DEFAULT NULL,
  `annualBudget` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `budget` WRITE;
/*!40000 ALTER TABLE `budget` DISABLE KEYS */;

INSERT INTO `budget` (`id`, `categoryName`, `monthlyBudget`, `annualBudget`)
VALUES
	(1,NULL,NULL,NULL);

/*!40000 ALTER TABLE `budget` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table budgetCategory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `budgetCategory`;

CREATE TABLE `budgetCategory` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(85) NOT NULL DEFAULT '',
  `categoryType` varchar(85) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `budgetCategory` WRITE;
/*!40000 ALTER TABLE `budgetCategory` DISABLE KEYS */;

INSERT INTO `budgetCategory` (`id`, `categoryName`, `categoryType`)
VALUES
	(1,'salary','income'),
	(2,'otherIncome','income'),
	(3,'housing','expense');

/*!40000 ALTER TABLE `budgetCategory` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table transactions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `transactions`;

CREATE TABLE `transactions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `name` varchar(85) NOT NULL DEFAULT '',
  `categoryName` varchar(85) DEFAULT NULL,
  `trxDate` date NOT NULL,
  `description` varchar(85) DEFAULT NULL,
  `categoryType` varchar(85) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userName` int(11) DEFAULT NULL,
  `userEmail` int(11) DEFAULT NULL,
  `userPhone` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
