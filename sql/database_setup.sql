CREATE DATABASE the_hub;
CREATE USER admin@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON the_hub.* TO admin@localhost;
FLUSH PRIVILEGES;

CREATE TABLE entity (
  id int not null auto_increment primary key,
  name varchar (100) not null,
  logo varchar (100) not null,
  address varchar (100) not null
);

CREATE TABLE user (
  id int not null auto_increment primary key,
  email varchar (100) int not null,
  entity_id int not null,
  role varchar (100) not null,
  status varchar (100) not null,
  password varchar (100) not null,
  firstName varchar (100) not null,
  lastName varchar (100) not null,
  foreign key (entity_id) references entity(id)
);

CREATE TABLE questionnaire (
  id int not null auto_increment primary key,
  entity_id int not null,
  name varchar (100) not null,
  dueDate date not null,
  foreign key (entity_id) references entity_id(id)
);

CREATE TABLE questionnaire_user (
  questionnaire_id int not null,
  user_id int not null,
  status varchar (100) not null,
  foreign key (questionnaire_id) references questionnaire(id),
  foreign key (user_id) references user(id)
);
