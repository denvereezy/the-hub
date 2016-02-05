drop table if exists donars;
drop table if exists organizations ;
drop table if exists beneficiaries;
drop table if exists metrics;
drop table if exists invitations;
drop table if exists metrics_collaborators;

create table donars (id int not null auto_increment,
            donars_id int,
						name varchar(100),
            email_address varchar(100),
            username varchar(100),
						password varchar(100),
						user_role varchar(100),
						primary key(id),
						foreign key(org_id) references organizations(org_id)
						);

create table organizations (id int not null auto_increment,
						donars_id int,
            name varchar(100),
            email_address varchar(100),
            username varchar(100),
						password varchar(100),
						user_role varchar(100),
						primary key(id),
						foreign key(donars_id) references donars(donars_id),
						foreign key(beneficiaries_id) references suppliers(beneficiaries_id)
						);

create table beneficiaries (id int not null auto_increment,
  					org_id int,
            name varchar(100),
            email_address varchar(100),
            username varchar(100),
  					password varchar(100),
  					user_role varchar(100),
  					primary key (id),
  					foreign key (org_id) references organizations(org_id)
					  );

create table metrics(id int not null auto_increment);
              donars_id int,
              org_id int int not null,
              beneficiaries_id int not null,
              name varchar(100),
              type varchar(100),
              due_date varchar(date),
              status varchar(100),
              primary key(id),
              foreign key (donars_id) references donars(donars_id),
              foreign key (org_id) references organizations(org_id),
              foreign key (beneficiaries_id) references beneficiaries(beneficiaries_id)
						);

create table invitations (id int not null auto_increment,
						donars_id int ,
						org_id int not null,
            beneficiaries_id int not null,
						primary key(id),
						foreign key(donars_id) references donars(donars_id),
            foreign key(org_id) references organizations(org_id),
            foreign key(beneficiaries_id) references beneficiaries(beneficiaries_id)
						);

create table metrics_collaborators (id int not null primary key auto_increment,
						beneficiaries_id int not null,
            metrics_id int not null,
						invitations_id int not null,
						primary key(id),
            foreign key(beneficiaries_id) references beneficiaries(beneficiaries_id),
            foreign key(metrics_id) references metrics(metrics_id)
						);
