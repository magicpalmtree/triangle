import { type Node } from 'reactflow';

export const validateTriangleText = (text: string): boolean =>
  text
    .trim()
    .split('\n')
    .every((line, idx) => {
      const items = line.trim().split(' ');
      return items.length === idx + 1 && items.every((item) => !Number.isNaN(parseInt(item)));
    });

export const findMaxTotalAndPath = (triangle: number[][]): { maxTotal: number; path: number[] } => {
  const copyTriangle = triangle.map((row) => row.slice());
  for (let row = copyTriangle.length - 2; row >= 0; row--) {
    for (let col = 0; col < copyTriangle[row].length; col++) {
      copyTriangle[row][col] += Math.max(copyTriangle[row + 1][col], copyTriangle[row + 1][col + 1]);
    }
  }

  const path = [0];
  let colIndex = 0;
  for (let row = 1; row < copyTriangle.length; row++) {
    if (copyTriangle[row][colIndex + 1] > copyTriangle[row][colIndex]) {
      colIndex++;
    }

    path.push(colIndex);
  }

  return {
    maxTotal: copyTriangle[0][0],
    path,
  };
};

export const generateNodes = (triangle: number[][], path: number[] = [], gap = 30): Node[] =>
  triangle.reduce(
    (nodes, row, rowIdx) =>
      nodes.concat(
        row.map((col, colIdx) => ({
          id: `${rowIdx}-${colIdx}`,
          position: { x: 0 - (gap / 2) * rowIdx + gap * colIdx, y: Math.sin(60 * (Math.PI / 180)) * gap * rowIdx },
          data: {
            value: col,
          },
          type: 'content',
          draggable: false,
          connectable: false,
          selectable: false,
          deletable: false,
          style: {
            borderRadius: '100%',
            backgroundColor: colIdx === path[rowIdx] ? '#aaf' : '#fff',
            border: '1px solid #ddd',
            width: gap * 0.9,
            height: gap * 0.9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
          },
        })),
        [],
      ),
    [] as Node[],
  );
