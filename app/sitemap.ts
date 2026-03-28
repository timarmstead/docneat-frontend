import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.docneat.com'

  // Standardized Bank List
  const bankList = [
    "Chase", "Bank of America", "Wells Fargo", "Citibank", "Capital One", 
    "TD Bank", "PNC Bank", "US Bank", "RBC", "BMO", "Scotiabank", "CIBC",
    "HSBC", "Barclays", "NatWest", "Lloyds Bank", "Santander", "Monzo", 
    "Revolut", "Starling Bank", "Deutsche Bank", "Societe Generale", "Halifax",
    "Axis Bank", "HDFC Bank", "SBI", "ICICI Bank", "Canara Bank", "TMB", 
    "KVB", "Kotak Mahindra", "Yes Bank", "Standard Chartered",
    "NAB", "ANZ Bank", "Commonwealth Bank", "Westpac", "DBS Bank", "Mercury",
    "Chime", "Ally Bank", "Fifth Third", "SunTrust", "Silicon Valley Bank",
    "First Republic", "Regions Bank", "M&T Bank", "Huntington", "KeyBank", "Discover"
  ]

  // Software Integration Cluster
  const softwareList = ["quickbooks", "xero", "sage", "excel", "freshbooks"]

  // 1. Generate Bank Pages URLs
  const bankUrls = bankList.map((bank) => {
    const safeSlug = bank
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

    return {
      url: `${baseUrl}/convert/${safeSlug}-statement-to-csv`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  // 2. Generate Software Integration URLs
  const softwareUrls = softwareList.map((platform) => ({
    url: `${baseUrl}/software/convert-pdf-to-${platform}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Return Combined Sitemap
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/convert/pdf-bank-statement-to-csv`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/convert`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    ...bankUrls,
    ...softwareUrls,
  ]
}