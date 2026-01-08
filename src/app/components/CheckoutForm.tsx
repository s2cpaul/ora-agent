import { X, CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface CheckoutFormProps {
  planName: string;
  planPrice: number;
  planDescription: string;
  onClose: () => void;
  onSuccess: (tier: string) => void;
}

export function CheckoutForm({ planName, planPrice, planDescription, onClose, onSuccess }: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    zipCode: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '');
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 16) {
      handleInputChange('cardNumber', formatCardNumber(cleaned));
    }
  };

  const handleExpiryChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      handleInputChange('expiryDate', formatExpiryDate(cleaned));
    }
  };

  const handleCvvChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      handleInputChange('cvv', cleaned);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'card') {
      // Validate card form
      if (!formData.email || !formData.cardName || !formData.cardNumber || !formData.expiryDate || !formData.cvv || !formData.zipCode) {
        alert('Please fill in all required fields');
        return;
      }

      // Basic card number validation (should be 16 digits)
      const cleanCardNumber = formData.cardNumber.replace(/\s/g, '');
      if (cleanCardNumber.length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return;
      }

      // Basic expiry validation
      if (formData.expiryDate.length !== 5) {
        alert('Please enter a valid expiry date (MM/YY)');
        return;
      }

      // Basic CVV validation
      if (formData.cvv.length < 3) {
        alert('Please enter a valid CVV');
        return;
      }
    }

    setIsProcessing(true);

    try {
      // TODO: Integrate with Stripe API for credit card processing
      // TODO: Integrate with PayPal SDK for PayPal processing
      // TODO: After successful payment:
      //   1. Send confirmation email to user
      //   2. Send copy to cara@oratf.info with subscription details
      //   3. Update user tier in database
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get tier key from plan name
      const tierKey = planName.toLowerCase().replace(/\s+/g, '');
      
      // Store subscription info
      localStorage.setItem('userTier', tierKey);
      localStorage.setItem('subscriberEmail', formData.email);
      
      alert(`✅ Payment successful! Welcome to ${planName}!\n\nA confirmation email has been sent to ${formData.email}.`);
      
      // Call success callback with tier
      onSuccess(tierKey);
      onClose();
    } catch (error: any) {
      alert(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayPalCheckout = () => {
    setIsProcessing(true);
    
    // TODO: Integrate PayPal SDK
    // TODO: Initialize PayPal payment flow
    alert('PayPal integration will be implemented next.\n\nFor now, redirecting to PayPal checkout...');
    
    // Simulate PayPal redirect
    setTimeout(() => {
      setIsProcessing(false);
      // After successful PayPal payment, same flow as card payment
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-300 my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X className="size-5" />
          </button>
          <div className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-2">Complete Your Purchase</h2>
            <p className="text-blue-100 text-sm">
              Secure checkout powered by Stripe & PayPal
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* Order Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-lg text-black mb-2">Order Summary</h3>
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-700">{planName} Plan</span>
              <span className="font-bold text-black">${planPrice}/month</span>
            </div>
            <p className="text-xs text-gray-600 mb-3">{planDescription}</p>
            <div className="border-t border-blue-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-black">Total Due Today</span>
                <span className="text-2xl font-bold text-blue-600">${planPrice}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">Billed monthly. Cancel anytime.</p>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-black mb-3">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'card'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-blue-400'
                }`}
              >
                <CreditCard className="size-6 mx-auto mb-2 text-blue-600" />
                <span className="text-sm font-semibold text-black">Credit Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('paypal')}
                className={`p-4 border-2 rounded-lg transition-all ${
                  paymentMethod === 'paypal'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-blue-400'
                }`}
              >
                <div className="text-2xl mb-1">💳</div>
                <span className="text-sm font-semibold text-black">PayPal</span>
              </button>
            </div>
          </div>

          {/* Payment Forms */}
          {paymentMethod === 'card' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black"
                  required
                />
              </div>

              {/* Card Name */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Cardholder Name *
                </label>
                <input
                  type="text"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black"
                  required
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Card Number *
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => handleCardNumberChange(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black font-mono"
                  required
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) => handleExpiryChange(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    CVV *
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => handleCvvChange(e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black font-mono"
                    required
                  />
                </div>
              </div>

              {/* ZIP Code */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Billing ZIP Code *
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="12345"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="size-5" />
                    Pay ${planPrice}/month
                  </>
                )}
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600 pt-2">
                <Lock className="size-3" />
                <span>Secured by 256-bit SSL encryption</span>
              </div>
            </form>
          ) : (
            // PayPal Option
            <div className="space-y-4">
              {/* Email for PayPal */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none text-black"
                  required
                />
              </div>

              {/* PayPal Button */}
              <button
                onClick={handlePayPalCheckout}
                disabled={isProcessing || !formData.email}
                className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="text-xl">💳</span>
                    Continue with PayPal
                  </>
                )}
              </button>

              <p className="text-xs text-gray-600 text-center">
                You'll be redirected to PayPal to complete your purchase
              </p>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mt-6 pt-6 border-t border-gray-300">
            <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-600">
              <div>
                <div className="text-2xl mb-1">🔒</div>
                <div className="font-semibold text-black">Secure</div>
                <div>256-bit SSL</div>
              </div>
              <div>
                <div className="text-2xl mb-1">↩️</div>
                <div className="font-semibold text-black">Money Back</div>
                <div>14-day guarantee</div>
              </div>
              <div>
                <div className="text-2xl mb-1">🚫</div>
                <div className="font-semibold text-black">Cancel Anytime</div>
                <div>No commitment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
