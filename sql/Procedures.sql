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

-- Get countries list.
IF OBJECT_ID('ByCity') IS NOT NULL
	DROP PROCEDURE ByCity
GO

-- ByCity (Route /bc, GET)
CREATE PROCEDURE ByCity 
@city varchar(50)
AS
SELECT 
-- Select everything (this is faster than *)
[items_year],[items_month],[items_day],[items_tsunamiEventId],
[items_earthquakeEventId],[items_volcanoLocationId],
[items_volcanoLocationNewNum],[items_volcanoLocationNum],[items_name],
[items_location],[items_country],[items_latitude],[items_longitude],
[items_elevation],[items_morphology],[items_vei],[items_agent],
[items_deathsTotal],[items_deathsAmountOrderTotal],
[items_damageAmountOrderTotal],[items_housesDestroyedTotal],
[items_housesDestroyedAmountOrderTotal],[items_significant],
[items_publish],[items_status],[items_timeErupt],
[items_deathsAmountOrder],[items_injuriesTotal],
[items_injuriesAmountOrderTotal],[items_damageAmountOrder],
[items_deaths],[items_housesDestroyedAmountOrder],
[items_injuries],[items_injuriesAmountOrder],[items_damageMillionsDollars],
[items_housesDestroyed],[items_damageMillionsDollarsTotal],
[items_missing],[items_missingAmountOrder],[items_missingTotal],
[items_missingAmountOrderTotal]
FROM dbo.volcanoes
-- By the city
WHERE items_name = @city
GO





