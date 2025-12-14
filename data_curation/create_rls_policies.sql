-- RLS Policies for opennutrition_foods table
-- This allows public read access to the nutrition database

-- Enable RLS on the table (if not already enabled)
ALTER TABLE opennutrition_foods ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to SELECT (read) from opennutrition_foods
-- This makes the nutrition database publicly readable
CREATE POLICY "Allow public read access to opennutrition_foods"
ON opennutrition_foods
FOR SELECT
TO public
USING (true);

-- Optional: If you want to restrict writes, you can add policies like:
-- CREATE POLICY "Allow authenticated users to insert"
-- ON opennutrition_foods
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (true);

-- Optional: If you want to restrict updates/deletes:
-- CREATE POLICY "Allow authenticated users to update"
-- ON opennutrition_foods
-- FOR UPDATE
-- TO authenticated
-- USING (true);

-- CREATE POLICY "Allow authenticated users to delete"
-- ON opennutrition_foods
-- FOR DELETE
-- TO authenticated
-- USING (true);
