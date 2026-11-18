import React, { useState } from 'react';
import { QrCode, CreditCard, Edit3, CheckCircle, ShieldCheck, Smartphone, ExternalLink, Lock } from 'lucide-react';

export default function ModuleTwelveSubscriptions() {
  const [upiId, setUpiId] = useState('kharika2137@oksbi');
  const [payeeName, setPayeeName] = useState('K K Harika');
  const [bankName, setBankName] = useState('Canara Bank 1750');
  const [selectedApp, setSelectedApp] = useState('gpay');
  const [isEditing, setIsEditing] = useState(false);
  const [planAmount, setPlanAmount] = useState('5999');
  const [planName, setPlanName] = useState('BUSINESS PLAN');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleSimulatedPayment = () => {
    setTimeout(() => {
      setPaymentStatus({
        method: 'Razorpay & UPI Secure Gateway',
        id: 'pay_rzp_' + Math.random().toString(36).substr(2, 9),
        time: new Date().toLocaleString()
      });
      setShowCheckoutModal(false);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-black text-white min-h-screen ml-64">
      {/* Project Overview / Description Header */}
      <div className="bg-gradient-to-r from-red-950/60 to-black border border-red-900/50 rounded-2xl p-6 shadow-2xl space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 rounded-full bg-red-600 animate-ping"></div>
          <h2 className="text-xl font-black tracking-wider text-red-500 uppercase">Auron CommissionOS — Enterprise Subscriptions & Payment Gateway</h2>
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Welcome to Module 12. This enterprise module manages client subscription upgrades, automated commission tiers, and secure direct payments. Clients can seamlessly purchase subscription plans via Razorpay integration or scan merchant UPI QR codes (Google Pay & PhonePe) for instant activation. Administrators retain full configuration rights over VPA handles and bank settlement accounts.
        </p>
      </div>

      {/* Header Bar */}
      <div className="border-b border-red-900/50 pb-5 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black tracking-wide text-white uppercase">Subscription Plans & Payment Scanners</h3>
          <p className="text-sm text-zinc-400">Select a plan to launch direct gateway checkout or view active merchant QR scanners.</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-red-950 transition-all"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Save Admin Config' : 'Admin Edit Scanner'}</span>
        </button>
      </div>

      {paymentStatus && (
        <div className="p-4 bg-emerald-950/50 border border-emerald-500/50 rounded-xl flex items-center space-x-3 shadow-lg">
          <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <div>
            <p className="font-bold text-emerald-300">Subscription Activated Successfully via {paymentStatus.method}!</p>
            <p className="text-xs text-emerald-400/80">Txn ID: {paymentStatus.id} | Timestamp: {paymentStatus.time}</p>
          </div>
        </div>
      )}

      {/* Main Grid: Plans Selection & Scanners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subscription Tiers */}
        <div className="bg-zinc-950 border border-red-900/40 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h4 className="text-lg font-bold text-white flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-red-500" />
              <span>Available Subscription Tiers</span>
            </h4>
            <span className="bg-red-950 text-red-400 text-xs px-2.5 py-1 rounded-full font-semibold border border-red-800">Active License</span>
          </div>

          <div className="space-y-4">
            {[
              { name: 'STARTER COMMISSION TIER', price: '2,499', desc: 'Standard commission split & basic reports' },
              { name: 'BUSINESS PLAN', price: '5,999', desc: 'Advanced multi-tier commissions, Excel export & priority support' },
              { name: 'ENTERPRISE UNLIMITED', price: '12,999', desc: 'Full custom modules, dedicated server & API webhooks' }
            ].map((plan, idx) => (
              <div 
                key={idx}
                onClick={() => { setPlanName(plan.name); setPlanAmount(plan.price.replace(',', '')); }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  planName === plan.name 
                    ? 'bg-red-950/30 border-red-600 shadow-lg shadow-red-950' 
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-red-900'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-white">{plan.name}</h5>
                    <p className="text-xs text-zinc-400 mt-0.5">{plan.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-red-500">₹{plan.price}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setPlanName(plan.name); setPlanAmount(plan.price.replace(',', '')); setShowCheckoutModal(true); }}
                      className="block mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold shadow"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowCheckoutModal(true)}
            className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-red-900/60 transition-all flex items-center justify-center space-x-2"
          >
            <CreditCard className="w-5 h-5" />
            <span>Proceed to Razorpay / UPI Checkout (₹{planAmount})</span>
          </button>
        </div>

        {/* Live Scanner Hub (GPay & PhonePe) */}
        <div className="bg-zinc-950 border border-red-900/40 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h4 className="text-lg font-bold text-white flex items-center space-x-2">
              <QrCode className="w-5 h-5 text-red-500" />
              <span>Merchant Scanner Preview Hub</span>
            </h4>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedApp('gpay')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedApp === 'gpay' ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                Google Pay
              </button>
              <button
                onClick={() => setSelectedApp('phonepe')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedApp === 'phonepe' ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                PhonePe
              </button>
            </div>
          </div>

          {/* Scanner Card matching your exact uploaded image references */}
          <div className="bg-white text-zinc-900 rounded-2xl p-6 shadow-2xl max-w-sm mx-auto space-y-4 relative border-4 border-red-600/30">
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold text-white ${selectedApp === 'gpay' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                {selectedApp === 'gpay' ? '🟢 Receiving money on GPay' : '🟢 Receiving money on PhonePe'}
              </span>
            </div>

            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm">
                {payeeName.charAt(0)}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={payeeName}
                  onChange={(e) => setPayeeName(e.target.value)}
                  className="border border-zinc-400 rounded px-2 py-0.5 text-sm font-bold text-black"
                />
              ) : (
                <span className="font-extrabold text-lg text-zinc-900">{payeeName}</span>
              )}
            </div>

            <div className="bg-zinc-100 p-4 rounded-xl border border-zinc-200 flex flex-col items-center justify-center relative">
              <div className="w-48 h-48 bg-zinc-900 rounded-lg flex items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute inset-2 grid grid-cols-6 gap-1 opacity-90">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-black'} rounded-xs`}></div>
                  ))}
                </div>
                <div className="z-10 w-12 h-12 rounded-full bg-black text-white border-2 border-white flex items-center justify-center font-black text-lg shadow-md">
                  {selectedApp === 'gpay' ? 'G' : 'पे'}
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 mt-2 font-medium">Scan to pay with any UPI app</p>
            </div>

            <div className="space-y-2 bg-zinc-50 p-3 rounded-xl border border-zinc-200 text-xs">
              <div className="flex justify-between items-center text-zinc-700 font-semibold">
                <span>🏦 Bank Account:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="border border-zinc-300 rounded px-1 text-xs text-black"
                  />
                ) : (
                  <span>{bankName}</span>
                )}
              </div>
              <div className="flex justify-between items-center text-zinc-700 font-semibold">
                <span>⚡ UPI ID:</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="border border-zinc-300 rounded px-1 text-xs text-black font-mono"
                  />
                ) : (
                  <span className="font-mono text-red-600 font-bold">{upiId}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Secure Checkout Modal matching your reference design */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-red-900/60 rounded-3xl p-6 max-w-md w-full shadow-2xl relative space-y-6 text-white animate-fade-in">
            <button 
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white font-bold text-lg"
            >
              ✕
            </button>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-2 bg-red-950/60 border border-red-800 px-3 py-1 rounded-full text-xs font-bold text-red-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Razorpay Secure Checkout</span>
              </div>
              <h4 className="text-xl font-black uppercase tracking-wider text-white">{planName}</h4>
              <p className="text-3xl font-black text-red-500">₹{planAmount}</p>
              <p className="text-xs text-zinc-400">Scan QR code using Razorpay or complete instant verification below.</p>
            </div>

            {/* Modal QR Box */}
            <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-inner">
              <div className="w-40 h-40 bg-zinc-900 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-2 grid grid-cols-5 gap-1 opacity-90">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-black'} rounded-xs`}></div>
                  ))}
                </div>
                <div className="z-10 bg-red-600 text-white px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow">
                  ALPHA AURON QR
                </div>
              </div>
              <p className="text-[11px] text-zinc-600 font-semibold">ALPHA AURON MERCHANT QR</p>
            </div>

            <div className="text-center">
              <p className="text-xs text-zinc-400">Merchant VPA:</p>
              <p className="text-sm font-mono text-red-400 font-bold select-all">alphaauron.commissionos@okicici</p>
            </div>

            <button
              onClick={handleSimulatedPayment}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold tracking-wide shadow-lg shadow-emerald-950 transition-all flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Simulate & Confirm Payment Success</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}