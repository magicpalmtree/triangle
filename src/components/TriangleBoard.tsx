import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ReactFlow, Background, Controls, ControlButton, Panel, useReactFlow } from 'reactflow';
import { FolderOpenIcon } from '@heroicons/react/24/outline';
import ErrorModal from '@/components/ErrorModal';
import useTriangle from '@/hooks/useTriangle';
import { generateNodes } from '@/helpers/utils';

export default function TriangleBoard() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const { fitView } = useReactFlow();
  const { triangle, maxTotal, path, setTriangle } = useTriangle();
  const nodes = useMemo(() => generateNodes(triangle, path), [triangle, path]);

  const ContentOnlyNode = ({ data: { value } }: { data: { value: number } }) => <>{value}</>;
  const nodeTypes = useMemo(() => ({ content: ContentOnlyNode }), []);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = function () {
        if (typeof this.result !== 'string' || !setTriangle(this.result)) {
          e.target.value = '';
          setShowError(true);
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <ReactFlow className="grow" nodeTypes={nodeTypes} nodes={nodes} onNodesChange={() => fitView()}>
      <Controls showInteractive={false}>
        <ControlButton onClick={() => fileRef.current?.click()} title="action">
          <input ref={fileRef} type="file" className="sr-only" onChange={handleChangeFile} />
          <FolderOpenIcon className="mx-auto h-12 w-12" />
        </ControlButton>
      </Controls>
      <Panel position="top-left">{maxTotal}</Panel>
      <Background />

      <ErrorModal open={showError} onClose={() => setShowError(false)} />
    </ReactFlow>
  );
}
