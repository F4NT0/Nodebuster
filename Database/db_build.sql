create table movies(id_movie numeric(3) not null,title varchar(200),director varchar(200),copies numeric(3),constraint pk_id_movie primary key(id_movie));
create table clients(id_client numeric(3) not null,client_name varchar(200),client_pass varchar(200),email varchar(200),constraint pk_id_client primary key(id_client));
create table rents(id_rent numeric(3) not null,numeric_movies numeric(3),devolution_date datetime,id_client numeric(3),id_movie numeric(3),constraint pk_id_rent primary key(id_rent));
alter table rents add constraint fk_client_rent foreign key(id_client) references clients(id_client);
alter table rents add constraint fk_movie_rent foreign key(id_movie) references movies(id_movie);
insert into movies(id_movie,title,director,copies) values(1,"TeneT","Christpher Nolan",2);
insert into clients(id_client,client_name,client_pass,email) values(1,"Gabriel Fanto","1234","fanto@pepe.com");
insert into rents(id_rent,numeric_movies,devolution_date,id_client,id_movie) values(1,1,'2020-01-01 10:10:10',1,1);