-- ShowTrackAI Database Schema
-- Run this in your Supabase SQL Editor to create all required tables

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- Create Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR NOT NULL,
    chapter VARCHAR,
    advisor_email VARCHAR,
    graduation_year INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Animals table
CREATE TABLE IF NOT EXISTS public.animals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name VARCHAR NOT NULL,
    species VARCHAR NOT NULL CHECK (species IN ('cattle', 'swine', 'sheep', 'goats', 'poultry')),
    breed VARCHAR,
    birth_date DATE,
    acquisition_date DATE NOT NULL,
    acquisition_cost DECIMAL(10,2),
    tag_number VARCHAR,
    sire VARCHAR,
    dam VARCHAR,
    photos JSONB DEFAULT '[]'::jsonb,
    notes TEXT,
    status VARCHAR DEFAULT 'active' CHECK (status IN ('active', 'sold', 'deceased')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Weight Records table
CREATE TABLE IF NOT EXISTS public.weight_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID REFERENCES public.animals(id) ON DELETE CASCADE,
    weight DECIMAL(8,2) NOT NULL,
    weight_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Health Records table
CREATE TABLE IF NOT EXISTS public.health_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    animal_id UUID REFERENCES public.animals(id) ON DELETE CASCADE,
    record_type VARCHAR NOT NULL CHECK (record_type IN ('vaccination', 'treatment', 'checkup')),
    date DATE NOT NULL,
    description TEXT NOT NULL,
    veterinarian VARCHAR,
    cost DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Journal Entries table
CREATE TABLE IF NOT EXISTS public.journal_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    activity_type VARCHAR NOT NULL,
    description TEXT NOT NULL,
    hours_spent DECIMAL(4,2),
    aet_skills JSONB DEFAULT '[]'::jsonb,
    animals_involved JSONB DEFAULT '[]'::jsonb,
    photos JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Expenses table
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    category VARCHAR NOT NULL CHECK (category IN ('feed', 'medical', 'equipment', 'show', 'other')),
    description TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    vendor VARCHAR,
    receipt_photo VARCHAR,
    animals_related JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create AET Skills table
CREATE TABLE IF NOT EXISTS public.aet_skills (
    id VARCHAR PRIMARY KEY,
    category VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description TEXT,
    level INTEGER NOT NULL CHECK (level BETWEEN 1 AND 4),
    hours_required DECIMAL(4,2) DEFAULT 0
);

-- Create User Skill Progress table
CREATE TABLE IF NOT EXISTS public.user_skill_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    skill_id VARCHAR REFERENCES public.aet_skills(id),
    hours_completed DECIMAL(4,2) DEFAULT 0,
    date_started DATE,
    date_completed DATE,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create FFA Degree Requirements table
CREATE TABLE IF NOT EXISTS public.ffa_degree_requirements (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    requirements JSONB NOT NULL,
    order_level INTEGER
);

-- Create User Degree Progress table
CREATE TABLE IF NOT EXISTS public.user_degree_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    degree_id VARCHAR REFERENCES public.ffa_degree_requirements(id),
    progress_data JSONB DEFAULT '{}'::jsonb,
    is_completed BOOLEAN DEFAULT FALSE,
    completion_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_animals_user_id ON public.animals(user_id);
CREATE INDEX IF NOT EXISTS idx_animals_species ON public.animals(species);
CREATE INDEX IF NOT EXISTS idx_animals_status ON public.animals(status);
CREATE INDEX IF NOT EXISTS idx_weight_records_animal_id ON public.weight_records(animal_id);
CREATE INDEX IF NOT EXISTS idx_weight_records_date ON public.weight_records(weight_date);
CREATE INDEX IF NOT EXISTS idx_health_records_animal_id ON public.health_records(animal_id);
CREATE INDEX IF NOT EXISTS idx_health_records_date ON public.health_records(date);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON public.journal_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_journal_entries_date ON public.journal_entries(entry_date);
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON public.expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON public.expenses(date);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON public.expenses(category);
CREATE INDEX IF NOT EXISTS idx_user_skill_progress_user_id ON public.user_skill_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_degree_progress_user_id ON public.user_degree_progress(user_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_animals_updated_at BEFORE UPDATE ON public.animals FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert sample AET skills
INSERT INTO public.aet_skills (id, category, title, description, level, hours_required) VALUES
('AN-101', 'Animal Science', 'Daily Animal Care', 'Basic feeding, watering, and general care routines', 1, 10),
('AN-102', 'Animal Science', 'Animal Nutrition', 'Understanding feed requirements and nutritional needs', 1, 15),
('AN-103', 'Animal Science', 'Animal Health', 'Basic health monitoring and disease prevention', 2, 20),
('AN-104', 'Animal Science', 'Livestock Handling', 'Safe and effective animal handling techniques', 2, 12),
('AN-201', 'Animal Science', 'Breeding Management', 'Reproductive management and breeding programs', 3, 25),
('AN-202', 'Animal Science', 'Livestock Showing', 'Show preparation and showmanship skills', 2, 18),
('BU-101', 'Business Management', 'Record Keeping', 'Maintaining accurate livestock records', 1, 8),
('BU-102', 'Business Management', 'Financial Management', 'Cost analysis and budget planning', 2, 15),
('BU-103', 'Business Management', 'Data Analysis', 'Interpreting production and financial data', 3, 12),
('FA-101', 'Facilities Management', 'Facility Management', 'Maintenance and organization of livestock facilities', 1, 10),
('FA-102', 'Facilities Management', 'Equipment Maintenance', 'Care and repair of farm equipment', 2, 15),
('FA-103', 'Facilities Management', 'Safety Procedures', 'Farm safety protocols and emergency procedures', 1, 8),
('LD-101', 'Leadership', 'Leadership Development', 'FFA leadership skills and activities', 2, 20),
('LD-102', 'Leadership', 'Communication Skills', 'Public speaking and interpersonal communication', 2, 15)
ON CONFLICT (id) DO NOTHING;

-- Insert FFA degree requirements
INSERT INTO public.ffa_degree_requirements (id, name, description, requirements, order_level) VALUES
('greenhand', 'Greenhand FFA Degree', 'The first degree available to FFA members', '{
  "enrollment": "Be enrolled in agricultural education",
  "plans": "Have satisfactory plans for a supervised agricultural experience (SAE)",
  "participation": "Participate in the activities of the local FFA chapter",
  "application": "Submit a complete Greenhand FFA Degree application"
}', 1),
('chapter', 'Chapter FFA Degree', 'Recognition at the local chapter level', '{
  "greenhand": "Hold the Greenhand FFA Degree",
  "months": "Have been an active FFA member for at least seven months",
  "instruction": "Have completed at least 180 hours of systematic school instruction in agricultural education",
  "sae": "Have an approved SAE in operation",
  "participation": "Participate in the planning and conducting of at least three official functions in the chapter program of activities",
  "earnings": "Have earned and productively invested at least $150 or worked at least 45 hours outside of scheduled class time"
}', 2),
('state', 'State FFA Degree', 'Recognition at the state level', '{
  "chapter": "Hold the Chapter FFA Degree",
  "years": "Have been an active FFA member for at least two years",
  "instruction": "Have completed at least 360 hours of systematic school instruction in agricultural education",
  "sae": "Have an outstanding SAE in operation",
  "earnings": "Have earned and productively invested at least $1,000 or worked at least 300 hours outside of scheduled class time",
  "leadership": "Demonstrate leadership ability by performing 10 procedures of parliamentary law, giving a six-minute speech or conducting a 30-minute demonstration, or serving as an officer"
}', 3),
('american', 'American FFA Degree', 'The highest degree available to FFA members', '{
  "state": "Hold the State FFA Degree",
  "graduation": "Have graduated from high school at least 12 months prior to the national convention",
  "enrollment": "Have been enrolled in agricultural education for three years",
  "sae": "Have an outstanding SAE in operation for three years or completed an outstanding SAE project",
  "earnings": "Have earned and productively invested at least $7,500 or earned and productively invested at least $1,500 and worked 2,250 hours beyond scheduled class time",
  "scholarship": "Have a high school scholastic record of B or above",
  "leadership": "Demonstrate outstanding leadership abilities and community involvement"
}', 4)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weight_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skill_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_degree_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Users table policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Animals table policies
CREATE POLICY "Users can view own animals" ON public.animals
    FOR ALL USING (auth.uid()::text = user_id::text);

-- Weight records policies
CREATE POLICY "Users can manage weight records for own animals" ON public.weight_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.animals 
            WHERE animals.id = weight_records.animal_id 
            AND animals.user_id::text = auth.uid()::text
        )
    );

