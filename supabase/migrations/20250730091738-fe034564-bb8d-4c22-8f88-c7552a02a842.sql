-- Assign admin privileges to info@xplor.io now that they have signed up
DO $$
DECLARE
    info_user_id uuid;
BEGIN
    -- Get the user ID for info@xplor.io
    SELECT id INTO info_user_id 
    FROM auth.users 
    WHERE email = 'info@xplor.io';
    
    -- If the user exists, assign admin role
    IF info_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role, assigned_by)
        VALUES (info_user_id, 'admin', info_user_id)
        ON CONFLICT (user_id, role) DO NOTHING;
        
        RAISE NOTICE 'Admin role assigned to info@xplor.io with user_id: %', info_user_id;
    ELSE
        RAISE NOTICE 'User info@xplor.io not found in database';
    END IF;
END $$;