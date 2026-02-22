'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError('Wrong password.');
      }
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: '#0C0C0C', fontFamily: 'var(--font-jb), monospace' }}>

      <motion.div
        className="relative w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(24px)' }}>

          <div className="flex justify-center mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Lock size={16} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.45)' }} />
            </div>
          </div>

          <p className="text-[13px] text-center mb-1" style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>admin</p>
          <p className="text-xs text-center mb-7" style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>
            enter your password to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                autoFocus
                className="w-full rounded-xl px-4 py-3 text-[13px] pr-11 outline-none transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: error ? '1px solid rgba(248,113,113,0.4)' : '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.75)',
                  fontFamily: 'inherit',
                  fontWeight: 300,
                }}
                onFocus={(e) => { if (!error) (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.2)'; }}
                onBlur={(e) => { if (!error) (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
              />
              <button type="button" onClick={() => setShow((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-150 cursor-pointer"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                {show ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-center" style={{ color: 'rgba(248,113,113,0.7)', fontWeight: 300 }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-xl text-[13px] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.65)',
                fontFamily: 'inherit',
                fontWeight: 400,
              }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
            >
              {loading ? 'signing in…' : 'sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.25)' }} className="hover:underline">
            ← back to portfolio
          </a>
        </p>
      </motion.div>
    </div>
  );
}
