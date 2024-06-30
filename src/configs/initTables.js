// Name: Thiri Lae Win
// Class: DIT/1B/10
// ADM NO: 2340739
const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
  if (error) {
    console.error("Error hashing password:", error);
  } else {
    console.log("Hashed password:", hash);

    const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;

DROP TABLE IF EXISTS Task;

DROP TABLE IF EXISTS TaskProgress;

DROP TABLE IF EXISTS Pet;

DROP TABLE IF EXISTS Ownership;

DROP TABLE IF EXISTS Rewards;

DROP TABLE IF EXISTS UserPointsRel;

DROP TABLE IF EXISTS UserRewardsRel;

DROP TABLE IF EXISTS Messages;


CREATE TABLE User (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username TEXT,
  email TEXT,
  password TEXT NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Task (
  task_id INT PRIMARY KEY AUTO_INCREMENT,
  title TEXT,
  description TEXT,
  points INT
);

CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP,
    notes TEXT 
);

CREATE TABLE Pet (
	pet_id INT PRIMARY KEY AUTO_INCREMENT,
	pet_name TEXT,
  type TEXT,
	pet_breed TEXT,
	hunger_level TEXT,
	activity TEXT,
	grooming TEXT, 
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Ownership (
  ownership_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  pet_id INT NOT NULL,
  owned_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Rewards (
	reward_id INT PRIMARY KEY AUTO_INCREMENT,
  minimum_points INT NOT NULL,
  reward TEXT,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UserPointsRel (
	id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  progress_id INT NOT NULL,
  points INT NOT NULL DEFAULT 0
);

CREATE TABLE UserRewardsRel (
	userReward_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  reward_id INT NOT NULL,
  date_claimed date not null
);

CREATE TABLE Messages (
	message_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  sent_by TEXT,
  message_text TEXT,
  uploaded_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO User (username, email, password) VALUES
('admin', 'a@a.com', '${hash}'),
('testing', 'q@a.com', '1');

INSERT INTO TASK (task_id, title, description, points) VALUES
(1, 'Plant a Tree', 'Plant a tree in you neighbourhood or a designated green area.', 50), 
(2, 'Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30), 
(3, 'Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40), 
(4, 'Energy Conservation', 'Turn off lights and appliance when not in use.', 25 ),
(5, 'Composting', 'Start composting kichen scraps to create natural fertlizer.', 35),
(6, 'Treating', 'Treat three meals a day', 40),
(7, 'Grooming', 'Send to grooming service', 50),
(8, 'Activity', 'Play with the pet', 35);

INSERT INTO TASKPROGRESS (progress_id, user_id, task_id, completion_date, notes) VALUES
(1, 1, 8, '2023-01-01', 'first'),
(2, 1, 6, '2023-01-01', 'second'),
(3, 2, 6, '2023-01-01', 'third'),
(4, 2, 6, '2023-01-01', 'fouth');


INSERT INTO Pet (pet_id, pet_name, type, pet_breed, hunger_level, activity, grooming) VALUES
(1, 'Henry', 'dog', 'husky', 'every 4 hrs', 'every 5 hrs', 'every 2 days'),
(2, 'John', 'dog', 'chihuahua', 'every 3 hrs', 'every 2 hrs', 'every 5 days'), 
(3, 'Alex', 'cat', 'british shorthair', 'every 5 hrs', 'every 3 hrs', 'every 4 days');

INSERT INTO Ownership (ownership_id, user_id, pet_id, owned_on) VALUES
(1, 1, 3, '2023-12-03 00:00:00');

INSERT INTO Rewards (reward_id, minimum_points, reward) VALUES
(1, 300, 'Unlock a new activity for your pet'),
(2, 400, 'Own a new pet');

INSERT INTO UserRewardsRel (userReward_id, user_id, reward_id, date_claimed) VALUES
(1, 1, 1, '2023-12-03 00:00:00'),
(2, 1, 2, '2023-12-03 00:00:00');

INSERT INTO UserPointsRel (id, user_id, progress_id, points) VALUES
(1, 1, 1, 35),
(2, 1, 2, 40);

INSERT INTO Messages (message_id, user_id, sent_by, message_text, uploaded_on, updated_on) VALUES
(1, 1, 2, 'testing', '2023-01-01', '2023-01-01')

`;


    pool.query(SQLSTATEMENT, callback);
  }
});
