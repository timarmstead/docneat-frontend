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
    // This is the blue link title people see on Google
    title: `Convert ${bankDisplayName} PDF Statement to Excel & CSV | DocNeat`,
    
    // This is the grey snippet text below the link on Google
    description: `Instantly convert ${bankDisplayName} PDF bank statements to Excel (XLS) or CSV with AI-powered accuracy. Secure, private processing for professional bookkeeping and audits.`,
    
    // Social media preview settings
    openGraph: {
      title: `Convert ${bankDisplayName} PDF to Excel & CSV`,
      description: `Fast and secure ${bankDisplayName} statement converter.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Convert ${bankDisplayName} PDF to Excel & CSV`,
      description: `AI-powered ${bankDisplayName} statement conversion.`,
    }
  }
}

export default function BankPage({ params }: { params: { bank: string } }) {
  return <BankPageClient params={params} />
}