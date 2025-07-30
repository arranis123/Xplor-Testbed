-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'creator', 'user');

-- Create subscription tiers enum
CREATE TYPE public.subscription_tier AS ENUM ('free', 'basic', 'premium', 'enterprise');

-- Create account status enum
CREATE TYPE public.account_status AS ENUM ('active', 'suspended', 'banned', 'pending_verification');

-- Create property types enum
CREATE TYPE public.property_type AS ENUM ('hotel', 'vacation_rental', 'commercial', 'residential', 'event_venue', 'restaurant');

-- Create tour status enum
CREATE TYPE public.tour_status AS ENUM ('draft', 'pending_approval', 'published', 'flagged', 'archived');

-- User profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  phone TEXT,
  avatar_url TEXT,
  account_status account_status DEFAULT 'active',
  subscription_tier subscription_tier DEFAULT 'free',
  subscription_end TIMESTAMPTZ,
  storage_used BIGINT DEFAULT 0,
  tour_count INTEGER DEFAULT 0,
  last_login TIMESTAMPTZ,
  email_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  assigned_by UUID REFERENCES public.profiles(id),
  assigned_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Admin notes table
CREATE TABLE public.admin_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  note TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tours table
CREATE TABLE public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  property_type property_type,
  region TEXT,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  vr_link TEXT,
  thumbnail_url TEXT,
  pricing DECIMAL(10, 2),
  status tour_status DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  dwell_time_avg INTEGER DEFAULT 0, -- in seconds
  share_count INTEGER DEFAULT 0,
  lead_count INTEGER DEFAULT 0,
  storage_size BIGINT DEFAULT 0,
  tags TEXT[],
  metadata JSONB,
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Hotel parent listings
CREATE TABLE public.hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  brand TEXT,
  address TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  amenities TEXT[],
  policies TEXT[],
  contact_info JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Hotel child spaces (rooms, restaurants, etc.)
CREATE TABLE public.hotel_spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE,
  tour_id UUID REFERENCES public.tours(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  type TEXT, -- room, restaurant, spa, etc.
  description TEXT,
  capacity INTEGER,
  amenities TEXT[],
  pricing DECIMAL(10, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Categories and taxonomy
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL, -- 'property_type', 'hotel_type', 'room_type', 'amenity', 'policy', 'tag'
  name TEXT NOT NULL,
  parent_id UUID REFERENCES public.categories(id),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Analytics and reporting
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL, -- 'view', 'share', 'lead', 'bookmark'
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  duration INTEGER, -- for views, in seconds
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Leads and inquiries
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_id UUID REFERENCES public.tours(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'closed'
  source TEXT, -- 'tour_view', 'contact_form', etc.
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- System settings
CREATE TABLE public.system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit log
CREATE TABLE public.audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Function to check if user has specific role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Admins can update all profiles" ON public.profiles
  FOR UPDATE USING (public.is_admin());

-- RLS Policies for user_roles
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.is_admin());

-- RLS Policies for admin_notes
CREATE POLICY "Admins can manage notes" ON public.admin_notes
  FOR ALL USING (public.is_admin());

-- RLS Policies for tours
CREATE POLICY "Users can view their own tours" ON public.tours
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all tours" ON public.tours
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Published tours are public" ON public.tours
  FOR SELECT USING (status = 'published');

CREATE POLICY "Users can manage their own tours" ON public.tours
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all tours" ON public.tours
  FOR ALL USING (public.is_admin());

-- RLS Policies for hotels
CREATE POLICY "Users can view their own hotels" ON public.hotels
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all hotels" ON public.hotels
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Users can manage their own hotels" ON public.hotels
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all hotels" ON public.hotels
  FOR ALL USING (public.is_admin());

-- RLS Policies for hotel_spaces
CREATE POLICY "Hotel spaces are viewable by hotel owners" ON public.hotel_spaces
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.hotels 
      WHERE id = hotel_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all hotel spaces" ON public.hotel_spaces
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Hotel owners can manage their spaces" ON public.hotel_spaces
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.hotels 
      WHERE id = hotel_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all hotel spaces" ON public.hotel_spaces
  FOR ALL USING (public.is_admin());

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "Categories are publicly readable" ON public.categories
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (public.is_admin());

-- RLS Policies for analytics_events
CREATE POLICY "Users can view events for their tours" ON public.analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tours 
      WHERE id = tour_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all analytics" ON public.analytics_events
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Analytics events can be inserted" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

-- RLS Policies for leads
CREATE POLICY "Users can view leads for their tours" ON public.leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tours 
      WHERE id = tour_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all leads" ON public.leads
  FOR SELECT USING (public.is_admin());

CREATE POLICY "Leads can be inserted" ON public.leads
  FOR INSERT WITH CHECK (true);

-- RLS Policies for system_settings
CREATE POLICY "Admins can manage system settings" ON public.system_settings
  FOR ALL USING (public.is_admin());

-- RLS Policies for audit_log
CREATE POLICY "Admins can view audit log" ON public.audit_log
  FOR SELECT USING (public.is_admin());

CREATE POLICY "System can insert audit log" ON public.audit_log
  FOR INSERT WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON public.tours
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hotels_updated_at BEFORE UPDATE ON public.hotels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_hotel_spaces_updated_at BEFORE UPDATE ON public.hotel_spaces
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.categories (type, name, description) VALUES
  ('property_type', 'Hotel', 'Hotel properties'),
  ('property_type', 'Vacation Rental', 'Short-term rental properties'),
  ('property_type', 'Commercial', 'Commercial properties'),
  ('property_type', 'Residential', 'Residential properties'),
  ('property_type', 'Event Venue', 'Event and wedding venues'),
  ('property_type', 'Restaurant', 'Dining establishments'),
  ('amenity', 'WiFi', 'Wireless internet'),
  ('amenity', 'Pool', 'Swimming pool'),
  ('amenity', 'Gym', 'Fitness center'),
  ('amenity', 'Spa', 'Spa services'),
  ('amenity', 'Pet Friendly', 'Pets allowed'),
  ('amenity', 'Ocean View', 'Ocean view rooms'),
  ('policy', 'No Smoking', 'Non-smoking property'),
  ('policy', 'Check-in 3PM', 'Standard check-in time'),
  ('policy', 'Check-out 11AM', 'Standard check-out time');

-- Insert system settings
INSERT INTO public.system_settings (key, value, description) VALUES
  ('storage_limits', '{"free": 1073741824, "basic": 5368709120, "premium": 21474836480, "enterprise": 107374182400}', 'Storage limits per tier in bytes'),
  ('upload_limits', '{"free": 104857600, "basic": 524288000, "premium": 1073741824, "enterprise": 2147483648}', 'Single upload limits per tier in bytes'),
  ('features', '{"free": ["basic_tours"], "basic": ["basic_tours", "analytics"], "premium": ["basic_tours", "analytics", "custom_branding"], "enterprise": ["all"]}', 'Features available per tier');