CREATE PROCEDURE SelectVolcanoes 
@Latitude varchar(50),
@Longitude varchar(50)
AS
SELECT items_name, items_location, items_country, 
items_latitude, items_longitude, items_elevation,
items_morphology, items_veiFROM Customers 
WHERE items_latitude = @Latitude AND items_longitude = @Longitude
GO;



