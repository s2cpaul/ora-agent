import QRCode from 'react-qr-code';
import { Home, MessageSquare, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';

export function QRCodeSection() {
  const baseUrl = 'https://agent.myora.now';
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const links = [
    {
      title: 'Home Page',
      url: baseUrl + '/',
      description: 'Main landing page',
      icon: Home,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Chat Directly',
      url: baseUrl + '/chat',
      description: 'Open chat interface',
      icon: MessageSquare,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Features',
      url: baseUrl + '/features',
      description: 'Multi-agent features',
      icon: Sparkles,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const copyToClipboard = async (text: string, index: number) => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } else {
        // Fallback method for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          setCopiedIndex(index);
          setTimeout(() => setCopiedIndex(null), 2000);
        } catch (err) {
          console.error('Fallback copy failed:', err);
        } finally {
          textArea.remove();
        }
      }
    } catch (err) {
      console.error('Failed to copy text:', err);
      // Silently fail - the user can still manually copy the URL from the display
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 mt-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Quick Access Links</h2>
        <p className="text-sm text-muted-foreground">Scan QR codes or click links to access directly</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {links.map((link, index) => {
          const Icon = link.icon;
          const isCopied = copiedIndex === index;
          
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all hover:shadow-lg"
            >
              {/* Icon and Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 bg-gradient-to-br ${link.color} rounded-lg`}>
                  <Icon className="size-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{link.title}</h3>
                  <p className="text-xs text-muted-foreground">{link.description}</p>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white p-4 rounded-lg mb-4 flex justify-center border border-gray-200">
                <QRCode 
                  value={link.url} 
                  size={160}
                  level="H"
                />
              </div>

              {/* URL and Copy Button */}
              <div className="space-y-2">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-blue-600 dark:text-blue-400 hover:underline break-all text-center font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded"
                >
                  {link.url}
                </a>
                <button
                  onClick={() => copyToClipboard(link.url, index)}
                  className={`w-full ${
                    isCopied 
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-foreground'
                  } px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2`}
                >
                  {isCopied ? (
                    <>
                      <Check className="size-4" />
                      Copied!
                    </>
                  ) : (
                    'Copy Link'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}