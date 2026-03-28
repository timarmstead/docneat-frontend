import { Metadata } from 'next'
import BankPageClient from './BankPageClient'

export async function generateMetadata({ params }: { params: { bank: string } }): Promise<Metadata> {
  // 1. Get the slug from the URL (e.g., 'chase-statement-to-csv')
  const bankParam = params?.bank || "";
  
  // 2. Extract the bank name and capitalize it (e.g., 'chase' -> 'Chase')
  const nameParts = bankParam
    .split('-')
    .filter(word => !['convert', 'statement', 'to', 'csv', 'pdf', 'excel', 'xlsx', 'converter'].includes(word.toLowerCase()));

  const bankDisplayName = nameParts.length > 0 
    ? nameParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Bank";

  return {
    // This controls the Blue Link in Google Search
    title: `Convert ${bankDisplayName} PDF Statement to CSV | DocNeat.com`,
    
    // This matches your 'Perfect' description exactly
    description: `Extract transaction data from your ${bankDisplayName} PDF statements with verified accuracy. Perfectly formatted for QuickBooks, Xero, and Excel. View Plans & Pricing.`,
    
    // This tells Google the official name of the site for the search results
    openGraph: {
      siteName: 'DocNeat.com - Bank Statement Converter',
      title: `Convert ${bankDisplayName} PDF to CSV | DocNeat.com`,
      description: `Extract transaction data from your ${bankDisplayName} PDF statements.`,
      url: `https://www.docneat.com/convert/${bankParam}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Convert ${bankDisplayName} PDF to CSV | DocNeat.com`,
    }
  }
}

export default function BankPage({ params }: { params: { bank: string } }) {
  // This sends the dynamic URL data to your main page component
  return <BankPageClient params={params} />
}