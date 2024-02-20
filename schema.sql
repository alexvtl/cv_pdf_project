CREATE TABLE pdf (
    id INT AUTO_INCREMENT PRIMARY KEY,
   urlProfil VARCHAR(255),
    job VARCHAR(255),
    fullname VARCHAR(255),
    description TEXT,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    soft_skills JSON,
    hard_skills JSON,
    experiences JSON,
    grade JSON,
    Colorbox1 CHAR(7),
    Colorbox2 CHAR(7),
    color_title CHAR(7),
    color_text CHAR(7),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);