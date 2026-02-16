import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.docneat.com'

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

  const bankUrls = bankList.map((bank) => {
    const safeSlug = bank
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return {
      url: `${baseUrl}/convert/${safeSlug}-statement-to-csv`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      // NEW PILLAR PAGE
      url: `${baseUrl}/convert/pdf-bank-statement-to-csv`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/convert`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...bankUrls,
  ]
}