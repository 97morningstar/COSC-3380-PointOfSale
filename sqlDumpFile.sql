-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 26, 2021 at 12:28 AM
-- Server version: 5.7.33-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freedbtech_newschema`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(10) UNSIGNED NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_initial` varchar(2) DEFAULT NULL,
  `last_name` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `street_number` int(11) DEFAULT NULL,
  `street_name` varchar(100) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `is_member` tinyint(4) NOT NULL,
  `store_id_fk` int(11) DEFAULT NULL,
  `join_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `first_name`, `middle_initial`, `last_name`, `password`, `email`, `street_number`, `street_name`, `zip_code`, `date_of_birth`, `is_member`, `store_id_fk`, `join_date`) VALUES
(27, 'Scrouge', 't', 'McDuck', '$2b$10$eUdgdMIrFb6fKVinW1E8DOj1Xb4goPiQtiocPJbrwZlxULOgy5ehO', 'test2@gmail.com', 123, 'test dr', 12345, '1234-01-09', 0, 2, '2020-09-14'),
(28, 'Evelyn', 't', 'Chi', '$2b$10$dnw20ErCY.S3IMOthGEpJe9Gzx15AlsWpwt1y/V8Po2uk/hg4HFDi', 'test23@gmail.com', 123, 'test dr', 12345, '1234-01-09', 0, 3, '2020-05-11'),
(29, 'Bobby', 't', 'McDonald', '$2b$10$0aBfC5UdjUldvu/Sa7aK3eauNuuGNCFylcM1Jz1yLTHQwfrhQGXpW', 'test235@gmail.com', 123, 'test dr', 12345, '1234-01-09', 0, 3, '2020-12-28'),
(30, 'Frank', 'M', 'Fiddleford', '$2b$10$3NsDOoL6N2ZRcLouUtJhB.aJuiihAzrcgEqUowpNouxMIl0G51Wgq', 'test2325@gmail.com', 123, 'test dr', 12345, '1234-01-09', 0, 2, '2020-12-21'),
(31, 'Lucas', 't', 'James', '$2b$10$C5wE.d8tY5QFyY8HJV9in.jENdz1FG1ceyxT1/PNqyxaZ.eyDzHru', 'test23225@gmail.com', 123, 'test dr', 12345, '1234-01-09', 0, 2, '2021-01-04'),
(32, 'Bruce', 't', 'Wayne', '$2b$10$2NZ.ghNBYtw11u7QNFMyn.oGbVzXfDIUdAxFimtcZ00wPIj8UC0tO', 'test232225@gmail.com', 123, 'test dr', 12345, '1234-01-09', 0, 3, '2020-10-12'),
(33, 'Olivia', 't', 'Hearts', '$2b$10$M46/CvuEKjwvWG7L0KsEBufhUBlrvlj2vOhy8Eq9bnE30s3NW8M1y', 'test2323225@gmail.com', 123, 'test dr', 12345, '1234-01-09', 0, 3, '2018-12-09'),
(38, 'Mabel', 'M', 'Wu', '$2b$10$91mqmnyNnRbAG1Mdc7dVzuCCxzP9K8GySEsXn3QFRLS5OxoIUsAfu', 'mart@gmail.com', 1012, 'dfg', 77302, '1997-01-07', 1, 4, '2020-11-09'),
(39, 'Jack', 'M', 'Black', '$2b$10$iS1tHOtXzbA8YJ5hjlo56.PfhLYqux8HUrEai7OHQ2GRUqfSLex9q', 'manteselisa@gmail.com', 1011, 'efdr', 77301, '2021-04-11', 0, 2, '2020-09-06'),
(40, 'Elisa', 'M', 'Fuentes', '$2b$10$1tocl9VAe230v8A6H2MPNO1XIoNZtShI23Rr9M877RPJi25.FPmF.', 'nteselisa@gmail.com', 101, 'ghy', 77301, '2021-04-11', 0, 3, '2020-11-23'),
(41, 'Lee', 'M', 'Rocky', '$2b$10$WPraiYiVaeiHvzA3AgCFtujT01u8v9MOSll2yzoe3jzKZ1O6DJqYW', 'martinezfuenteselisa@gmail.co', 1011, 'fdg', 77301, '2021-04-11', 0, 2, '2020-09-28'),
(42, 'Eli', 'M', 'Frank', '$2b$10$zpmJjLGOrwIZa/ZCXwtekeg0ZG6qIYkRdk7MAFdNt7GRtP4guCXM2', 'elisa@gmail.com', 101, 'op[', 77301, '2021-04-11', 0, 3, '2020-11-09'),
(43, 'Elisa', 'M', 'Fuentes', '$2b$10$iXRbOjqSebJvFB8HTGBAluhWCQeY5XSMaVtSrNMjlfcJzN2rm7ehy', 'a@gmail.co', 1011, 'ghj', 77301, '2021-04-11', 0, 2, '2021-02-18'),
(44, 'Ana', 'M', 'Spades', '$2b$10$Ll.4WLAnaQQ5M/RFaRsQZugb1E/fVEzvrGWXHK9HQbl3sxroG98ye', 'a@gmail.com', 1011, 'df', 77301, '2021-04-11', 1, 3, '2019-05-05'),
(45, 'Tim', 'D', 'Turner', '$2b$10$9GcH.Ru8nT9RBRUFCDER4eKowonBTj1naJ26.BtYsgwspTytKhA7W', 'test@login.com', 345, 'dcbv', 77301, '2021-04-11', 0, 4, '2020-12-07'),
(46, 'Kim', 'M', 'Dickens', '$2b$10$cw5975BwVmoQo/LrAm8El.LC8VZSq5jMVFDc3kyUTAlD04IvzJi/2', 'lisa@gmail.com', 1011, 'dfghf', 77301, '2021-04-21', 1, 3, '2020-11-09'),
(47, 'Elisa', 'M', 'Fuentes', '$2b$10$5MDdpDD9u7iW0EGu4zqihOnxOjkcFUpyIMVTE43rQicACGQ4jnufa', 'helisa@gmail.com', 1011, 'dxsc', 77301, '2021-04-15', 1, 3, '2020-12-06'),
(48, 'Arya', 'M', 'Stark', '$2b$10$I799oHJeStdHYrtJh561M.YBZbfjlmZ8qWSypEfE/gP4fORWSAuoO', 'eselisa@gmail.com', 1011, 'xcv', 77301, '2021-04-15', 0, 3, '2020-07-06'),
(49, 'Charlotte', 'M', 'Do', '$2b$10$SoMsY8UTPX7PStNG7jTlOu915g48pOJTlzjmCKLlEF4UKkosJ.slW', 'isa@gmail.com', 101, 'dfg', 77301, '2021-04-15', 0, 3, '2020-03-08'),
(50, 'Isabella', 'M', 'Adobe', '$2b$10$OtklbE91mfbNm7NRODKMneTcXw/ef70JAbAGZGJDdt3dHZMugV9Vu', 'lisas@gmail.com', 10, 'sdfs', 77301, '2021-04-15', 1, 2, '2020-01-12'),
(52, 'Avery', 'n', 'Stone', '$2b$10$ISl9FtsZrqcCKVG3VDg0OuhTVbUoEvRPpICSh30wsfo0Vkkr7YW4e', 'n@gmail.com', 123, 'n', 12345, '2021-04-06', 0, 3, '2020-07-05'),
(53, 'Peter', 'n', 'James', '$2b$10$7nbstn.O8NycCR4eJanYTuoXA6XwCPmAgcgkk2YVdWoyU8BZTKX4a', 'r@gmail.com', 123, 'n', 12345, '2021-04-06', 0, 3, '2020-11-09'),
(54, 'Nicholas', 'n', 'James', '$2b$10$vLgZqRsNUnX.xXKYPwuzfuP/1B3YnKba.WVE/oZqIQYcEwcYijQTS', 'q@gmail.com', 123, 'n', 12345, '2021-04-06', 0, 3, '2020-10-04'),
(55, 'Sophia', 'c', 'Club', '$2b$10$nCQM/6YDm6QZz8QApieRb.aA.QqFxrpuEad5jI9wmeSSdnjybKRuG', 'asdf@gmail.com', 123, 'sewqeqw', 12344, '2021-04-16', 0, 3, '2019-06-02'),
(56, 'Amelia', 'c', 'Casio', '$2b$10$EFSa7Gb3xkZtG4/fFmLBvuB8.acsN30t7F1Ijv6Xf71gdpu/6lsWC', 'asdfg@gmail.com', 123, 'sewqeqw', 12344, '2021-04-16', 0, 3, '2020-04-06'),
(57, 'Elizabeth', 'c', 'Brave', '$2b$10$GdFdWxrU532qE1Zsw20zCelvqjdW0IC1eymjc9R2ALzqlYOR.IlQe', 'asdfgh@gmail.com', 123, 'sewqeqw', 12344, '2021-04-16', 0, 3, '2020-05-18'),
(58, 'Kyle', 'W', 'Cunningham', '$2b$10$2nrT1WJCe1Epv9PkfW83Oey7qyHaAuu901DwHNexA2VNcyilRNU5e', 'asdfghz@gmail.com', 123, 'sewqeqw', 12344, '2021-04-16', 0, 3, '2020-11-16'),
(59, 'Carter', 'c', 'Wayne', '$2b$10$00PHQ53c6jqVspsz.H857eAMkXJ/LZXsBcCQPOllEAm.OMSyV1ySy', 'c@gmail.com', 123, 'c', 12345, '2021-04-16', 0, 3, '2020-11-29'),
(60, 'James', 'e', 'Jet', '$2b$10$ICL8XDMQYtImoS9ax0339.MPdmWdpll7SZW6xMqmTVdm4kcT6Z8YO', 'newCustomer@gmail.com', 123, 'Street Lane', 453, '1997-07-10', 0, 4, '2020-08-02'),
(62, 'Peter', 'P', 'Pan', '$2b$10$bGxpaEN75RGjiNppUfE9i.A9E7Ruk7CNJvoQ89nz1RSKkAA7R3CQi', 'testElisa@gmail.com', 123, 'Neverland', 12345, '2021-04-16', 1, 3, '2021-02-01'),
(63, 'Jordan', 'T', 'Yu', '$2b$10$.cGnLivbzPAo7PoLxq34gO2YF4zeFf2J1tJ1J1DhGqrlQTYS7tiq6', 'jordant3rra1337@gmail.com', 4023, 'elm crest trail', 77059, '2000-03-30', 1, 2, '2020-10-26'),
(64, 'Mia', 'd', 'Penelope', '$2b$10$uX9yDIomHHTdt/GK1or4g.somA6Y7eC1iRQXAmmGlX1ADbI/V.raq', 'currentTest@gmail.com', 2321, 'qwewqe', 12345, '2021-04-17', 0, 3, '2020-04-06'),
(65, 'Ava', 'w', 'Wu', '$2b$10$SzT6YdQjED6PvYrtj136kuMEfQpFrRvoY677TEuLDB6xxN7l74/pK', 'DemoCustomer@gmail.com', 410, 'street drive', 12345, '2021-04-17', 0, 4, '2020-05-04'),
(66, 'Oscar', 'M', 'Martinez', '$2b$10$2pE.PX55v55Pr0zkKqQnXuUb8c3H4DlB1AVtwSGxq1R1tbyxk2Vya', 'newCusotomrere@gmail.com', 123, 'Street', 12345, '2020-07-09', 1, 3, '2021-01-11'),
(67, 'Timmy', 'W', 'Martin', '$2b$10$b7tG56CJbgguPA8NQ93GM.iVEUS2oGwasUOkc./JoSv0bf9qFzVwG', 'TestJames123@gmail.com', 123, 'street drive', 12345, '2015-04-09', 0, 2, '2021-04-19'),
(68, 'James', ' W', 'Gold', '$2b$10$gtvP2pPG1nFpKQQUVYdcGeMwHni7C2DbPQDPgIrXAjxp.YhqTZQOO', 'newestCustomer@gmail.com', 123, 'street drive', 12345, '2012-04-25', 0, 3, '2021-04-19'),
(69, 'Matthew', 'w', 'Helios', '$2b$10$XsjHDoqS5.nq2fuvVkFXw.qP/F2nCMV0..g3CMgZxmlSaWBhEXeou', 'New2@gmail.com', 123, 'street drive', 12345, '2018-04-17', 0, 3, '2021-04-19'),
(70, 'Jimmy', 'W', 'Smith', '$2b$10$QCQ1bhhL9vv7t9iv8nMijuDtuXMPocqNjGx1JgiTi5OPvpSiICzLO', 'James123@gmail.com', 123, 'street drive', 12345, '2014-04-15', 0, 3, '2021-04-19'),
(71, 'asdasd', 'a', 'dsadasdsadas', '$2b$10$URqXIB/P0ZlScmhga244huq3i177FCdM6GcYQZKz3L1HEtHp52FKa', 'asdsadasdasdas@gmaisdas.com', 121312, 'dasdasdsa', 123445, '2021-04-25', 0, 3, '2021-04-25'),
(72, 'yvghbjnkm', 'w', 'waszdxfghkj', '$2b$10$RJO6Sn89bMV0fc9UQW/FhuubEbt5ycZl3b1wTcUzEARxVkvVRIJ1u', 'wesrdtcyhbjl', 123, 'wzsdsfhgjyuk', 12345, '2021-04-25', 0, 2, '2021-04-25'),
(73, 'sdad', 'd', 'dsads', '$2b$10$./UCL/PgnETcIb62fpDSAeInYdTrUJ0GtbCLDLWnvK3csovNAqxzO', 'newCustomedsadsadasdsr@gmail.com', 12312, 'dsadas', 12, '2019-04-16', 0, 3, '2021-04-25'),
(74, 'Finale', 'd', 'Test', '$2b$10$LHTDLyJcsACkadwurJyXMO61rRaz/SiAvQhctCoUkW7.GuKG0Dhj6', 'FinalTest@gmail.com', 123, 'street drive', 12345, '2021-04-06', 0, 3, '2021-04-25');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_initial` varchar(1) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `employment_date` date NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `salary` float(19,4) DEFAULT NULL,
  `street_number` int(11) DEFAULT NULL,
  `street_name` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `store_store_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This table holds all employee information';

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `first_name`, `middle_initial`, `last_name`, `employment_date`, `date_of_birth`, `email`, `password`, `salary`, `street_number`, `street_name`, `city`, `zip_code`, `phone_number`, `store_store_id`) VALUES
(5, 'Eliana', 'T', 'Peterson', '1234-12-12', '1234-11-11', 'testEmp@gmail.com', '$2b$10$WlbIcZLZccO4SnVEzBKeP.522KRhwztQprrM6skZFxAlQukFAnBDO', 3.1400, 314, 'test', 'test', 12345, '12', 2),
(7, 'Peter', 'p', 'p', '1111-11-11', '2222-10-10', 'p@gmail.com', '$2b$10$bQMExE9JwC8TnJ1KPAXKN.1QSYNdIpTRgs8mvo7Q2/HCwrOS1SVMK', 7.5000, 4, 'p', 'p', 12345, '123456789', 3),
(9, 'Elisa', 'M', 'Fuentes', '2021-04-07', '2021-05-04', 'a@gmail.co', '$2b$10$.UoU2qFjbeSuuc5nd3P.dO0KuSXrkRBd4XbcF5V6GB1IFxqi.SjzK', 34.0000, 101, 'dsf', 'Conroe', 77301, '2818547796', 2),
(10, 'Elisa', 'M', 'Fuentes', '2021-04-08', '2021-04-22', 'a@gmail.com', '$2b$10$36C4sYfI.p2Mus3HMShd2.QJj7Y./UfVGGvAitUctomjVlIflrl16', 44.0000, 101, 'd', 'Conroe', 77301, '2818547796', 2),
(14, 'Elisa', 'M', 'Fuentes', '2021-04-17', '2021-04-21', 'pa@gmail.com', '$2b$10$lFAVTnWhQrRxLGmNA5h9huV6jq9tQoavqYAAjRVLea0GS8B9GX9rC', 120000.0000, 1011, 'sdfsdfdsf', 'Conroe', 77301, '2818547796', 3),
(15, 'Kyle', 'W', 'Cunningham', '2021-04-25', '2021-04-14', 'k@gmail.com', '$2b$10$cZWYDoece5c9uXThpcdAXOcGCpVC5tvhAzSQIpqFn/FO0sSIV0vF2', 700.0000, 123, 'Street Lane', 'Houston', 12345, '123213123213', 3),
(17, 'cfgvhbj', 's', 'sdasd', '2021-04-24', '2021-04-06', 'asdasdasd', '$2b$10$scDciRw2NQ5eGM3pQIM.IeCC1GyGdiUxM./LdtSdIlO.6Gd1XxKXe', 12.0000, 3232, 'weqweqw', 'ewqew', 12, '132131', 2);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL,
  `total_cost` decimal(19,2) NOT NULL DEFAULT '0.00',
  `time_of_transaction` timestamp(6) NULL DEFAULT NULL,
  `order_status` varchar(45) DEFAULT 'cart',
  `payment_id_fk` int(11) DEFAULT NULL,
  `customer_id_fk` int(10) UNSIGNED NOT NULL,
  `store_id_fk` int(11) DEFAULT NULL,
  `total_cost_after_tax` decimal(19,2) DEFAULT NULL,
  `total_manufacture_cost` decimal(19,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `total_cost`, `time_of_transaction`, `order_status`, `payment_id_fk`, `customer_id_fk`, `store_id_fk`, `total_cost_after_tax`, `total_manufacture_cost`) VALUES
(17, '5240.98', '2021-04-15 18:15:13.000000', 'in transit', 4, 50, 2, '5673.36', '3954.93'),
(18, '1199.98', '2021-04-15 18:22:25.000000', 'purchased', 4, 50, 2, '1298.98', '799.98'),
(20, '9999.85', '2021-04-15 18:23:31.000000', 'purchased', 4, 50, 2, '10824.84', '7499.85'),
(21, '7299.88', '2021-04-15 18:31:48.000000', 'purchased', 4, 50, 2, '3030.94', '5202.68'),
(22, '3249.95', '2021-04-15 18:35:18.000000', 'purchased', 4, 50, 2, '3518.07', '2499.95'),
(23, '4099.90', '2021-04-15 18:36:03.000000', 'purchased', 4, 50, 2, '4438.14', '3405.50'),
(24, '119.94', '2021-04-16 01:28:31.000000', 'purchased', 4, 50, 2, '129.84', '83.94'),
(25, '23.96', '2021-04-16 01:30:00.000000', 'purchased', 4, 50, 2, '25.94', '11.96'),
(26, '111.96', '2021-04-16 01:42:00.000000', 'purchased', 4, 50, 2, '121.20', '63.96'),
(33, '2.24', '2021-04-19 20:34:00.000000', 'purchased', 4, 50, 2, '3.24', '0.75'),
(34, '10.62', NULL, 'cart', NULL, 58, 3, NULL, '2.25'),
(35, '69.93', NULL, 'cart', NULL, 59, 3, NULL, '34.93'),
(36, '1088.75', '2021-04-16 16:43:00.000000', 'purchased', 5, 60, 4, '1178.57', '748.78'),
(38, '2716.43', '2021-04-18 02:24:00.000000', 'purchased', 17, 60, 4, '2940.91', '2110.80'),
(39, '0.00', NULL, 'cart', NULL, 63, 2, NULL, NULL),
(41, '39.96', '2021-04-16 19:41:00.000000', 'purchased', 5, 64, 3, '43.26', '19.96'),
(42, '0.00', NULL, 'cart', NULL, 64, 3, NULL, NULL),
(43, '1523.98', '2021-04-12 20:04:00.000000', 'purchased', 5, 65, 4, '1649.71', '1002.98'),
(44, '0.00', NULL, 'cart', NULL, 65, 4, NULL, NULL),
(45, '0.00', NULL, 'cart', NULL, 66, 3, NULL, NULL),
(47, '2399.97', '2021-04-18 01:10:00.000000', 'purchased', 16, 62, 3, '2597.97', '1352.97'),
(48, '2999.95', '2021-04-19 00:22:00.000000', 'purchased', 18, 62, 3, '3247.45', '2254.95'),
(49, '184.93', '2021-04-24 19:07:00.000000', 'purchased', 17, 60, 2, '200.19', '82.41'),
(50, '699.99', '2021-04-19 01:48:00.000000', 'purchased', 18, 62, 3, '757.74', '451.43'),
(51, '37.43', '2021-04-25 23:56:00.000000', 'purchased', 18, 62, 3, '40.51', '7.70'),
(52, '639.95', '2021-04-19 13:14:00.000000', 'purchased', 21, 67, 3, '692.75', '470.95'),
(53, '0.00', NULL, 'cart', NULL, 67, 2, NULL, NULL),
(54, '639.95', '2021-04-19 14:54:00.000000', 'purchased', 22, 68, 3, '692.75', '470.95'),
(55, '11.97', '2021-04-19 21:51:00.000000', 'purchased', 22, 68, 3, '12.96', '2.25'),
(56, '1599.98', NULL, 'cart', NULL, 50, 2, NULL, NULL),
(57, '639.95', '2021-04-19 20:47:00.000000', 'purchased', 23, 69, 3, '692.75', '470.95'),
(58, '0.00', NULL, 'cart', NULL, 69, 3, NULL, NULL),
(59, '11.97', '2021-04-19 21:52:00.000000', 'purchased', 22, 68, 3, '12.96', '2.25'),
(60, '200.00', '2021-04-19 21:53:00.000000', 'purchased', 22, 68, 3, '216.50', '102.88'),
(61, '400.00', '2021-04-19 21:55:00.000000', 'purchased', 22, 68, 3, '433.00', '205.76'),
(62, '15.70', '2021-04-25 15:37:00.000000', 'purchased', 22, 68, 3, '22.66', '5.25'),
(63, '619.97', '2021-04-19 23:15:00.000000', 'purchased', 25, 70, 3, '671.12', '460.97'),
(64, '0.00', NULL, 'cart', NULL, 70, 3, NULL, NULL),
(65, '184.93', '2021-04-24 19:18:00.000000', 'purchased', 17, 60, 4, '200.19', '82.41'),
(66, '24.95', '2021-04-24 19:19:00.000000', 'purchased', 17, 60, 4, '27.01', '3.75'),
(67, '44.91', '2021-04-24 19:46:00.000000', 'purchased', 17, 60, 4, '48.62', '6.75'),
(68, '9.98', '2021-04-24 19:47:00.000000', 'purchased', 17, 60, 4, '10.80', '1.50'),
(69, '29.94', '2021-04-24 19:54:00.000000', 'purchased', 17, 60, 4, '32.41', '4.50'),
(70, '49.90', '2021-04-24 20:01:00.000000', 'purchased', 17, 60, 4, '54.02', '7.50'),
(71, '29.94', '2021-04-24 20:03:00.000000', 'purchased', 17, 60, 4, '32.41', '4.50'),
(72, '7.49', '2021-04-25 17:42:00.000000', 'purchased', 17, 60, 4, '10.80', '1.54'),
(73, '0.00', NULL, 'cart', NULL, 71, 3, NULL, NULL),
(74, '0.00', NULL, 'cart', NULL, 72, 2, NULL, NULL),
(75, '0.00', NULL, 'cart', NULL, 73, 3, NULL, NULL),
(76, '35.92', '2021-04-25 16:19:00.000000', 'purchased', 22, 68, 3, '38.88', '9.40'),
(77, '0.00', NULL, 'cart', NULL, 68, 3, NULL, NULL),
(78, '7.49', '2021-04-25 17:48:00.000000', 'purchased', 27, 60, 4, '8.10', '1.54'),
(79, '11.23', NULL, 'cart', NULL, 60, 4, NULL, NULL),
(80, '324.48', '2021-04-25 18:31:00.000000', 'purchased', 31, 74, 3, '351.22', '96.10'),
(81, '0.00', NULL, 'cart', NULL, 74, 3, NULL, NULL),
(82, '0.00', NULL, 'cart', NULL, 62, 3, NULL, NULL);

--
-- Triggers `invoice`
--
DELIMITER $$
CREATE TRIGGER `TransferStoreStock` AFTER UPDATE ON `invoice` FOR EACH ROW UPDATE
    store_has_item, invoice,invoice_item
SET
    store_has_item.quantity = store_has_item.quantity - invoice_item.quantity

    WHERE 
new.order_status = 'purchased' and 
old.order_status = 'cart' and
invoice_item.item_id_fk = store_has_item.item_id and
new.store_id_fk = store_has_item.store_id AND
invoice_item.invoice_id_fk = new.invoice_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_item`
--

