SELECT *
FROM messages
WHERE user_id=3 AND instr(text, 'Hello')>0;