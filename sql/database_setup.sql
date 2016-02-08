CREATE DATABASE impact_app;
CREATE USER admin@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON impact_app.* TO admin@localhost;
FLUSH PRIVILEGES;

CREATE TABLE entity (
  entity_id int not null auto_increment primary key,
  entity_name varchar (100) not null,
  entity_logo varchar (100) not null,
  entity_email varchar (100) not null,
  entity_address varchar (100) not null,

);

CREATE TABLE user (
  user_id int not null auto_increment primary key,
  username varchar (100) not null,
  user_password varchar (100) not null,
  user_contactNo int not null,
  entity_id int not null,
  foreign key (entity_id) references entity(entity_id)
);

CREATE TABLE metric_questionares (
  questionares_id int not null auto_increment primary key,
  due_date date,
  entity_id int not null,
  foreign key (entity_id) references entity(entity_id)
);

CREATE TABLE metric_question_results (
  metric_id int NOT NULL auto_increment primary key,
  metric_result_value varchar (100) not null,
  matric_results_time time,
  entity_id int not null,
  foreign key (entity_id) references entity(entity_id)
);

CREATE TABLE invitations (
  invitations_id int not null auto_increment primary key,
  status varchar (100) not null,
  email varchar (100) not null,
  questionares_id int not null,
  foreign key (questionares_id) references metric_questionares(questionares_id),
  entity_id in not null,
  foreign key (entity_id) references entity(entity_id)
);

CREATE TABLE metric_questions (
  metric_description varchar (100) not null,
  questionares_id int not null,
  foreign key (questionares_id) references metric_questionares(questionares_id),
  metric_id int not null,
  foreign key (metric_id) references metric_question_results(metric_id)
);

CREATE TABLE questionare_collaboration (
  collab_id int not null auto_increment primary key,
  collab_type varchar (100) not null,
  entity_id int not null,
  foreign key (entity_id) references entity(entity_id)
);

CREATE TABLE "noname" (
  id int not null auto_increment primary key,
  metric_id int not null,
  foreign key (metric_id) references metric_question_results(metric_id),
  collab_id int not null,
  foreign key (collab_id) references questionare_collaboration(collab_id)
);