CREATE TABLE `invoice_item` (
  `invoice_item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_cost` decimal(19,2) NOT NULL DEFAULT '0.00',
  `is_discounted` tinyint(4) DEFAULT '0',
  `item_id_fk` int(11) NOT NULL,
  `invoice_id_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invoice_item`
--

INSERT INTO `invoice_item` (`invoice_item_id`, `quantity`, `total_cost`, `is_discounted`, `item_id_fk`, `invoice_id_fk`) VALUES
(64, 2, '1199.98', 0, 33, 17),
(65, 9, '4041.00', 0, 25, 17),
(66, 2, '1199.98', 0, 33, 18),
(67, 5, '3499.95', 0, 38, 20),
(68, 10, '6499.90', 0, 28, 20),
(69, 5, '2049.95', 0, 27, 21),
(70, 1, '749.99', 0, 30, 21),
(71, 1, '749.99', 0, 30, 21),
(72, 5, '3749.95', 0, 30, 21),
(73, 5, '3249.95', 0, 28, 22),
(74, 10, '4099.90', 0, 27, 23),
(75, 6, '119.94', 0, 29, 24),
(76, 4, '23.96', 0, 34, 25),
(77, 4, '111.96', 0, 32, 26),
(86, 3, '10.62', 0, 22, 34),
(88, 7, '69.93', 0, 12, 35),
(89, 8, '199.92', 0, 41, 36),
(91, 3, '74.97', 0, 41, 36),
(92, 6, '149.94', 0, 41, 36),
(93, 3, '23.97', 0, 9, 36),
(99, 4, '39.96', 0, 12, 36),
(100, 1, '599.99', 0, 6, 36),
(101, 4, '39.96', 0, 12, 41),
(103, 2, '1499.98', 0, 30, 43),
(104, 4, '24.00', 0, 1, 43),
(105, 6, '2694.00', 0, 25, 38),
(106, 10, '22.43', 0, 5, 38),
(109, 3, '2399.97', 0, 3, 47),
(110, 5, '2999.95', 0, 6, 48),
(112, 1, '599.99', 0, 33, 50),
(113, 2, '100.00', 0, 2, 50),
(122, 4, '39.96', 0, 12, 52),
(123, 1, '599.99', 0, 6, 52),
(125, 4, '39.96', 0, 12, 54),
(126, 1, '599.99', 0, 6, 54),
(128, 1, '2.24', 0, 5, 33),
(129, 4, '39.96', 0, 12, 57),
(130, 1, '599.99', 0, 6, 57),
(132, 3, '11.97', 0, 1, 55),
(133, 3, '11.97', 0, 1, 59),
(134, 4, '200.00', 0, 2, 60),
(135, 8, '400.00', 0, 2, 61),
(136, 2, '19.98', 0, 12, 63),
(137, 1, '599.99', 0, 6, 63),
(139, 2, '1599.98', 0, 3, 56),
(140, 7, '34.93', 0, 1, 49),
(141, 3, '150.00', 0, 2, 49),
(142, 7, '34.93', 0, 1, 65),
(143, 3, '150.00', 0, 2, 65),
(144, 5, '24.95', 0, 1, 66),
(145, 9, '44.91', 0, 1, 67),
(146, 2, '9.98', 0, 1, 68),
(147, 6, '29.94', 0, 1, 69),
(148, 10, '49.90', 0, 1, 70),
(149, 6, '29.94', 0, 1, 71),
(150, 7, '15.70', 0, 5, 62),
(152, 4, '31.96', 0, 9, 76),
(153, 4, '3.96', 0, 20, 76),
(154, 2, '7.49', 0, 1, 72),
(155, 2, '7.49', 0, 1, 78),
(156, 10, '37.43', 0, 1, 80),
(157, 10, '99.90', 0, 12, 80),
(158, 10, '37.43', 0, 1, 80),
(159, 10, '37.43', 0, 1, 80),
(160, 10, '37.43', 0, 1, 80),
(161, 10, '37.43', 0, 1, 80),
(162, 10, '37.43', 0, 1, 80),
(163, 3, '11.23', 0, 1, 79),
(164, 10, '37.43', 0, 1, 51);

--
-- Triggers `invoice_item`
--
DELIMITER $$
CREATE TRIGGER `UpdateInvoiceTotalFromInsert` AFTER INSERT ON `invoice_item` FOR EACH ROW UPDATE invoice
SET
    invoice.total_cost = invoice.total_cost + new.total_cost
    WHERE new.invoice_id_fk = invoice.invoice_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UpdateInvoiceTotalFromUpdate` AFTER UPDATE ON `invoice_item` FOR EACH ROW UPDATE invoice
SET
    invoice.total_cost = invoice.total_cost + new.total_cost - old.total_cost
    WHERE new.invoice_id_fk = invoice.invoice_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `invoice_itemTotalInsertedQuantity` BEFORE INSERT ON `invoice_item` FOR EACH ROW UPDATE item
SET
    new.total_cost = new.quantity * item.selling_price * (1 - item.discount)
    WHERE new.item_id_fk = item.item_id
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `invoice_itemTotalUpdatedQuantity` BEFORE UPDATE ON `invoice_item` FOR EACH ROW SET
    new.total_cost = new.quantity * (SELECT selling_price from item  WHERE new.item_id_fk = item.item_id) * (1 - (SELECT discount from item WHERE new.item_id_fk = item.item_id))
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `manufacture_cost` decimal(19,2) NOT NULL,
  `selling_price` decimal(19,2) NOT NULL,
  `category` varchar(45) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `discount` decimal(3,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This table holds all item information';

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `name`, `manufacture_cost`, `selling_price`, `category`, `brand`, `discount`) VALUES
(1, 'Eggs', '0.77', '4.99', 'Groceries', 'Chick Farms', '0.25'),
(2, 'Sports Jacket', '25.72', '50.00', 'Clothing', 'Nike', '0.00'),
(3, 'Flat Screen TV', '450.99', '799.99', 'Electronics', 'Sony', '0.50'),
(5, 'Milk', '0.75', '2.99', 'Groceries', 'Farm Raised', '0.25'),
(6, 'Iphone 6', '450.99', '599.99', 'Electronics', 'Apple', '0.00'),
(7, 'Dog Food', '9.99', '19.99', 'Pets', 'Dog Mate', '0.00'),
(8, 'Lego Death Star', '25.99', '49.99', 'Toys and Games', 'Lego', '0.00'),
(9, 'Yogurt', '2.00', '7.99', 'Groceries', 'Yoplait', '0.00'),
(10, 'Nike Air', '30.00', '50.00', 'Clothing', 'Nike', '0.00'),
(11, 'T-Shirt', '14.99', '19.99', 'Clothing', 'Hollister', '0.00'),
(12, 'Orange Juice', '4.99', '9.99', 'Groceries', 'Nature Valley', '0.00'),
(13, 'Cargo Shorts', '20.22', '26.99', 'Clothing', 'Gap', '0.00'),
(14, 'Coffee', '9.99', '14.99', 'Groceries', 'Folgers', '0.00'),
(15, 'Socks', '5.95', '8.99', 'Clothing', 'Nike', '0.00'),
(16, 'Dress Shirt', '22.53', '29.99', 'Clothing', 'Banana Republic', '0.00'),
(17, 'Bread', '0.75', '2.87', 'Groceries', 'Sara Lee', '0.00'),
(18, 'Pajamas', '15.42', '19.99', 'Clothing', 'Banana Republic', '0.00'),
(19, 'Shorts', '22.76', '26.99', 'Clothing', 'Adidas', '0.00'),
(20, 'Potato Chips', '0.35', '0.99', 'Groceries', 'Lays', '0.00'),
(21, 'Sweatpants', '25.83', '29.99', 'Clothing', 'Adidas', '0.00'),
(22, 'Butter', '0.75', '3.54', 'Groceries', 'Land O\' Lakes', '0.00'),
(23, 'Hoodie', '15.22', '17.99', 'Clothing', 'Hollister', '0.00'),
(24, 'Flour', '3.99', '5.99', 'Groceries', 'King Arthur', '0.00'),
(25, 'Xbox One', '350.55', '449.00', 'Electronics', 'Microsoft', '0.00'),
(26, 'Snickers Candy', '0.33', '0.99', 'Groceries', 'Snickers', '0.00'),
(27, 'Playstation 4', '340.55', '409.99', 'Electronics', 'Sony', '0.00'),
(28, 'Ipad', '499.99', '649.99', 'Electronics', 'Apple', '0.00'),
(29, 'Dog Toy', '13.99', '19.99', 'Pets', 'Kong', '0.00'),
(30, 'MacBook', '499.99', '749.99', 'Electronics', 'Apple', '0.00'),
(31, 'Dog Crate', '45.99', '69.99', 'Pets', 'Top Paw', '0.00'),
(32, 'Cat Carrier', '15.99', '27.99', 'Pets', 'Top Paw', '0.00'),
(33, 'Desktop', '399.99', '599.99', 'Electronics', 'Dell', '0.00'),
(34, 'Dog Bowl', '2.99', '5.99', 'Pets', 'Top Paw', '0.00'),
(35, 'PSP', '140.53', '199.99', 'Electronics', 'Sony', '0.00'),
(36, 'Litter Box', '13.99', '19.99', 'Pets', 'PetSafe', '0.00'),
(37, 'Laptop', '340.24', '424.99', 'Electronics', 'Dell', '0.00'),
(38, 'Windows Phone', '499.99', '699.99', 'Electronics', 'Microsoft', '0.00'),
(39, 'Nerf Shotgun', '29.91', '39.99', 'Toys and Games', 'Nerf', '0.00'),
(40, 'Jigsaw Puzzle', '5.92', '9.99', 'Toys and Games', 'Ravensburger', '0.00'),
(41, 'Batman Action Figure', '15.99', '24.99', 'Toys and Games', 'Hasbro', '0.00'),
(42, 'Nerf Rifle', '20.43', '29.99', 'Toys and Games', 'Nerf', '0.00'),
(43, 'Nerf Pistol', '12.52', '19.99', 'Toys and Games', 'Nerf', '0.00'),
(44, 'Optimus Prime Action Figure', '20.32', '29.99', 'Toys and Games', 'Hasbro', '0.00'),
(45, 'Monopoly', '11.43', '24.99', 'Toys and Games', 'Hasbro', '0.00'),
(46, 'Elsa Doll', '6.42', '14.99', 'Toys and Games', 'Hasbro', '0.00'),
(47, 'Dog Leash', '3.99', '7.99', 'Pets', 'Top Paw', '0.00'),
(48, 'Minecraft Figurine', '5.99', '11.99', 'Toys and Games', 'Mattel', '0.00'),
(49, 'Dog Tug Of War Toy', '6.99', '9.99', 'Pets', 'Kong ', '0.00'),
(50, 'Dog Treats', '14.99', '19.99', 'Pets', 'Royal Canin', '0.00'),
(51, 'Shampoo', '2.32', '7.99', 'Miscellaneous', 'Dove', '0.00'),
(52, 'Scratching Post', '29.99', '39.99', 'Pets', 'Royal Canin', '0.00'),
(53, 'Conditioner', '2.34', '9.99', 'Miscellaneous', 'Dove', '0.00'),
(54, 'Shaving Razor', '10.21', '24.99', 'Miscellaneous', 'Gillette', '0.00'),
(55, 'Wooden Pencils 12-Pack', '0.40', '2.99', 'Miscellaneous', 'Ticonderoga', '0.00'),
(56, 'Mechanical Pencils 24-Pack', '2.49', '5.99', 'Miscellaneous', 'BIC', '0.00'),
(57, 'Pilot G2 Pens 2-Pack (Black)', '0.30', '2.82', 'Miscellaneous', 'Pilot', '0.00'),
(58, 'Printer Paper (500 Sheets)', '4.00', '19.99', 'Miscellaneous', 'HP', '0.00'),
(59, 'Portable Electric Fan', '10.45', '21.99', 'Miscellaneous', 'Honeywell', '0.00'),
(60, 'Wallet', '20.21', '49.99', 'Miscellaneous', 'Fossil', '0.00'),
(61, 'Assure Office Chair', '140.43', '299.99', 'Miscellaneous', 'Haworth', '0.00'),
(62, 'Oranges', '0.75', '11.00', 'Groceries', 'Chick Farms', '0.00'),
(63, 'Apple Juice', '0.75', '4.99', 'Groceries', 'Farm Raised', '0.00'),
(64, 'Sport T Shirt', '5.00', '15.00', 'Clothing', 'Walmart Clothes', '0.01'),
(65, 'Lamp 2 ', '5.00', '50.00', 'Electronics', 'Light Up Your Life', '0.01'),
(66, 'new bread', '0.75', '3.99', 'groceries', 'baker\'s dozen', '0.90'),
(67, 'new eggs', '3.99', '6.99', 'farm raised', 'grocerice', '0.75'),
(68, 'New item', '2.99', '9.99', 'Groceries', 'Brand', '0.76'),
(69, 'New Item', '0.33', '9.99', 'Electronics', 'New', '0.00'),
(70, 'New', '0.30', '3.99', 'Added', 'Item', '0.50'),
(71, 'Other', '0.50', '0.50', 'Item', 'New', '0.40');

--
-- Triggers `item`
--
DELIMITER $$
CREATE TRIGGER `populateStore` AFTER INSERT ON `item` FOR EACH ROW INSERT INTO store_has_item (item_id,store_id)
SELECT item.item_id ,store.store_id FROM store join item
WHERE NOT EXISTS (SELECT *  FROM store_has_item
                  WHERE item_id = item.item_id 
                  AND store_id = store.store_id)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `populateWarehouse` AFTER INSERT ON `item` FOR EACH ROW INSERT INTO warehouse_has_item (item_id,warehouse_id)
SELECT item.item_id ,warehouse.warehouse_id FROM warehouse join item
WHERE NOT EXISTS (SELECT *  FROM warehouse_has_item
                  WHERE item_id = item.item_id 
                  AND warehouse_id = warehouse.warehouse_id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `address` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This table holds all location information';

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `address`, `city`) VALUES
(1, '25233 Wuiwe', 'Houston'),
(2, '123 place dr', 'Austin'),
(3, '481 Echo Lane', 'Houston');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `card_number` bigint(16) DEFAULT NULL,
  `expiration_month` int(11) DEFAULT NULL,
  `expiration_year` int(11) DEFAULT NULL,
  `security_code` int(11) DEFAULT NULL,
  `customer_id_fk` int(10) UNSIGNED DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This table holds all payment information';

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `card_number`, `expiration_month`, `expiration_year`, `security_code`, `customer_id_fk`, `is_deleted`) VALUES
(4, 1111111111111111, 12, 2023, 111, 50, 0),
(5, 38473849283564, 12, 2023, 111, 65, 0),
(15, 123456, 123, 123, 123, 62, 1),
(16, 1234, 123, 123, 123, 62, 1),
(17, 11121321321312, 4, 2021, 111, 60, 0),
(18, 1223454676587, 23, 455, 234, 62, 0),
(19, 423, 4, 4, 4, 62, 1),
(20, 123456789, 12, 2020, 112, 27, 0),
(21, 1234567891, 12, 2021, 112, 67, 0),
(22, 123432452, 12, 2021, 112, 68, 0),
(23, 123456321, 12, 2023, 112, 69, 0),
(24, 1221421423, 9, 2021, 112, 69, 1),
(25, 1234567890, 8, 2021, 112, 70, 0),
(26, 9999999999, 8, 2022, 111, 70, 1),
(27, 1235476862134, 12, 2022, 111, 60, 0),
(28, 1235476862134, 12, 2022, 111, 60, 0),
(29, 3123112312321312, 2, 1234, 111, 60, 0),
(30, 121221334232, 12, 1234, 111, 74, 1),
(31, 124324532423, 12, 1212, 111, 74, 0);

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `store_id` int(11) NOT NULL,
  `store_name` varchar(50) DEFAULT NULL,
  `location_location_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This table holds all store information';

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`store_id`, `store_name`, `location_location_id`) VALUES
(2, 'Amazon', 1),
(3, 'Walmart', 3),
(4, 'Ikea', 1);

