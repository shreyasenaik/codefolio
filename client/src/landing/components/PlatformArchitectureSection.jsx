import React from 'react';
import { Layers, Zap, Shield } from 'lucide-react';

export const PlatformArchitectureSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-[#223046]">
      <div className="mb-10">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          Platform Architecture
        </h2>
        <p className="text-xs font-mono text-[#94A3B8]">
          // Core architectural mechanics designed for speed, security, and extensibility
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="bg-[#131B2A]/60 border border-[#223046] p-6 rounded-xl flex flex-col gap-4 hover:border-[#38BDF8] transition-colors group">
          <div className="w-12 h-12 bg-[#0B0F17] rounded-lg flex items-center justify-center border border-[#223046] text-[#00E599] group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Declarative Template Engine</h3>
          <p className="font-mono text-xs text-[#94A3B8] leading-relaxed flex-grow">
            Templates resolve via an open-closed <code className="text-[#38BDF8]">templateMap[id]</code> lookup table. Add new design themes without modifying routing or core controller logic.
          </p>
          <div className="pt-2 border-t border-[#223046] font-mono text-[11px] text-[#00E599]">
            ✓ Open-Closed Architecture
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bg-[#131B2A]/60 border border-[#223046] p-6 rounded-xl flex flex-col gap-4 hover:border-[#38BDF8] transition-colors group">
          <div className="w-12 h-12 bg-[#0B0F17] rounded-lg flex items-center justify-center border border-[#223046] text-[#38BDF8] group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Instant 1-RTT Data Aggregation</h3>
          <p className="font-mono text-xs text-[#94A3B8] leading-relaxed flex-grow">
            A single public vanity endpoint (<code className="text-[#38BDF8]">GET /api/users/:username</code>) aggregates profile, project repositories, and skill matrices in parallel queries for rapid page loads.
          </p>
          <div className="pt-2 border-t border-[#223046] font-mono text-[11px] text-[#38BDF8]">
            ✓ Parallel Mongoose Aggregation
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bg-[#131B2A]/60 border border-[#223046] p-6 rounded-xl flex flex-col gap-4 hover:border-[#38BDF8] transition-colors group">
          <div className="w-12 h-12 bg-[#0B0F17] rounded-lg flex items-center justify-center border border-[#223046] text-[#FF5A78] group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Zero-Exposure Contact Proxy</h3>
          <p className="font-mono text-xs text-[#94A3B8] leading-relaxed flex-grow">
            Visitors send messages through a protected Nodemailer proxy (<code className="text-[#38BDF8]">POST /api/contact/:username</code>). Developer personal emails are never exposed in bundles or public APIs.
          </p>
          <div className="pt-2 border-t border-[#223046] font-mono text-[11px] text-[#FF5A78]">
            ✓ Zero-PII Exposure
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformArchitectureSection;
