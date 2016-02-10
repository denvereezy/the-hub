CREATE DATABASE impact_app;
CREATE USER admin@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON impact_app.* TO admin@localhost;
FLUSH PRIVILEGES;

CREATE TABLE entity (
  entity_id int not null auto_increment primary key,
  entity_name varchar (100) not null,
  entity_logo varchar (100) not null,
  entity_email varchar (100) not null,
  entity_address varchar (100) not null
);

CREATE TABLE user (
  user_id int not null auto_increment primary key,
  email varchar (100) not null,
  user_password varchar (100) not null,
  user_contactNo int not null,
  entity_id int not null,
  foreign key (entity_id) references entity(entity_id)
);

CREATE TABLE questionnaires (
  questionnaire_id int not null auto_increment primary key,
  questionnaire_name varchar (100) not null,
  entity_id int not null,
  description varchar (100) not null,
  due_date date,
  foreign key (entity_id) references entity(entity_id)
);

CREATE TABLE questionnaire_questions(
  question_id int not null auto_increment primary key,
  question_description varchar (100) not null,
  questionnaire_id int not null,
  foreign key (questionnaire_id) references questionnaires(questionnaire_id)
);

CREATE TABLE questionnaire_collab (
  question_collab_id int not null auto_increment primary key,
  entity_id int not null,
  questionnaire_id int not null,
  foreign key (entity_id) references entity(entity_id),
  foreign key (questionnaire_id) references questionnaires(questionnaire_id)
);

CREATE TABLE questionnaire_question_collab (
  questionnaire_question_collab_id int not null auto_increment primary key,
  question_collab_id int not null,
  entity_id int not null,
  foreign key (entity_id) references entity(entity_id),
  foreign key (question_collab_id) references questionnaire_collab(question_collab_id)
);

CREATE TABLE questionnaire_results (
  questionnare_results_id int not null auto_increment primary key,
  questionnaire_question_collab_id int not null,
  foreign key (questionnaire_question_collab_id) references questionnaire_question_collab(questionnaire_question_collab_id)
);

CREATE TABLE invitations (
  invitations_id int not null auto_increment primary key,
  email varchar (100) not null,
  status varchar (100) not null
);
