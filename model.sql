-- SQL language

create database dilbar;

create table messages (
  message_id serial not null primary key,
  user_id serial,
  body varchar(1000)
);

insert into messages (user_id, body) values (1, 'Assalomu aleykum!');