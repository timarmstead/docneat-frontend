import { Metadata } from 'next'
import BankPageClient from './BankPageClient'
import { bankDataMap } from './bankData'

export async function generateMetadata({ params }: { params: { bank: string } }): Promise<Metadata> {
  const bankParam = params?.bank || "";
  
  const nameParts = bankParam
    .split('-')
    .filter(word => !['convert', 'statement', 'to', 'csv', 'pdf', 'excel', 'xlsx', 'converter'].includes(word.toLowerCase()));

  const bankDisplayName = nameParts.length > 0 
    ? nameParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Bank";

  return {
    title: `Convert ${bankDisplayName} PDF Statement to CSV | DocNeat.com`,
    description: `Extract transaction data from your ${bankDisplayName} PDF statements with verified accuracy. Perfectly formatted for QuickBooks, Xero, and Excel. View Plans & Pricing.`,
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

function buildSchemaJsonLd(bankParam: string, bankDisplayName: string) {
  const bankKey = bankParam
    .split('-')
    .filter(word => !['statement', 'to', 'csv', 'pdf', 'excel', 'xlsx', 'converter'].includes(word.toLowerCase()))
    .join('-')
    .toLowerCase();

  const bankData = bankDataMap[bankKey] || null;
  const pageUrl = `https://www.docneat.com/convert/${bankParam}`;

  // HowTo schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to convert ${bankDisplayName} PDF statement to CSV`,
    "description": `Step-by-step guide to converting your ${bankDisplayName} PDF bank statement into a CSV file using DocNeat.`,
    "totalTime": "PT2M",
    "tool": [
      {
        "@type": "HowToTool",
        "name": "DocNeat Bank Statement Converter"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": `Download PDF from ${bankDisplayName}`,
        "text": `Log in to your ${bankDisplayName} online banking portal. Navigate to your statements or transaction history and download the desired period as a PDF document.`,
        "url": pageUrl
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Upload to DocNeat",
        "text": `Drag and drop your ${bankDisplayName} PDF into the secure conversion box at the top of the page. DocNeat immediately begins identifying headers and transaction rows.`,
        "url": pageUrl
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Download as CSV",
        "text": "Review the preview of your data. Once satisfied, click export. Your file will be perfectly formatted for immediate import into QuickBooks, Xero, or Excel.",
        "url": pageUrl
      }
    ]
  };

  // FAQ schema — uses bank-specific FAQs if available, falls back to generic
  const faqItems = bankData?.faqs ?? [
    {
      question: `How do I convert a ${bankDisplayName} PDF statement to CSV?`,
      answer: `Upload your ${bankDisplayName} PDF to DocNeat. Our AI extracts all transaction rows and exports them as a clean CSV file ready for QuickBooks, Xero, or Excel.`
    },
    {
      question: `Is it safe to upload my ${bankDisplayName} statement?`,
      answer: "Yes. DocNeat uses 256-bit AES encryption and deletes your file immediately after processing. Your data is never stored or shared."
    },
    {
      question: `What columns does DocNeat extract from ${bankDisplayName} statements?`,
      answer: `DocNeat extracts all transaction data including date, description, debit, credit, and running balance from ${bankDisplayName} PDF statements.`
    },
    {
      question: `Can I convert multiple ${bankDisplayName} statements at once?`,
      answer: `Yes. DocNeat supports multi-file upload. Upload multiple ${bankDisplayName} PDFs and they will be merged into a single chronological CSV.`
    },
    {
      question: `Will my ${bankDisplayName} CSV work with QuickBooks and Xero?`,
      answer: `Yes. DocNeat formats the CSV output for direct import into QuickBooks, Xero, Sage, and Excel without any manual column remapping.`
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // SoftwareApplication schema for DocNeat itself
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DocNeat Bank Statement Converter",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "url": "https://www.docneat.com",
    "description": `Convert ${bankDisplayName} PDF bank statements to CSV. AI-powered extraction with verified accuracy for QuickBooks, Xero, Sage, and Excel.`,
    "offers": {
      "@type": "Offer",
      "price": "30",
      "priceCurrency": "USD"
    }
  };

  return [howToSchema, faqSchema, softwareSchema];
}

export default function BankPage({ params }: { params: { bank: string } }) {
  const bankParam = params?.bank || "";

  const nameParts = bankParam
    .split('-')
    .filter(word => !['convert', 'statement', 'to', 'csv', 'pdf', 'excel', 'xlsx', 'converter'].includes(word.toLowerCase()));

  const bankDisplayName = nameParts.length > 0
    ? nameParts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : "Bank";

  const schemas = buildSchemaJsonLd(bankParam, bankDisplayName);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BankPageClient params={params} />
    </>
  );
}