/*
Honors Contract
Ethan McCaskey
*/

IF OBJECT_ID('FilterVolcanoes') IS NOT NULL
	DROP PROCEDURE FilterVolcanoes
GO

-- Filter Volcanoes (Route /v, POST)
CREATE PROCEDURE FilterVolcanoes 
@year_from varchar(50),
@year_to varchar(50),
@vei varchar(50),
-- In the format... 'Italy,Japan'
@countries varchar(max)
AS
SELECT  
items_name,
items_year,
items_location,
items_country,
items_latitude,
items_longitude,
items_elevation,
items_morphology,
items_vei 
FROM dbo.volcanoes
WHERE 
items_year > @year_from
AND items_year < @year_to
-- Split by comma
AND items_country IN (SELECT value FROM string_split(@countries, ','))
AND items_vei = @vei
-- Will ignore VEI if null.
OR @vei IS NULL
GO

IF OBJECT_ID('BaseVolcanoes') IS NOT NULL
	DROP PROCEDURE BaseVolcanoes
GO

-- Base Volcanoes (Route /v, GET)
CREATE PROCEDURE BaseVolcanoes 
AS
SELECT  
items_name,
items_year,
items_location,
items_country,
items_latitude,
items_longitude,
items_elevation,
items_morphology,
items_vei 
FROM dbo.volcanoes
GO

-- Get countries list.
IF OBJECT_ID('Countries') IS NOT NULL
	DROP PROCEDURE Countries
GO

-- Base Volcanoes (Route /c, GET)
CREATE PROCEDURE Countries 
AS
SELECT DISTINCT items_country
FROM dbo.volcanoes
GO





