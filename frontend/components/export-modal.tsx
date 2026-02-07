'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, X, FileJson, FileText, Copy, Check } from 'lucide-react';

// Use relative paths - API is in same Next.js app
const API_BASE = '';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [format, setFormat] = useState<'json' | 'simple'>('json');
  const [preview, setPreview] = useState<string>('');
  const [total, setTotal] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPreview();
    }
  }, [isOpen, format]);

  const fetchPreview = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/wallets/export/preview?format=${format}&limit=5`);
      const data = await res.json();
      setTotal(data.total);
      if (format === 'json') {
        setPreview(JSON.stringify(data.preview, null, 2));
      } else {
        setPreview(data.preview);
      }
    } catch (err) {
      setPreview('Error loading preview');
    }
    setLoading(false);
  };

  const handleDownload = () => {
    const url = `${API_BASE}/api/wallets/export?format=${format}`;
    window.open(url, '_blank');
  };

  const handleCopy = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/wallets/export?format=${format}`);
      const text = format === 'json' ? JSON.stringify(await res.json(), null, 2) : await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Wallets
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Format Selection */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Export Format</label>
            <div className="flex gap-2">
              <Button
                variant={format === 'json' ? 'default' : 'outline'}
                onClick={() => setFormat('json')}
                className="flex items-center gap-2"
              >
                <FileJson className="w-4 h-4" />
                JSON
              </Button>
              <Button
                variant={format === 'simple' ? 'default' : 'outline'}
                onClick={() => setFormat('simple')}
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Simple (TXT)
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-4">
            <Badge variant="outline" className="text-zinc-400">
              {total} wallets total
            </Badge>
            <Badge variant="outline" className="text-zinc-400">
              Max 10,000 per export
            </Badge>
            <Badge variant="outline" className="text-zinc-400">
              500 alert limit
            </Badge>
          </div>

          {/* Preview */}
          <div>
            <label className="text-sm text-zinc-400 mb-2 block">Preview (first 5)</label>
            <pre className="bg-black rounded-lg p-4 text-sm text-zinc-300 overflow-x-auto max-h-64 overflow-y-auto border border-zinc-700">
              {loading ? 'Loading...' : preview || 'No wallets to export'}
            </pre>
          </div>

          {/* Format Info */}
          <div className="text-xs text-zinc-500">
            {format === 'json' ? (
              <p>JSON format includes: address, name, emoji, and groups. Compatible with most wallet trackers.</p>
            ) : (
              <p>Simple format: one wallet per line as "address:name". Compatible with BulkX and Axiom imports.</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-zinc-700">
            <Button onClick={handleDownload} className="flex-1 bg-purple-600 hover:bg-purple-700">
              <Download className="w-4 h-4 mr-2" />
              Download {format === 'json' ? '.json' : '.txt'}
            </Button>
            <Button variant="outline" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
