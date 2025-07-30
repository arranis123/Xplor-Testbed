-- Assign admin rights to arrandobsonis@gmail.com and johnnydrumm@gmail.com
DO $$
DECLARE
    arrando_user_id uuid;
    johnny_user_id uuid;
BEGIN
    -- Get the user ID for arrandobsonis@gmail.com
    SELECT id INTO arrando_user_id 
    FROM auth.users 
    WHERE email = 'arrandobsonis@gmail.com';
    
    -- Get the user ID for johnnydrumm@gmail.com
    SELECT id INTO johnny_user_id 
    FROM auth.users 
    WHERE email = 'johnnydrumm@gmail.com';
    
    -- Assign admin role to arrandobsonis@gmail.com if user exists
    IF arrando_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role, assigned_by)
        VALUES (arrando_user_id, 'admin', arrando_user_id)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
    
    -- Assign admin role to johnnydrumm@gmail.com if user exists
    IF johnny_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role, assigned_by)
        VALUES (johnny_user_id, 'admin', johnny_user_id)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END $$;