import { Metadata } from 'next';
import BankPageClient from './BankPageClient';

export async function generateMetadata({ params }: { params: { bank: string } }): Promise<Metadata> {
  const bank = params.bank || "";
  const slugParts = bank.split('-');
  const ignoredWords = ['convert', 'statement', 'to', 'csv', 'pdf', 'conversion'];
  const nameParts = slugParts.filter(part => !ignoredWords.includes(part.toLowerCase()));
  const bankDisplayName = nameParts.length > 0 
    ? nameParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Bank";

  const titles = [
    `Convert ${bankDisplayName} PDF Statement to CSV | DocNeat`,
    `${bankDisplayName} Statement to CSV Converter`,
    `How to Export ${bankDisplayName} Transactions to CSV`
  ];
  const versionIndex = bankDisplayName.length % titles.length;

  return {
    title: titles[versionIndex],
    description: `Extract transaction data from your ${bankDisplayName} PDF statements with verified accuracy. Perfectly formatted for QuickBooks, Xero, and Excel.`,
  };
}

export default function Page({ params }: { params: { bank: string } }) {
  return <BankPageClient params={params} />;
}