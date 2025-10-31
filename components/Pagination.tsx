'use client';

import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import type { SearchParams } from '@/features/product/components/ProductList';

export default function Pagination({
  currentPage,
  totalPages,
  searchParams,
}: {
  currentPage: number;
  totalPages: number;
  searchParams: SearchParams;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const createPageUrl = (page: number) => {
    const query: Record<string, string> = {};
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'page' && value) {
        query[key] = value.toString();
      }
    });
    if (page > 1) {
      query.page = page.toString();
    }
    return {
      pathname: '/all',
      query,
    };
  };

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== 'page' && value) params.set(key, value.toString());
    });
    if (page > 1) params.set('page', page.toString());
    router.push(`/all?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      {currentPage > 1 && (
        <Link
          onClick={e => {
            e.preventDefault();
            startTransition(() => {
              navigateToPage(currentPage - 1);
            });
          }}
          scroll={false}
          href={createPageUrl(currentPage - 1)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium"
        >
          Previous
        </Link>
      )}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => {
          return i + 1;
        }).map(page => {
          return (
            <Link scroll={false} key={page} href={createPageUrl(page)}>
              <div
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  page === currentPage
                    ? 'bg-primary text-white dark:text-black'
                    : 'text-primary hover:text-primary-dark'
                }`}
              >
                {page}
              </div>
            </Link>
          );
        })}
      </div>
      {currentPage < totalPages && (
        <Link
          onClick={e => {
            e.preventDefault();
            startTransition(() => {
              navigateToPage(currentPage + 1);
            });
          }}
          scroll={false}
          href={createPageUrl(currentPage + 1)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium"
        >
          Next
        </Link>
      )}
      {isPending && (
        <div className="text-gray h-fit w-fit animate-spin">
          <LoaderCircle aria-hidden="true" width={20} height={20} />
        </div>
      )}
    </div>
  );
}
