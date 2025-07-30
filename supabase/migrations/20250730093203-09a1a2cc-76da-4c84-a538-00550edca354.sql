-- Manually confirm johnnydrumm@gmail.com email to allow admin access
UPDATE auth.users 
SET email_confirmed_at = now()
WHERE email = 'johnnydrumm@gmail.com' AND email_confirmed_at IS NULL;