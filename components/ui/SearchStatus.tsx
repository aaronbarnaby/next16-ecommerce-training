import { Loader2, Search } from 'lucide-react';
import React from 'react';
import { useFormStatus } from 'react-dom';

export default function SearchStatus({ searching = false }: { searching?: boolean }) {
  const { pending } = useFormStatus();
  const isSearching = searching || pending;

  return (
    <>
      {isSearching ? (
        <div aria-label="searching..." className="h-fit w-fit animate-spin">
          <Loader2 aria-hidden="true" width={16} height={16} className="text-gray" />
        </div>
      ) : (
        <Search aria-hidden="true" width={16} height={16} className="text-gray" />
      )}
    </>
  );
}
