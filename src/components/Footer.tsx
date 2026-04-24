"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 mb-16">
        {/* Brand */}
        <div className="col-span-1 lg:col-span-1">
          <Link href="/" className="flex items-center mb-6 group">
            <div className="relative w-[180px] h-[52px] group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/company-logo.png"
                alt="Aero Airworthiness Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <p className="text-[15px] text-gray-400 leading-relaxed mb-6 md:text-sm md:text-gray-500">
            Providing elite FAA DAR-F authority and full-spectrum certification support since 2008. Excellence in aerospace regulatory compliance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-gold font-bold mb-6 text-sm tracking-widest uppercase">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-gold transition-colors">FAA DAR-F Services</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">STC / TC Approvals</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">PMA Systems</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Experimental Authority</a></li>
          </ul>
        </div>

        {/* Authority */}
        <div>
          <h4 className="text-gold font-bold mb-6 text-sm tracking-widest uppercase">Compliance</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li><a href="#" className="hover:text-gold transition-colors">14 CFR §21.137</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">AS9100 Auditing</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Safety Management Systems</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">EASA Coordination</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gold font-bold mb-6 text-sm tracking-widest uppercase">Direct Contact</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gold" />
              <span>info@aeroairworthiness.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gold" />
              <span>+1 (336) 370-5825</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-gold" />
              <span>North Carolina Greensboro USA</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold tracking-widest text-white/30 uppercase">
        <p>© {new Date().getFullYear()} Aero Airworthiness Certification LLC. All Rights Reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold transition-colors">Terms of Authority</a>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-12 text-center text-[12px] md:text-[11px] tracking-[0.2em] font-serif">
        <span className="text-white/60">Developed by </span>
        <a href="https://divinecoretech.in" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-all duration-300 font-medium">
          DivineCore Technologies
        </a>
      </div>
    </footer>
  );
}