-- Health records policies
CREATE POLICY "Users can manage health records for own animals" ON public.health_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.animals 
            WHERE animals.id = health_records.animal_id 
            AND animals.user_id::text = auth.uid()::text
        )
    );

-- Journal entries policies
CREATE POLICY "Users can manage own journal entries" ON public.journal_entries
    FOR ALL USING (auth.uid()::text = user_id::text);

-- Expenses policies
CREATE POLICY "Users can manage own expenses" ON public.expenses
    FOR ALL USING (auth.uid()::text = user_id::text);

-- User skill progress policies
CREATE POLICY "Users can manage own skill progress" ON public.user_skill_progress
    FOR ALL USING (auth.uid()::text = user_id::text);

-- User degree progress policies
CREATE POLICY "Users can manage own degree progress" ON public.user_degree_progress
    FOR ALL USING (auth.uid()::text = user_id::text);

-- Public read access for reference tables
CREATE POLICY "AET skills are publicly readable" ON public.aet_skills
    FOR SELECT USING (true);

CREATE POLICY "FFA degree requirements are publicly readable" ON public.ffa_degree_requirements
    FOR SELECT USING (true);

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
('animal-photos', 'animal-photos', true),
('receipt-photos', 'receipt-photos', false),
('journal-photos', 'journal-photos', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload animal photos" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'animal-photos' AND
        auth.role() = 'authenticated'
    );

