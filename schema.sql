create table attendee (
  id serial not null primary key,
  name text not null,
  email text null
);

create table hero (
  id serial not null primary key,
  name text not null
);
