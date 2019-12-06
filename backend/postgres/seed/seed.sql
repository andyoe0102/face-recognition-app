BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Jessie','jessie@gmail.com', 5 ,'2018-01-01');
INSERT into login (hash, email) values ('$2a$10$SvkPaQNsx7ZLQryHwk8mpObi4YDIqOMPXQVbobnttPAVtehaoyviK','jessie@gmail.com'); 

COMMIT;