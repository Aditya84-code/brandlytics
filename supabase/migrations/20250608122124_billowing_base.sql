/*
  # Fix signup trigger for profiles table

  1. Database Functions
    - Recreate `handle_new_user()` function to ensure it works correctly
    - This function automatically creates a profile when a new user signs up

  2. Database Triggers
    - Create trigger `on_auth_user_created` on `auth.users` table
    - This trigger calls `handle_new_user()` after each user insertion

  3. Security
    - Ensure the function has proper security definer permissions
*/

-- Recreate the handle_new_user function to ensure it works correctly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger that calls handle_new_user when a new user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();