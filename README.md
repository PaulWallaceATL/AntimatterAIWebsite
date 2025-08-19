# Antimatter AI Website

A modern, responsive website for Antimatter AI built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, and Tailwind CSS
- **Design System**: Custom design tokens based on Figma specifications
- **Database Integration**: Supabase for backend functionality
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Performance Optimized**: Built for speed and SEO
- **Vercel Ready**: Optimized for deployment on Vercel

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Font**: Manrope (Google Fonts)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd antimatter-ai-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄️ Database Setup

The project uses Supabase for database functionality. You'll need to create the following tables:

### Contact Submissions Table
```sql
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Profiles Table (Optional for user management)
```sql
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## 🎨 Design System

The project implements a comprehensive design system based on Figma specifications:

### Colors
- **Main Brand**: `#696AAC` (main-3), `#A2A3E9` (main-4), `#C7C8F2` (main-5), `#F6F6FD` (main-7)
- **Neutrals**: `#000000` (neutral-1) to `#FFFFFF` (neutral-7)

### Typography
- **Font**: Manrope (Regular 400, SemiBold 600)
- **Headings**: H1 (64px) to H7 (20px)
- **Body**: 12px to 18px with variants

### Components
- Reusable UI components in `/components/ui/`
- Layout components in `/components/layout/`
- All components use the design system tokens

## 📁 Project Structure

```
antimatter-ai-website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer)
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions and configurations
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Utility functions
├── public/               # Static assets
│   └── assets/           # Images and other assets
└── [config files]        # Various configuration files
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
npm run start
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🆘 Support

For support, email support@antimatter-ai.com or open an issue in the repository. 