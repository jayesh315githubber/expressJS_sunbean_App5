create batabase ecommerce2;

 create table user(id integer primary key auto_increment, firstName varchar(15), lastName varchar(15), phone varchar(12), email varchar(50), password varchar (100));

 alter table user add unique (email);

 create table product (id integer primary key auto_increment , title varchar(100),description varchar(100), price float, category int , company int);

create table category (id integer primary key auto_increment , title varchar(100), description varchar(1000));

create table company (id integer primary key auto_increment , title varchar(100), description varchar(1000));