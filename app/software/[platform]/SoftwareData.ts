export interface SoftwareFAQ {
  question: string;
  answer: string;
}

export interface SoftwareData {
  displayName: string;
  slug: string;
  tagline: string;
  heroTitle: string;
  heroDescription: string;
  whyText: string;
  steps: { title: string; text: string }[];
  benefits: string[];
  faqs: SoftwareFAQ[];
  compatibility: string;
}

export const softwareDataMap: Record<string, SoftwareData> = {

  "quickbooks": {
    displayName: "QuickBooks",
    slug: "quickbooks",
    tagline: "QuickBooks Bank Statement Import",
    heroTitle: "Convert PDF Bank Statements to QuickBooks",
    heroDescription: "Stop manually entering transactions into QuickBooks. DocNeat converts your PDF bank statements into a clean CSV that imports directly into QuickBooks Online and QuickBooks Desktop in seconds.",
    whyText: "QuickBooks expects a specific CSV format with date, description, and amount columns in a defined order. Most bank PDFs don't export in this format directly. DocNeat produces a QuickBooks-ready CSV from any bank PDF — no column remapping, no manual cleanup, no import errors.",
    steps: [
      { title: "Upload your bank statement PDF", text: "Drag and drop your PDF bank statement into the secure upload area above. DocNeat supports statements from all major banks including Chase, Bank of America, Barclays, HSBC, and 45 others." },
      { title: "DocNeat extracts your transactions", text: "Our AI identifies the transaction table, extracts every row, and formats the data into a QuickBooks-compatible CSV with the correct date format, description, and signed amount columns." },
      { title: "Import into QuickBooks", text: "In QuickBooks Online, go to Banking → Upload from file → select your CSV → map columns → import. In QuickBooks Desktop, go to Banking → Bank Feeds → Import Web Connect File." }
    ],
    benefits: [
      "QuickBooks-compatible CSV format out of the box — no column remapping needed",
      "Correct date format (MM/DD/YYYY) for QuickBooks US regional settings",
      "Signed amounts — debits negative, credits positive — exactly as QuickBooks expects",
      "Supports statements from 50+ banks across the US, UK, India, Canada, and Australia",
      "Multi-file upload — convert multiple months and merge into one CSV for bulk import",
      "Bank-level 256-bit encryption — your statements are deleted immediately after processing"
    ],
    faqs: [
      { question: "What CSV format does QuickBooks accept?", answer: "QuickBooks Online accepts CSV files with at least three columns: Date, Description, and Amount. Debits should be negative values and credits positive. DocNeat produces exactly this format from any bank PDF." },
      { question: "Can I import the CSV into QuickBooks Online?", answer: "Yes. In QuickBooks Online, go to Banking → Upload from file, select your CSV, and map the columns. DocNeat's output is pre-formatted so column mapping takes under a minute." },
      { question: "Does DocNeat work with QuickBooks Desktop?", answer: "Yes. QuickBooks Desktop accepts CSV imports via Banking → Bank Feeds → Import Web Connect File. DocNeat's CSV output is compatible with both QuickBooks Online and Desktop." },
      { question: "Can I convert multiple months of statements for QuickBooks?", answer: "Yes. DocNeat supports multi-file upload. Upload multiple PDF statements and they are merged into a single chronological CSV, ready for a single bulk import into QuickBooks." },
      { question: "What banks does DocNeat support for QuickBooks import?", answer: "DocNeat supports 50+ banks including Chase, Bank of America, Wells Fargo, Barclays, HSBC, HDFC Bank, and all major US, UK, Canadian, Indian, and Australian banks." },
      { question: "How long does the conversion take?", answer: "Most statements are converted in under 30 seconds. Longer statements with 12+ months of transactions may take up to 2 minutes." }
    ],
    compatibility: "QuickBooks Online, QuickBooks Desktop, QuickBooks Self-Employed"
  },

  "xero": {
    displayName: "Xero",
    slug: "xero",
    tagline: "Xero Bank Statement Import",
    heroTitle: "Convert PDF Bank Statements to Xero",
    heroDescription: "Import your bank transactions into Xero without manual data entry. DocNeat converts PDF bank statements from any bank into a Xero-compatible CSV in seconds.",
    whyText: "Xero's bank import expects a specific CSV structure — date in DD/MM/YYYY format, a description column, and separate debit and credit columns or a single signed amount. DocNeat produces Xero-ready output from any bank PDF, handling the format differences between US, UK, Australian, and Indian bank statements automatically.",
    steps: [
      { title: "Upload your bank statement PDF", text: "Drag and drop your PDF bank statement into the secure upload area above. DocNeat supports statements from all major banks including Barclays, HSBC, NAB, Westpac, Chase, and 45 others." },
      { title: "DocNeat extracts your transactions", text: "Our AI identifies the transaction table, extracts every row, and formats the data into a Xero-compatible CSV with the correct date format and column structure for your bank's region." },
      { title: "Import into Xero", text: "In Xero, go to Accounting → Bank Accounts → select your account → Import a Statement → upload your CSV → match columns → import. Your transactions appear instantly for reconciliation." }
    ],
    benefits: [
      "Xero-compatible CSV format — correct date format and column structure for your region",
      "Supports DD/MM/YYYY (UK, AU) and MM/DD/YYYY (US) date formats automatically",
      "Separate debit and credit columns preserved for banks that use split-column format",
      "Supports statements from 50+ banks across the US, UK, India, Canada, and Australia",
      "Multi-file upload — convert multiple months and merge into one CSV for bulk import",
      "Bank-level 256-bit encryption — your statements are deleted immediately after processing"
    ],
    faqs: [
      { question: "What CSV format does Xero accept for bank imports?", answer: "Xero accepts CSV files with Date, Description, Amount, and optionally Reference columns. The date format must match your Xero regional settings. DocNeat produces the correct format automatically." },
      { question: "How do I import a CSV into Xero?", answer: "In Xero, go to Accounting → Bank Accounts, select your account, click Import a Statement, upload your CSV, map the columns, and click Import. DocNeat's output maps directly with no adjustments needed." },
      { question: "Does DocNeat work with Xero for Australian banks?", answer: "Yes. DocNeat supports all four major Australian banks — NAB, ANZ, Commonwealth Bank, and Westpac — and produces CSV output in the DD/MM/YYYY format that Xero Australia expects." },
      { question: "Can I convert multiple months of statements for Xero?", answer: "Yes. DocNeat supports multi-file upload. Upload multiple PDF statements and they are merged into a single chronological CSV for bulk import into Xero." },
      { question: "What banks does DocNeat support for Xero import?", answer: "DocNeat supports 50+ banks including Barclays, HSBC, NatWest, NAB, ANZ, Chase, HDFC Bank, and all major UK, Australian, US, Canadian, and Indian banks." },
      { question: "Will the CSV work with Xero's bank reconciliation?", answer: "Yes. DocNeat's CSV output imports cleanly into Xero and all transactions appear immediately in the bank reconciliation screen for matching against your Xero records." }
    ],
    compatibility: "Xero (all regions — UK, AU, NZ, US, and global)"
  },

  "sage": {
    displayName: "Sage",
    slug: "sage",
    tagline: "Sage Bank Statement Import",
    heroTitle: "Convert PDF Bank Statements to Sage",
    heroDescription: "Import bank transactions into Sage 50, Sage 200, or Sage Accounting without manual entry. DocNeat converts PDF bank statements into a Sage-compatible CSV in seconds.",
    whyText: "Sage 50 and Sage Accounting have specific CSV import requirements that differ from QuickBooks and Xero — including reference columns, transaction type fields, and UK date formatting. DocNeat produces Sage-ready output from any bank PDF, saving accountants hours of manual reformatting.",
    steps: [
      { title: "Upload your bank statement PDF", text: "Drag and drop your PDF bank statement into the secure upload area above. DocNeat supports statements from all major UK banks including Barclays, HSBC, NatWest, Lloyds, Halifax, and 45 others globally." },
      { title: "DocNeat extracts your transactions", text: "Our AI identifies the transaction table, extracts every row, and formats the data into a Sage-compatible CSV with the correct date format, transaction type, and reference columns." },
      { title: "Import into Sage", text: "In Sage 50, go to Bank → Import. In Sage Accounting, go to Banking → Import transactions → upload your CSV → map columns → import. Your transactions appear immediately for reconciliation." }
    ],
    benefits: [
      "Sage-compatible CSV format with correct date formatting for UK regional settings",
      "Supports Sage 50, Sage 200, and Sage Accounting (formerly Sage One)",
      "Transaction reference columns preserved for audit trail purposes",
      "Supports statements from 50+ banks including all major UK banks",
      "Multi-file upload — convert multiple months and merge into one CSV",
      "Bank-level 256-bit encryption — your statements are deleted immediately after processing"
    ],
    faqs: [
      { question: "What CSV format does Sage 50 accept?", answer: "Sage 50 accepts CSV files with Date, Reference, Details, Debit, and Credit columns. Dates should be in DD/MM/YYYY format. DocNeat produces output in this format from any bank PDF." },
      { question: "Does DocNeat work with Sage Accounting?", answer: "Yes. Sage Accounting (formerly Sage One) accepts CSV bank imports. DocNeat's output is compatible with Sage Accounting's import format." },
      { question: "Does DocNeat work with Sage 200?", answer: "Yes. Sage 200 accepts CSV imports via its bank reconciliation module. DocNeat's CSV output is compatible with Sage 200." },
      { question: "What UK banks does DocNeat support for Sage import?", answer: "DocNeat supports all major UK banks including Barclays, HSBC, NatWest, Lloyds Bank, Halifax, Santander, Monzo, Revolut, and Starling Bank." },
      { question: "Can I convert multiple months of statements for Sage?", answer: "Yes. DocNeat supports multi-file upload. Upload multiple PDF statements and they are merged into a single chronological CSV for bulk import into Sage." },
      { question: "Will transaction references appear in the Sage import?", answer: "Yes. DocNeat preserves payment reference numbers and transaction codes from your bank statement, which appear in the Reference column in Sage for audit trail purposes." }
    ],
    compatibility: "Sage 50, Sage 200, Sage Accounting (Sage One)"
  },

  "excel": {
    displayName: "Excel",
    slug: "excel",
    tagline: "Bank Statement to Excel Converter",
    heroTitle: "Convert PDF Bank Statements to Excel",
    heroDescription: "Turn any PDF bank statement into a clean, analysis-ready Excel spreadsheet in seconds. No more copying and pasting rows one by one.",
    whyText: "PDF bank statements are designed for printing, not analysis. You can't sort them, filter them, or run formulas on them. DocNeat extracts every transaction into a clean CSV that opens perfectly in Excel — with sortable columns, filterable categories, and data ready for pivot tables, charts, and expense tracking.",
    steps: [
      { title: "Upload your bank statement PDF", text: "Drag and drop your PDF bank statement into the secure upload area above. DocNeat supports statements from all major banks including Chase, Barclays, HDFC Bank, NAB, and 45 others." },
      { title: "DocNeat extracts your transactions", text: "Our AI identifies the transaction table, extracts every row including date, description, debit, credit, and running balance, and formats the data as a clean CSV." },
      { title: "Open in Excel", text: "Download your CSV and open it directly in Excel. All columns are cleanly separated — ready for sorting, filtering, pivot tables, SUMIF formulas, and expense analysis immediately." }
    ],
    benefits: [
      "Opens directly in Excel — no formatting required, all columns cleanly separated",
      "Date, description, debit, credit, and balance columns all preserved",
      "Ready for SUMIF, VLOOKUP, pivot tables, and charts immediately on import",
      "Supports statements from 50+ banks across the US, UK, India, Canada, and Australia",
      "Multi-file upload — convert multiple months and merge into one spreadsheet",
      "Bank-level 256-bit encryption — your statements are deleted immediately after processing"
    ],
    faqs: [
      { question: "Can I open the CSV directly in Excel?", answer: "Yes. CSV files open natively in Excel. Double-click the downloaded file and Excel opens it automatically with all columns correctly separated." },
      { question: "Will the columns be correctly formatted in Excel?", answer: "Yes. DocNeat produces a standard comma-separated CSV with date, description, debit, credit, and balance columns. All columns open correctly in Excel without any manual adjustment." },
      { question: "Can I use the data for pivot tables in Excel?", answer: "Yes. DocNeat's CSV output is structured data that works immediately with Excel pivot tables, SUMIF formulas, charts, and conditional formatting." },
      { question: "What banks does DocNeat support for Excel conversion?", answer: "DocNeat supports 50+ banks including Chase, Bank of America, Barclays, HSBC, HDFC Bank, NAB, and all major US, UK, Indian, Canadian, and Australian banks." },
      { question: "Can I convert multiple months into one Excel file?", answer: "Yes. DocNeat supports multi-file upload. Upload multiple PDF statements and they are merged into a single chronological CSV, which opens as one complete spreadsheet in Excel." },
      { question: "Is there a limit on how many transactions I can convert?", answer: "No transaction limit. DocNeat processes statements of any length. Page limits depend on your plan — Starter includes 400 pages per month." }
    ],
    compatibility: "Microsoft Excel (all versions), Google Sheets, LibreOffice Calc, Numbers"
  },

  "freshbooks": {
    displayName: "FreshBooks",
    slug: "freshbooks",
    tagline: "FreshBooks Bank Statement Import",
    heroTitle: "Convert PDF Bank Statements to FreshBooks",
    heroDescription: "Import your bank transactions into FreshBooks without manual data entry. DocNeat converts PDF bank statements into a FreshBooks-compatible CSV in seconds.",
    whyText: "FreshBooks is designed for freelancers and small businesses who need clean expense tracking without accounting complexity. DocNeat produces FreshBooks-ready CSV output from any bank PDF, so your transactions appear in FreshBooks immediately — ready for categorisation, expense tracking, and invoicing reconciliation.",
    steps: [
      { title: "Upload your bank statement PDF", text: "Drag and drop your PDF bank statement into the secure upload area above. DocNeat supports statements from all major banks used by freelancers and small businesses globally." },
      { title: "DocNeat extracts your transactions", text: "Our AI identifies the transaction table, extracts every row, and formats the data into a FreshBooks-compatible CSV with the correct date format, description, and amount columns." },
      { title: "Import into FreshBooks", text: "In FreshBooks, go to Accounting → Bank Accounts → select your account → Import Transactions → upload your CSV → map columns → import. Your transactions appear immediately for categorisation." }
    ],
    benefits: [
      "FreshBooks-compatible CSV format — correct column structure for direct import",
      "Transaction descriptions preserved in full for accurate expense categorisation",
      "Supports statements from 50+ banks used by freelancers and small businesses globally",
      "Multi-file upload — convert multiple months and merge into one CSV",
      "Works with FreshBooks bank reconciliation and expense tracking features",
      "Bank-level 256-bit encryption — your statements are deleted immediately after processing"
    ],
    faqs: [
      { question: "What CSV format does FreshBooks accept for bank imports?", answer: "FreshBooks accepts CSV files with Date, Description, and Amount columns. DocNeat produces exactly this format from any bank PDF." },
      { question: "How do I import a CSV into FreshBooks?", answer: "In FreshBooks, go to Accounting → Bank Accounts, select your account, click Import Transactions, upload your CSV, map the columns, and confirm the import." },
      { question: "Does DocNeat work with FreshBooks for freelancers?", answer: "Yes. FreshBooks is widely used by freelancers and DocNeat is specifically useful for converting business bank statements for expense tracking and client billing reconciliation." },
      { question: "Can I convert multiple months of statements for FreshBooks?", answer: "Yes. DocNeat supports multi-file upload. Upload multiple PDF statements and they are merged into a single chronological CSV for bulk import into FreshBooks." },
      { question: "What banks does DocNeat support for FreshBooks import?", answer: "DocNeat supports 50+ banks including Chase, Bank of America, Barclays, HSBC, and all major US, UK, Canadian, Indian, and Australian banks." },
      { question: "Will the CSV work with FreshBooks expense categorisation?", answer: "Yes. DocNeat preserves full transaction descriptions, which FreshBooks uses for automatic expense categorisation suggestions." }
    ],
    compatibility: "FreshBooks (all plans — Lite, Plus, Premium, Select)"
  }

};