import { SearchSkeleton } from '@/components/Search';
import { SortButtonSkeleton } from '@/components/SortButton';
import { CategoryFiltersSkeleton } from '@/features/category/components/CategoryFilters';
import { ProductListSkeleton } from '@/features/product/components/ProductList';

export default function Loading() {
  return (
    <>
      <SearchSkeleton />
      <div className="flex h-full grow gap-12">
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-4">
            <h3 className="mb-5 text-lg font-bold tracking-tight uppercase">Categories</h3>
            <CategoryFiltersSkeleton />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 lg:hidden">
            <CategoryFiltersSkeleton />
            <div className="flex justify-end">
              <SortButtonSkeleton />
            </div>
          </div>
          <div className="hidden justify-end lg:flex">
            <SortButtonSkeleton />
          </div>
          <ProductListSkeleton />
        </div>
      </div>
    </>
  );
}
