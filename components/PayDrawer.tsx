import React from 'react';
import { DollarSign, X } from 'lucide-react';

interface PayDrawerProps {
  open: boolean;
  onClose: () => void;
  shiftData: {
    staffName: string;
    role: string;
    rate: number;
    hours: number;
  } | null;
  onConfirm: () => void;
}

const PayDrawer: React.FC<PayDrawerProps> = ({ open, onClose, shiftData, onConfirm }) => {
  if (!open || !shiftData) return null;

  const total = shiftData.rate * shiftData.hours;
  const serviceFee = total * 0.05;
  const finalTotal = total + serviceFee;

  return (
    <div className="fixed inset-0 z-[90]">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className={`absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-neon-rose/30 bg-panel-black text-white p-6 transform transition-transform duration-300 ease-out ${open ? "translate-y-0" : "translate-y-full"} shadow-[0_-10px_50px_rgba(255,126,179,0.15)] max-w-3xl mx-auto`}>
        
        <div className="mx-auto h-1 w-12 rounded-full bg-white/20 mb-6" />

        <div className="flex justify-between items-center mb-6">
            <div>
                <h2 className="text-xl font-display font-black text-white tracking-wide">CONFIRM PAYMENT</h2>
                <p className="text-sm text-gray-400">Release funds to {shiftData.staffName}.</p>
            </div>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <X className="w-5 h-5 text-gray-400" />
            </button>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 mb-8 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                    <div className="text-white font-bold">{shiftData.role} Shift</div>
                    <div className="text-xs text-gray-500">{shiftData.hours} Hours @ ${shiftData.rate}/hr</div>
                </div>
                <div className="text-white font-mono">${total.toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="text-sm text-gray-400">Platform Fee (5%)</div>
                <div className="text-gray-400 font-mono">${serviceFee.toFixed(2)}</div>
            </div>
            <div className="flex justify-between items-center pt-2">
                <div className="text-lg font-bold text-white">TOTAL</div>
                <div className="text-2xl font-black text-neon-rose font-mono">${finalTotal.toFixed(2)}</div>
            </div>
        </div>

        <div className="flex gap-4">
            <button 
                onClick={onClose}
                className="flex-1 py-4 rounded-xl border border-white/10 text-white font-bold font-display uppercase tracking-widest hover:bg-white/5 transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={onConfirm}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-neon-rose to-pink-600 text-white font-bold font-display uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,126,179,0.4)] transition-all flex items-center justify-center gap-2"
            >
                <DollarSign className="w-5 h-5" />
                Pay Now
            </button>
        </div>

      </div>
    </div>
  );
};

export default PayDrawer;