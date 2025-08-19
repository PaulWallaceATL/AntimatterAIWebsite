-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Contact submissions table
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Profiles table (optional for user management)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) policies
alter table contact_submissions enable row level security;
alter table profiles enable row level security;

-- Contact submissions policies (allow insert for all, select for authenticated users)
create policy "Anyone can submit contact forms" on contact_submissions
  for insert with check (true);

create policy "Authenticated users can view contact submissions" on contact_submissions
  for select using (auth.role() = 'authenticated');

-- Profiles policies
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- Create indexes for better performance
create index if not exists contact_submissions_created_at_idx on contact_submissions (created_at desc);
create index if not exists profiles_email_idx on profiles (email); 