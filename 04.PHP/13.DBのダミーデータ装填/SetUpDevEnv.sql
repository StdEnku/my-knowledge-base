# DB作成
CREATE DATABASE ideastock;
use ideastock;

/*--------------------------------------------------------------------------------------------------------------
    [userテーブル備考]
    IDとパスワードがUniqueであることの解釈
    ようはID違いパスワード重複を許さない設計にしたいと解釈

    ダメな例:
        id = 1111, password = 0000
        id = 2222, password = 0000

    つまりpasswordにunique制約をつけるだけでその要件は満たせるので上記のようなクエリとなった。

    [警告]
    パスワードのハッシュ化にpassword_hash()を使うとランダムソルトが入るため
    パスワード値の重複禁止はできないがハッシュ値の重複禁止はできる。

    また、password_hash関数から生成されたハッシュ値は60文字の長さになるため、
    passwordカラムの長さを10文字にしてしまうとハッシュ値が格納できない。
    よってこの設計はパスワードのハッシュ化を前提としていないことが考えられる。
    恐らく実際の開発現場ではこのような設計に出会うことはないと思われるが
    訓練用の課題のため、このようになっているようだ。
--------------------------------------------------------------------------------------------------------------*/
CREATE TABLE user(
    id INT AUTO_INCREMENT,
    loginId VARCHAR(10) NOT NULL UNIQUE,
    password VARCHAR(10) NOT NULL UNIQUE,
    name VARCHAR(10) NOT NULL,

    PRIMARY KEY(id)
);

/*--------------------------------------------------------------------------------------------------------------
    [questionテーブル備考]
    dateカラムは質問が投稿された日時を格納するためのカラムであり、
    質問内容の変更が入ったとしても日時は変更されないと解釈したので、DEFAULT CURRENT_TIMESTAMPを設定している。
    もし質問内容の変更が入った場合に日時も更新される仕様であれば、ON UPDATE CURRENT_TIMESTAMPを設定する必要がある。
--------------------------------------------------------------------------------------------------------------*/
CREATE TABLE question(
    id INT AUTO_INCREMENT,
    userId INT NOT NULL,
    question VARCHAR(256) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleteFlg TINYINT(1) NOT NULL DEFAULT 0,

    PRIMARY KEY(id),
    FOREIGN KEY(userId) REFERENCES user(id)
);

/*--------------------------------------------------------------------------------------------------------------
    [answerテーブル備考]
    dateカラムは回答が投稿された日時を格納するためのカラムであり、
    回答内容の変更が入ったとしても日時は変更されないと解釈したので、DEFAULT CURRENT_TIMESTAMPを設定している。
    もし回答内容の変更が入った場合に日時も更新される仕様であれば、ON UPDATE CURRENT_TIMESTAMPを設定する必要がある。
--------------------------------------------------------------------------------------------------------------*/
CREATE TABLE answer(
    id BIGINT AUTO_INCREMENT,
    questionId INT NOT NULL,
    userId INT NOT NULL,
    answer VARCHAR(256) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleteFlg TINYINT(1) NOT NULL DEFAULT 0,

    PRIMARY KEY(id),
    FOREIGN KEY(questionId) REFERENCES question(id),
    FOREIGN KEY(userId) REFERENCES user(id)
);

# ダミーデータ流し込み

#AUTO_INCREMENTカウンタリセット
ALTER TABLE user AUTO_INCREMENT = 1; 
ALTER TABLE question AUTO_INCREMENT = 1; 
ALTER TABLE answer AUTO_INCREMENT = 1; 

INSERT INTO user(loginId, password, name)
VALUES
    ('id11111111', 'pass111111', 'toro yamada'),
    ('id22222222', 'pass222222', 'jiro ito'),
    ('id33333333', 'pass333333', 'mori saburo');

INSERT INTO question(userId, question)
VALUES
    (1, 'how to use Paper?'),
    (2, 'how to use PC?'),
    (3, 'how to use Phone?');

INSERT INTO answer(questionId, userId, answer)
VALUES
    (1, 2, 'Do write!'),
    (2, 3, 'Do type!'),
    (3, 1, 'Do touch!');

/*
SELECT * FROM user;
+----+------------+------------+------------+
| id | loginId    | password   | name       |
+----+------------+------------+------------+
|  1 | id11111111 | pass111111 | toro yamad |
|  2 | id22222222 | pass222222 | jiro ito   |
|  3 | id33333333 | pass333333 | mori sabur |
+----+------------+------------+------------+

SELECT * FROM question;
+----+--------+-------------------+---------------------+-----------+
| id | userId | question          | date                | deleteFlg |
+----+--------+-------------------+---------------------+-----------+
|  1 |      1 | how to use Paper? | 2026-11-03 15:09:26 |         0 |
|  2 |      2 | how to use PC?    | 2026-11-03 15:09:26 |         0 |
|  3 |      3 | how to use Phone? | 2026-11-03 15:09:26 |         0 |
+----+--------+-------------------+---------------------+-----------+

SELECT * FROM answer;
+----+------------+--------+-----------+---------------------+-----------+
| id | questionId | userId | answer    | date                | deleteFlg |
+----+------------+--------+-----------+---------------------+-----------+
|  1 |          1 |      2 | Do write! | 2026-11-03 15:09:26 |         0 |
|  2 |          2 |      3 | Do type!  | 2026-11-03 15:09:26 |         0 |
|  3 |          3 |      1 | Do touch! | 2026-11-03 15:09:26 |         0 |
+----+------------+--------+-----------+---------------------+-----------+
*/