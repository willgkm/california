drop schema if exists ccca cascade;

create schema ccca;

create table ccca.account (
	account_id uuid primary key,
	name text not null,
	email text not null,
	password text not null
);
