SELECT *
FROM messages
WHERE user_id=7 AND data=DATE_FORMAT('2015-05-02','%Y-%m-%e');