import { useState, useMemo, useCallback } from 'react';
import { validateTriangleText, findMaxTotalAndPath } from '@/helpers/utils';

interface UseTriangleReturn {
  triangle: number[][];
  maxTotal: number;
  path: number[];
  setTriangle: (raw: string) => boolean;
}

export default function useTriangle(initialRawText: string = '5\n9 6\n4 6 8\n0 7 1 5\n8 3 1 1 2'): UseTriangleReturn {
  const [raw, setRaw] = useState<string>(initialRawText);
  const triangle: number[][] = useMemo(
    () =>
      raw
        .trim()
        .split('\n')
        .map((line) =>
          line
            .trim()
            .split(' ')
            .map((item) => parseInt(item)),
        ),
    [raw],
  );
  const { maxTotal, path } = useMemo(() => findMaxTotalAndPath(triangle), [triangle]);

  const setTriangle = useCallback((raw: string): boolean => {
    if (!validateTriangleText(raw)) {
      return false;
    }

    setRaw(raw);
    return true;
  }, []);

  return {
    triangle,
    maxTotal,
    path,
    setTriangle,
  };
}