CREATE POLICY "Users can view animal photos" ON storage.objects
    FOR SELECT USING (bucket_id = 'animal-photos');

CREATE POLICY "Users can upload receipt photos" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'receipt-photos' AND
        auth.role() = 'authenticated'
    );

CREATE POLICY "Users can view own receipt photos" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'receipt-photos' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can upload journal photos" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'journal-photos' AND
        auth.role() = 'authenticated'
    );

CREATE POLICY "Users can view own journal photos" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'journal-photos' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- Create views for dashboard analytics
CREATE OR REPLACE VIEW user_dashboard_stats AS
SELECT 
    u.id as user_id,
    COUNT(DISTINCT a.id) as total_animals,
    COUNT(DISTINCT CASE WHEN a.status = 'active' THEN a.id END) as active_animals,
    COALESCE(SUM(e.amount), 0) as total_expenses,
    COALESCE(SUM(CASE WHEN e.date >= date_trunc('month', CURRENT_DATE) THEN e.amount ELSE 0 END), 0) as monthly_expenses,
    COUNT(DISTINCT j.id) as journal_entries,
    COALESCE(SUM(usp.hours_completed), 0) as aet_hours,
    COUNT(DISTINCT CASE WHEN usp.is_completed THEN usp.skill_id END) as completed_skills
FROM public.users u
LEFT JOIN public.animals a ON u.id = a.user_id
LEFT JOIN public.expenses e ON u.id = e.user_id
LEFT JOIN public.journal_entries j ON u.id = j.user_id
LEFT JOIN public.user_skill_progress usp ON u.id = usp.user_id
GROUP BY u.id;

COMMENT ON DATABASE postgres IS 'ShowTrackAI - FFA Livestock Management Platform Database';

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';