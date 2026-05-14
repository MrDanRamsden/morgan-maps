import { useMemo, useState } from 'react';
import { X, Globe, Copy, Check, Download } from 'lucide-react';
import { useMapStore } from '../../store/mapStore';

interface PublishModalProps {
  onClose: () => void;
}

type PublishState = 'confirm' | 'done' | 'error';

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return slug || `map-${Date.now()}`;
}

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function PublishModal({ onClose }: PublishModalProps) {
  const mapName = useMapStore((s) => s.mapName);
  const nodes = useMapStore((s) => s.nodes);
  const edges = useMapStore((s) => s.edges);

  const [state, setState] = useState<PublishState>('confirm');
  const [copied, setCopied] = useState(false);

  const publishedId = useMemo(() => slugify(mapName), [mapName]);
  const filename = `${publishedId}.json`;
  const galleryPath = `/servicemap/maps/${filename}`;
  const shareUrl = `${window.location.origin}/servicemap/view/${publishedId}`;

  const galleryMap = useMemo(() => {
    const now = new Date().toISOString();

    return {
      id: publishedId,
      title: mapName,
      name: mapName,
      description: '',
      author: '',
      createdAt: now,
      updatedAt: now,
      nodes,
      edges,
    };
  }, [publishedId, mapName, nodes, edges]);

  const indexEntry = useMemo(
    () => ({
      id: publishedId,
      title: mapName,
      description: '',
      author: '',
      file: galleryPath,
      updatedAt: galleryMap.updatedAt,
    }),
    [publishedId, mapName, galleryPath, galleryMap.updatedAt],
  );

  const handlePublish = () => {
    try {
      downloadJson(filename, galleryMap);
      setState('done');
    } catch (e) {
      console.error('Export for gallery failed:', e);
      setState('error');
    }
  };

  const handleCopyIndexEntry = () => {
    navigator.clipboard.writeText(JSON.stringify(indexEntry, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[500px] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Globe size={16} className="text-blue-500" />
            <h2 className="text-sm font-semibold text-gray-800">Export for private gallery</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5">

          {state === 'confirm' && (
            <>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                This will download <span className="font-semibold text-gray-800">{filename}</span>, ready to upload to your password-protected gallery folder.
              </p>
              <div className="bg-gray-50 rounded-xl p-3 mb-5 flex items-center gap-3">
                <div className="text-center px-3 border-r border-gray-200">
                  <div className="text-lg font-bold text-gray-800">{nodes.length}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide">nodes</div>
                </div>
                <div className="text-center px-3">
                  <div className="text-lg font-bold text-gray-800">{edges.length}</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide">edges</div>
                </div>
                <div className="ml-auto text-xs text-gray-500 truncate max-w-[220px]">{mapName}</div>
              </div>
              <div className="text-xs text-gray-500 bg-blue-50 border border-blue-100 rounded-xl p-3 mb-5 leading-relaxed">
                After download, upload the file to <span className="font-mono text-gray-700">public_html/servicemap/maps/</span> and add the generated index entry to <span className="font-mono text-gray-700">maps/index.json</span>.
              </div>
              <div className="flex gap-2">
                <button onClick={onClose} className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                  Cancel
                </button>
                <button onClick={handlePublish} className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                  <Download size={13} />
                  Download map JSON
                </button>
              </div>
            </>
          )}

          {state === 'done' && (
            <>
              <div className="flex flex-col items-center pb-4 gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-1">
                  <Check size={20} className="text-green-600" />
                </div>
                <p className="text-sm font-semibold text-gray-800">Gallery file downloaded</p>
                <p className="text-xs text-gray-500 text-center">
                  Upload <span className="font-mono">{filename}</span> to <span className="font-mono">/servicemap/maps/</span>, then add this entry to <span className="font-mono">index.json</span>.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-600">index.json entry</span>
                  <button onClick={handleCopyIndexEntry} className="flex-shrink-0 flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="text-[11px] text-gray-600 whitespace-pre-wrap break-words max-h-40 overflow-auto">
                  {JSON.stringify(indexEntry, null, 2)}
                </pre>
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-4">
                Once uploaded, the view URL will be: <span className="font-mono text-gray-700 break-all">{shareUrl}</span>
              </div>

              <div className="flex gap-2">
                <button onClick={onClose} className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                  Close
                </button>
                <button onClick={() => downloadJson(filename, galleryMap)} className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                  <Download size={13} />
                  Download again
                </button>
              </div>
            </>
          )}

          {state === 'error' && (
            <>
              <p className="text-sm text-red-600 mb-4">Something went wrong while creating the gallery file.</p>
              <div className="flex gap-2">
                <button onClick={onClose} className="flex-1 px-4 py-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">
                  Cancel
                </button>
                <button onClick={() => setState('confirm')} className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                  Try again
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
