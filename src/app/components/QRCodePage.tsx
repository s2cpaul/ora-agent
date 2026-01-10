import { MessageSquare, Download } from "lucide-react";
import QRCode from "react-qr-code";
import { useRef } from "react";

interface QRCodePageProps {
  title: string;
  description: string;
  url: string;
  onOpenChat?: () => void;
}

export function QRCodePage({ title, description, url, onOpenChat }: QRCodePageProps) {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    try {
      // Create a canvas to convert SVG to PNG
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const img = document.createElement('img') as HTMLImageElement;
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${title.replace(/\s+/g, "-").toLowerCase()}-qr-code.png`;
          link.click();
          URL.revokeObjectURL(url);
        });
      };

      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);
      img.src = svgUrl;
    } catch (error) {
      console.error('QR Code download error:', error);
      // Fallback: Alert user that download is not supported in this environment
      alert('QR code download is not supported in this environment. Please take a screenshot instead.');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 flex items-center gap-3">
            <MessageSquare className="size-8" />
            {title}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg">
            {description}
          </p>
        </div>

        {/* QR Code Display */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-6 flex items-center justify-center">
          <div ref={qrRef} className="bg-white p-6 rounded-lg">
            <QRCode
              value={url}
              size={256}
              level="H"
              fgColor="#000000"
              bgColor="#ffffff"
            />
          </div>
        </div>

        {/* Scan Destination */}
        <div className="mb-4">
          <label className="text-sm font-medium text-muted-foreground block mb-2">
            Scan destination:
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 px-4 py-3 bg-card border border-border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="px-6 py-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors flex items-center gap-2 font-medium"
              >
                <MessageSquare className="size-4" />
                Open Chat
              </button>
            )}
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full px-6 py-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors flex items-center justify-center gap-2 font-medium mb-8"
        >
          <Download className="size-5" />
          Download QR Code
        </button>

        {/* Instructions */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-xl font-bold mb-4">How to use:</h2>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="font-bold text-foreground">1.</span>
              <span>Open your phone camera or QR code app</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-foreground">2.</span>
              <span>Your browser will open the ORA platform</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-foreground">3.</span>
              <span>The AI chat will automatically open</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-foreground">4.</span>
              <span>Start learning with your AI assistant!</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}