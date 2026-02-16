"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";

const Dropzone = dynamic(() => import('../../components/Dropzone'), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white">
      <p className="text-sm text-slate-400 animate-pulse">Loading secure area...</p>
    </div>
  ),
});

export interface HeroProps {
  title: string;
  description: string;
  bankName?: string;
  bankSlug?: string; 
}

export default function Hero({ title, description, bankName, bankSlug }: HeroProps) {
  return (
    <section className="w-full pt-20 pb-12 lg:pt-28 lg:pb-16 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-6">
            <div>
              <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
                AI Optimized for {bankName || "Statement Conversion"}
              </Badge>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-[#111729] leading-tight">
                {title}
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                {description}
              </p>
            </div>
            <div className="flex flex-row gap-3">
              <Link href="https://www.docneat.com/pricing" passHref>
                <Button 
                  size="lg" 
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 px-8 gap-4"
                >
                  View Plans & Pricing <MoveRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Live Dropzone Area */}
          <div className="relative">
            <div className="absolute -top-4 left-6 z-10">
              <span className="bg-white border border-slate-200 px-3 py-1 rounded-full text-xs font-medium text-slate-500 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Secure PDF Upload
              </span>
            </div>
            
            <div className="p-2 bg-white rounded-3xl shadow-2xl border border-slate-100 min-h-[350px] [&_*]:bg-white [&_*]:text-slate-900 [&_*]:border-slate-200">
              <Dropzone />
            </div>
            
            <p className="text-center text-xs text-slate-400 mt-3 italic leading-relaxed">
              Bank-level 256-bit encryption. Files are deleted immediately after processing.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}