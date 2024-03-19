import React from 'react';
import Fuse from 'fuse.js';

interface FuseHighlightProps {
  hit: Fuse.FuseResult<any>;
  attribute: string;
}

function resolveAttribute<T>(obj: T, key: string): any {
  return key.split('.').reduce((prev: any, curr: string) => prev?.[curr], obj);
}

const highlightText = (value: string, indices: readonly number[][], i: number = 1): JSX.Element => {
  const pair = indices[indices.length - i];
  if (!pair) return <>{value}</>;

  return (
    <>
      {highlightText(value.substring(0, pair[0]), indices, i + 1)}
      <mark className="bg-yellow-300">{value.substring(pair[0], pair[1] + 1)}</mark>
      {value.substring(pair[1] + 1)}
    </>
  );
};

const Highlight: React.FC<FuseHighlightProps> = ({ hit, attribute }) => {
  const matches = hit.matches?.find((m) => m.key === attribute);
  const value = typeof hit.item === 'string' ? hit.item : resolveAttribute(hit.item, attribute);

  return highlightText(value, matches?.indices || []);
};

export { Highlight };