-- --------------------------------------------------------

--
-- Table structure for table `store_has_item`
--

CREATE TABLE `store_has_item` (
  `store_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '50'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `store_has_item`
--

INSERT INTO `store_has_item` (`store_id`, `item_id`, `quantity`) VALUES
(2, 1, 50),
(2, 2, 0),
(2, 3, 50),
(2, 5, 0),
(2, 6, 50),
(2, 7, 30),
(2, 8, 0),
(2, 9, 50),
(2, 10, 50),
(2, 11, 44),
(2, 12, 48),
(2, 13, 50),
(2, 14, 50),
(2, 15, 50),
(2, 16, 40),
(2, 17, 50),
(2, 18, 50),
(2, 19, 50),
(2, 20, 50),
(2, 21, 50),
(2, 22, 50),
(2, 23, 50),
(2, 24, 50),
(2, 25, 46),
(2, 26, 50),
(2, 27, 50),
(2, 28, 45),
(2, 29, 49),
(2, 30, 50),
(2, 31, 26),
(2, 32, 50),
(2, 33, 50),
(2, 34, 50),
(2, 35, 48),
(2, 36, 50),
(2, 37, 50),
(2, 38, 50),
(2, 39, 50),
(2, 40, 50),
(2, 41, 47),
(2, 42, 50),
(2, 43, 50),
(2, 44, 50),
(2, 45, 49),
(2, 46, 50),
(2, 47, 28),
(2, 48, 50),
(2, 49, 50),
(2, 50, 20),
(2, 51, 50),
(2, 52, 46),
(2, 53, 50),
(2, 54, 50),
(2, 55, 50),
(2, 56, 50),
(2, 57, 50),
(2, 58, 50),
(2, 59, 50),
(2, 60, 50),
(2, 61, 50),
(2, 62, 50),
(2, 63, 50),
(2, 64, 50),
(2, 65, 50),
(2, 66, 50),
(2, 67, 50),
(2, 68, 50),
(2, 69, 50),
(2, 70, 50),
(2, 71, 50),
(3, 1, 30),
(3, 2, 0),
(3, 3, 46),
(3, 5, 0),
(3, 6, 50),
(3, 7, 20),
(3, 8, 0),
(3, 9, 42),
(3, 10, 50),
(3, 11, 50),
(3, 12, 24),
(3, 13, 50),
(3, 14, 50),
(3, 15, 50),
(3, 16, 50),
(3, 17, 50),
(3, 18, 50),
(3, 19, 50),
(3, 20, 46),
(3, 21, 50),
(3, 22, 46),
(3, 23, 50),
(3, 24, 50),
(3, 25, 28),
(3, 26, 50),
(3, 27, 40),
(3, 28, 25),
(3, 29, 37),
(3, 30, 50),
(3, 31, 26),
(3, 32, 43),
(3, 33, 49),
(3, 34, 43),
(3, 35, 50),
(3, 36, 50),
(3, 37, 50),
(3, 38, 40),
(3, 39, 50),
(3, 40, 50),
(3, 41, 31),
(3, 42, 50),
(3, 43, 50),
(3, 44, 50),
(3, 45, 49),
(3, 46, 50),
(3, 47, 28),
(3, 48, 50),
(3, 49, 50),
(3, 50, 20),
(3, 51, 50),
(3, 52, 46),
(3, 53, 50),
(3, 54, 50),
(3, 55, 50),
(3, 56, 50),
(3, 57, 50),
(3, 58, 50),
(3, 59, 50),
(3, 60, 50),
(3, 61, 50),
(3, 62, 50),
(3, 63, 50),
(3, 64, 50),
(3, 65, 50),
(3, 66, 50),
(3, 67, 50),
(3, 68, 50),
(3, 69, 50),
(3, 70, 50),
(3, 71, 50),
(4, 1, 40),
(4, 2, 0),
(4, 3, 50),
(4, 5, 0),
(4, 6, 50),
(4, 7, 20),
(4, 8, 0),
(4, 9, 50),
(4, 10, 50),
(4, 11, 50),
(4, 12, 50),
(4, 13, 50),
(4, 14, 50),
(4, 15, 50),
(4, 16, 50),
(4, 17, 50),
(4, 18, 50),
(4, 19, 50),
(4, 20, 50),
(4, 21, 50),
(4, 22, 50),
(4, 23, 50),
(4, 24, 50),
(4, 25, 50),
(4, 26, 50),
(4, 27, 50),
(4, 28, 50),
(4, 29, 50),
(4, 30, 50),
(4, 31, 38),
(4, 32, 50),
(4, 33, 50),
(4, 34, 50),
(4, 35, 50),
(4, 36, 50),
(4, 37, 50),
(4, 38, 50),
(4, 39, 50),
(4, 40, 50),
(4, 41, 50),
(4, 42, 50),
(4, 43, 50),
(4, 44, 50),
(4, 45, 49),
(4, 46, 50),
(4, 47, 38),
(4, 48, 50),
(4, 49, 50),
(4, 50, 32),
(4, 51, 50),
(4, 52, 50),
(4, 53, 50),
(4, 54, 50),
(4, 55, 50),
(4, 56, 50),
(4, 57, 50),
(4, 58, 50),
(4, 59, 50),
(4, 60, 50),
(4, 61, 50),
(4, 62, 50),
(4, 63, 50),
(4, 64, 50),
(4, 65, 50),
(4, 66, 50),
(4, 67, 50),
(4, 68, 50),
(4, 69, 50),
(4, 70, 50),
(4, 71, 50);

-- --------------------------------------------------------

--
-- Table structure for table `warehouse`
--

CREATE TABLE `warehouse` (
  `warehouse_id` int(11) NOT NULL,
  `warehouse_name` varchar(50) DEFAULT NULL,
  `location_location_id` int(11) NOT NULL,
  `store_store_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This table holds all warehouse information';

--
-- Dumping data for table `warehouse`
--

INSERT INTO `warehouse` (`warehouse_id`, `warehouse_name`, `location_location_id`, `store_store_id`) VALUES
(2, 'Amazon Warehouse', 2, 2),
(3, 'Walmart Warehouse', 3, 3),
(4, 'Ikea Warehouse', 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `warehouse_has_item`
--

CREATE TABLE `warehouse_has_item` (
  `warehouse_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `warehouse_has_item`
--

INSERT INTO `warehouse_has_item` (`warehouse_id`, `item_id`, `quantity`) VALUES
(2, 1, 950),
(2, 2, 0),
(2, 3, 1000),
(2, 5, 0),
(2, 6, 1000),
(2, 7, 1000),
(2, 8, 0),
(2, 9, 1000),
(2, 10, 600),
(2, 11, 1000),
(2, 12, 1000),
(2, 13, 600),
(2, 14, 1000),
(2, 15, 1000),
(2, 16, 1000),
(2, 17, 1000),
(2, 18, 1000),
(2, 19, 1000),
(2, 20, 1000),
(2, 21, 1000),
(2, 22, 1000),
(2, 23, 1000),
(2, 24, 1000),
(2, 25, 1000),
(2, 26, 1000),
(2, 27, 1000),
(2, 28, 1000),
(2, 29, 1000),
(2, 30, 1000),
(2, 31, 1000),
(2, 32, 1000),
(2, 33, 1000),
(2, 34, 1000),
(2, 35, 1000),
(2, 36, 1000),
(2, 37, 1000),
(2, 38, 1000),
(2, 39, 1000),
(2, 40, 1000),
(2, 41, 1000),
(2, 42, 1000),
(2, 43, 1000),
(2, 44, 1000),
(2, 45, 1000),
(2, 46, 1000),
(2, 47, 1000),
(2, 48, 1000),
(2, 49, 1000),
(2, 50, 1000),
(2, 51, 1000),
(2, 52, 1000),
(2, 53, 1000),
(2, 54, 1000),
(2, 55, 1000),
(2, 56, 1000),
(2, 57, 1000),
(2, 58, 1000),
(2, 59, 1000),
(2, 60, 1000),
(2, 61, 600),
(2, 62, 1000),
(2, 63, 1000),
(2, 64, 1000),
(2, 65, 1000),
(2, 66, 1000),
(2, 67, 1000),
(2, 68, 1000),
(2, 69, 1000),
(2, 70, 1000),
(2, 71, 1000),
(3, 1, 950),
(3, 2, 0),
(3, 3, 1000),
(3, 5, 0),
(3, 6, 1000),
(3, 7, 1000),
(3, 8, 0),
(3, 9, 1000),
(3, 10, 600),
(3, 11, 1000),
(3, 12, 1000),
(3, 13, 600),
(3, 14, 1000),
(3, 15, 1000),
(3, 16, 1000),
(3, 17, 1000),
(3, 18, 1000),
(3, 19, 1000),
(3, 20, 1000),
(3, 21, 1000),
(3, 22, 1000),
(3, 23, 1000),
(3, 24, 1000),
(3, 25, 1000),
(3, 26, 1000),
(3, 27, 1000),
(3, 28, 1000),
(3, 29, 1000),
(3, 30, 1000),
(3, 31, 1000),
(3, 32, 1000),
(3, 33, 1000),
(3, 34, 1000),
(3, 35, 1000),
(3, 36, 1000),
(3, 37, 1000),
(3, 38, 1000),
(3, 39, 1000),
(3, 40, 1000),
(3, 41, 1000),
(3, 42, 1000),
(3, 43, 1000),
(3, 44, 1000),
(3, 45, 1000),
(3, 46, 1000),
(3, 47, 1000),
(3, 48, 1000),
(3, 49, 1000),
(3, 50, 1000),
(3, 51, 1000),
(3, 52, 1000),
(3, 53, 1000),
(3, 54, 1000),
(3, 55, 1000),
(3, 56, 1000),
(3, 57, 1000),
(3, 58, 1000),
(3, 59, 1000),
(3, 60, 1000),
(3, 61, 600),
(3, 62, 1000),
(3, 63, 1000),
(3, 64, 1000),
(3, 65, 1000),
(3, 66, 1000),
(3, 67, 1000),
(3, 68, 1000),
(3, 69, 1000),
(3, 70, 1000),
(3, 71, 1000),
(4, 1, 950),
(4, 2, 0),
(4, 3, 1000),
(4, 5, 0),
(4, 6, 1000),
(4, 7, 1000),
(4, 8, 0),
(4, 9, 1000),
(4, 10, 600),
(4, 11, 1000),
(4, 12, 1000),
(4, 13, 600),
(4, 14, 1000),
(4, 15, 1000),
(4, 16, 1000),
(4, 17, 1000),
(4, 18, 1000),
(4, 19, 1000),
(4, 20, 1000),
(4, 21, 1000),
(4, 22, 1000),
(4, 23, 1000),
(4, 24, 1000),
(4, 25, 1000),
(4, 26, 1000),
(4, 27, 1000),
(4, 28, 1000),
(4, 29, 1000),
(4, 30, 1000),
(4, 31, 1000),
(4, 32, 1000),
(4, 33, 1000),
(4, 34, 1000),
(4, 35, 1000),
(4, 36, 1000),
(4, 37, 1000),
(4, 38, 1000),
(4, 39, 1000),
(4, 40, 1000),
(4, 41, 1000),
(4, 42, 1000),
(4, 43, 1000),
(4, 44, 1000),
(4, 45, 1000),
(4, 46, 1000),
(4, 47, 1000),
(4, 48, 1000),
(4, 49, 1000),
(4, 50, 1000),
(4, 51, 1000),
(4, 52, 1000),
(4, 53, 1000),
(4, 54, 1000),
(4, 55, 1000),
(4, 56, 1000),
(4, 57, 1000),
(4, 58, 1000),
(4, 59, 1000),
(4, 60, 1000),
(4, 61, 600),
(4, 62, 1000),
(4, 63, 1000),
(4, 64, 1000),
(4, 65, 1000),
(4, 66, 1000),
(4, 67, 1000),
(4, 68, 1000),
(4, 69, 1000),
(4, 70, 1000),
(4, 71, 1000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `custome_id_UNIQUE` (`customer_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_customer_store1` (`store_id_fk`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD UNIQUE KEY `employee_id_UNIQUE` (`employee_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_employee_store1_idx` (`store_store_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`),
  ADD UNIQUE KEY `invoice_id_UNIQUE` (`invoice_id`),
  ADD KEY `fk_invoice_payment1_idx` (`payment_id_fk`),
  ADD KEY `fk_invoice_customer1_idx` (`customer_id_fk`),
  ADD KEY `fk_store_id1` (`store_id_fk`);

--
-- Indexes for table `invoice_item`
--
ALTER TABLE `invoice_item`
  ADD PRIMARY KEY (`invoice_item_id`),
  ADD UNIQUE KEY `invoice_item_id_UNIQUE` (`invoice_item_id`),
  ADD KEY `fk_invoice_item_item1_idx` (`item_id_fk`),
  ADD KEY `fk_invoice_item_invoice1` (`invoice_id_fk`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`),
  ADD UNIQUE KEY `location_id_UNIQUE` (`location_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD UNIQUE KEY `payment_id_UNIQUE` (`payment_id`),
  ADD KEY `fk_customer_payment1` (`customer_id_fk`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`store_id`),
  ADD UNIQUE KEY `store_id_UNIQUE` (`store_id`),
  ADD KEY `fk_store_location1_idx` (`location_location_id`);

--
-- Indexes for table `store_has_item`
--
ALTER TABLE `store_has_item`
  ADD PRIMARY KEY (`store_id`,`item_id`),
  ADD KEY `fk_store_has_item_item1_idx` (`item_id`),
  ADD KEY `fk_store_has_item_store1_idx` (`store_id`);

--
-- Indexes for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD PRIMARY KEY (`warehouse_id`),
  ADD UNIQUE KEY `warehouse_id_UNIQUE` (`warehouse_id`),
  ADD KEY `fk_warehouse_location1_idx` (`location_location_id`),
  ADD KEY `fk_warehouse_store1_idx` (`store_store_id`);

--
-- Indexes for table `warehouse_has_item`
--
ALTER TABLE `warehouse_has_item`
  ADD PRIMARY KEY (`warehouse_id`,`item_id`),
  ADD KEY `fk_warehouse_has_item_item1_idx` (`item_id`),
  ADD KEY `fk_warehouse_has_item_warehouse1_idx` (`warehouse_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;
--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
--
-- AUTO_INCREMENT for table `invoice_item`
--
ALTER TABLE `invoice_item`
  MODIFY `invoice_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;
--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `store_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `warehouse`
--
ALTER TABLE `warehouse`
  MODIFY `warehouse_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `customer`
--
ALTER TABLE `customer`
  ADD CONSTRAINT `fk_customer_store1` FOREIGN KEY (`store_id_fk`) REFERENCES `store` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `fk_employee_store1` FOREIGN KEY (`store_store_id`) REFERENCES `store` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `fk_invoice_customer1` FOREIGN KEY (`customer_id_fk`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_invoice_payment1` FOREIGN KEY (`payment_id_fk`) REFERENCES `payment` (`payment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_store_id1` FOREIGN KEY (`store_id_fk`) REFERENCES `store` (`store_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice_item`
--
ALTER TABLE `invoice_item`
  ADD CONSTRAINT `fk_invoice_item_invoice1` FOREIGN KEY (`invoice_id_fk`) REFERENCES `invoice` (`invoice_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_invoice_item_item1` FOREIGN KEY (`item_id_fk`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_customer_payment1` FOREIGN KEY (`customer_id_fk`) REFERENCES `customer` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `store`
--
ALTER TABLE `store`
  ADD CONSTRAINT `fk_store_location1` FOREIGN KEY (`location_location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `store_has_item`
--
ALTER TABLE `store_has_item`
  ADD CONSTRAINT `fk_store_has_item_item1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_store_has_item_store1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `warehouse`
--
ALTER TABLE `warehouse`
  ADD CONSTRAINT `fk_warehouse_location1` FOREIGN KEY (`location_location_id`) REFERENCES `location` (`location_id`) ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_warehouse_store1` FOREIGN KEY (`store_store_id`) REFERENCES `store` (`store_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `warehouse_has_item`
--
ALTER TABLE `warehouse_has_item`
  ADD CONSTRAINT `fk_warehouse_has_item_warehouse1` FOREIGN KEY (`warehouse_id`) REFERENCES `warehouse` (`warehouse_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_warehouse_item1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
