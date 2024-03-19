import React, { useMemo } from 'react';
import Fuse from 'fuse.js';

interface UseSearchProps<T> {
  list: T[];
  fuseOptions: Fuse.IFuseOptions<T>;
  searchValue: string;
}

const useSearch = <T>({ list, fuseOptions, searchValue }: UseSearchProps<T>) => {
  const fuse = useMemo(() => new Fuse(list, fuseOptions), [list, fuseOptions]);

  const results = useMemo(() => {
    return fuse.search(searchValue);
  }, [fuse, searchValue]);

  return results;
};

export default useSearch;
