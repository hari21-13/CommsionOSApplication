const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Optional Prisma DB connection with seamless in-memory fallback for zero-error instant startup
let prisma = null;
try {
  const { PrismaClient } = require('@prisma/client');
  prisma = new PrismaClient();
} catch (e) {
  console.log('Running in instant MVP memory-store mode.');
}

// Seeded MVP State matching all 12 Modules
let state = {
  org: {
    name: 'Alpha Auron Private Limited',
    currency: 'INR (₹) — Indian Rupee',
    financialYear: 'FY 2026 – 2027 (Apr–Mar)',
    taxRule: '10% Sec 194H Commission TDS',
    departments: 'Enterprise, Channel, Retail'
  },
  employees: [
    { id: 'EMP-101', name: 'Harika', email: 'harika@alphaauron.com', role: 'Sales Manager', department: 'Enterprise', policy: 'Marginal Slabs v2.0', earned: 18000, status: 'Active' },
    { id: 'EMP-102', name: 'Poojitha', email: 'poojitha@alphaauron.com', role: 'Sales Representative', department: 'Channel', policy: 'Fixed 5% v1.2', earned: 9000, status: 'Active' },
    { id: 'PTR-201', name: 'Arjun Mehta', email: 'arjun@partner.in', role: 'Channel Partner', department: 'Direct B2B', policy: 'Multi-Level Split v1.0', earned: 10500, status: 'Active' }
  ],
  policies: [
    { code: 'POL-01', version: 'v2.0', name: 'Marginal Slab Accelerator', type: 'Marginal Tier Slabs', rule: '0-1L @ 2% | 1L-3L @ 4% | >3L @ 6%', status: 'Active' },
    { code: 'POL-02', version: 'v1.2', name: 'Enterprise Standard Fixed', type: 'Fixed Percentage', rule: 'Flat 5.0% on Net Eligible Base', status: 'Active' },
    { code: 'POL-03', version: 'v1.1', name: 'Target Over-Achievement', type: 'Target Bonus', rule: '+₹2,000 Bonus at ≥100% Quota', status: 'Active' },
    { code: 'POL-04', version: 'v1.0', name: 'Partner Credit Split', type: 'Multi-Level Split', rule: '70% Rep / 20% Manager / 10% Partner', status: 'Active' }
  ],
  transactions: [
    { id: 'INV-2026-101', customer: 'Apex FinTech Ltd', gross: 420000, deductions: 20000, eligible: 400000, rep: 'Harika', policy: 'Marginal Slab Accelerator (v2.0)', commission: 18000, status: 'Validated' },
    { id: 'INV-2026-102', customer: 'Nexus Retail Corp', gross: 200000, deductions: 0, eligible: 200000, rep: 'Poojitha', policy: 'Enterprise Standard Fixed (v1.2)', commission: 10000, status: 'Eligible' },
    { id: 'INV-2026-103', customer: 'Vanguard Logistics', gross: 300000, deductions: 0, eligible: 300000, rep: 'Arjun Mehta', policy: 'Partner Credit Split (v1.0)', commission: 10500, status: 'Approved' }
  ],
  reversals: [
    { id: 'REV-01', invoice: 'INV-2026-102', originalSale: 200000, refundAmount: 20000, originalComm: 10000, clawback: -1000, remaining: 9000, reason: '10% Partial Seat Cancellation' }
  ],
  batches: [
    { id: 'APR-11', title: 'Nov Batch #1 — Harika', amount: 16200, note: 'PO & Invoice verified', reviewer: 'Finance Admin', status: 'Approved' },
    { id: 'APR-12', title: 'Nov Batch #2 — Poojitha', amount: 8100, note: 'Immutable statement locked', reviewer: 'Business Owner', status: 'Finalised & Locked' },
    { id: 'APR-13', title: 'Nov Batch #3 — Arjun', amount: 9450, note: 'Ready for admin approval', reviewer: 'Awaiting Sign-off', status: 'Pending Review' }
  ],
  payouts: [
    { utr: 'UTR-HDFC-8849201', recipient: 'Harika (EMP-101)', amount: 16200, method: 'NEFT Bank Transfer', status: 'Reconciled' },
    { utr: 'UTR-ICICI-7731904', recipient: 'Poojitha (EMP-102)', amount: 8100, method: 'IMPS Instant', status: 'Reconciled' }
  ],
  disputes: [
    { id: 'DSP-401', invoice: 'INV-2026-101', raisedBy: 'Client User', reason: 'Verify Q4 accelerator bonus threshold application', status: 'Under Review' }
  ],
  payments: [
    { id: 'PAY-AUR-101', plan: 'Starter Plan', gateway: 'Razorpay', amount: 999, timestamp: '17 Nov 2026, 09:15 AM', status: 'Success' }
  ],
  messages: []
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ success: true, service: 'Auron CommissionOS Backend API', developer: 'Harika', status: 'Online' });
});

// Get Complete State
app.get('/api/state', (req, res) => {
  res.json({ success: true, data: state });
});

// Auth Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }
  const isAdmin = email.toLowerCase().includes('harika') || email.toLowerCase().includes('admin');
  res.json({
    success: true,
    token: 'auron_jwt_' + Date.now(),
    user: {
      name: isAdmin ? 'Harika (Admin)' : email.split('@')[0],
      email,
      role: isAdmin ? 'Super Admin' : 'Client User'
    }
  });
});

// Record Subscription Payment (Razorpay / PhonePe / GPay)
app.post('/api/payments', (req, res) => {
  const { plan, gateway, amount } = req.body;
  const newPay = {
    id: 'PAY-AUR-' + Math.floor(102 + Math.random() * 899),
    plan,
    gateway,
    amount,
    timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
    status: 'Success'
  };
  state.payments.unshift(newPay);
  res.json({ success: true, payment: newPay });
});

// Submit Investigation Dispute (Module 11)
app.post('/api/disputes', (req, res) => {
  const { invoice, raisedBy, reason } = req.body;
  const newDispute = {
    id: 'DSP-' + Math.floor(402 + Math.random() * 590),
    invoice,
    raisedBy: raisedBy || 'Client User',
    reason,
    status: 'Open'
  };
  state.disputes.unshift(newDispute);
  res.json({ success: true, dispute: newDispute });
});

// Contact Owner Inbox
app.post('/api/contact', (req, res) => {
  const msg = { id: 'MSG-' + Date.now(), ...req.body, createdAt: new Date().toISOString() };
  state.messages.unshift(msg);
  res.json({ success: true, message: 'Message delivered to Business Owner', record: msg });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Auron CommissionOS Backend running cleanly on http://localhost:${PORT}`);
});
