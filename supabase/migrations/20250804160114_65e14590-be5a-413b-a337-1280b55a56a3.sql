-- Create storage buckets for different types of uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('space-images', 'space-images', true),
  ('space-videos', 'space-videos', true),
  ('space-documents', 'space-documents', true),
  ('space-tours', 'space-tours', true);

-- Create policies for space images bucket
CREATE POLICY "Allow public read access on space images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'space-images');

CREATE POLICY "Allow authenticated users to upload space images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'space-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to update their own space images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'space-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to delete their own space images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'space-images' AND auth.role() = 'authenticated');

-- Create policies for space videos bucket
CREATE POLICY "Allow public read access on space videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'space-videos');

CREATE POLICY "Allow authenticated users to upload space videos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'space-videos' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to update their own space videos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'space-videos' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to delete their own space videos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'space-videos' AND auth.role() = 'authenticated');

-- Create policies for space documents bucket
CREATE POLICY "Allow public read access on space documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'space-documents');

CREATE POLICY "Allow authenticated users to upload space documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'space-documents' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to update their own space documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'space-documents' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to delete their own space documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'space-documents' AND auth.role() = 'authenticated');

-- Create policies for space tours bucket
CREATE POLICY "Allow public read access on space tours" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'space-tours');

CREATE POLICY "Allow authenticated users to upload space tours" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'space-tours' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to update their own space tours" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'space-tours' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to delete their own space tours" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'space-tours' AND auth.role() = 'authenticated');