import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CreditCard, Users, ShieldCheck, Settings, LifeBuoy, LogOut, ChevronRight, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const primaryItems = [
    { 
      label: 'Wallet & Payouts', 
      icon: CreditCard, 
      path: '/staff/wallet',
      badge: '$450.00',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10'
    },
    { 
      label: 'My Crew', 
      icon: Users, 
      path: '/staff/crew',
      badge: '3 Invites',
      color: 'text-brand', // brand is neon-rose in css
      bgColor: 'bg-brand/10'
    },
    { 
      label: 'Trust Score', 
      icon: ShieldCheck, 
      path: '/staff/trust',
      badge: 'Top 1%',
      color: 'text-electric-blue',
      bgColor: 'bg-electric-blue/10'
    }
  ];

  const secondaryItems = [
    { 
      label: 'App Settings', 
      icon: Settings, 
      path: '/staff/settings',
      color: 'text-gray-400',
      bgColor: 'bg-gray-400/10'
    },
    { 
      label: 'Safety Center', 
      icon: LifeBuoy, 
      path: '/staff/safety',
      color: 'text-red-400',
      bgColor: 'bg-red-400/10'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 bg-[#F2F2F7] dark:bg-[#000000] z-[70] flex flex-col overflow-y-auto no-scrollbar"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-inherit px-6 py-6 flex items-center justify-between">
              <span className="font-display font-black text-2xl tracking-tight text-txt-primary">MENU</span>
              <button onClick={onClose} className="p-2 -mr-2 rounded-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 text-txt-primary hover:scale-105 transition-transform">
                  <ArrowLeft className="w-5 h-5" />
              </button>
          </div>

          <div className="px-6 pb-12 flex-1 flex flex-col">
            
            {/* Membership Card - New Design */}
            <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="relative overflow-hidden p-6 rounded-[32px] bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/5 shadow-xl mb-8 group"
            >
                {/* Decorative Glows */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-rose/5 rounded-full blur-3xl pointer-events-none transition-opacity group-hover:opacity-100 opacity-50" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex items-center gap-5">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full p-[3px] bg-gradient-to-br from-neon-rose to-purple-600">
                             <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100" className="w-full h-full rounded-full object-cover border-2 border-white dark:border-[#0A0A0A]" alt="Profile" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-black text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border border-white/10 flex items-center gap-0.5">
                            <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" /> 4.9
                        </div>
                    </div>
                    <div>
                        <h3 className="font-display font-black text-2xl text-txt-primary leading-none mb-1">Elena R.</h3>
                        <div className="flex items-center gap-2">
                             <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neon-rose text-black uppercase tracking-wider">PRO</span>
                             <span className="text-xs text-txt-tertiary">Mixologist</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Menu Groups */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6 flex-1"
            >
                {/* Primary Actions */}
                <div className="space-y-3">
                    <h4 className="px-2 text-[10px] font-bold text-txt-tertiary uppercase tracking-widest opacity-70">Management</h4>
                    {primaryItems.map((item) => (
                        <motion.button 
                            variants={itemVariants}
                            key={item.label}
                            onClick={() => { navigate(item.path); onClose(); }}
                            className="w-full flex items-center justify-between p-4 rounded-[24px] bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${item.bgColor} ${item.color} group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="font-display font-bold text-base text-txt-secondary group-hover:text-txt-primary transition-colors">
                                    {item.label}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                {item.badge && (
                                    <span className={`text-[11px] font-bold px-3 py-1 rounded-lg ${item.bgColor} ${item.color} opacity-90`}>
                                        {item.badge}
                                    </span>
                                )}
                                <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-txt-primary transition-colors" />
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Secondary Actions */}
                <div className="space-y-3">
                    <h4 className="px-2 text-[10px] font-bold text-txt-tertiary uppercase tracking-widest opacity-70 mt-6">Preferences</h4>
                    {secondaryItems.map((item) => (
                        <motion.button 
                            variants={itemVariants}
                            key={item.label}
                            onClick={() => { navigate(item.path); onClose(); }}
                            className="w-full flex items-center justify-between p-4 rounded-[24px] bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-2xl ${item.bgColor} ${item.color} group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="font-display font-bold text-base text-txt-secondary group-hover:text-txt-primary transition-colors">
                                    {item.label}
                                </span>
                            </div>
                             <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-txt-primary transition-colors" />
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Footer */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
            >
                <button className="w-full py-4 rounded-[24px] bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-red-500 font-bold font-display uppercase tracking-widest transition-all flex items-center justify-center gap-2 active:scale-95">
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
                <div className="mt-6 text-center">
                     <p className="text-[10px] text-txt-tertiary font-medium flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3 text-neon-rose" /> INDUSTRY v2.0
                     </p>
                </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuDrawer;