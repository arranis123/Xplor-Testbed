-- Phase 1: Fix Critical Admin Role Security Issues

-- First, let's create a more secure trigger for user role assignments
-- This trigger will prevent unauthorized admin role assignments
CREATE OR REPLACE FUNCTION public.prevent_unauthorized_admin_assignment()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    user_email text;
    current_user_email text;
BEGIN
    -- Only check for admin role assignments
    IF NEW.role = 'admin' THEN
        -- Get the target user's email
        SELECT email INTO user_email 
        FROM auth.users 
        WHERE id = NEW.user_id;
        
        -- Get the current user's email (the one making the assignment)
        SELECT email INTO current_user_email
        FROM auth.users 
        WHERE id = auth.uid();
        
        -- Check if the target user is allowed to be admin
        IF NOT public.is_allowed_admin_user(user_email) THEN
            RAISE EXCEPTION 'Admin privileges can only be assigned to authorized users: %', user_email;
        END IF;
        
        -- Check if the current user is authorized to assign admin roles
        -- Only existing admins or system can assign admin roles
        IF NOT public.is_allowed_admin_user(current_user_email) AND auth.uid() IS NOT NULL THEN
            RAISE EXCEPTION 'Only authorized administrators can assign admin privileges';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$;

-- Create the trigger on user_roles table
DROP TRIGGER IF EXISTS prevent_admin_privilege_escalation ON public.user_roles;
CREATE TRIGGER prevent_admin_privilege_escalation
    BEFORE INSERT OR UPDATE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.prevent_unauthorized_admin_assignment();

-- Phase 2: Fix Database Function Security by adding proper search_path

-- Update the update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Update the is_allowed_admin_user function
CREATE OR REPLACE FUNCTION public.is_allowed_admin_user(user_email text)
RETURNS boolean
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path TO 'public'
AS $$
    SELECT user_email IN ('johnnydrumm@gmail.com', 'info@xplor.io') 
    OR user_email = (SELECT email FROM auth.users ORDER BY created_at ASC LIMIT 1);
$$;

-- Update the has_role function  
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE 
SECURITY DEFINER
SET search_path TO 'public'
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id
          AND role = _role
    )
$$;

-- Phase 3: Add audit logging for role changes
CREATE TABLE IF NOT EXISTS public.role_change_audit (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    target_user_id uuid NOT NULL,
    target_user_email text NOT NULL,
    admin_user_id uuid,
    admin_user_email text,
    role_assigned app_role NOT NULL,
    action text NOT NULL, -- 'GRANTED' or 'REVOKED'
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    ip_address inet,
    user_agent text
);

-- Enable RLS on audit table
ALTER TABLE public.role_change_audit ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view role audit logs" 
ON public.role_change_audit 
FOR SELECT 
USING (is_admin());

-- Create function to log role changes
CREATE OR REPLACE FUNCTION public.log_role_change()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
    target_email text;
    admin_email text;
BEGIN
    -- Get user emails
    SELECT email INTO target_email FROM auth.users WHERE id = COALESCE(NEW.user_id, OLD.user_id);
    SELECT email INTO admin_email FROM auth.users WHERE id = auth.uid();
    
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.role_change_audit (
            target_user_id, 
            target_user_email, 
            admin_user_id, 
            admin_user_email, 
            role_assigned, 
            action
        ) VALUES (
            NEW.user_id, 
            target_email, 
            auth.uid(), 
            admin_email, 
            NEW.role, 
            'GRANTED'
        );
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO public.role_change_audit (
            target_user_id, 
            target_user_email, 
            admin_user_id, 
            admin_user_email, 
            role_assigned, 
            action
        ) VALUES (
            OLD.user_id, 
            target_email, 
            auth.uid(), 
            admin_email, 
            OLD.role, 
            'REVOKED'
        );
        RETURN OLD;
    END IF;
    
    RETURN NULL;
END;
$$;

-- Create audit trigger
CREATE TRIGGER role_change_audit_trigger
    AFTER INSERT OR DELETE ON public.user_roles
    FOR EACH ROW
    EXECUTE FUNCTION public.log_role_change();

-- Phase 4: Strengthen RLS policies on user_roles table
-- Drop existing policies and recreate with tighter controls
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- More restrictive policies
CREATE POLICY "Admins can view all roles" 
ON public.user_roles 
FOR SELECT 
USING (is_admin());

CREATE POLICY "Admins can insert roles with restrictions" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (
    is_admin() AND 
    (role != 'admin' OR is_allowed_admin_user((SELECT email FROM auth.users WHERE id = user_id)))
);

CREATE POLICY "Admins can update roles with restrictions" 
ON public.user_roles 
FOR UPDATE 
USING (is_admin())
WITH CHECK (
    is_admin() AND 
    (role != 'admin' OR is_allowed_admin_user((SELECT email FROM auth.users WHERE id = user_id)))
);

CREATE POLICY "Admins can delete roles" 
ON public.user_roles 
FOR DELETE 
USING (is_admin());