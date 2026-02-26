DROP DATABASE IF EXISTS comparaya;
CREATE DATABASE comparaya;
USE comparaya;


CREATE TABLE `SUPERMERCADO` (
  `IdSupermercado` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `WebURL` varchar(255) NOT NULL,
  PRIMARY KEY (`IdSupermercado`)
);

CREATE TABLE `PRODUCTO` (
  `IdProducto` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `Categoria` varchar(255) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Unidad` varchar(255) NOT NULL,
  `Cantidad` decimal(10,2) NOT NULL,
  `ImagenURL` varchar(255) DEFAULT NULL,
  `ProductoBase` varchar(255) DEFAULT NULL,
  `CategoriaIA` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdProducto`)
);

CREATE TABLE `PRODUCTOS_JSON` (
  `Id` bigint NOT NULL,
  `NombreRaw` varchar(255) DEFAULT NULL,
  `Supermercado` varchar(255) DEFAULT NULL,
  `Precio` decimal(10,2) DEFAULT NULL,
  `PrecioPack` decimal(10,2) DEFAULT NULL,
  `Formato` varchar(255) DEFAULT NULL,
  `Url` text,
  `UrlImagen` text,
  `CategoriaId` varchar(255) DEFAULT NULL,
  `CategoriaNombre` varchar(255) DEFAULT NULL,
  `FetchedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `Normalizado` tinyint(1) DEFAULT '0',
  `MarcaIA` varchar(100) DEFAULT NULL,
  `NombreIA` varchar(255) DEFAULT NULL,
  `CategoriaIA` varchar(255) DEFAULT NULL,
  `ProductoBase` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
);

CREATE TABLE `LISTA_COMPRA` (
  `IdLista` int NOT NULL AUTO_INCREMENT,
  `IdUsuario` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `CreadoEn` datetime NOT NULL,
  PRIMARY KEY (`IdLista`)
);

CREATE TABLE `TELEGRAM_PERFIL` (
  `UidFirebase` varchar(255) NOT NULL,
  `ChatId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UidFirebase`)
);


CREATE TABLE `PRODUCTO_OFERTA` (
  `IdOferta` int NOT NULL AUTO_INCREMENT,
  `IdProducto` int NOT NULL,
  `IdSupermercado` int NOT NULL,
  `TituloOriginal` varchar(255) NOT NULL,
  `UrlProducto` varchar(500) DEFAULT NULL,
  `PrecioActual` decimal(10,2) NOT NULL,
  `PrecioUnidad` decimal(10,2) NOT NULL,
  PRIMARY KEY (`IdOferta`),
  FOREIGN KEY (`IdProducto`) REFERENCES `PRODUCTO` (`IdProducto`),
  FOREIGN KEY (`IdSupermercado`) REFERENCES `SUPERMERCADO` (`IdSupermercado`)
);

CREATE TABLE `ALERTA_PRECIO` (
  `IdAlerta` int NOT NULL AUTO_INCREMENT,
  `IdUsuario` varchar(255) NOT NULL,
  `IdProducto` int NOT NULL,
  `Tipo` enum('BAJADA','UMBRAL') NOT NULL,
  `Umbral` decimal(10,2) DEFAULT NULL,
  `Canal` enum('EMAIL','TELEGRAM') NOT NULL,
  `Activa` tinyint(1) NOT NULL,
  `CreadoEn` datetime NOT NULL,
  PRIMARY KEY (`IdAlerta`),
  FOREIGN KEY (`IdProducto`) REFERENCES `PRODUCTO` (`IdProducto`)
);

CREATE TABLE `ITEM_LISTA` (
  `IdItem` int NOT NULL AUTO_INCREMENT,
  `IdLista` int NOT NULL,
  `IdProducto` int NOT NULL,
  `Cantidad` decimal(10,2) NOT NULL,
  `Observaciones` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdItem`),
  FOREIGN KEY (`IdLista`) REFERENCES `LISTA_COMPRA` (`IdLista`),
  FOREIGN KEY (`IdProducto`) REFERENCES `PRODUCTO` (`IdProducto`)
);


INSERT INTO `SUPERMERCADO` (`IdSupermercado`, `Nombre`, `WebURL`) VALUES
(1, 'Mercadona', 'https://tienda.mercadona.es'),
(2, 'DIA', 'https://www.dia.es');

