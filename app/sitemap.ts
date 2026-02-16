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
    // FIX: Replace '&' with 'and' and remove other non-url characters
    const safeSlug = bank
      .toLowerCase()
      .replace(/&/g, 'and') // Changes M&T to mandt
      .replace(/\s+/g, '-') // Replaces spaces with hyphens
      .replace(/-+/g, '-'); // Removes double hyphens

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