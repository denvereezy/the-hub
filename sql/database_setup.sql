CREATE DATABASE the_hub;
CREATE USER admin@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON the_hub.* TO admin@localhost;
FLUSH PRIVILEGES;