INSERT INTO `PRODUCTO` (`IdProducto`, `Nombre`, `Categoria`, `Marca`, `Unidad`, `Cantidad`, `ImagenURL`, `ProductoBase`, `CategoriaIA`) VALUES
(47101, 'Kiwi', 'L2039', 'Dia', 'KILO', 4.89, 'https://www.dia.es/product_images/78/78_ISO_0_ES.jpg', 'Kiwi', 'Fruta'),
(47102, 'Mandarina', 'L2196', 'Dia', 'KILO', 2.49, 'https://www.dia.es/product_images/84/84_ISO_0_ES.jpg', 'Mandarina', 'Fruta'),
(47103, 'Chirimoya', 'L2040', 'Dia', 'KILO', 3.49, 'https://www.dia.es/product_images/87/87_ISO_0_ES.jpg', 'Chirimoya', 'Fruta'),
(47104, 'Manzana reineta', 'L2032', 'Dia', 'KILO', 2.69, 'https://www.dia.es/product_images/91/91_ISO_0_ES.jpg', 'Manzana reineta', 'Fruta'),
(47111, 'Tomate en rama', 'L2023', 'Dia', 'KILO', 2.19, 'https://www.dia.es/product_images/109/109_ISO_0_ES.jpg', 'Tomate en rama', 'Verdura'),
(47112, 'Tomate ensalada', 'L2023', 'Dia', 'KILO', 2.19, 'https://www.dia.es/product_images/110/110_ISO_0_ES.jpg', 'Tomate ensalada', 'Verdura'),
(47113, 'Pimiento verde', 'L2023', 'Dia', 'KILO', 2.49, 'https://www.dia.es/product_images/116/116_ISO_0_ES.jpg', 'Pimiento verde', 'Verdura'),
(47116, 'Alubias blancas', 'L2178', 'Vegecampo', 'KILO', 2.45, 'https://www.dia.es/product_images/154/154_ISO_0_ES.jpg', 'Alubias blancas', 'Verdura'),
(47182, 'Salchichas cocidas classic', 'L2206', 'Oscar Mayer', 'KILO', 7.29, 'https://www.dia.es/product_images/1306/1306_ISO_0_ES.jpg', 'Salchichas cocidas', 'Carne'),
(47185, 'Botifarrón de carne', '43', 'Mercadona', 'kg', 7.50, 'https://prod-mercadona.imgix.net/images/6a1c6347f95614106a4f88f1e1ebaa45.jpg?fit=crop&h=300&w=300', 'Botifarrón de carne', 'Carne'),
(47193, 'Costilla de cerdo ibérico adobada', '45', 'Mercadona', 'kg', 7.55, 'https://prod-mercadona.imgix.net/images/af452ee749d0981858f5bfd393dccf15.jpg?fit=crop&h=300&w=300', 'Costilla de cerdo ibérico', 'Carne'),
(47203, 'Hueso blanco de cerdo salado', '46', 'Mercadona', 'kg', 5.40, 'https://prod-mercadona.imgix.net/images/a130e788eeb23455464b28c63c6210c6.jpg?fit=crop&h=300&w=300', 'Hueso blanco de cerdo', 'Carne'),
(47296, 'Palitos de surimi ultracongelados', 'L2132', 'Dia', 'KILO', 4.18, 'https://www.dia.es/product_images/3374/3374_ISO_0_ES.jpg', 'Palitos de surimi', 'Pescado'),
(47362, 'Filetes de bacalao', 'L2234', 'Mari Marinera', 'KILO', 17.47, 'https://www.dia.es/product_images/4542/4542_ISO_0_ES.jpg', 'Filetes de bacalao', 'Pescado'),
(47986, 'Mojama de atún', '36', 'Hacendado', 'kg', 70.00, 'https://prod-mercadona.imgix.net/images/0b4dc75f5bfef8a4c412c43bb7391441.jpg?fit=crop&h=300&w=300', 'Mojama de atún', 'Pescado'),
(48264, 'Bacalao ahumado en aceite', '36', 'Hacendado', 'kg', 31.36, 'https://prod-mercadona.imgix.net/images/53bcdc01a58152e992e00eab74f3ad2f.jpg?fit=crop&h=300&w=300', 'Bacalao ahumado', 'Pescado');

INSERT INTO `PRODUCTO_OFERTA` (`IdOferta`, `IdProducto`, `IdSupermercado`, `TituloOriginal`, `UrlProducto`, `PrecioActual`, `PrecioUnidad`) VALUES
(7, 47101, 2, 'Kiwi DIA', 'https://www.dia.es/ejemplo', 4.89, 4.89),
(8, 47102, 2, 'Mandarina DIA', 'https://www.dia.es/ejemplo', 2.49, 2.49),
(9, 47103, 2, 'Chirimoya DIA', 'https://www.dia.es/ejemplo', 3.49, 3.49),
(10, 47104, 2, 'Manzana DIA', 'https://www.dia.es/ejemplo', 2.69, 2.69),
(11, 47111, 2, 'Tomate rama DIA', 'https://www.dia.es/ejemplo', 2.19, 2.19),
(12, 47112, 2, 'Tomate ensalada DIA', 'https://www.dia.es/ejemplo', 2.19, 2.19),
(13, 47113, 2, 'Pimiento verde DIA', 'https://www.dia.es/ejemplo', 2.49, 2.49),
(14, 47116, 2, 'Alubias blancas DIA', 'https://www.dia.es/ejemplo', 2.45, 2.45),
(15, 47182, 2, 'Salchichas Oscar Mayer', 'https://www.dia.es/ejemplo', 7.29, 7.29),
(16, 47185, 1, 'Botifarrón Mercadona', 'https://tienda.mercadona.es/ejemplo', 7.50, 7.50),
(17, 47193, 1, 'Costilla Mercadona', 'https://tienda.mercadona.es/ejemplo', 7.55, 7.55),
(18, 47203, 1, 'Hueso blanco Mercadona', 'https://tienda.mercadona.es/ejemplo', 5.40, 5.40),
(19, 47296, 2, 'Palitos surimi DIA', 'https://www.dia.es/ejemplo', 4.18, 4.18),
(20, 47362, 2, 'Filetes bacalao DIA', 'https://www.dia.es/ejemplo', 17.47, 17.47),
(21, 47986, 1, 'Mojama Mercadona', 'https://tienda.mercadona.es/ejemplo', 70.00, 70.00),
(22, 48264, 1, 'Bacalao Mercadona', 'https://tienda.mercadona.es/ejemplo', 31.36, 31.36);
