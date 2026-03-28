import { Metadata } from 'next'
import BankPageClient from './BankPageClient'

export async function generateMetadata({ params }: { params: { bank: string } }): Promise<Metadata> {
  // We take the EXACT slug from the URL (e.g., "chase-statement-to-csv")
  const bankParam = params?.bank || "";
  
  // We split it by dashes and remove the "filler" words to find the bank name
  const nameParts = bankParam
    .split('-')
    .filter(word => !['convert', 'statement', 'to', 'csv', 'pdf', 'excel', 'xlsx', 'converter'].includes(word.toLowerCase()));

  // We capitalize it (e.g., "chase" becomes "Chase")
  const bankDisplayName = nameParts.length > 0 
    ? nameParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Bank";

  return {
    // This ONLY changes what shows up on Google and in the Browser Tab
    title: `Convert ${bankDisplayName} PDF Statement to Excel & CSV | DocNeat`,
    
    description: `Instantly convert ${bankDisplayName} PDF bank statements to Excel or CSV with AI-powered accuracy. Secure, private processing by DocNeat Statement Converter.`,
    
    openGraph: {
      title: `Convert ${bankDisplayName} PDF to Excel | DocNeat`,
      description: `Fast and secure ${bankDisplayName} statement conversion.`,
      url: `https://www.docneat.com/convert/${bankParam}`,
    }
  }
}

export default function BankPage({ params }: { params: { bank: string } }) {
  return <BankPageClient params={params} />
}