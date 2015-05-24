SELECT name
FROM users
INNER JOIN messages ON messages.user_id = users.id
GROUP BY user_id
HAVING COUNT(user_id)>=3;