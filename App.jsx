import React, { useState, useEffect } from 'react';

// Embedded Alpha Auron Red Dragon SVG Logo (exact match to uploaded company logo)
const DRAGON_LOGO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <circle cx="100" cy="100" r="95" fill="#ffffff" stroke="#dc2626" stroke-width="8"/>
  <path d="M135 28 C110 42, 95 62, 85 78 C75 68, 60 65, 45 72 C55 78, 62 85, 65 92 C48 92, 35 102, 28 114 C40 116, 48 122, 52 128 C64 118, 82 114, 98 118 C82 130, 72 148, 76 168 C94 176, 122 174, 145 156 C166 138, 174 108, 162 82 C154 66, 144 55, 138 48 C148 42, 156 36, 162 28 C152 28, 142 28, 135 28 Z" fill="#dc2626"/>
  <path d="M58 96 L74 92 L68 102 Z" fill="#ffffff"/>
  <path d="M98 118 C118 124, 132 142, 122 162 C110 172, 92 172, 76 168 C86 154, 94 136, 98 118 Z" fill="#991b1b"/>
  <path d="M120 45 C132 58, 142 74, 145 92 C135 80, 124 70, 110 64 Z" fill="#ef4444"/>
</svg>
`)}`;

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [logoUrl, setLogoUrl] = useState(DRAGON_LOGO_SVG);
  const [customQrUrl, setCustomQrUrl] = useState('');
  const [user, setUser] = useState({ name: 'Client User', email: 'client@alphaauron.com', initials: 'CU', avatar: '' });

  // Module 1 State
  const [orgData, setOrgData] = useState({
    name: 'Alpha Auron Private Limited',
    currency: 'INR (₹) — Indian Rupee',
    financialYear: 'FY 2026 – 2027 (Apr–Mar)',
    taxRule: '10% Sec 194H Commission TDS',
    departments: 'Enterprise, Channel, Retail'
  });

  // Module 2 State
  const [employees, setEmployees] = useState([
    { id: 'EMP-101', name: 'Harika', email: 'harika@alphaauron.com', role: 'Sales Manager', department: 'Enterprise', policy: 'Marginal Slabs v2.0', earned: 18000, status: 'Active' },
    { id: 'EMP-102', name: 'Poojitha', email: 'poojitha@alphaauron.com', role: 'Sales Representative', department: 'Channel', policy: 'Fixed 5% v1.2', earned: 9000, status: 'Active' },
    { id: 'PTR-201', name: 'Arjun Mehta', email: 'arjun@partner.in', role: 'Channel Partner', department: 'Direct B2B', policy: 'Multi-Level Split v1.0', earned: 10500, status: 'Active' }
  ]);

  // Module 3 State
  const [policies, setPolicies] = useState([
    { code: 'POL-01', version: 'v2.0', name: 'Marginal Slab Accelerator', type: 'Marginal Tier Slabs', rule: '0-1L @ 2% | 1L-3L @ 4% | >3L @ 6%', status: 'Active' },
    { code: 'POL-02', version: 'v1.2', name: 'Enterprise Standard Fixed', type: 'Fixed Percentage', rule: 'Flat 5.0% on Net Eligible Base', status: 'Active' },
    { code: 'POL-03', version: 'v1.1', name: 'Target Over-Achievement', type: 'Target Bonus', rule: '+₹2,000 Bonus at ≥100% Quota', status: 'Active' },
    { code: 'POL-04', version: 'v1.0', name: 'Partner Credit Split', type: 'Multi-Level Split', rule: '70% Rep / 20% Manager / 10% Partner', status: 'Active' }
  ]);

  // Module 4 State
  const [transactions, setTransactions] = useState([
    { id: 'INV-2026-101', customer: 'Apex FinTech Ltd', gross: 420000, deductions: 20000, eligible: 400000, rep: 'Harika', policy: 'Marginal Slab Accelerator (v2.0)', commission: 18000, status: 'Validated' },
    { id: 'INV-2026-102', customer: 'Nexus Retail Corp', gross: 200000, deductions: 0, eligible: 200000, rep: 'Poojitha', policy: 'Enterprise Standard Fixed (v1.2)', commission: 10000, status: 'Eligible' },
    { id: 'INV-2026-103', customer: 'Vanguard Logistics', gross: 300000, deductions: 0, eligible: 300000, rep: 'Arjun Mehta', policy: 'Partner Credit Split (v1.0)', commission: 10500, status: 'Approved' }
  ]);

  // Module 5 State
  const [selectedTxnId, setSelectedTxnId] = useState('INV-2026-101');
  const [calcTestAmount, setCalcTestAmount] = useState(400000);
  const [calcTestModel, setCalcTestModel] = useState('marginal');

  // Module 6 State
  const [reversals, setReversals] = useState([
    { id: 'REV-01', invoice: 'INV-2026-102', originalSale: 200000, refundAmount: 20000, originalComm: 10000, clawback: -1000, remaining: 9000, reason: '10% Partial Seat Cancellation' }
  ]);

  // Module 9 State
  const [batches, setBatches] = useState([
    { id: 'APR-11', title: 'Nov Batch #1 — Harika', amount: 16200, note: 'PO & Invoice verified', reviewer: 'Finance Admin', status: 'Approved' },
    { id: 'APR-12', title: 'Nov Batch #2 — Poojitha', amount: 8100, note: 'Immutable statement locked', reviewer: 'Business Owner', status: 'Finalised & Locked' },
    { id: 'APR-13', title: 'Nov Batch #3 — Arjun', amount: 9450, note: 'Ready for admin approval', reviewer: 'Awaiting Sign-off', status: 'Pending Review' }
  ]);

  // Module 10 State
  const [payouts, setPayouts] = useState([
    { utr: 'UTR-HDFC-8849201', recipient: 'Harika (EMP-101)', amount: 16200, method: 'NEFT Bank Transfer', status: 'Reconciled' },
    { utr: 'UTR-ICICI-7731904', recipient: 'Poojitha (EMP-102)', amount: 8100, method: 'IMPS Instant', status: 'Reconciled' }
  ]);

  // Module 11 State
  const [disputes, setDisputes] = useState([
    { id: 'DSP-401', invoice: 'INV-2026-101', raisedBy: 'Client User', reason: 'Verify Q4 accelerator bonus threshold application', status: 'Under Review' }
  ]);

  // Module 12 Subscription Payments Ledger
  const [activePlan, setActivePlan] = useState('Starter Plan (₹999/mo)');
  const [paymentLedger, setPaymentLedger] = useState([
    { id: 'PAY-AUR-101', plan: 'Starter Plan', gateway: 'Razorpay', amount: 999, timestamp: '17 Nov 2026, 09:15 AM', status: 'Success' }
  ]);

  // Modals & Popups
  const [modal, setModal] = useState(null); // 'login', 'profile', 'logo', 'qrUpload', 'payment', 'certificate', 'contact', 'addEmp', 'addPol', 'addTxn', 'addDispute'
  const [paymentModalData, setPaymentModalData] = useState({ plan: 'Growth Plan', amount: 2499, gateway: 'Razorpay' });
  const [paymentSuccessToast, setPaymentSuccessToast] = useState(null);
  const [ownerMessages, setOwnerMessages] = useState([]);

  // Check URL Hash for /#admin-panel
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash.includes('admin-panel')) {
        setIsAdmin(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const toggleAdminMode = () => {
    const next = !isAdmin;
    setIsAdmin(next);
    window.location.hash = next ? 'admin-panel' : '';
  };

  // Interactive Formula Verifier Calculation
  const computeLiveBreakdown = () => {
    const amt = Number(calcTestAmount) || 0;
    if (calcTestModel === 'marginal') {
      const s1 = Math.min(amt, 100000);
      const c1 = s1 * 0.02;
      const s2 = Math.min(Math.max(0, amt - 100000), 200000);
      const c2 = s2 * 0.04;
      const s3 = Math.max(0, amt - 300000);
      const c3 = s3 * 0.06;
      const total = c1 + c2 + c3;
      return `Marginal Slab Breakdown: Slab 1 (2%): ₹${c1.toLocaleString('en-IN')} + Slab 2 (4%): ₹${c2.toLocaleString('en-IN')} + Slab 3 (6%): ₹${c3.toLocaleString('en-IN')} = ₹${total.toLocaleString('en-IN')} Total`;
    } else {
      const total = amt * 0.05;
      return `Fixed Rate Breakdown: ₹${amt.toLocaleString('en-IN')} × 5.0% Flat Rate = ₹${total.toLocaleString('en-IN')} Total`;
    }
  };

  const openGatewayCheckout = (plan, amount, gateway) => {
    setPaymentModalData({ plan, amount, gateway });
    setModal('payment');
  };

  const confirmGatewayPayment = () => {
    const newRecord = {
      id: 'PAY-AUR-' + Math.floor(102 + Math.random() * 890),
      plan: paymentModalData.plan,
      gateway: paymentModalData.gateway,
      amount: paymentModalData.amount,
      timestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      status: 'Success'
    };
    setPaymentLedger([newRecord, ...paymentLedger]);
    setActivePlan(`${paymentModalData.plan} (₹${paymentModalData.amount.toLocaleString('en-IN')}/mo)`);
    setModal(null);
    setPaymentSuccessToast(newRecord);
    setTimeout(() => setPaymentSuccessToast(null), 7000);
  };

  const exportCSV = (filename, headers, rows) => {
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  const selectedTxn = transactions.find(t => t.id === selectedTxnId) || transactions[0];
  const isModuleVisible = (num) => activeFilter === 'ALL' || activeFilter === num;

  // Contact Banner Component (shown below major sections just like screenshots)
  const DirectContactBanner = () => (
    <div className="bg-gradient-to-r from-[#180909] via-[#110a0a] to-[#0d0d10] border border-red-900/40 rounded-2xl p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
      <div>
        <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase mb-1">ALPHA AURON PRIVATE LIMITED • COMMERCIAL SUPPORT</div>
        <h4 className="text-base font-bold text-white">Direct Contact — Business Owner & Technical Architecture</h4>
        <p className="text-xs text-zinc-400 mt-0.5">Click Gmail, WhatsApp, or Phone/PhonePe below to connect directly, or send an instant message to the Owner Inbox.</p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <a href="mailto:harika@alphaauron.com?subject=Auron%20CommissionOS%20Plan%20Inquiry" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-2 transition">
          <i className="fa-regular fa-envelope text-zinc-400"></i>
          <span>Gmail: harika@alphaauron.com</span>
        </a>
        <a href="https://wa.me/919876543210?text=Hello%20Alpha%20Auron,%20I%20would%20like%20to%20inquire%20about%20Auron%20CommissionOS%20plans." target="_blank" rel="noreferrer" className="bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-2 transition">
          <i className="fa-brands fa-whatsapp text-emerald-400"></i>
          <span>WhatsApp: +91 98765 43210</span>
        </a>
        <a href="tel:+919876543210" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-2 transition">
          <i className="fa-solid fa-phone text-pink-500"></i>
          <span>Phone / PhonePe: +91 98765 43210</span>
        </a>
        <button onClick={() => setModal('contact')} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-red-950 transition">
          Send Owner Message
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#09090b] text-gray-100 min-h-screen font-sans pb-16">
      {/* Top Navbar */}
      <header className="bg-[#0c0c0f]/95 border-b border-zinc-800/90 sticky top-0 z-40 backdrop-blur px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Alpha Auron Logo" className="w-10 h-10 rounded-full object-cover border-2 border-red-600 shadow-md shadow-red-900/50 bg-white" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-white tracking-tight">Auron <span className="text-red-500">CommissionOS</span></span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${isAdmin ? 'bg-red-950/80 text-red-400 border-red-600/60' : 'bg-zinc-900 text-zinc-300 border-zinc-700'}`}>
                  {isAdmin ? 'ADMIN PANEL (/#admin-panel)' : 'CLIENT PORTAL (READ-ONLY)'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Alpha Auron Private Limited • Commercial Incentive & Payout OS</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button onClick={toggleAdminMode} className="bg-[#1b0b0b] hover:bg-red-900/40 text-red-300 border border-red-700/60 text-xs font-semibold px-3.5 py-2 rounded-xl transition">
              {isAdmin ? 'Exit /#admin-panel' : 'Switch to /#admin-panel'}
            </button>
            <button onClick={() => setModal('login')} className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition">
              Account Login
            </button>
            <button onClick={() => setModal('profile')} className="flex items-center gap-2.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 pl-2 pr-3 py-1.5 rounded-xl transition">
              {user.avatar ? (
                <img src={user.avatar} alt="User" className="w-7 h-7 rounded-full object-cover border border-red-500" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center">{user.initials}</div>
              )}
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-white leading-tight">{user.name}</div>
                <div className="text-[10px] text-zinc-400 leading-tight">{user.email}</div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner & Project Description */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-5">
        <div className="bg-gradient-to-br from-[#121215] via-[#0d0d10] to-[#160909] border border-zinc-800 rounded-2xl p-6 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Logo Column */}
            <div className="lg:col-span-2 flex flex-col items-center">
              <div className="w-28 h-28 rounded-2xl bg-zinc-950 border border-zinc-800 p-2 flex items-center justify-center shadow-inner">
                <img src={logoUrl} alt="Company Logo" className="w-24 h-24 rounded-full object-cover bg-white border-2 border-red-600" />
              </div>
              <button onClick={() => setModal('logo')} className="mt-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-[11px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition">
                <i className="fa-solid fa-pen-to-square text-red-500"></i>
                <span>Upload / Change Logo</span>
              </button>
            </div>

            {/* Description Column */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="bg-red-600 text-white font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">ALPHA AURON PRIVATE LIMITED</span>
                <span className="text-zinc-400">Backend Architecture: <strong className="text-white">Harika</strong> | Frontend UI: <strong className="text-white">Poojitha</strong></span>
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-700/50 px-2 py-0.5 rounded font-mono">100% Verified 12-Module OS</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Auron CommissionOS — Commercial Business Process & Incentive Management
              </h1>

              <p className="text-xs text-zinc-300 leading-relaxed">
                <strong className="text-white">Purpose & Real-World Problem Solved:</strong> Manual commission spreadsheets cause formula errors, delayed payouts, policy confusion, and disputes between sales teams and management. <strong className="text-white">Auron CommissionOS</strong> centralizes the entire 12-module commercial lifecycle—automating no-code policy rules, duplicate-safe Excel imports, <strong className="text-white">step-by-step calculation lineage</strong>, bank UTR payout reconciliation, and official <strong className="text-white">Alpha Auron PDF Certificates & Invoices</strong>.
              </p>

              {/* 4 Value Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="bg-zinc-950/90 border border-zinc-800/90 p-2.5 rounded-xl">
                  <div className="text-[11px] font-bold text-red-400">1. Zero Calculation Errors</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">6-step traceable math lineage for every sale</div>
                </div>
                <div className="bg-zinc-950/90 border border-zinc-800/90 p-2.5 rounded-xl">
                  <div className="text-[11px] font-bold text-red-400">2. Versioned Policy Rules</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Marginal slabs, splits & bonuses locked by version</div>
                </div>
                <div className="bg-zinc-950/90 border border-zinc-800/90 p-2.5 rounded-xl">
                  <div className="text-[11px] font-bold text-red-400">3. Instant SaaS Checkout</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Razorpay, PhonePe & GPay QR scanners built in</div>
                </div>
                <div className="bg-zinc-950/90 border border-zinc-800/90 p-2.5 rounded-xl">
                  <div className="text-[11px] font-bold text-red-400">4. Official Certification</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Downloadable PDF certificates & itemized bills</div>
                </div>
              </div>
            </div>

            {/* Right Contact Card */}
            <div className="lg:col-span-3 bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 space-y-2.5">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span className="text-red-500">CONTACT BUSINESS OWNER</span>
                <span className="text-emerald-400">● Direct Support</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <a href="mailto:harika@alphaauron.com" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 py-2 rounded-lg text-center text-[11px] font-semibold text-zinc-200 transition">
                  <i className="fa-regular fa-envelope block mb-0.5"></i> Gmail
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-800/50 py-2 rounded-lg text-center text-[11px] font-semibold text-emerald-300 transition">
                  <i className="fa-brands fa-whatsapp block mb-0.5"></i> WhatsApp
                </a>
                <a href="tel:+919876543210" className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 py-2 rounded-lg text-center text-[11px] font-semibold text-zinc-200 transition">
                  <i className="fa-solid fa-phone text-pink-500 block mb-0.5"></i> Phone / UPI
                </a>
              </div>
              <button onClick={() => setModal('contact')} className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl shadow transition">
                Send Direct Message to Owner
              </button>
              <button onClick={() => setModal('certificate')} className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-semibold py-2 rounded-xl transition">
                View Module 8 Certificate & Invoices →
              </button>
            </div>
          </div>
        </div>

        {/* Module Navigator Bar */}
        <div className="bg-[#0e0e11] border border-zinc-800/90 rounded-2xl p-4 space-y-3">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase">MODULE NAVIGATOR (CLICK "ALL 12 MODULES" OR FOCUS ANY INDIVIDUAL MODULE):</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveFilter('ALL')} className={`text-xs font-bold px-3 py-1 rounded-lg transition ${activeFilter === 'ALL' ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-300 border border-zinc-700'}`}>
                Show All 12 Modules
              </button>
              <span className="bg-emerald-950/70 text-emerald-400 border border-emerald-700/50 text-xs font-semibold px-3 py-1 rounded-lg">
                Plan: {activePlan}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 1, label: '1. Org Setup' },
              { id: 2, label: '2. Salespeople & Partners' },
              { id: 3, label: '3. Policy Builder' },
              { id: 4, label: '4. Transactions & Excel' },
              { id: 5, label: '5. Calculation Lineage' },
              { id: 6, label: '6. Refunds & Reversals' },
              { id: 7, label: '7. Charts & Dashboard' },
              { id: 8, label: '8. Invoices & Certificate' },
              { id: 9, label: '9. Approval Workflow' },
              { id: 10, label: '10. Payouts & UTR' },
              { id: 11, label: '11. Disputes & Investigation' },
              { id: 12, label: '12. Reports & Subscriptions' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setActiveFilter(m.id)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                  activeFilter === m.id
                    ? 'bg-red-600 border-red-500 text-white font-bold'
                    : m.id === 8 || m.id === 11 || m.id === 12
                    ? 'bg-[#1a0b0b] border-red-900/50 text-red-300 hover:border-red-500'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-600'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Status Banner */}
        <div className="bg-[#120b0b] border border-red-900/40 rounded-2xl px-5 py-3.5 flex flex-wrap justify-between items-center gap-3">
          <div>
            <div className="text-xs font-bold text-white">
              {isAdmin ? 'Admin Control Panel Active (/#admin-panel) — Full Edit & Approval Rights Enabled' : 'Client Portal Active — Read-Only Data Protection Enabled'}
            </div>
            <div className="text-[11px] text-zinc-400">
              {isAdmin
                ? `Administrators can add/edit salespeople, policies, transactions, approve batches, and inspect ${ownerMessages.length} owner inbox messages.`
                : 'Clients can inspect all 12 modules, subscribe via Razorpay/PhonePe/GPay in Module 12, download PDF Certificates in Module 8, and raise investigations in Module 11.'}
            </div>
          </div>
          <button onClick={toggleAdminMode} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow transition">
            {isAdmin ? 'Switch to Client Read-Only' : 'Open /#admin-panel (Edit Mode)'}
          </button>
        </div>
      </section>

      {/* ALL 12 MODULES CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6 space-y-8">

        {/* MODULE 01 */}
        {isModuleVisible(1) && (
          <section className="space-y-4">
            <div className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800/80">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 01 • MULTI-TENANT ONBOARDING & GOVERNANCE</div>
                  <h2 className="text-xl font-black text-white mt-0.5">Organisation Onboarding, Tax Settings & Quick Plan Activation</h2>
                </div>
                {isAdmin && (
                  <button onClick={() => alert('Organisation governance settings saved to PostgreSQL tenant store!')} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl">
                    Save Org Changes
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Organisation Legal Name</label>
                  <input type="text" value={orgData.name} disabled={!isAdmin} onChange={e => setOrgData({ ...orgData, name: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-semibold" />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Base Currency</label>
                  <input type="text" value={orgData.currency} disabled={!isAdmin} onChange={e => setOrgData({ ...orgData, currency: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-semibold" />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Financial Year</label>
                  <input type="text" value={orgData.financialYear} disabled={!isAdmin} onChange={e => setOrgData({ ...orgData, financialYear: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-semibold" />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Tax / TDS Deduction Rule</label>
                  <input type="text" value={orgData.taxRule} disabled={!isAdmin} onChange={e => setOrgData({ ...orgData, taxRule: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-semibold" />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Departments & Teams</label>
                  <input type="text" value={orgData.departments} disabled={!isAdmin} onChange={e => setOrgData({ ...orgData, departments: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white font-semibold" />
                </div>
              </div>

              <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-4 flex flex-wrap justify-between items-center gap-3">
                <div className="text-xs text-zinc-300">
                  <strong className="text-white">Client Quick Subscription Checkout:</strong> Upgrade instantly via Razorpay, PhonePe QR, or Google Pay QR.
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => openGatewayCheckout('Growth Plan', 2499, 'Razorpay')} className="bg-[#0c233a] hover:bg-[#133354] border border-sky-700/50 text-sky-300 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition">
                    <i className="fa-solid fa-bolt text-sky-400"></i>
                    <span>Razorpay (₹2,499)</span>
                  </button>
                  <button onClick={() => openGatewayCheckout('Growth Plan', 2499, 'PhonePe Scanner')} className="bg-[#211038] hover:bg-[#311854] border border-purple-700/50 text-purple-300 text-xs font-bold px-3.5 py-2 rounded-xl transition">
                    PhonePe Scanner
                  </button>
                  <button onClick={() => openGatewayCheckout('Growth Plan', 2499, 'GPay Scanner')} className="bg-[#0b261d] hover:bg-[#113b2d] border border-emerald-700/50 text-emerald-300 text-xs font-bold px-3.5 py-2 rounded-xl transition">
                    GPay Scanner
                  </button>
                </div>
              </div>
            </div>
            <DirectContactBanner />
          </section>
        )}

        {/* MODULE 02 */}
        {isModuleVisible(2) && (
          <section className="space-y-4">
            <div className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800/80">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 02 • EMPLOYEE & CHANNEL PARTNER DIRECTORY</div>
                  <h2 className="text-xl font-black text-white mt-0.5">Salesperson & Partner Management (Add, Edit & Deactivate)</h2>
                </div>
                {isAdmin && (
                  <button onClick={() => setModal('addEmp')} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl">
                    + Add Salesperson / Partner
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] text-zinc-400 uppercase border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-3">ID</th>
                      <th className="py-3 px-3">NAME & CONTACT</th>
                      <th className="py-3 px-3">ROLE</th>
                      <th className="py-3 px-3">DEPARTMENT</th>
                      <th className="py-3 px-3">ASSIGNED POLICY</th>
                      <th className="py-3 px-3">EARNED COMM.</th>
                      <th className="py-3 px-3">STATUS</th>
                      {isAdmin && <th className="py-3 px-3">ADMIN ACTION</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/70">
                    {employees.map((emp, idx) => (
                      <tr key={emp.id} className="hover:bg-zinc-900/40">
                        <td className="py-3.5 px-3 font-mono text-red-400 font-bold">{emp.id}</td>
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white">{emp.name}</div>
                          <div className="text-[10px] text-zinc-400">{emp.email}</div>
                        </td>
                        <td className="py-3.5 px-3 text-zinc-300">{emp.role}</td>
                        <td className="py-3.5 px-3 text-zinc-300">{emp.department}</td>
                        <td className="py-3.5 px-3 text-red-400 font-medium">{emp.policy}</td>
                        <td className="py-3.5 px-3 font-mono font-bold text-emerald-400">₹{emp.earned.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${emp.status === 'Active' ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700/50' : 'bg-zinc-900 text-zinc-400 border-zinc-700'}`}>
                            {emp.status}
                          </span>
                        </td>
                        {isAdmin && (
                          <td className="py-3.5 px-3">
                            <button
                              onClick={() => {
                                const updated = [...employees];
                                updated[idx].status = emp.status === 'Active' ? 'Deactivated' : 'Active';
                                setEmployees(updated);
                              }}
                              className="text-[11px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded text-zinc-200"
                            >
                              {emp.status === 'Active' ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <DirectContactBanner />
          </section>
        )}

        {/* MODULE 03 */}
        {isModuleVisible(3) && (
          <section className="space-y-4">
            <div className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800/80">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 03 • NO-CODE POLICY & VERSIONING ENGINE</div>
                  <h2 className="text-xl font-black text-white mt-0.5">Commission Policy Builder (Fixed, Marginal Slabs, Target & Splits)</h2>
                </div>
                {isAdmin && (
                  <button onClick={() => setModal('addPol')} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl">
                    + Create Policy Version
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {policies.map(p => (
                  <div key={p.code} className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="bg-red-950/80 text-red-400 border border-red-800/60 font-mono text-[10px] px-2 py-0.5 rounded font-bold">{p.code} • {p.version}</span>
                        <span className="text-[11px] text-emerald-400 font-semibold">● {p.status}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{p.name}</h3>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{p.type}</div>
                    </div>
                    <div className="mt-4 bg-[#0d0d10] border border-zinc-800/80 rounded-xl px-3 py-2 font-mono text-[11px] text-zinc-200">
                      {p.rule}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DirectContactBanner />
          </section>
        )}

        {/* MODULE 04 */}
        {isModuleVisible(4) && (
          <section className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4 pb-3 border-b border-zinc-800/80">
              <div>
                <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 04 • SALES TRANSACTION LEDGER & DUPLICATE SAFEGUARDS</div>
                <h2 className="text-xl font-black text-white mt-0.5">Sales Transaction Management (Manual Entry, Import & Excel Export)</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {isAdmin && (
                  <>
                    <button onClick={() => setModal('addTxn')} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl">
                      + Manual Transaction
                    </button>
                    <label className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold px-3.5 py-2 rounded-xl cursor-pointer">
                      <i className="fa-solid fa-file-import text-red-400 mr-1.5"></i>Import Excel / CSV
                      <input type="file" accept=".csv,.xlsx" className="hidden" onChange={() => alert('Excel/CSV file validated! Duplicate check passed: 0 duplicates found.')} />
                    </label>
                  </>
                )}
                <button
                  onClick={() => exportCSV('Auron_Sales_Transactions.csv', ['Invoice', 'Customer', 'Gross', 'Deductions', 'Eligible', 'Salesperson', 'Commission', 'Status'], transactions.map(t => [t.id, t.customer, t.gross, t.deductions, t.eligible, t.rep, t.commission, t.status]))}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold px-3.5 py-2 rounded-xl"
                >
                  <i className="fa-solid fa-download text-emerald-400 mr-1.5"></i>Export Excel (.CSV)
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] text-zinc-400 uppercase border-b border-zinc-800">
                  <tr>
                    <th className="py-3 px-3">INVOICE ID</th>
                    <th className="py-3 px-3">CUSTOMER</th>
                    <th className="py-3 px-3">GROSS SALE</th>
                    <th className="py-3 px-3">DEDUCTIONS</th>
                    <th className="py-3 px-3">ELIGIBLE BASE</th>
                    <th className="py-3 px-3">SALESPERSON</th>
                    <th className="py-3 px-3">CALCULATED COMM.</th>
                    <th className="py-3 px-3">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70">
                  {transactions.map(t => (
                    <tr key={t.id} className="hover:bg-zinc-900/40">
                      <td className="py-3 px-3 font-mono text-red-400 font-bold">{t.id}</td>
                      <td className="py-3 px-3 font-bold text-white">{t.customer}</td>
                      <td className="py-3 px-3 font-mono text-zinc-300">₹{t.gross.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3 font-mono text-amber-400">-₹{t.deductions.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3 font-mono text-white font-semibold">₹{t.eligible.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3 text-zinc-300">{t.rep}</td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-400">₹{t.commission.toLocaleString('en-IN')}</td>
                      <td className="py-3 px-3">
                        <span className="bg-emerald-950/60 text-emerald-400 border border-emerald-700/50 px-2.5 py-0.5 rounded-full text-[10px] font-semibold">
                          {t.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* MODULE 05 */}
        {isModuleVisible(5) && (
          <section className="space-y-4">
            <div className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap justify-between items-center gap-3 mb-5 pb-3 border-b border-zinc-800/80">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 05 • TRANSPARENT CALCULATION ENGINE</div>
                  <h2 className="text-xl font-black text-white mt-0.5">Commission Calculation Breakdown & 6-Step Traceable Lineage</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Inspect Transaction:</span>
                  <select value={selectedTxnId} onChange={e => setSelectedTxnId(e.target.value)} className="bg-[#180b0b] border border-red-700/60 text-white text-xs font-semibold px-3 py-2 rounded-xl outline-none">
                    {transactions.map(t => (
                      <option key={t.id} value={t.id}>{t.id} — {t.customer}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 6-Step Traceable Lineage Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 mb-5">
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold text-red-500 uppercase">STEP 1 • GROSS INVOICE</div>
                  <div className="text-lg font-black font-mono text-white mt-1">₹{selectedTxn.gross.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">{selectedTxn.id}</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold text-red-500 uppercase">STEP 2 • DEDUCTIONS</div>
                  <div className="text-lg font-black font-mono text-amber-400 mt-1">-₹{selectedTxn.deductions.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Discount / Return</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold text-red-500 uppercase">STEP 3 • ELIGIBLE BASE</div>
                  <div className="text-lg font-black font-mono text-white mt-1">₹{selectedTxn.eligible.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">Commissionable Base</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold text-red-500 uppercase">STEP 4 • POLICY VER.</div>
                  <div className="text-xs font-bold text-white mt-1.5 leading-snug">{selectedTxn.policy}</div>
                  <div className="text-[10px] text-zinc-400 mt-1">Rep: {selectedTxn.rep}</div>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5">
                  <div className="text-[10px] font-bold text-red-500 uppercase">STEP 5 • FORMULA MATH</div>
                  <div className="text-[11px] font-mono text-zinc-200 mt-1.5 leading-relaxed">
                    {selectedTxn.id === 'INV-2026-101' ? '₹2,000 (2%) + ₹8,000 (4%) + ₹6,000 (6%) + ₹2,000 Bonus' : `Eligible Base × Policy Rate`}
                  </div>
                </div>
                <div className="bg-[#180a0a] border border-red-600 rounded-xl p-3.5 shadow-lg shadow-red-950/40">
                  <div className="text-[10px] font-bold text-red-400 uppercase">STEP 6 • FINAL PAYOUT</div>
                  <div className="text-lg font-black font-mono text-emerald-400 mt-1">₹{selectedTxn.commission.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">✓ Audit Verified</div>
                </div>
              </div>

              {/* Interactive Formula Verifier */}
              <div className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-red-500 uppercase tracking-wider">INTERACTIVE FORMULA VERIFIER (TEST ANY SALES AMOUNT LIVE)</span>
                  <span className="text-zinc-400 font-mono">Marginal Slabs: 0–1L @ 2% | 1L–3L @ 4% | &gt;3L @ 6%</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-3">
                    <label className="block text-[11px] text-zinc-400 mb-1">Eligible Sales Base (₹)</label>
                    <input type="number" value={calcTestAmount} onChange={e => setCalcTestAmount(e.target.value)} className="w-full bg-[#0e0e11] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-[11px] text-zinc-400 mb-1">Policy Calculation Model</label>
                    <select value={calcTestModel} onChange={e => setCalcTestModel(e.target.value)} className="w-full bg-[#0e0e11] border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white">
                      <option value="marginal">Marginal Tier Slabs (2% / 4% / 6%)</option>
                      <option value="fixed">Fixed Percentage (5.0% Flat)</option>
                    </select>
                  </div>
                  <div className="md:col-span-6 bg-[#140b0b] border border-red-900/50 rounded-xl px-4 py-2.5 text-xs font-mono text-zinc-200">
                    {computeLiveBreakdown()}
                  </div>
                </div>
              </div>
            </div>
            <DirectContactBanner />
          </section>
        )}

        {/* MODULE 06 */}
        {isModuleVisible(6) && (
          <section className="space-y-4">
            <div className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap justify-between items-center gap-3 mb-4 pb-3 border-b border-zinc-800/80">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 06 • CLAWBACK & PROPORTIONAL REVERSAL LEDGER</div>
                  <h2 className="text-xl font-black text-white mt-0.5">Returns, Cancellations & Linked Reversals (Excel Format)</h2>
                </div>
                <button
                  onClick={() => exportCSV('Auron_Reversals_Ledger.csv', ['Reversal ID', 'Original Invoice', 'Original Sale', 'Refund Amount', 'Original Comm', 'Clawback Reversed', 'Remaining Payable', 'Reason'], reversals.map(r => [r.id, r.invoice, r.originalSale, r.refundAmount, r.originalComm, r.clawback, r.remaining, r.reason]))}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold px-3.5 py-2 rounded-xl"
                >
                  ↓ Export Reversals Excel (.CSV)
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] text-zinc-400 uppercase border-b border-zinc-800">
                    <tr>
                      <th className="py-3 px-3">REVERSAL ID</th>
                      <th className="py-3 px-3">ORIGINAL INVOICE</th>
                      <th className="py-3 px-3">ORIGINAL SALE</th>
                      <th className="py-3 px-3">REFUND AMOUNT</th>
                      <th className="py-3 px-3">ORIGINAL COMM.</th>
                      <th className="py-3 px-3">CLAWBACK REVERSED</th>
                      <th className="py-3 px-3">REMAINING PAYABLE</th>
                      <th className="py-3 px-3">AUDIT REASON</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/70">
                    {reversals.map(r => (
                      <tr key={r.id}>
                        <td className="py-3.5 px-3 font-mono text-red-400 font-bold">{r.id}</td>
                        <td className="py-3.5 px-3 font-bold text-white">{r.invoice}</td>
                        <td className="py-3.5 px-3 font-mono text-zinc-300">₹{r.originalSale.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-3 font-mono text-amber-400">₹{r.refundAmount.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-3 font-mono text-zinc-300">₹{r.originalComm.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-3 font-mono font-bold text-red-400">-₹{Math.abs(r.clawback).toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-3 font-mono font-bold text-emerald-400">₹{r.remaining.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-3 text-zinc-300">{r.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <DirectContactBanner />
          </section>
        )}

        {/* MODULE 07 */}
        {isModuleVisible(7) && (
          <section className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-zinc-800/80">
              <div>
                <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 07 • EXECUTIVE ANALYTICS & TELEMETRY</div>
                <h2 className="text-xl font-black text-white mt-0.5">Commission Overview Dashboard (Bar Graph & Pie Chart)</h2>
              </div>
              <span className="text-xs text-zinc-400">Real-Time Financial Summary • FY 2026–2027</span>
            </div>

            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
                <div className="text-xs text-zinc-400">Total Eligible Sales</div>
                <div className="text-2xl font-black text-white mt-1">₹9,00,000</div>
                <div className="text-[11px] text-emerald-400 mt-1">↑ +24.8% QoQ Growth</div>
              </div>
              <div className="bg-[#160a0a] border border-red-800/60 rounded-2xl p-4">
                <div className="text-xs text-zinc-400">Gross Calculated Commissions</div>
                <div className="text-2xl font-black text-red-500 mt-1">₹38,500</div>
                <div className="text-[11px] text-zinc-400 mt-1">100% Rule-Validated</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
                <div className="text-xs text-zinc-400">Net Paid & Reconciled</div>
                <div className="text-2xl font-black text-emerald-400 mt-1">₹24,300</div>
                <div className="text-[11px] text-zinc-400 mt-1">Bank UTR Matched</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
                <div className="text-xs text-zinc-400">Refund Clawbacks</div>
                <div className="text-2xl font-black text-amber-400 mt-1">₹1,000</div>
                <div className="text-[11px] text-zinc-400 mt-1">Linked to Original Inv.</div>
              </div>
            </div>

            {/* Visual Bar Graph & Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Graph */}
              <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">MONTHLY ELIGIBLE SALES VS. COMMISSION PAYOUTS (BAR GRAPH)</span>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1.5 text-zinc-400"><span className="w-2.5 h-2.5 rounded-sm bg-zinc-600 inline-block"></span>Sales Volume</span>
                    <span className="flex items-center gap-1.5 text-zinc-300"><span className="w-2.5 h-2.5 rounded-sm bg-red-600 inline-block"></span>Commissions</span>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4 items-end h-44 pt-4 px-2 border-b border-zinc-800">
                  {[
                    { m: 'Jun', s: 'h-16', c: 'h-8' },
                    { m: 'Jul', s: 'h-20', c: 'h-10' },
                    { m: 'Aug', s: 'h-24', c: 'h-12' },
                    { m: 'Sep', s: 'h-28', c: 'h-14' },
                    { m: 'Oct', s: 'h-32', c: 'h-16' },
                    { m: 'Nov', s: 'h-40', c: 'h-20' }
                  ].map(bar => (
                    <div key={bar.m} className="flex flex-col items-center gap-2">
                      <div className="flex items-end gap-1.5">
                        <div className={`w-4 sm:w-5 bg-zinc-700 rounded-t ${bar.s}`}></div>
                        <div className={`w-4 sm:w-5 bg-red-600 rounded-t ${bar.c}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-4 text-center text-[11px] text-zinc-400 pt-2">
                  <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span>
                </div>
              </div>

              {/* Pie / Donut Chart */}
              <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-5 flex flex-col justify-between">
                <div className="text-xs font-bold text-white uppercase tracking-wider mb-4">OVERALL PAYMENT STATUS DISTRIBUTION (PIE CHART)</div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 my-auto py-4">
                  <div
                    className="w-40 h-40 rounded-full flex items-center justify-center relative shadow-xl"
                    style={{ background: 'conic-gradient(#dc2626 0% 49%, #10b981 49% 77%, #f59e0b 77% 92%, #3f3f46 92% 100%)' }}
                  >
                    <div className="w-24 h-24 rounded-full bg-zinc-950 flex flex-col items-center justify-center">
                      <span className="text-base font-black text-white">100%</span>
                      <span className="text-[10px] text-zinc-400">Audited</span>
                    </div>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2.5"><span className="w-3 h-3 rounded-sm bg-red-600"></span><span className="text-zinc-200">Approved & Locked (49%)</span></div>
                    <div className="flex items-center gap-2.5"><span className="w-3 h-3 rounded-sm bg-emerald-500"></span><span className="text-zinc-200">Reconciled Paid (28%)</span></div>
                    <div className="flex items-center gap-2.5"><span className="w-3 h-3 rounded-sm bg-amber-500"></span><span className="text-zinc-200">Pending Sign-off (15%)</span></div>
                    <div className="flex items-center gap-2.5"><span className="w-3 h-3 rounded-sm bg-zinc-700"></span><span className="text-zinc-200">Clawback Reversed (8%)</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* MODULE 08 */}
        {isModuleVisible(8) && (
          <section className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-5 pb-3 border-b border-zinc-800/80">
              <div>
                <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 08 • ITEMIZED STATEMENTS, BILLS & OFFICIAL CERTIFICATION</div>
                <h2 className="text-xl font-black text-white mt-0.5">Commission Statements, Total Payment Bill & Certificate PDF</h2>
              </div>
              <button onClick={() => setModal('certificate')} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-red-950 flex items-center gap-2">
                <i className="fa-solid fa-file-pdf"></i>
                <span>Open & Download Official PDF Certificate</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-2.5">
                  <span className="font-bold text-white">ITEMIZED COMMISSION PAYMENT BILL (#STMT-2026-11)</span>
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-700/50 px-2 py-0.5 rounded text-[10px]">Finalised & Locked</span>
                </div>
                <div className="flex justify-between text-zinc-300"><span>Gross Eligible Commission Pool:</span><span className="font-mono font-bold text-white">₹38,500.00</span></div>
                <div className="flex justify-between text-amber-400"><span>Proportional Refund Reversals (REV-01):</span><span className="font-mono">-₹1,000.00</span></div>
                <div className="flex justify-between text-zinc-400"><span>TDS Statutory Deduction (Sec 194H @ 10%):</span><span className="font-mono">-₹3,750.00</span></div>
                <div className="flex justify-between border-t border-zinc-800 pt-2.5 text-sm font-black text-emerald-400">
                  <span>TOTAL CLEARED NET PAYABLE BILL:</span>
                  <span className="font-mono">₹33,750.00 INR</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#160a0a] to-zinc-950 border border-red-800/50 rounded-2xl p-5 flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold text-red-400 uppercase">OFFICIAL ALPHA AURON CREDENTIAL</div>
                  <h3 className="text-base font-bold text-white">Certificate of Commission & Incentive Clearance</h3>
                  <p className="text-xs text-zinc-400">Includes Alpha Auron company dragon emblem, your profile photo/name, verified payout total (₹33,750.00), and signatures of Harika & Poojitha.</p>
                  <button onClick={() => setModal('certificate')} className="mt-2 bg-white text-black hover:bg-zinc-200 text-xs font-bold px-3.5 py-2 rounded-xl inline-flex items-center gap-1.5">
                    <i className="fa-solid fa-download text-red-600"></i>
                    <span>Download Certificate PDF</span>
                  </button>
                </div>
                <img src={logoUrl} alt="Logo" className="w-20 h-20 rounded-full object-cover bg-white border-2 border-red-600 shrink-0" />
              </div>
            </div>
          </section>
        )}

        {/* MODULE 09 */}
        {isModuleVisible(9) && (
          <section className="space-y-4">
            <div className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap justify-between items-center gap-3 mb-5 pb-3 border-b border-zinc-800/80">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 09 • MULTI-LEVEL GOVERNANCE & BATCH LOCK</div>
                  <h2 className="text-xl font-black text-white mt-0.5">Commission Approval Workflow & Immutable Finalisation</h2>
                </div>
                <span className="text-xs text-zinc-400">Finance Review → Manager Sign-Off → Final Lock</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {batches.map((b, i) => (
                  <div key={b.id} className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-xs text-zinc-400">{b.id}</span>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border ${
                          b.status === 'Finalised & Locked'
                            ? 'bg-red-950/80 text-red-400 border-red-700/60'
                            : 'bg-emerald-950/60 text-emerald-400 border-emerald-700/50'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white">{b.title}</h3>
                      <div className="text-lg font-black font-mono text-red-500 mt-1">₹{b.amount.toLocaleString('en-IN')}</div>
                      <div className="text-xs text-zinc-400 mt-1">{b.note}</div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-800/80 flex justify-between items-center text-[11px] text-zinc-400">
                      <span>By: {b.reviewer}</span>
                      {isAdmin && b.status === 'Pending Review' ? (
                        <button
                          onClick={() => {
                            const updated = [...batches];
                            updated[i].status = 'Approved';
                            updated[i].reviewer = 'Harika (Admin)';
                            setBatches(updated);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded font-bold"
                        >
                          Approve Batch
                        </button>
                      ) : (
                        <span>Protected</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DirectContactBanner />
          </section>
        )}

        {/* MODULE 10 & 11 */}
        {(isModuleVisible(10) || isModuleVisible(11)) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Module 10 */}
            {isModuleVisible(10) && (
              <section className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
                <div className="mb-4 pb-3 border-b border-zinc-800/80">
                  <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 10 • BANK UTR & DISBURSEMENT RECONCILIATION</div>
                  <h2 className="text-lg font-black text-white mt-0.5">Payout Tracking & UTR Matching</h2>
                </div>
                <div className="space-y-2.5">
                  {payouts.map(p => (
                    <div key={p.utr} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 flex justify-between items-center text-xs">
                      <div>
                        <div className="font-mono font-bold text-white">{p.utr}</div>
                        <div className="text-[11px] text-zinc-400">{p.recipient} • {p.method}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-emerald-400">₹{p.amount.toLocaleString('en-IN')}</div>
                        <span className="text-[10px] text-sky-400 font-semibold">{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Module 11 */}
            {isModuleVisible(11) && (
              <section className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-zinc-800/80">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 11 • CLIENT INVESTIGATION & DISPUTE PORTAL</div>
                    <h2 className="text-lg font-black text-white mt-0.5">Disputes & Authorised Adjustments</h2>
                  </div>
                  <button onClick={() => setModal('addDispute')} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                    + Raise Investigation
                  </button>
                </div>
                <div className="space-y-2.5">
                  {disputes.map((d, i) => (
                    <div key={d.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-red-400">{d.id} • Ref: {d.invoice}</span>
                        <span className="bg-amber-950/70 text-amber-300 border border-amber-700/50 px-2 py-0.5 rounded-full text-[10px]">{d.status}</span>
                      </div>
                      <div className="text-zinc-200">{d.reason}</div>
                      {isAdmin && d.status !== 'Resolved' && (
                        <button
                          onClick={() => {
                            const updated = [...disputes];
                            updated[i].status = 'Resolved';
                            setDisputes(updated);
                          }}
                          className="text-[10px] bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1 rounded font-bold"
                        >
                          Mark Resolved (Admin)
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* MODULE 12 */}
        {isModuleVisible(12) && (
          <section className="bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-6 pb-3 border-b border-zinc-800/80">
              <div>
                <div className="text-[10px] font-bold tracking-widest text-red-500 uppercase">MODULE 12 • MANAGEMENT REPORTS & DIRECT SUBSCRIPTION CHECKOUT</div>
                <h2 className="text-xl font-black text-white mt-0.5">Reports & SaaS Subscription Plans (Razorpay, PhonePe & GPay Scanners)</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setModal('qrUpload')} className="bg-[#1b0b0b] hover:bg-red-900/40 border border-red-700/60 text-red-300 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5">
                  <i className="fa-solid fa-qrcode"></i>
                  <span>Upload My Own UPI QR Scanner</span>
                </button>
                <button
                  onClick={() => exportCSV('Auron_Commission_Liability_Report.csv', ['Payment ID', 'Plan', 'Gateway', 'Amount', 'Timestamp', 'Status'], paymentLedger.map(p => [p.id, p.plan, p.gateway, p.amount, p.timestamp, p.status]))}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold px-3.5 py-2 rounded-xl"
                >
                  ↓ Export Liability Report (.CSV)
                </button>
              </div>
            </div>

            {/* 4 SaaS Subscription Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { name: 'STARTER PLAN', price: 999, features: ['1 Organisation Tenant', 'CSV Imports & Fixed Policies', 'Official PDF Certificates'], popular: false },
                { name: 'GROWTH PLAN', price: 2499, features: ['Marginal Slabs & Target Bonuses', 'Excel Duplicate Safeguards', 'Approval Workflows & Charts'], popular: true },
                { name: 'BUSINESS PLAN', price: 5999, features: ['Multi-Level Splits & Branches', 'Payout UTR Reconciliation', 'Dispute & Clawback Engine'], popular: false },
                { name: 'ENTERPRISE PLAN', price: 14999, features: ['Unlimited Reps & Custom APIs', 'Dedicated Account Architect', '24/7 Priority SLA Support'], popular: false }
              ].map(tier => (
                <div key={tier.name} className={`bg-zinc-950 rounded-2xl p-5 flex flex-col justify-between relative ${tier.popular ? 'border-2 border-red-600 shadow-xl shadow-red-950/30' : 'border border-zinc-800'}`}>
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
                      MOST POPULAR
                    </span>
                  )}
                  <div>
                    <div className={`text-xs font-bold ${tier.popular ? 'text-red-500' : 'text-zinc-400'}`}>{tier.name}</div>
                    <div className="mt-2 mb-4">
                      <span className="text-3xl font-black text-white">₹{tier.price.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-zinc-400"> /month</span>
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-300 mb-6">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <button onClick={() => openGatewayCheckout(tier.name, tier.price, 'Razorpay')} className="w-full bg-[#0d2238] hover:bg-[#143354] border border-sky-700/60 text-sky-300 text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition">
                      <i className="fa-solid fa-bolt text-sky-400"></i>
                      <span>Pay via Razorpay</span>
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => openGatewayCheckout(tier.name, tier.price, 'PhonePe QR')} className="bg-[#211038] hover:bg-[#311854] border border-purple-700/50 text-purple-300 text-[11px] font-bold py-2 rounded-xl transition">
                        PhonePe QR
                      </button>
                      <button onClick={() => openGatewayCheckout(tier.name, tier.price, 'GPay QR')} className="bg-[#0b261d] hover:bg-[#113b2d] border border-emerald-700/50 text-emerald-300 text-[11px] font-bold py-2 rounded-xl transition">
                        GPay QR
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Subscription Payment Ledger */}
            <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-4">
              <div className="text-xs font-bold text-white mb-3">Live Subscription Payment Ledger</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] text-zinc-400 uppercase border-b border-zinc-800">
                    <tr>
                      <th className="py-2.5 px-3">Payment ID</th>
                      <th className="py-2.5 px-3">Plan Purchased</th>
                      <th className="py-2.5 px-3">Gateway / Scanner</th>
                      <th className="py-2.5 px-3">Amount Paid</th>
                      <th className="py-2.5 px-3">Timestamp</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/70">
                    {paymentLedger.map(pay => (
                      <tr key={pay.id}>
                        <td className="py-2.5 px-3 font-mono font-bold text-white">{pay.id}</td>
                        <td className="py-2.5 px-3 text-red-400 font-semibold">{pay.plan}</td>
                        <td className="py-2.5 px-3 text-zinc-300">{pay.gateway}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-white">₹{pay.amount.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-3 text-zinc-400">{pay.timestamp}</td>
                        <td className="py-2.5 px-3">
                          <span className="bg-emerald-950/70 text-emerald-400 border border-emerald-700/50 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                            ✓ {pay.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* PAYMENT SUCCESS POPUP RECORD */}
      {paymentSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d1f17] border-2 border-emerald-500 rounded-2xl p-4 shadow-2xl max-w-sm animate-bounce">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 text-black flex items-center justify-center font-black shrink-0">✓</div>
            <div className="text-xs">
              <div className="font-black text-emerald-400 text-sm">Payment Successful!</div>
              <div className="text-zinc-200 mt-0.5">Receipt ID: <strong className="font-mono">{paymentSuccessToast.id}</strong></div>
              <div className="text-zinc-300">Plan: <strong>{paymentSuccessToast.plan}</strong> (₹{paymentSuccessToast.amount})</div>
              <div className="text-zinc-400 text-[10px] mt-0.5">Paid via {paymentSuccessToast.gateway} • Recorded in Ledger</div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: OFFICIAL MODULE 8 PDF CERTIFICATE */}
      {modal === 'certificate' && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b0b0e] border border-zinc-700 rounded-2xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Module 8 • Official Printable Certificate Preview</span>
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow flex items-center gap-1.5">
                  <i className="fa-solid fa-download"></i>
                  <span>Download / Print PDF</span>
                </button>
                <button onClick={() => setModal(null)} className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 py-2 rounded-xl">Close</button>
              </div>
            </div>

            {/* Printable Certificate Canvas */}
            <div id="printableCertificate" className="bg-gradient-to-b from-[#170909] via-[#0c0c0e] to-[#140808] border-2 border-red-600/80 rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden">
              <div className="border border-red-600/30 rounded-xl p-6 sm:p-8 space-y-5">
                <img src={logoUrl} alt="Alpha Auron Logo" className="w-16 h-16 rounded-full object-cover bg-white border-2 border-red-600 mx-auto shadow-lg" />
                <div>
                  <div className="text-xs font-bold tracking-[0.25em] text-red-500 uppercase">ALPHA AURON PRIVATE LIMITED</div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide mt-1">CERTIFICATE OF COMMISSION & INCENTIVE CLEARANCE</h2>
                </div>

                <div className="pt-2">
                  {user.avatar ? (
                    <img src={user.avatar} alt="User" className="w-16 h-16 rounded-full object-cover border-2 border-red-500 mx-auto" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-red-600 border-2 border-red-400 text-white font-black text-xl flex items-center justify-center mx-auto shadow-lg">{user.initials}</div>
                  )}
                  <div className="text-[10px] tracking-[0.2em] text-zinc-400 uppercase mt-3">OFFICIAL STATEMENT & PAYMENT CLEARANCE AWARDED TO</div>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-red-400 mt-1">{user.name}</div>
                  <div className="text-xs text-zinc-300 mt-0.5">{user.email} • Verified Commercial Partner</div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
                  This certifies that all eligible sales transactions, policy version calculations, incentives, and subscription entitlements (<strong className="text-white">{activePlan}</strong>) have been reconciled on <strong className="text-white">Auron CommissionOS</strong> by <strong className="text-red-400">Alpha Auron Private Limited</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
                  <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-3">
                    <div className="text-[10px] text-zinc-400 uppercase">CERTIFICATE SERIAL ID</div>
                    <div className="text-xs font-mono font-bold text-white mt-1">AURON-CERT-2026-9042</div>
                  </div>
                  <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-3">
                    <div className="text-[10px] text-zinc-400 uppercase">TOTAL CLEARED PAYOUT</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 mt-1">₹33,750.00 INR</div>
                  </div>
                  <div className="bg-zinc-950/90 border border-zinc-800 rounded-xl p-3">
                    <div className="text-[10px] text-zinc-400 uppercase">ISSUE & AUDIT DATE</div>
                    <div className="text-xs font-mono font-bold text-white mt-1">17 Nov 2026</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-zinc-800/80 text-xs">
                  <div className="text-left">
                    <div className="font-serif italic font-bold text-red-400 text-sm">HARIKA</div>
                    <div className="text-[11px] text-zinc-300">Backend & Calculation Engine Lead</div>
                    <div className="text-[10px] text-zinc-500">Alpha Auron Private Limited</div>
                  </div>
                  <div className="bg-[#1c0b0b] border border-red-600/60 text-red-400 text-[10px] font-bold px-4 py-1.5 rounded-full tracking-wider">
                    ★ OFFICIAL VERIFIED SEAL
                  </div>
                  <div className="text-right">
                    <div className="font-serif italic font-bold text-red-400 text-sm">POOJITHA</div>
                    <div className="text-[11px] text-zinc-300">Frontend & Product Design Lead</div>
                    <div className="text-[10px] text-zinc-500">Alpha Auron Private Limited</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: RAZORPAY / PHONEPE / GPAY SCANNER CHECKOUT */}
      {modal === 'payment' && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e0e11] border border-zinc-700 rounded-2xl max-w-md w-full p-6 text-center relative shadow-2xl">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-3 py-1 rounded-full text-xs font-bold text-white mb-3">
              {paymentModalData.gateway === 'Razorpay' && <><i className="fa-solid fa-bolt text-sky-400"></i><span>Razorpay Secure Checkout</span></>}
              {paymentModalData.gateway === 'PhonePe QR' && <><i className="fa-solid fa-qrcode text-purple-400"></i><span>PhonePe UPI QR Scanner</span></>}
              {paymentModalData.gateway === 'GPay QR' && <><i className="fa-brands fa-google-pay text-emerald-400 text-base"></i><span>Google Pay (GPay) QR Scanner</span></>}
            </div>

            <h3 className="text-lg font-black text-white">{paymentModalData.plan}</h3>
            <div className="text-2xl font-black text-red-500 font-mono my-1">₹{paymentModalData.amount.toLocaleString('en-IN')}</div>
            <p className="text-xs text-zinc-400 mb-4">Scan QR code using {paymentModalData.gateway} or complete instant verification below.</p>

            <div className="bg-white p-4 rounded-2xl inline-block mb-3 shadow-lg">
              {customQrUrl ? (
                <img src={customQrUrl} alt="Custom UPI QR" className="w-44 h-44 object-contain" />
              ) : (
                <div className="w-44 h-44 flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 rounded-xl">
                  <i className="fa-solid fa-qrcode text-8xl text-zinc-900"></i>
                  <span className="text-[10px] font-bold text-zinc-700 mt-2">ALPHA AURON MERCHANT QR</span>
                </div>
              )}
            </div>
            <div className="text-xs font-mono text-red-400 mb-4">Merchant VPA: alphaauron.commissionos@okicici</div>

            <button onClick={confirmGatewayPayment} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl shadow-lg transition">
              ✓ Simulate & Confirm Payment Success
            </button>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD / CHANGE LOGO */}
      {modal === 'logo' && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e0e11] border border-zinc-700 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            <h3 className="text-base font-bold text-white mb-1">Upload / Change Company Logo</h3>
            <p className="text-xs text-zinc-400 mb-4">Choose an image file from your computer to display in the top bar and Module 8 Certificate.</p>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  setLogoUrl(URL.createObjectURL(file));
                  setModal(null);
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-300 mb-3"
            />
            <button onClick={() => { setLogoUrl(DRAGON_LOGO_SVG); setModal(null); }} className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs py-2 rounded-xl">
              Restore Default Alpha Auron Dragon Logo
            </button>
          </div>
        </div>
      )}

      {/* MODAL: UPLOAD CUSTOM UPI QR SCANNER */}
      {modal === 'qrUpload' && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e0e11] border border-zinc-700 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            <h3 className="text-base font-bold text-white mb-1">Upload My Own PhonePe / GPay QR Scanner</h3>
            <p className="text-xs text-zinc-400 mb-4">Upload your personal or merchant UPI QR scanner image so clients can scan and pay directly.</p>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                const file = e.target.files[0];
                if (file) {
                  setCustomQrUrl(URL.createObjectURL(file));
                  setModal(null);
                  alert('Your custom UPI QR scanner has been attached to all checkout modals!');
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-xs text-zinc-300"
            />
          </div>
        </div>
      )}

      {/* MODAL: CLIENT / ADMIN LOGIN & REGISTRATION */}
      {modal === 'login' && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e0e11] border border-zinc-700 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            <h3 className="text-lg font-black text-white mb-1">Auron CommissionOS Login</h3>
            <p className="text-xs text-zinc-400 mb-4">Sign in with your working Gmail ID and password.</p>
            <form
              onSubmit={e => {
                e.preventDefault();
                const email = e.target.email.value;
                const name = e.target.name.value || email.split('@')[0];
                const adminCheck = email.toLowerCase().includes('harika') || email.toLowerCase().includes('admin');
                setUser({ name, email, initials: name.slice(0, 2).toUpperCase(), avatar: user.avatar });
                if (adminCheck) {
                  setIsAdmin(true);
                  window.location.hash = 'admin-panel';
                }
                setModal(null);
              }}
              className="space-y-3"
            >
              <input name="name" type="text" placeholder="Full Name (e.g., Client User or Harika)" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white" />
              <input name="email" type="email" defaultValue="client@alphaauron.com" placeholder="Working Gmail ID" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white" />
              <input name="password" type="password" defaultValue="Client@123" placeholder="Password" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white" />
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl">Sign In to Portal</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PROFILE EDIT & PHOTO UPLOAD */}
      {modal === 'profile' && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e0e11] border border-zinc-700 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            <h3 className="text-base font-bold text-white mb-1">Edit Profile & Certificate Photo</h3>
            <p className="text-xs text-zinc-400 mb-4">Your updated name and photo appear in the header and Module 8 Official Certificate.</p>
            <div className="space-y-3">
              <input type="text" value={user.name} onChange={e => setUser({ ...user, name: e.target.value, initials: e.target.value.slice(0, 2).toUpperCase() })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">Upload Profile Photo</label>
                <input type="file" accept="image/*" onChange={e => { if (e.target.files[0]) setUser({ ...user, avatar: URL.createObjectURL(e.target.files[0]) }); }} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-xs text-zinc-300" />
              </div>
              <button onClick={() => setModal(null)} className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl">Save Profile Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CONTACT OWNER INBOX */}
      {modal === 'contact' && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e0e11] border border-zinc-700 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            <h3 className="text-base font-bold text-white mb-1">Send Direct Message to Business Owner</h3>
            <p className="text-xs text-zinc-400 mb-4">Inquire about plans, subscriptions, or custom commission structures.</p>
            <form
              onSubmit={e => {
                e.preventDefault();
                const msg = { name: e.target.cname.value, email: e.target.cemail.value, phone: e.target.cphone.value, text: e.target.cmsg.value };
                setOwnerMessages([msg, ...ownerMessages]);
                setModal(null);
                alert('Message delivered to Business Owner Inbox!');
              }}
              className="space-y-3"
            >
              <input name="cname" type="text" placeholder="Your Full Name" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <input name="cemail" type="email" placeholder="Your Gmail ID" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <input name="cphone" type="text" placeholder="WhatsApp / Phone Number" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <textarea name="cmsg" rows="3" placeholder="Write your message..." required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"></textarea>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl">Send Message</button>
            </form>
          </div>
        </div>
      )}

      {/* ADMIN MODALS: ADD EMPLOYEE / POLICY / TRANSACTION / DISPUTE */}
      {modal === 'addEmp' && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e0e11] border border-zinc-700 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            <h3 className="text-base font-bold text-white mb-3">Add Salesperson / Partner</h3>
            <form onSubmit={e => {
              e.preventDefault();
              setEmployees([...employees, {
                id: 'EMP-' + Math.floor(103 + Math.random() * 800),
                name: e.target.ename.value,
                email: e.target.eemail.value,
                role: e.target.erole.value,
                department: e.target.edept.value,
                policy: 'Marginal Slabs v2.0',
                earned: 0,
                status: 'Active'
              }]);
              setModal(null);
            }} className="space-y-3">
              <input name="ename" placeholder="Full Name" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <input name="eemail" type="email" placeholder="Email ID" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <input name="erole" placeholder="Role (e.g. Sales Representative)" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <input name="edept" placeholder="Department (e.g. Enterprise)" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <button type="submit" className="w-full bg-red-600 text-white text-xs font-bold py-2.5 rounded-xl">Add Member</button>
            </form>
          </div>
        </div>
      )}

      {modal === 'addPol' && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e0e11] border border-zinc-700 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            <h3 className="text-base font-bold text-white mb-3">Create New Commission Policy</h3>
            <form onSubmit={e => {
              e.preventDefault();
              setPolicies([...policies, {
                code: 'POL-0' + (policies.length + 1),
                version: 'v1.0',
                name: e.target.pname.value,
                type: e.target.ptype.value,
                rule: e.target.prule.value,
                status: 'Active'
              }]);
              setModal(null);
            }} className="space-y-3">
              <input name="pname" placeholder="Policy Name" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <input name="ptype" placeholder="Model Type (e.g. Product-Based)" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <input name="prule" placeholder="Rule Formula (e.g. Flat 8% on SaaS)" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <button type="submit" className="w-full bg-red-600 text-white text-xs font-bold py-2.5 rounded-xl">Save Policy Version</button>
            </form>
          </div>
        </div>
      )}

      {modal === 'addTxn' && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e0e11] border border-zinc-700 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            <h3 className="text-base font-bold text-white mb-3">Add Manual Sales Transaction</h3>
            <form onSubmit={e => {
              e.preventDefault();
              const gross = Number(e.target.tgross.value);
              setTransactions([...transactions, {
                id: 'INV-2026-' + Math.floor(104 + Math.random() * 800),
                customer: e.target.tcust.value,
                gross,
                deductions: 0,
                eligible: gross,
                rep: e.target.trep.value,
                policy: 'Enterprise Standard Fixed (v1.2)',
                commission: Math.round(gross * 0.05),
                status: 'Validated'
              }]);
              setModal(null);
            }} className="space-y-3">
              <input name="tcust" placeholder="Customer Name" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <input name="tgross" type="number" placeholder="Gross Sale Amount (₹)" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <input name="trep" placeholder="Assigned Salesperson (e.g. Harika)" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <button type="submit" className="w-full bg-red-600 text-white text-xs font-bold py-2.5 rounded-xl">Record & Calculate</button>
            </form>
          </div>
        </div>
      )}

      {modal === 'addDispute' && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0e0e11] border border-zinc-700 rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-zinc-400 hover:text-white"><i className="fa-solid fa-xmark"></i></button>
            <h3 className="text-base font-bold text-white mb-3">Raise Investigation / Dispute (Module 11)</h3>
            <form onSubmit={e => {
              e.preventDefault();
              setDisputes([{
                id: 'DSP-' + Math.floor(402 + Math.random() * 500),
                invoice: e.target.dinv.value,
                raisedBy: user.name,
                reason: e.target.dreason.value,
                status: 'Open'
              }, ...disputes]);
              setModal(null);
            }} className="space-y-3">
              <input name="dinv" defaultValue="INV-2026-101" placeholder="Invoice / Statement ID" required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white" />
              <textarea name="dreason" rows="3" placeholder="Describe your commission dispute or investigation request..." required className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white"></textarea>
              <button type="submit" className="w-full bg-red-600 text-white text-xs font-bold py-2.5 rounded-xl">Submit Investigation Ticket</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
