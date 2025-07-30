-- Make the first user an admin (or assign admin role to a specific user)
-- This will assign admin role to the first user who signed up

DO $$
DECLARE
    first_user_id uuid;
BEGIN
    -- Get the first user ID from auth.users
    SELECT id INTO first_user_id 
    FROM auth.users 
    ORDER BY created_at ASC 
    LIMIT 1;
    
    -- If a user exists, assign admin role
    IF first_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role, assigned_by)
        VALUES (first_user_id, 'admin', first_user_id)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END $$;