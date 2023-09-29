USE [PEDRAMOURA]
GO
/****** Object:  Table [dbo].[maintenances]    Script Date: 25/09/2023 20:26:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[maintenances](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[description] [varchar](255) NOT NULL,
	[date] [date] NOT NULL,
	[value] [decimal](10, 2) NULL,
	[readOdometer] [decimal](10, 2) NOT NULL,
	[referenceOdometer] [decimal](10, 2) NOT NULL,
	[licensePlate] [varchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[vehicles]    Script Date: 25/09/2023 20:26:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[vehicles](
	[licensePlate] [varchar](10) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[model] [varchar](50) NOT NULL,
	[brand] [varchar](50) NOT NULL,
	[year] [int] NOT NULL,
	[category] [varchar](50) NOT NULL,
	[status] [bit] NOT NULL,
	[odometer] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[licensePlate] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[maintenances] ON 
GO
INSERT [dbo].[maintenances] ([id], [description], [date], [value], [referenceOdometer], [readOdometer], [licensePlate]) VALUES (1, N'Óleo', CAST(N'2023-10-10' AS Date), CAST(50.00 AS Decimal(10, 2)), 10000, 9000, N'ABC1234')
GO
INSERT [dbo].[maintenances] ([id], [description], [date], [value], [referenceOdometer], [readOdometer], [licensePlate]) VALUES (2, N'Motor', CAST(N'2023-10-10' AS Date), CAST(100.00 AS Decimal(10, 2)), 10000, 9000, N'XYZ5678')
GO
INSERT [dbo].[maintenances] ([id], [description], [date], [value], [referenceOdometer], [readOdometer], [licensePlate]) VALUES (4, N'Rodas', CAST(N'2023-04-09' AS Date), CAST(300.00 AS Decimal(10, 2)), 20000, 19000, N'ABC1234')
GO
INSERT [dbo].[maintenances] ([id], [description], [date], [value], [referenceOdometer], [readOdometer], [licensePlate]) VALUES (5, N'Pneus', CAST(N'2023-04-09' AS Date), CAST(300.00 AS Decimal(10, 2)), 30000, 29000, N'ABC1234')
GO
INSERT [dbo].[maintenances] ([id], [description], [date], [value], [referenceOdometer], [readOdometer], [licensePlate]) VALUES (6, N'Pneus', CAST(N'2023-04-09' AS Date), CAST(300.00 AS Decimal(10, 2)), 40000, 39000, N'ABC1234')
GO
INSERT [dbo].[maintenances] ([id], [description], [date], [value], [referenceOdometer], [readOdometer], [licensePlate]) VALUES (7, N'Pneus', CAST(N'2023-04-09' AS Date), CAST(300.00 AS Decimal(10, 2)), 50000, 49000, N'ABC1234')
GO
INSERT [dbo].[maintenances] ([id], [description], [date], [value], [referenceOdometer], [readOdometer], [licensePlate]) VALUES (8, N'Freios', CAST(N'2023-04-09' AS Date), CAST(300.00 AS Decimal(10, 2)), 60000, 59000, N'ABC1234')
GO
SET IDENTITY_INSERT [dbo].[maintenances] OFF
GO
INSERT [dbo].[vehicles] ([licensePlate], [name], [model], [brand], [year], [category], [status], [odometer]) VALUES (N'ABC1234', N'Entregas Longas', N'XPTO', N'Volvo', 2023, N'Delivery', 1, 65000)
GO
INSERT [dbo].[vehicles] ([licensePlate], [name], [model], [brand], [year], [category], [status], [odometer]) VALUES (N'XYZ5678', N'Caminhão 2', N'QWERT', N'Mercedes-Benz', 2022, N'Animal Truck', 1, 30000)
GO
INSERT [dbo].[vehicles] ([licensePlate], [name], [model], [brand], [year], [category], [status], [odometer]) VALUES (N'GHI9876', N'Van 1', N'Fiorino', N'Fiat', 2021, N'Auxiliary', 1, 1500)
GO
INSERT [dbo].[vehicles] ([licensePlate], [name], [model], [brand], [year], [category], [status], [odometer]) VALUES (N'OBC1234', N'Entregas Curtas', N'666-E', N'Volvo', 2023, N'Delivery', 1, 23000)
GO
ALTER TABLE [dbo].[vehicles] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[vehicles] ADD  DEFAULT ((0)) FOR [odometer]
GO
ALTER TABLE [dbo].[maintenances]  WITH CHECK ADD  CONSTRAINT [FK_maintenances_vehicles] FOREIGN KEY([licensePlate])
REFERENCES [dbo].[vehicles] ([licensePlate])
GO
ALTER TABLE [dbo].[maintenances] CHECK CONSTRAINT [FK_maintenances_vehicles]
GO
