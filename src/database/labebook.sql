-- Active: 1676490702200@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);
INSERT INTO users (id, name, email, password, role)
VALUES("u001", "Teste1", "teste1@email.com", "teste1234", "ADMIN");

INSERT INTO users (id, name, email, password, role)
VALUES("u002", "Dev", "dev1@email.com", "dev1234", "NORMAL"),
("u003", "Devinho", "devinho@email.com", "devinho1234", "NORMAL"),
("u004", "Claudia", "claudia@email.com", "claudia1234", "NORMAL"),
("u005", "Maria", "maria@email.com", "maria1234", "NORMAL");

SELECT * from users;

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT (0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);
DELETE FROM posts;

INSERT INTO posts (id, creator_id, content)
VALUES
    ("p001", "u001", "image"),
    ("p002", "u005", "text"),
    ("p003", "u003", "video");

CREATE  TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts (id)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

INSERT INTO likes_dislikes (user_id, post_id, like)
VALUES
    ("u003", "p001", 1),
    ("u004", "p002", 1),
    ("u001", "p003", 1),
    ("u002", "p003", 0),
    ("u005", "p001", 1),
    ("u004", "p002", 0);

    SELECT * FROM likes_dislikes;
    SELECT * FROM posts;
    SELECT * FROM users;

    UPDATE posts
    SET likes = 2
    WHERE id = "p001";

    UPDATE posts
    SET likes = 1
    WHERE id = "p002";

     UPDATE posts
    SET dislikes = 1
    WHERE id = "p002";

    UPDATE posts
    SET likes = 1
    WHERE id = "p003";

    UPDATE posts
    SET dislikes = 1
    WHERE id = "p003";

  

    


