import { Metadata } from 'next';
import BankPageClient from './BankPageClient';

export async function generateMetadata({ params }: { params: { bank: string } }): Promise<Metadata> {
  const slugParts = params.bank ? params.bank.split('-') : [];
  const ignoredWords = ['convert', 'statement', 'to', 'csv', 'pdf', 'conversion'];
  const nameParts = slugParts.filter(part => !ignoredWords.includes(part.toLowerCase()));
  const bankDisplayName = nameParts.length > 0 
    ? nameParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Bank";

  const titles = [
    `Convert ${bankDisplayName} PDF Statement to CSV | DocNeat`,
    `${bankDisplayName} Statement to CSV Converter - Fast & Secure`,
    `How to Export ${bankDisplayName} Transactions to CSV/Excel`
  ];

  const descriptions = [
    `Extract transaction data from your ${bankDisplayName} PDF statements with verified accuracy. Perfectly formatted for QuickBooks, Xero, and Excel.`,
    `Stop wasting hours on manual data entry. Our AI tool converts ${bankDisplayName} PDF statements into clean, audit-ready CSV files instantly.`,
    `The most reliable way to turn ${bankDisplayName} PDF statements into spreadsheets with complete data integrity.`
  ];

  const versionIndex = bankDisplayName.length % titles.length;

  return {
    title: titles[versionIndex],
    description: descriptions[versionIndex],
    alternates: {
      canonical: `https://docneat.com/convert/${params.bank}`,
    },
  };
}

export default function Page({ params }: { params: { bank: string } }) {
  return <BankPageClient params={params} />;
}