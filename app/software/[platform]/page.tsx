import { Metadata } from 'next'
import SoftwarePageClient from './SoftwarePageClient'
import { softwareDataMap } from './softwareData'

const platformList = ["quickbooks", "xero", "sage", "excel", "freshbooks"];

export async function generateStaticParams() {
  return platformList.map((platform) => ({ platform }));
}

export async function generateMetadata({ params }: { params: { platform: string } }): Promise<Metadata> {
  const platformParam = params?.platform || "";
  const data = softwareDataMap[platformParam] || null;
  const displayName = data?.displayName || platformParam.charAt(0).toUpperCase() + platformParam.slice(1);

  return {
    title: `Convert PDF Bank Statements to ${displayName} | DocNeat.com`,
    description: `Import bank transactions into ${displayName} without manual entry. DocNeat converts PDF bank statements from 50+ banks into a ${displayName}-compatible CSV in seconds.`,
    openGraph: {
      siteName: 'DocNeat.com - Bank Statement Converter',
      title: `Convert PDF Bank Statements to ${displayName} | DocNeat.com`,
      description: `Import bank transactions into ${displayName} without manual entry. DocNeat converts PDF bank statements into a ${displayName}-compatible CSV in seconds.`,
      url: `https://www.docneat.com/software/convert-pdf-to-${platformParam}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Convert PDF Bank Statements to ${displayName} | DocNeat.com`,
    }
  }
}

function buildSchemaJsonLd(platformParam: string, displayName: string) {
  const data = softwareDataMap[platformParam] || null;
  const pageUrl = `https://www.docneat.com/software/convert-pdf-to-${platformParam}`;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to import PDF bank statements into ${displayName}`,
    "description": `Step-by-step guide to converting your PDF bank statement into a ${displayName}-compatible CSV using DocNeat.`,
    "totalTime": "PT2M",
    "tool": [{ "@type": "HowToTool", "name": "DocNeat Bank Statement Converter" }],
    "step": (data?.steps || [
      { title: "Upload your PDF", text: "Upload your bank statement PDF to DocNeat." },
      { title: "DocNeat converts it", text: "DocNeat extracts all transactions into a clean CSV." },
      { title: `Import into ${displayName}`, text: `Download the CSV and import directly into ${displayName}.` }
    ]).map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.title,
      "text": step.text,
      "url": pageUrl
    }))
  };

  const faqItems = data?.faqs || [];
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
    }))
  } : null;

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DocNeat Bank Statement Converter",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "url": "https://www.docneat.com",
    "description": `Convert PDF bank statements to ${displayName}-compatible CSV. Supports 50+ banks globally.`,
    "offers": { "@type": "Offer", "price": "30", "priceCurrency": "USD" }
  };

  return [howToSchema, ...(faqSchema ? [faqSchema] : []), softwareSchema];
}

export default function SoftwarePage({ params }: { params: { platform: string } }) {
  const platformParam = params?.platform || "";
  const data = softwareDataMap[platformParam] || null;
  const displayName = data?.displayName || platformParam.charAt(0).toUpperCase() + platformParam.slice(1);
  const schemas = buildSchemaJsonLd(platformParam, displayName);

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <SoftwarePageClient params={params} />
    </>
  );
}