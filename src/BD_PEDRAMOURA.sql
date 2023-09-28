USE [PEDRAMOURA]
GO
/****** Object:  Table [dbo].[ItensRevisao]    Script Date: 25/09/2023 20:26:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItensRevisao](
	[ItenRevisaoID] [int] IDENTITY(1,1) NOT NULL,
	[Descricao] [varchar](255) NULL,
	[DataRevisao] [date] NULL,
	[Valor] [decimal](10, 2) NULL,
	[VeiculoID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ItenRevisaoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Veiculos]    Script Date: 25/09/2023 20:26:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Veiculos](
	[VeiculoID] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](100) NULL,
	[Placa] [varchar](10) NULL,
	[Modelo] [varchar](50) NULL,
	[Marca] [varchar](50) NULL,
	[Ano] [int] NULL,
	[Categoria] [varchar](50) NULL,
	[status] [bit] NULL,
	[KM] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[VeiculoID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[ItensRevisao] ON 
GO
INSERT [dbo].[ItensRevisao] ([ItenRevisaoID], [Descricao], [DataRevisao], [Valor], [VeiculoID]) VALUES (1, N'Óleo', CAST(N'2023-10-10' AS Date), CAST(50.00 AS Decimal(10, 2)), 1)
GO
INSERT [dbo].[ItensRevisao] ([ItenRevisaoID], [Descricao], [DataRevisao], [Valor], [VeiculoID]) VALUES (2, N'Motor', CAST(N'2023-10-10' AS Date), CAST(100.00 AS Decimal(10, 2)), 2)
GO
INSERT [dbo].[ItensRevisao] ([ItenRevisaoID], [Descricao], [DataRevisao], [Valor], [VeiculoID]) VALUES (4, N'Rodas', CAST(N'2023-04-09' AS Date), CAST(300.00 AS Decimal(10, 2)), 1)
GO
INSERT [dbo].[ItensRevisao] ([ItenRevisaoID], [Descricao], [DataRevisao], [Valor], [VeiculoID]) VALUES (5, N'Pneus', CAST(N'2023-04-09' AS Date), CAST(300.00 AS Decimal(10, 2)), 1)
GO
INSERT [dbo].[ItensRevisao] ([ItenRevisaoID], [Descricao], [DataRevisao], [Valor], [VeiculoID]) VALUES (6, N'Pneus', CAST(N'2023-04-09' AS Date), CAST(300.00 AS Decimal(10, 2)), 1)
GO
INSERT [dbo].[ItensRevisao] ([ItenRevisaoID], [Descricao], [DataRevisao], [Valor], [VeiculoID]) VALUES (7, N'Pneus', CAST(N'2023-04-09' AS Date), CAST(300.00 AS Decimal(10, 2)), 1)
GO
INSERT [dbo].[ItensRevisao] ([ItenRevisaoID], [Descricao], [DataRevisao], [Valor], [VeiculoID]) VALUES (8, N'Freios', CAST(N'2023-04-09' AS Date), CAST(300.00 AS Decimal(10, 2)), 1)
GO
INSERT [dbo].[ItensRevisao] ([ItenRevisaoID], [Descricao], [DataRevisao], [Valor], [VeiculoID]) VALUES (9, N'Freios', CAST(N'2023-04-09' AS Date), CAST(300.00 AS Decimal(10, 2)), 3)
GO
SET IDENTITY_INSERT [dbo].[ItensRevisao] OFF
GO
SET IDENTITY_INSERT [dbo].[Veiculos] ON 
GO
INSERT [dbo].[Veiculos] ([VeiculoID], [Nome], [Placa], [Modelo], [Marca], [Ano], [Categoria], [status], [KM]) VALUES (1, N'Caminhão 1', N'ABC1234', N'Refrigerado 1', N'Volvo', 2023, N'Caminhões', 1, 200)
GO
INSERT [dbo].[Veiculos] ([VeiculoID], [Nome], [Placa], [Modelo], [Marca], [Ano], [Categoria], [status], [KM]) VALUES (2, N'Caminhão 2', N'XYZ5678', N'Refrigerado 2', N'Mercedes-Benz', 2022, N'Caminhões', 1, NULL)
GO
INSERT [dbo].[Veiculos] ([VeiculoID], [Nome], [Placa], [Modelo], [Marca], [Ano], [Categoria], [status], [KM]) VALUES (3, N'Van 1', N'GHI9876', N'Van Refrigerada 1', N'Ford', 2021, N'Vans', 1, 100)
GO
INSERT [dbo].[Veiculos] ([VeiculoID], [Nome], [Placa], [Modelo], [Marca], [Ano], [Categoria], [status], [KM]) VALUES (4, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL)
GO
INSERT [dbo].[Veiculos] ([VeiculoID], [Nome], [Placa], [Modelo], [Marca], [Ano], [Categoria], [status], [KM]) VALUES (5, N'Caminhão do George', N'ABC1234', N'Refrigerado 1', N'Volvo', 2023, N'Caminhões', 1, 200)
GO
SET IDENTITY_INSERT [dbo].[Veiculos] OFF
GO
ALTER TABLE [dbo].[Veiculos] ADD  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[Veiculos] ADD  DEFAULT ((0)) FOR [KM]
GO
ALTER TABLE [dbo].[ItensRevisao]  WITH CHECK ADD  CONSTRAINT [FK_ItensRevisao_Veiculos] FOREIGN KEY([VeiculoID])
REFERENCES [dbo].[Veiculos] ([VeiculoID])
GO
ALTER TABLE [dbo].[ItensRevisao] CHECK CONSTRAINT [FK_ItensRevisao_Veiculos]
GO
