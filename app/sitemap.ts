import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.docneat.com'

  // This list must stay synced with your supported banks
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
    // Standardize slug to match the [bank] dynamic route expectations
    const safeSlug = bank
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, ''); // Remove non-word chars

    return {
      url: `${baseUrl}/convert/${safeSlug}-statement-to-csv`,
      // Setting this to today's date tells Google the content has been updated
      lastModified: new Date(),
      changeFrequency: 'weekly' as const, // Changed from monthly to weekly to encourage re-crawling
      priority: 0.8,
    };
  });

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
  ]
}