CREATE DATABASE impact_app;
CREATE USER admin@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON impact_app.* TO admin@localhost;
FLUSH PRIVILEGES;
