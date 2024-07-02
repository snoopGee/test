#!/bin/bash

rm -rf main.db

sqlite3 main.db <<EOF
create table users (id INTEGER PRIMARY KEY,firstName TEXT,lastName TEXT);
insert into users (firstName,lastName) values ('Luffy','Monkey D');
insert into users (firstName,lastName) values ('Tony','Chopper');
select * from users;
EOF