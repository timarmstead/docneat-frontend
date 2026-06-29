export interface BankFAQ {
  question: string;
  answer: string;
}

export interface BankData {
  displayName: string;
  region: string;
  statementFormat: string;
  extractedColumns: string[];
  commonIssues: string[];
  whyText: string;
  faqs: BankFAQ[];
  relatedBanks: { name: string; slug: string }[];
  compatibility: string;
}

export const bankDataMap: Record<string, BankData> = {
  "barclays": {
    displayName: "Barclays",
    region: "UK",
    statementFormat:
      "Barclays PDF statements use a five-column layout: Date, Description, Money Out, Money In, and Balance. The account holder name, sort code, and account number appear in the statement header. Statements downloaded from the Barclays app and from Online Banking use slightly different PDF structures — DocNeat handles both automatically.",
    extractedColumns: [
      "Date",
      "Transaction description",
      "Money out (debit)",
      "Money in (credit)",
      "Running balance",
      "Sort code",
      "Account number",
    ],
    commonIssues: [
      "Multi-page statements repeat the column header on every page — DocNeat deduplicates these automatically so your CSV has a single clean header row.",
      "Barclays description fields often include reference prefixes such as VIS (Visa), BGC (BACS credit), or DD (Direct Debit). These are preserved in the output so you can filter by payment type in Excel or your accounting software.",
      "Statements that span a month-end sometimes split a transaction across two pages. DocNeat detects and merges these into a single row.",
      "Barclays Business and Premier statements include additional fields such as cheque numbers and branch codes — these are captured as extra columns rather than discarded.",
    ],
    whyText:
      "Barclays PDFs use a proprietary multi-column layout that generic converters frequently misread, merging debit and credit into a single amount column and losing the sign. DocNeat preserves the separate Money Out and Money In columns exactly as Barclays formats them, which means your totals reconcile correctly the first time you open the file in QuickBooks, Xero, or Sage.",
    faqs: [
      {
        question: "Does DocNeat work with Barclays Business account statements?",
        answer:
          "Yes. Barclays Business statements include additional fields such as cheque numbers and branch reference codes. DocNeat captures these as extra columns in the CSV output rather than discarding them.",
      },
      {
        question: "What about Barclays Premier statements?",
        answer:
          "Barclays Premier statements are fully supported. The format is identical to standard statements with the addition of a Premier branding header, which DocNeat ignores during extraction.",
      },
      {
        question: "Can I convert statements downloaded from the Barclays app?",
        answer:
          "Yes. The Barclays mobile app generates a slightly different PDF structure to Online Banking. DocNeat detects both formats and applies the correct extraction rules automatically.",
      },
      {
        question: "How far back do Barclays PDF statements go?",
        answer:
          "Barclays typically makes up to 7 years of statements available as PDF downloads through Online Banking. DocNeat can process any statement from this archive regardless of age.",
      },
      {
        question: "Will my sort code and account number appear in the CSV?",
        answer:
          "They are extracted from the statement header and included as metadata columns in your CSV, which is useful when reconciling across multiple accounts.",
      },
      {
        question: "Does it work with joint Barclays accounts?",
        answer:
          "Yes. Joint account statements follow the same PDF format as individual accounts and are processed identically.",
      },
    ],
    relatedBanks: [
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "NatWest", slug: "natwest-statement-to-csv" },
      { name: "Lloyds Bank", slug: "lloyds-bank-statement-to-csv" },
      { name: "Halifax", slug: "halifax-statement-to-csv" },
      { name: "Santander", slug: "santander-statement-to-csv" },
      { name: "Monzo", slug: "monzo-statement-to-csv" },
      { name: "Starling Bank", slug: "starling-bank-statement-to-csv" },
    ],
    compatibility:
      "Barclays CSV output is pre-formatted for direct import into QuickBooks Online, Xero, Sage 50, and Excel. The date format (DD/MM/YYYY) matches the UK regional setting expected by all four platforms.",
  },
};