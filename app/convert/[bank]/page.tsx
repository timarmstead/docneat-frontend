import { Metadata } from 'next'
import BankPageClient from './BankPageClient'

export async function generateMetadata({ params }: { params: { bank: string } }): Promise<Metadata> {
  const bankParam = params?.bank || "";
  const slugParts = bankParam.split('-');
  
  // Logic to extract the bank name from the URL slug
  const ignoredWords = ['convert', 'statement', 'to', 'csv', 'pdf', 'conversion'];
  const nameParts = slugParts.filter(part => !ignoredWords.includes(part.toLowerCase()));

  const bankDisplayName = nameParts.length > 0 
    ? nameParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Bank";

  return {
    // Optimized Title: Targeting "Convert Chase Statement to Excel"
    title: `Convert ${bankDisplayName} PDF Statement to Excel & CSV | DocNeat Statement Converter`,
    
    // Optimized Description: High-conversion marketing copy
    description: `Instantly convert ${bankDisplayName} PDF bank statements to Excel (XLS) or CSV with AI-powered accuracy. Secure, private processing for professional bookkeeping and audits.`,
    
    // Social media / OpenGraph settings
    openGraph: {
      title: `Convert ${bankDisplayName} PDF to Excel & CSV | DocNeat`,
      description: `Fast and secure ${bankDisplayName} statement converter.`,
      type: 'website',
      url: `https://www.docneat.com/convert/${bankParam}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `Convert ${bankDisplayName} PDF to Excel & CSV`,
      description: `AI-powered ${bankDisplayName} statement conversion.`,
    }
  }
}

export default function BankPage({ params }: { params: { bank: string } }) {
  // This passes the bank parameter to the Client component for rendering the page content
  return <BankPageClient params={params} />
}