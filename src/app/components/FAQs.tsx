import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { MessageSquare, Download, HelpCircle } from "lucide-react";

export function FAQs() {
  const commonQuestions = [
    {
      question: "What if I need more revisions?",
      answer: "No problem! Each additional revision is $15. We want you to be completely satisfied with your video."
    },
    {
      question: "Which bundle should I choose?",
      answer: "The Video Bundle offers the best value with professional quality learning content and flexible delivery timeline."
    },
    {
      question: "How many languages are available?",
      answer: "Currently supporting lessons in English and Spanish by default. Custom requests can be placed."
    },
    {
      question: "What languages do you support?",
      answer: "We can create videos in multiple languages. Each additional language translation costs $100."
    },
    {
      question: "Why do I get started with a 15 second avatar?",
      answer: "Starting with a 15 second avatar allows you to quickly test and preview your AI-generated content before committing to longer formats. It's perfect for validating your concept and ensuring the quality meets your expectations."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
          <HelpCircle className="size-6 text-gray-600" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">
          Get answers to common questions about our services
        </p>
      </div>

      {/* Common Questions */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="font-semibold mb-6">Common Questions</h2>
          
          <div className="space-y-6">
            {commonQuestions.map((item, index) => (
              <div key={index} className="pb-6 border-b last:border-b-0 last:pb-0">
                <p className="font-semibold mb-2">
                  <span className="mr-2">Q:</span>
                  {item.question}
                </p>
                <p className="text-sm text-muted-foreground ml-6">
                  <span className="font-semibold mr-2">A:</span>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-center text-muted-foreground mt-6 pt-6 border-t">
            Still have questions? Contact our support team for more information.
          </p>
        </CardContent>
      </Card>

      {/* Chat with ORA AI */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-start gap-2 mb-4">
            <MessageSquare className="size-5 text-gray-600 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Chat with ORA AI</h3>
              <p className="text-sm text-muted-foreground">
                Scan the QR code to instantly start a conversation<br />
                with your AI learning assistant
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white border-2 rounded-lg p-6 mb-4 flex justify-center">
            <div className="w-48 h-48 bg-white flex items-center justify-center">
              {/* QR Code placeholder - using a simple pattern */}
              <svg viewBox="0 0 200 200" className="w-full h-full">
                {/* Outer squares */}
                <rect x="10" y="10" width="60" height="60" fill="black" />
                <rect x="20" y="20" width="40" height="40" fill="white" />
                <rect x="30" y="30" width="20" height="20" fill="black" />
                
                <rect x="130" y="10" width="60" height="60" fill="black" />
                <rect x="140" y="20" width="40" height="40" fill="white" />
                <rect x="150" y="30" width="20" height="20" fill="black" />
                
                <rect x="10" y="130" width="60" height="60" fill="black" />
                <rect x="20" y="140" width="40" height="40" fill="white" />
                <rect x="30" y="150" width="20" height="20" fill="black" />
                
                {/* Random pattern in middle */}
                <rect x="80" y="80" width="10" height="10" fill="black" />
                <rect x="90" y="80" width="10" height="10" fill="black" />
                <rect x="100" y="80" width="10" height="10" fill="black" />
                <rect x="80" y="90" width="10" height="10" fill="black" />
                <rect x="100" y="90" width="10" height="10" fill="black" />
                <rect x="110" y="90" width="10" height="10" fill="black" />
                <rect x="90" y="100" width="10" height="10" fill="black" />
                <rect x="100" y="100" width="10" height="10" fill="black" />
                <rect x="110" y="100" width="10" height="10" fill="black" />
                
                {/* Additional patterns */}
                <rect x="80" y="20" width="10" height="10" fill="black" />
                <rect x="90" y="30" width="10" height="10" fill="black" />
                <rect x="100" y="20" width="10" height="10" fill="black" />
                <rect x="110" y="30" width="10" height="10" fill="black" />
                <rect x="80" y="40" width="10" height="10" fill="black" />
                <rect x="100" y="40" width="10" height="10" fill="black" />
                
                <rect x="20" y="80" width="10" height="10" fill="black" />
                <rect x="30" y="90" width="10" height="10" fill="black" />
                <rect x="40" y="80" width="10" height="10" fill="black" />
                <rect x="50" y="90" width="10" height="10" fill="black" />
                <rect x="20" y="100" width="10" height="10" fill="black" />
                <rect x="40" y="100" width="10" height="10" fill="black" />
                <rect x="60" y="100" width="10" height="10" fill="black" />
                
                <rect x="130" y="80" width="10" height="10" fill="black" />
                <rect x="140" y="90" width="10" height="10" fill="black" />
                <rect x="150" y="80" width="10" height="10" fill="black" />
                <rect x="160" y="90" width="10" height="10" fill="black" />
                <rect x="170" y="80" width="10" height="10" fill="black" />
                <rect x="180" y="90" width="10" height="10" fill="black" />
                
                <rect x="80" y="130" width="10" height="10" fill="black" />
                <rect x="90" y="140" width="10" height="10" fill="black" />
                <rect x="100" y="130" width="10" height="10" fill="black" />
                <rect x="110" y="140" width="10" height="10" fill="black" />
                <rect x="120" y="130" width="10" height="10" fill="black" />
                <rect x="80" y="150" width="10" height="10" fill="black" />
                <rect x="100" y="150" width="10" height="10" fill="black" />
                <rect x="110" y="160" width="10" height="10" fill="black" />
                <rect x="90" y="170" width="10" height="10" fill="black" />
                <rect x="100" y="170" width="10" height="10" fill="black" />
                <rect x="110" y="180" width="10" height="10" fill="black" />
              </svg>
            </div>
          </div>

          {/* Scan destination */}
          <p className="text-xs text-muted-foreground mb-3">Scan destination:</p>
          
          {/* URL Input and Button */}
          <div className="flex gap-2 mb-3">
            <input 
              type="text"
              value="https://myora.now/?chat=open"
              readOnly
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open('https://myora.now/', '_blank')}
            >
              <MessageSquare className="size-4" />
              Open Chat
            </Button>
          </div>

          {/* Download QR Code Button */}
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 mb-6"
          >
            <Download className="size-4" />
            Download QR Code
          </Button>

          {/* How to use */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-semibold mb-2">How to use:</p>
            <ol className="text-xs text-muted-foreground space-y-1">
              <li>1. Open your phone camera or QR code app</li>
              <li>2. Your browser will open the ORA platform</li>
              <li>3. The AI chat will automatically open</li>
              <li>4. Start learning with your AI assistant!</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Recent Agent Questions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Agent Questions</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground text-center">
              No recent questions yet. Start chatting with the AI agent to see your conversation history here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}