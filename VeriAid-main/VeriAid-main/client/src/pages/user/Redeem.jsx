import React, { useState } from 'react';

export default function MerchantVoucherRedemption() {
  const [voucherCode, setVoucherCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Simple validation - in real app this would be an API call
      if (voucherCode.trim().length >= 6) {
        setStatus('success');
        setTimeout(() => {
          setVoucherCode('');
          setStatus(null);
        }, 3000);
      } else {
        setStatus('error');
        setTimeout(() => {
          setStatus(null);
        }, 3000);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setVoucherCode(e.target.value.toUpperCase());
    if (status) setStatus(null); // Clear status when user starts typing
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-blue-500 mb-2">Dharma</h2>
            <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Redeem Aid Voucher
          </h1>
          <p className="text-slate-600 text-sm">
            Scan or enter the voucher code to process redemption
          </p>
        </div>

        {/* Main Interface */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
          {/* Voucher Code Input */}
          <div className="space-y-3">
            <label htmlFor="voucher" className="block text-sm font-semibold text-slate-900">
              Voucher Code
            </label>
            <div className="relative">
              <input
                id="voucher"
                type="text"
                value={voucherCode}
                onChange={handleInputChange}
                placeholder="Enter Voucher Code"
                className={`w-full h-16 px-6 text-xl font-bold text-center border-2 rounded-xl bg-white transition-all duration-200 focus:outline-none font-mono tracking-wider ${
                  status === 'error' 
                    ? 'border-red-500 focus:border-red-500 bg-red-50' 
                    : status === 'success'
                    ? 'border-green-500 focus:border-green-500 bg-green-50'
                    : 'border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                }`}
                disabled={isLoading}
                autoComplete="off"
                autoCapitalize="characters"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            
            {/* Error Message */}
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
                  <span className="text-red-700 text-sm font-medium">
                    Invalid voucher code. Please check and try again.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!voucherCode.trim() || isLoading}
            className={`w-full h-16 text-xl font-bold rounded-xl transition-all duration-200 font-inter shadow-sm ${
              status === 'success'
                ? 'bg-green-500 text-white shadow-green-200'
                : isLoading
                ? 'bg-slate-400 text-white cursor-not-allowed'
                : !voucherCode.trim()
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Verifying Voucher...</span>
              </div>
            ) : status === 'success' ? (
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Successfully Redeemed!</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Verify & Redeem</span>
              </div>
            )}
          </button>
        </div>

        {/* Success Details */}
        {status === 'success' && (
          <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-2xl p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-2">
                  Voucher Successfully Redeemed!
                </h3>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <div className="text-sm text-green-700 space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Voucher Code:</span>
                      <span className="font-mono font-bold">{voucherCode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span className="font-semibold text-green-600">REDEEMED</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Time:</span>
                      <span>{new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700 font-medium">
                  Transaction completed. Ready for next voucher.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions - Only show when not in success state */}
        {status !== 'success' && (
          <div className="mt-8 text-center space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Quick Tips</h4>
              <div className="text-xs text-blue-800 space-y-1 text-left">
                <p>• Voucher codes are case-insensitive</p>
                <p>• Codes are usually 6-12 characters long</p>
                <p>• Press Enter or tap the button to verify</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}