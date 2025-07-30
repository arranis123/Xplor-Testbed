-- Make info@xplor.io admin and restrict admin privileges to only 3 specific users
DO $$
DECLARE
    info_user_id uuid;
    johnny_user_id uuid;
    first_user_id uuid;
BEGIN
    -- Get user IDs for the specific email addresses
    SELECT id INTO info_user_id 
    FROM auth.users 
    WHERE email = 'info@xplor.io';
    
    SELECT id INTO johnny_user_id 
    FROM auth.users 
    WHERE email = 'johnnydrumm@gmail.com';
    
    SELECT id INTO first_user_id 
    FROM auth.users 
    ORDER BY created_at ASC 
    LIMIT 1;
    
    -- Assign admin role to info@xplor.io if they exist
    IF info_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role, assigned_by)
        VALUES (info_user_id, 'admin', info_user_id)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
    
    -- Ensure johnny has admin role if they exist
    IF johnny_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role, assigned_by)
        VALUES (johnny_user_id, 'admin', johnny_user_id)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
    
    -- Ensure first user has admin role if they exist
    IF first_user_id IS NOT NULL THEN
        INSERT INTO public.user_roles (user_id, role, assigned_by)
        VALUES (first_user_id, 'admin', first_user_id)
        ON CONFLICT (user_id, role) DO NOTHING;
    END IF;
END $$;

-- Remove admin privileges from any users not in the allowed list
DELETE FROM public.user_roles 
WHERE role = 'admin' 
AND user_id NOT IN (
    SELECT id FROM auth.users 
    WHERE email IN ('johnnydrumm@gmail.com', 'info@xplor.io') 
    OR id = (SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1)
);

-- Create a function to check if a user is allowed to be admin
CREATE OR REPLACE FUNCTION public.is_allowed_admin_user(user_email text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT user_email IN ('johnnydrumm@gmail.com', 'info@xplor.io') 
  OR user_email = (SELECT email FROM auth.users ORDER BY created_at ASC LIMIT 1);
$$;

-- Create a trigger to prevent unauthorized admin role assignments
CREATE OR REPLACE FUNCTION public.prevent_unauthorized_admin_assignment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_email text;
BEGIN
    -- Only check for admin role assignments
    IF NEW.role = 'admin' THEN
        -- Get the user's email
        SELECT email INTO user_email 
        FROM auth.users 
        WHERE id = NEW.user_id;
        
        -- Check if this user is allowed to be admin
        IF NOT public.is_allowed_admin_user(user_email) THEN
            RAISE EXCEPTION 'Admin privileges can only be assigned to authorized users';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Apply the trigger to the user_roles table
DROP TRIGGER IF EXISTS check_admin_assignment ON public.user_roles;
CREATE TRIGGER check_admin_assignment
    BEFORE INSERT OR UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_unauthorized_admin_assignment();