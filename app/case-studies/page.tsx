"use client"

import Link from 'next/link'
import { DataTable } from '@/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

type CaseRow = {
  name: string
  industry: string
  services: string
  href: string
}

const rows: CaseRow[] = [
  { name: 'Clinix AI', industry: 'Healthcare', services: 'AI, Web App', href: '/case-studies/clinix-ai' },
  { name: 'ShadowShield AI', industry: 'Security', services: 'AI, Security, Platform', href: '/case-studies/shadowshield-ai' },
  { name: 'Synergies4 AI', industry: 'Education', services: 'AI, LMS, Web App', href: '/case-studies/synergies4-ai' },
]

const columns: ColumnDef<CaseRow>[] = [
  {
    accessorKey: 'name',
    header: () => <span>Project Name</span>,
    cell: ({ row }) => (
      <Link href={row.original.href} className="text-white hover:text-[#a2a3e9]">
        {row.getValue('name') as string}
      </Link>
    ),
  },
  {
    accessorKey: 'industry',
    header: () => <span>Industry</span>,
  },
  {
    accessorKey: 'services',
    header: () => <span>Services</span>,
  },
  {
    id: 'link',
    header: () => <span>Case Study</span>,
    cell: ({ row }) => (
      <Link href={row.original.href} className="text-[#a2a3e9] hover:underline">
        View
      </Link>
    ),
    enableSorting: false,
    enableColumnFilter: false,
  },
]

export default function CaseStudiesIndexPage() {
  return (
    <main className="bg-[#000000] box-border flex flex-col items-start justify-start p-[80px] gap-12 w-full">
      <section className="w-full max-w-5xl mx-auto">
        <h1 className="font-['Manrope',sans-serif] font-semibold text-[48px] leading-[56px] tracking-[-0.48px] text-white">Case Studies</h1>
        <p className="mt-4 text-[#d7d7d7] text-[18px] leading-[28px]">Discover how we transform industries with cutting-edge AI solutions.</p>
        <div className="mt-8">
          <DataTable columns={columns} data={rows} filterPlaceholder="Search projects, industries, services..." />
        </div>
      </section>
    </main>
  )
}

