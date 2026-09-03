import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { sendContactMessage } from '../../api/publicApi.js';

export const ContactModal = ({ isOpen, onClose, username, developerName, isCyberpunk = false }) => {
  const [status, setStatus] = useState({ state: 'idle', message: '', previewUrl: null });
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (formData) => {
    try {
      setStatus({ state: 'loading', message: '', previewUrl: null });
      const res = await sendContactMessage(username, formData);
      setStatus({
        state: 'success',
        message: 'Your message was sent successfully!',
        previewUrl: res.previewUrl
      });
      reset();
    } catch (err) {
      setStatus({
        state: 'error',
        message: err.response?.data?.message || 'Failed to send message. Please try again.',
        previewUrl: null
      });
    }
  };

  const handleClose = () => {
    setStatus({ state: 'idle', message: '', previewUrl: null });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur with fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350, duration: 0.25 }}
            className={`w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-2xl relative z-10 ${
              isCyberpunk
                ? 'bg-slate-950 border-2 border-cyber-neon shadow-[0_0_35px_rgba(0,240,255,0.3)] font-mono'
                : 'bg-slate-900 border border-slate-800 text-slate-100'
            }`}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className={`absolute top-4 right-4 p-2 rounded-xl transition-colors cursor-pointer ${
                isCyberpunk ? 'text-cyber-pink hover:bg-cyber-pink/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="mb-6">
              <h3 className={`text-2xl font-bold ${isCyberpunk ? 'text-cyber-neon font-cyber tracking-wide' : 'text-white'}`}>
                {isCyberpunk ? '> INITIALIZE_COMMUNICATION' : `Get in Touch with ${developerName || 'Developer'}`}
              </h3>
              <p className={`text-sm mt-1 ${isCyberpunk ? 'text-slate-400 font-mono' : 'text-slate-400'}`}>
                Send a direct transmission. Your message will be securely delivered to their inbox.
              </p>
            </div>

            {status.state === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-4"
              >
                <div className="inline-flex p-3.5 rounded-full bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-semibold text-white">Transmission Delivered!</h4>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">{status.message}</p>
                {status.previewUrl && (
                  <p className="text-xs text-indigo-400 font-mono">
                    <a href={status.previewUrl} target="_blank" rel="noreferrer" className="underline hover:text-indigo-300">
                      View Ethereal Email Preview ↗
                    </a>
                  </p>
                )}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClose}
                  className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                    isCyberpunk
                      ? 'bg-cyber-neon text-black font-cyber hover:bg-white font-bold'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  }`}
                >
                  Done
                </motion.button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {status.state === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-rose-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{status.message}</span>
                  </motion.div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Ada Lovelace"
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-800/80 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.name ? 'border-rose-500' : isCyberpunk ? 'border-cyber-neon/40 focus:border-cyber-neon focus:shadow-[0_0_10px_rgba(0,240,255,0.3)]' : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.name && <span className="text-xs text-rose-400 mt-1 block">{errors.name.message}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="ada@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-800/80 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.email ? 'border-rose-500' : isCyberpunk ? 'border-cyber-neon/40 focus:border-cyber-neon focus:shadow-[0_0_10px_rgba(0,240,255,0.3)]' : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.email && <span className="text-xs text-rose-400 mt-1 block">{errors.email.message}</span>}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Project Collaboration / Opportunity"
                    {...register('subject')}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-800/80 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                      isCyberpunk ? 'border-cyber-neon/40 focus:border-cyber-neon' : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Hi, I loved your projects and would like to discuss..."
                    {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message must be at least 10 characters' } })}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm bg-slate-800/80 border text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.message ? 'border-rose-500' : isCyberpunk ? 'border-cyber-neon/40 focus:border-cyber-neon focus:shadow-[0_0_10px_rgba(0,240,255,0.3)]' : 'border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                  {errors.message && <span className="text-xs text-rose-400 mt-1 block">{errors.message.message}</span>}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status.state === 'loading'}
                    className={`px-6 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer ${
                      isCyberpunk
                        ? 'bg-gradient-to-r from-cyber-neon to-cyber-pink text-slate-950 font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] font-cyber'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                    }`}
                  >
                    {status.state === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Transmission
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
