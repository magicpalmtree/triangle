import { useState, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { useTimeoutFn } from 'react-use';
import { ReactFlow, Background, Controls, ControlButton, Panel, useReactFlow } from 'reactflow';
import { FolderOpenIcon } from '@heroicons/react/24/outline';
import ErrorNotification from '@/components/ErrorNotification';
import useTriangle from '@/hooks/useTriangle';
import { generateNodes } from '@/helpers/utils';

export default function TriangleBoard() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const { fitView } = useReactFlow();
  const { triangle, maxTotal, path, setTriangle } = useTriangle();
  const nodes = useMemo(() => generateNodes(triangle, path), [triangle, path]);

  const ContentOnlyNode = ({
    data: { value, row, active },
  }: {
    data: { value: number; row: number; active: boolean };
  }) => {
    const [show, setShow] = useState<boolean>(false);
    useTimeoutFn(() => active && setShow(true), row * 100);

    return (
      <div
        className={clsx(
          'flex h-full w-full items-center justify-center rounded-full border border-dotted text-[9px]',
          show && 'animate-pulse bg-rose-400',
          !show && 'bg-white',
        )}
      >
        {value}
      </div>
    );
  };
  const nodeTypes = useMemo(() => ({ content: ContentOnlyNode }), []);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = function () {
        if (typeof this.result !== 'string') {
          showErrorNotification();
          return;
        }

        try {
          setTriangle(this.result);
        } catch (err) {
          showErrorNotification();
        }
      };
      reader.onerror = function () {
        showErrorNotification();
      };

      reader.readAsText(file);
    }
  };

  const showErrorNotification = () => {
    setShowError(true);

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <ReactFlow className="grow" nodeTypes={nodeTypes} nodes={nodes} onNodesChange={() => fitView()}>
      <Controls showInteractive={false}>
        <ControlButton onClick={() => fileRef.current?.click()} title="open">
          <input ref={fileRef} accept=".txt" type="file" className="sr-only" onChange={handleChangeFile} />
          <FolderOpenIcon className="mx-auto h-12 w-12" />
        </ControlButton>
      </Controls>
      <Panel id="max-total" position="top-left" className="text-5xl font-bold">
        {maxTotal}
      </Panel>
      <Background />
      <ErrorNotification open={showError} onClose={() => setShowError(false)} />
    </ReactFlow>
  );
}
