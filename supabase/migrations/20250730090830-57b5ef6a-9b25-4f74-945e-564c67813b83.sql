-- Make johnnydrumm@gmail.com an admin
DO $$
DECLARE
    target_user_id uuid;
BEGIN
    -- Get the user ID for johnnydrumm@gmail.com
    SELECT id INTO target_user_id 
    FROM auth.users 
    WHERE email = 'johnnydrumm@gmail.com';
    
    -- If the user exists, assign admin role
    IF target_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role, assigned_by)
        VALUES (target_user_id, 'admin', target_user_id)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END $$;