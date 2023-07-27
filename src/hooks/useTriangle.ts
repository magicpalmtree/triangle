import { useState, useMemo, useCallback } from 'react';
import { parseTriangleText, validateTriangleText, findMaxTotalAndPath } from '@/helpers/utils';

interface UseTriangleReturn {
  triangle: number[][];
  maxTotal: number;
  path: number[];
  setTriangle: (raw: string) => void;
}

export default function useTriangle(initialRawText: string = '5\n9 6\n4 6 8\n0 7 1 5\n8 3 1 1 2'): UseTriangleReturn {
  const [triangle, setTriangle] = useState<number[][]>(parseTriangleText(initialRawText));
  const { maxTotal, path } = useMemo(() => findMaxTotalAndPath(triangle), [triangle]);

  const parseTriangle = useCallback((raw: string) => {
    if (!validateTriangleText(raw)) {
      throw new Error('Invalid Triangle File');
    }

    setTriangle(parseTriangleText(raw));
  }, []);

  return {
    triangle,
    maxTotal,
    path,
    setTriangle: parseTriangle,
  };
}
