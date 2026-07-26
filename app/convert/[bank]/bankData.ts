export interface BankFAQ {
  question: string;
  answer: string;
}

export interface NativeExport {
  intro: string;
  steps: string[];
  limitation: string;
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
  nativeExport?: NativeExport;
}

export const bankDataMap: Record<string, BankData> = {

  "chase": {
    displayName: "Chase",
    region: "US",
    statementFormat: "Chase PDF statements use a four-column layout: Date, Description, Amount, and Balance. Debits appear as negative values and credits as positive in the single Amount column. The account number, statement period, and routing number appear in the header. Chase also offers activity downloads directly from online banking, but the PDF format is most widely used for multi-month reconciliation.",
    extractedColumns: ["Date", "Description", "Amount (debit/credit)", "Running balance", "Account number", "Statement period"],
    commonIssues: [
      "Chase descriptions often include merchant category codes and location suffixes. DocNeat preserves these in full so you can filter by merchant type in Excel.",
      "Multi-page statements repeat the opening balance row on each page. DocNeat removes duplicates automatically, keeping only the first instance.",
      "Chase business statements include check numbers as a separate column. DocNeat captures this as an additional field rather than merging it into the description.",
      "Pending transactions sometimes appear at the top of a statement before the previous period closes. DocNeat flags these separately so they don't distort your reconciled totals."
    ],
    whyText: "Chase PDFs combine debits and credits into a single signed Amount column, which generic converters frequently split incorrectly — showing all transactions as positive and losing the sign. DocNeat preserves the correct sign on every row, so your QuickBooks or Xero import balances immediately without manual correction.",
    faqs: [
      { question: "Does DocNeat work with Chase Business account statements?", answer: "Yes. Chase Business statements include additional columns such as check numbers and merchant category codes. DocNeat captures all of these in the CSV output." },
      { question: "Can I convert Chase Sapphire or credit card statements?", answer: "Yes. Chase credit card statements follow the same PDF structure as bank statements. DocNeat handles both account types automatically." },
      { question: "What if my Chase statement has multiple accounts on one PDF?", answer: "Chase sometimes combines checking and savings on a single statement. DocNeat extracts each account section separately and labels the rows by account number." },
      { question: "How far back do Chase PDF statements go?", answer: "Chase provides up to 7 years of statements via online banking. DocNeat can process any statement from this archive." },
      { question: "Will the routing number appear in my CSV?", answer: "The routing and account number are extracted from the statement header and included as metadata columns in your CSV." }
    ],
    relatedBanks: [
      { name: "Bank of America", slug: "bank-of-america-statement-to-csv" },
      { name: "Wells Fargo", slug: "wells-fargo-statement-to-csv" },
      { name: "Citibank", slug: "citibank-statement-to-csv" },
      { name: "Capital One", slug: "capital-one-statement-to-csv" },
      { name: "PNC Bank", slug: "pnc-bank-statement-to-csv" },
      { name: "US Bank", slug: "us-bank-statement-to-csv" },
      { name: "TD Bank", slug: "td-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Chase online banking allows you to download transaction history as a CSV file directly — no conversion needed for recent transactions.",
      steps: [
          "Sign in to chase.com and select your account",
          "Click the download icon (arrow pointing down) near your transaction list",
          "Select CSV as the file format",
          "Choose your date range (up to 7 years available)",
          "Click Download"
      ].filter(Boolean),
      limitation: "Chase's native CSV export only covers transactions within online banking history. For older archived statements delivered as PDFs, or for client statements received as PDF files, DocNeat converts any Chase PDF into a clean CSV instantly."
    },
  },

  "bank-of-america": {
    displayName: "Bank of America",
    region: "US",
    statementFormat: "Bank of America PDF statements use a three-column transaction layout: Date, Description, and Amount, with a running Balance column on the right. Withdrawals appear as negative amounts. The statement header includes the account number, statement period, and branch address. BofA Advantage and business statements share the same PDF structure.",
    extractedColumns: ["Date", "Description", "Amount", "Running balance", "Account number", "Statement period"],
    commonIssues: [
      "Bank of America includes a summary section at the top of each statement with opening and closing balances. DocNeat skips this section and extracts only transaction rows.",
      "BofA descriptions frequently include reference numbers after the merchant name. DocNeat preserves the full description string so nothing is lost.",
      "Multi-page statements include a carried-forward balance line at the top of each new page. DocNeat removes these automatically to prevent duplicate rows.",
      "Business statements may include a separate section for fees and interest. DocNeat captures these as regular transaction rows with the correct date and amount."
    ],
    whyText: "Bank of America PDFs include summary tables and subtotal rows that generic converters often misread as transactions. DocNeat identifies and skips these structural rows, ensuring only genuine transactions appear in your CSV.",
    faqs: [
      { question: "Does DocNeat work with Bank of America Business statements?", answer: "Yes. BofA Business statements use the same PDF format as personal accounts and are fully supported." },
      { question: "Can I convert Bank of America credit card statements?", answer: "Yes. BofA credit card statements are supported and processed with the same accuracy as bank account statements." },
      { question: "What about Merrill Lynch statements linked to my BofA account?", answer: "Merrill Lynch investment statements use a different format. DocNeat currently supports the standard Bank of America banking statement format." },
      { question: "How many months can I convert at once?", answer: "DocNeat supports multi-file upload. You can upload multiple BofA PDFs at once and they will be merged into a single chronological CSV." },
      { question: "Will foreign currency transactions be included?", answer: "Yes. Foreign currency transactions appear in the statement as converted USD amounts and are extracted as-is, matching what Bank of America shows on your statement." }
    ],
    relatedBanks: [
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "Wells Fargo", slug: "wells-fargo-statement-to-csv" },
      { name: "Citibank", slug: "citibank-statement-to-csv" },
      { name: "Capital One", slug: "capital-one-statement-to-csv" },
      { name: "PNC Bank", slug: "pnc-bank-statement-to-csv" },
      { name: "US Bank", slug: "us-bank-statement-to-csv" },
      { name: "Regions Bank", slug: "regions-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Bank of America lets you download transactions as a CSV file directly from your online banking account.",
      steps: [
          "Sign in to bankofamerica.com and select your account",
          "Click Download Transactions near the top of your transaction list",
          "Select Microsoft Excel format (CSV) from the dropdown",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "Bank of America's native export is limited to recent transaction history. For older PDF statements or client statements sent as PDFs, DocNeat converts any BofA PDF to CSV in seconds."
    },
  },

  "wells-fargo": {
    displayName: "Wells Fargo",
    region: "US",
    statementFormat: "Wells Fargo PDF statements present transactions in a four-column format: Date, Check Number, Description, and Amount. Debits and credits are separated into distinct columns on business statements, while personal statements use a signed single Amount column. The account number and statement period appear prominently in the header.",
    extractedColumns: ["Date", "Check number", "Description", "Amount", "Running balance", "Account number"],
    commonIssues: [
      "Wells Fargo personal statements use a signed Amount column while business statements split debits and credits. DocNeat detects the format automatically and normalises both to separate debit and credit columns in the output.",
      "Check numbers appear as a separate column for paper checks. DocNeat preserves this so you can reconcile against your check register.",
      "Wells Fargo includes daily balance summaries at the end of each statement period. DocNeat skips these summary rows and extracts only individual transactions.",
      "Overdraft and fee rows are formatted differently to regular transactions. DocNeat captures these correctly with their original dates and amounts."
    ],
    whyText: "Wells Fargo uses different PDF structures for personal and business accounts, which causes generic converters to produce inconsistent output depending on the account type. DocNeat detects the format automatically and applies the correct extraction rules regardless of which Wells Fargo account type you upload.",
    faqs: [
      { question: "Does DocNeat work with Wells Fargo Business checking statements?", answer: "Yes. Wells Fargo Business statements are fully supported, including the separate debit and credit column format used for commercial accounts." },
      { question: "Can I convert Wells Fargo credit card statements?", answer: "Yes. Wells Fargo credit card statements are supported alongside bank account statements." },
      { question: "What if my statement includes wire transfer details?", answer: "Wire transfer rows are extracted as regular transactions. The reference number and beneficiary details in the description field are preserved in full." },
      { question: "How far back do Wells Fargo statements go online?", answer: "Wells Fargo provides up to 7 years of statements via online banking. DocNeat can process any PDF from this archive." },
      { question: "Will check numbers appear in my CSV?", answer: "Yes. Check numbers are extracted as a dedicated column in the CSV output, making it easy to reconcile paper checks." }
    ],
    relatedBanks: [
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "Bank of America", slug: "bank-of-america-statement-to-csv" },
      { name: "Citibank", slug: "citibank-statement-to-csv" },
      { name: "US Bank", slug: "us-bank-statement-to-csv" },
      { name: "PNC Bank", slug: "pnc-bank-statement-to-csv" },
      { name: "Fifth Third", slug: "fifth-third-statement-to-csv" },
      { name: "KeyBank", slug: "keybank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Wells Fargo online banking includes a native download option for transactions in CSV format.",
      steps: [
          "Sign in to wellsfargo.com and select your account",
          "Click Download Account Activity",
          "Choose Comma Separated Values (CSV) as the file type",
          "Set your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "Wells Fargo's native export covers recent activity only. For historical PDF statements or PDF statements received from clients, DocNeat handles the conversion accurately including Wells Fargo's separate debit and credit column format."
    },
  },

  "citibank": {
    displayName: "Citibank",
    region: "US",
    statementFormat: "Citibank PDF statements use a four-column layout: Date, Description, Debit, and Credit, with a Balance column on the right. Citibank is one of the few US banks that separates debits and credits into distinct columns by default. The account number and ABA routing number are included in the header.",
    extractedColumns: ["Date", "Description", "Debit", "Credit", "Running balance", "Account number", "ABA routing number"],
    commonIssues: [
      "Citibank statements include a separate section for pending transactions. DocNeat extracts only posted transactions by default, clearly labelling any pending rows it encounters.",
      "Citi descriptions include internal reference codes that appear after the merchant name. These are preserved in full in the output.",
      "International Citibank statements may use local date formats. DocNeat normalises all dates to a consistent format in the CSV output.",
      "Citibank business statements include additional columns for cost centre codes. DocNeat captures these as extra fields."
    ],
    whyText: "Citibank's separate debit and credit columns are straightforward for human reading but cause issues for generic converters that expect a single signed Amount column. DocNeat handles both column structures natively, preserving the debit/credit split exactly as Citibank presents it.",
    faqs: [
      { question: "Does DocNeat work with Citibank International statements?", answer: "Yes. Citibank International statements from the UK, Singapore, and other regions are supported. DocNeat normalises date formats automatically." },
      { question: "Can I convert Citi credit card statements?", answer: "Yes. Citi credit card statements are fully supported alongside bank account statements." },
      { question: "What about Citigold or Citi Priority statements?", answer: "Citigold and Citi Priority statements use the same PDF format as standard Citibank statements and are fully supported." },
      { question: "How many pages can a single statement be?", answer: "DocNeat handles statements of any length. There is no page limit per file." },
      { question: "Will foreign currency transactions show the original currency?", answer: "Foreign currency transactions appear in your statement as USD equivalents. DocNeat extracts the amount exactly as shown on your Citibank statement." }
    ],
    relatedBanks: [
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "Bank of America", slug: "bank-of-america-statement-to-csv" },
      { name: "Wells Fargo", slug: "wells-fargo-statement-to-csv" },
      { name: "Capital One", slug: "capital-one-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "TD Bank", slug: "td-bank-statement-to-csv" },
      { name: "Discover", slug: "discover-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Citibank online banking allows you to download account activity as a CSV file.",
      steps: [
          "Sign in to citi.com and select your account",
          "Click Download near your transaction list",
          "Select CSV as the download format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "Citi's native CSV export is limited to recent transactions. For older archived statements delivered as PDFs, or for Citibank statements received as PDF files from clients, DocNeat converts them to CSV accurately."
    },
  },

  "capital-one": {
    displayName: "Capital One",
    region: "US",
    statementFormat: "Capital One PDF statements use a clean three-column layout: Transaction Date, Description, and Amount. Credits appear as positive values and debits as negative. Capital One 360 and Spark Business statements share a similar structure with minor header differences. The account number and statement cycle dates are in the header.",
    extractedColumns: ["Transaction date", "Description", "Amount", "Running balance", "Account number", "Statement cycle"],
    commonIssues: [
      "Capital One 360 online bank statements sometimes include a rewards summary section. DocNeat skips this and extracts only transaction rows.",
      "Capital One credit card statements include a payment due date and minimum payment row at the top. DocNeat identifies and excludes these non-transaction rows.",
      "Descriptions for Capital One Spark Business accounts include vendor IDs. These are preserved in the output for expense categorisation.",
      "Capital One statements downloaded from the app may have slightly different header formatting. DocNeat handles both app and web download formats."
    ],
    whyText: "Capital One's PDF format is cleaner than most US banks, but generic converters still struggle with the rewards summary and fee sections that appear before the transaction table. DocNeat identifies the transaction table precisely and ignores all surrounding content.",
    faqs: [
      { question: "Does DocNeat work with Capital One 360 statements?", answer: "Yes. Capital One 360 is a fully supported account type. The statement format is nearly identical to standard Capital One statements." },
      { question: "Can I convert Capital One Spark Business statements?", answer: "Yes. Capital One Spark Business statements are supported, including the additional vendor ID fields." },
      { question: "What about Capital One credit card statements?", answer: "Yes. Capital One credit card statements are fully supported alongside bank account statements." },
      { question: "How do I download my Capital One statement as a PDF?", answer: "Log in to Capital One online banking, go to your account, select Statements, choose the month, and click Download PDF." },
      { question: "Will cashback or rewards transactions appear in the CSV?", answer: "Rewards credits that post as transactions to your account are included in the CSV. The rewards summary table at the top of the statement is excluded." }
    ],
    relatedBanks: [
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "Bank of America", slug: "bank-of-america-statement-to-csv" },
      { name: "Citibank", slug: "citibank-statement-to-csv" },
      { name: "Discover", slug: "discover-statement-to-csv" },
      { name: "Ally Bank", slug: "ally-bank-statement-to-csv" },
      { name: "Chime", slug: "chime-statement-to-csv" },
      { name: "Mercury", slug: "mercury-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Capital One allows you to download your transaction history as a CSV file from online banking.",
      steps: [
          "Sign in to capitalone.com and select your account",
          "Click Download at the top of your transaction history",
          "Select CSV as the format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "Capital One's native export covers online banking history only. For PDF statements that go back further, or for Capital One PDFs received from clients or accountants, DocNeat converts them directly to CSV."
    },
  },

  "td-bank": {
    displayName: "TD Bank",
    region: "US/Canada",
    statementFormat: "TD Bank PDF statements (US) use a four-column format: Date, Description, Debit, and Credit, with a running Balance on the right. Canadian TD statements (TD Canada Trust) follow a similar structure but use Canadian date formatting and include the transit number alongside the account number in the header.",
    extractedColumns: ["Date", "Description", "Debit", "Credit", "Running balance", "Account number", "Transit number"],
    commonIssues: [
      "TD Bank US and TD Canada Trust statements share a similar structure but differ in date format. DocNeat detects the region automatically and normalises dates consistently.",
      "TD statements include a section for service charges and interest separately from the main transaction table. DocNeat captures these as regular transaction rows.",
      "Multi-page TD statements repeat the account summary header on each page. DocNeat strips these repeated headers automatically.",
      "TD Business Banking statements include a cheque paid section. DocNeat extracts cheque transactions with their cheque numbers preserved."
    ],
    whyText: "TD Bank operates across the US and Canada with subtly different statement formats for each region. Generic converters typically handle only one format, producing errors on the other. DocNeat detects the TD region automatically and applies the correct extraction logic.",
    faqs: [
      { question: "Does DocNeat work with TD Canada Trust statements?", answer: "Yes. TD Canada Trust statements are fully supported, including Canadian date formats and transit number extraction." },
      { question: "Can I convert TD Business Banking statements?", answer: "Yes. TD Business Banking statements are supported, including cheque number extraction." },
      { question: "What about TD Ameritrade brokerage statements?", answer: "DocNeat is optimised for bank account statements. TD Ameritrade brokerage statements use a different format and are not currently supported." },
      { question: "How do I download my TD Bank statement as a PDF?", answer: "Log in to TD Bank online banking, go to Accounts, select your account, click Statements, choose the period, and download as PDF." },
      { question: "Will my transit number appear in the CSV?", answer: "Yes. For Canadian TD statements, the transit number is extracted from the header and included as a metadata column." }
    ],
    relatedBanks: [
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "RBC", slug: "rbc-statement-to-csv" },
      { name: "BMO", slug: "bmo-statement-to-csv" },
      { name: "Scotiabank", slug: "scotiabank-statement-to-csv" },
      { name: "CIBC", slug: "cibc-statement-to-csv" },
      { name: "PNC Bank", slug: "pnc-bank-statement-to-csv" },
      { name: "US Bank", slug: "us-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — supports both MM/DD/YYYY (US) and DD/MM/YYYY (Canada).",
    nativeExport: {
      intro: "TD Bank online banking lets you export transactions as a CSV file for recent account activity.",
      steps: [
          "Sign in to tdbank.com (US) or td.com (Canada) and select your account",
          "Click Download Transactions",
          "Select CSV as the file format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "TD's native CSV export covers recent activity. For older TD PDF statements or statements sent by clients as PDFs, DocNeat handles both US and Canadian TD formats correctly."
    },
  },

  "pnc-bank": {
    displayName: "PNC Bank",
    region: "US",
    statementFormat: "PNC Bank PDF statements use a four-column layout: Date, Description, Withdrawals, and Deposits, with a Balance column. PNC Virtual Wallet statements include an additional spending summary section. The account number, statement period, and branch details appear in the header.",
    extractedColumns: ["Date", "Description", "Withdrawals", "Deposits", "Running balance", "Account number"],
    commonIssues: [
      "PNC Virtual Wallet statements include a spending summary chart before the transaction table. DocNeat skips this section and extracts only transaction rows.",
      "PNC descriptions include authorisation codes for card transactions. These are preserved in the output for dispute resolution.",
      "Multi-page statements carry a balance-forward row at the top of each page. DocNeat removes these automatically.",
      "PNC business statements include a separate section for ACH transactions. DocNeat extracts these as regular transaction rows with full descriptions."
    ],
    whyText: "PNC Virtual Wallet statements include visual spending summaries and charts embedded in the PDF, which cause generic converters to produce garbled output. DocNeat identifies and skips these sections, extracting only the transaction table accurately.",
    faqs: [
      { question: "Does DocNeat work with PNC Virtual Wallet statements?", answer: "Yes. PNC Virtual Wallet statements are fully supported. The spending summary section is automatically skipped." },
      { question: "Can I convert PNC Business Banking statements?", answer: "Yes. PNC Business Banking statements are supported, including ACH transaction sections." },
      { question: "What about PNC Investment statements?", answer: "DocNeat is optimised for bank account statements. PNC Investment account statements use a different format and are not currently supported." },
      { question: "How far back do PNC statements go online?", answer: "PNC provides up to 7 years of statements online. DocNeat can process any PDF from this archive." },
      { question: "Will authorisation codes appear in my CSV?", answer: "Yes. Authorisation codes included in PNC transaction descriptions are preserved in full in the output." }
    ],
    relatedBanks: [
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "Bank of America", slug: "bank-of-america-statement-to-csv" },
      { name: "Wells Fargo", slug: "wells-fargo-statement-to-csv" },
      { name: "Fifth Third", slug: "fifth-third-statement-to-csv" },
      { name: "Huntington", slug: "huntington-statement-to-csv" },
      { name: "KeyBank", slug: "keybank-statement-to-csv" },
      { name: "Regions Bank", slug: "regions-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "PNC Bank Virtual Wallet and standard accounts support CSV download of transaction history.",
      steps: [
          "Sign in to pnc.com and select your account",
          "Click Download Transactions above your transaction list",
          "Select CSV as the format",
          "Set your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "PNC's native export is limited to recent history. For older PDF statements or PNC statements received as PDFs from clients, DocNeat converts them accurately, skipping the spending summary sections that confuse generic converters."
    },
  },

  "us-bank": {
    displayName: "US Bank",
    region: "US",
    statementFormat: "US Bank PDF statements use a three-column layout: Date, Description, and Amount, with a running Balance. Business statements include separate Debit and Credit columns. The account number, routing number, and statement period appear in the header. US Bank Altitude and Smartly account statements follow the same format.",
    extractedColumns: ["Date", "Description", "Amount", "Running balance", "Account number", "Routing number"],
    commonIssues: [
      "US Bank statements include an account summary section with average daily balance and interest calculations. DocNeat skips this and extracts only individual transactions.",
      "US Bank descriptions include merchant category identifiers for card transactions. These are preserved in the output.",
      "Business statements separate credits and debits into two columns. DocNeat handles both the personal (single amount) and business (split columns) formats.",
      "US Bank includes a fee disclosure section at the end of each statement. DocNeat does not extract this as transaction data."
    ],
    whyText: "US Bank embeds account summary tables with averages and interest calculations directly above the transaction list. Generic converters frequently misread these summary rows as transactions. DocNeat identifies the transaction table boundary precisely, excluding all summary content.",
    faqs: [
      { question: "Does DocNeat work with US Bank Business Checking statements?", answer: "Yes. US Bank Business statements, including the split debit/credit column format, are fully supported." },
      { question: "Can I convert US Bank credit card statements?", answer: "Yes. US Bank credit card statements are supported alongside bank account statements." },
      { question: "What about US Bank Smartly account statements?", answer: "US Bank Smartly statements use the same PDF format as standard US Bank statements and are fully supported." },
      { question: "How do I download my US Bank statement as a PDF?", answer: "Log in to US Bank online banking, go to Accounts, select your account, click Statements and Documents, and download the PDF for the desired period." },
      { question: "Will the routing number appear in my CSV?", answer: "Yes. The routing number is extracted from the statement header and included as a metadata column." }
    ],
    relatedBanks: [
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "Wells Fargo", slug: "wells-fargo-statement-to-csv" },
      { name: "PNC Bank", slug: "pnc-bank-statement-to-csv" },
      { name: "Fifth Third", slug: "fifth-third-statement-to-csv" },
      { name: "Huntington", slug: "huntington-statement-to-csv" },
      { name: "KeyBank", slug: "keybank-statement-to-csv" },
      { name: "M&T Bank", slug: "m&t-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "US Bank online banking supports direct CSV download of your transaction history.",
      steps: [
          "Sign in to usbank.com and select your account",
          "Click Statements & Documents or the Download icon near your transactions",
          "Select CSV as the export format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "US Bank's native export covers online history only. For older PDF statements or PDF files sent by clients, DocNeat converts US Bank PDFs to CSV with the correct column structure for QuickBooks and Xero."
    },
  },

  "ally-bank": {
    displayName: "Ally Bank",
    region: "US",
    statementFormat: "Ally Bank PDF statements use a four-column layout: Date, Description, Amount, and Balance. Ally is an online-only US bank. The account number and routing number appear in the header. Ally savings buckets and money market account statements follow the same core format.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Account number", "Routing number"],
    commonIssues: [
      "Ally statements for savings accounts with buckets include bucket names in transaction descriptions. DocNeat preserves these in full.",
      "Ally interest payment rows appear at the end of each statement period. DocNeat captures these as regular transaction rows.",
      "Ally statements downloaded from the web portal use a consistent PDF format across all account types.",
      "Ally Invest statements use a different format to Ally Bank statements and are not currently supported."
    ],
    whyText: "Ally Bank is an online-only bank and its statements reflect this with a clean, minimal PDF format. DocNeat handles Ally's lightweight statement structure reliably, including the savings bucket descriptions that traditional bank converters ignore.",
    faqs: [
      { question: "Does DocNeat work with Ally Savings Account statements?", answer: "Yes. Ally Savings, Checking, and Money Market statements are all supported." },
      { question: "Will savings bucket details appear in the CSV?", answer: "Yes. Ally savings bucket names in transaction descriptions are preserved in full." },
      { question: "Can I convert Ally Money Market statements?", answer: "Yes. Ally Money Market account statements are supported." },
      { question: "What about Ally Invest statements?", answer: "Ally Invest uses a different statement format. DocNeat currently supports Ally Bank account statements only." },
      { question: "How do I download my Ally statement as a PDF?", answer: "Log in to Ally Bank online, go to Accounts, select your account, click Statements and Documents, and download the PDF." }
    ],
    relatedBanks: [
      { name: "Capital One", slug: "capital-one-statement-to-csv" },
      { name: "Chime", slug: "chime-statement-to-csv" },
      { name: "Mercury", slug: "mercury-statement-to-csv" },
      { name: "Discover", slug: "discover-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Ally Bank online banking lets you download transactions as a CSV file.",
      steps: [
          "Log in to ally.com and select your account",
          "Click Statements and Documents",
          "Select the Download Transactions option",
          "Choose CSV format",
          "Select your date range and click Download"
      ].filter(Boolean),
      limitation: "Ally's native CSV export covers recent activity. For older Ally PDF statements or Money Market account PDFs, DocNeat converts them including savings bucket names in transaction descriptions."
    },
  },

  "rbc": {
    displayName: "RBC",
    region: "Canada",
    statementFormat: "RBC Royal Bank PDF statements use a five-column layout: Date, Description, Withdrawals, Deposits, and Balance. The transit number, institution number (003), and account number appear in the header. RBC Business statements include additional reference numbers for wire and ACH transactions.",
    extractedColumns: ["Date", "Description", "Withdrawals", "Deposits", "Balance", "Transit number", "Institution number", "Account number"],
    commonIssues: [
      "RBC statements include a previous balance row at the top of the transaction table. DocNeat identifies and excludes this row so it does not appear as a transaction.",
      "RBC descriptions include branch codes for in-branch transactions. These are preserved in the output.",
      "Multi-page RBC statements repeat the column headers on each page. DocNeat deduplicates these automatically.",
      "RBC Business statements include a separate section for service charges. DocNeat captures these as regular transaction rows."
    ],
    whyText: "RBC statements include Canadian banking identifiers — transit number and institution number — that are essential for payroll and inter-bank transfers. DocNeat extracts these from the header and includes them as metadata columns, making your CSV immediately usable for Canadian payroll software.",
    faqs: [
      { question: "Does DocNeat work with RBC Business Banking statements?", answer: "Yes. RBC Business statements are fully supported, including reference number extraction for wire transactions." },
      { question: "Can I convert RBC credit card statements?", answer: "Yes. RBC credit card statements are supported alongside bank account statements." },
      { question: "Will my transit and institution numbers appear in the CSV?", answer: "Yes. Both the transit number and institution number (003) are extracted from the header and included as metadata columns." },
      { question: "What about RBC InvestEase statements?", answer: "DocNeat is optimised for RBC bank account statements. Investment account statements use a different format and are not currently supported." },
      { question: "How far back do RBC PDF statements go?", answer: "RBC provides up to 7 years of statements via online banking. DocNeat can process any PDF from this archive." }
    ],
    relatedBanks: [
      { name: "TD Bank", slug: "td-bank-statement-to-csv" },
      { name: "BMO", slug: "bmo-statement-to-csv" },
      { name: "Scotiabank", slug: "scotiabank-statement-to-csv" },
      { name: "CIBC", slug: "cibc-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format DD/MM/YYYY matches Canadian regional settings.",
    nativeExport: {
      intro: "RBC Royal Bank online banking allows you to download transactions as a CSV file.",
      steps: [
          "Sign in to rbcroyalbank.com and select your account",
          "Click Download Transactions",
          "Select CSV (Comma Separated Values) as the format",
          "Set your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "RBC's native export covers recent activity. For archived PDF statements or client statements sent as PDFs, DocNeat converts RBC PDFs to CSV including transit number and institution number extraction."
    },
  },

  "bmo": {
    displayName: "BMO",
    region: "Canada",
    statementFormat: "BMO Bank of Montreal PDF statements use a four-column layout: Date, Description, Amount, and Balance. Withdrawals appear as negative amounts. BMO Business statements separate withdrawals and deposits into distinct columns. The transit number, institution number (001), and account number are in the header.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Transit number", "Institution number", "Account number"],
    commonIssues: [
      "BMO statements include an account activity summary at the top showing total debits and credits for the period. DocNeat skips this summary and extracts only individual transaction rows.",
      "BMO descriptions include cheque numbers for paper cheques as part of the description string. DocNeat preserves these in full.",
      "BMO Harris (US) statements use a slightly different format to Canadian BMO statements. DocNeat detects the region automatically.",
      "Multi-page BMO statements include a carry-forward balance at the top of each new page. DocNeat removes these automatically."
    ],
    whyText: "BMO statements differ between Canadian and US operations, with BMO Harris in the US using a different PDF structure. Generic converters typically handle only one variant. DocNeat detects the BMO variant automatically and applies the correct extraction rules.",
    faqs: [
      { question: "Does DocNeat work with BMO Business Banking statements?", answer: "Yes. BMO Business statements, including the split withdrawal/deposit format, are fully supported." },
      { question: "Can I convert BMO Harris (US) statements?", answer: "Yes. BMO Harris statements use a slightly different format to Canadian BMO statements, and DocNeat handles both automatically." },
      { question: "Will my BMO institution number appear in the CSV?", answer: "Yes. The institution number (001) and transit number are extracted from the header and included as metadata columns." },
      { question: "How do I download my BMO statement as a PDF?", answer: "Log in to BMO online banking, go to Accounts, select your account, choose Statements, and download the PDF for the desired period." },
      { question: "Can I upload multiple months at once?", answer: "Yes. DocNeat supports multi-file upload. Upload multiple BMO PDFs and they will be merged into a single chronological CSV." }
    ],
    relatedBanks: [
      { name: "RBC", slug: "rbc-statement-to-csv" },
      { name: "TD Bank", slug: "td-bank-statement-to-csv" },
      { name: "Scotiabank", slug: "scotiabank-statement-to-csv" },
      { name: "CIBC", slug: "cibc-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format DD/MM/YYYY matches Canadian regional settings.",
    nativeExport: {
      intro: "BMO online banking supports direct CSV export of your transaction history.",
      steps: [
          "Sign in to bmo.com and select your account",
          "Click Download Transactions",
          "Select CSV as the file format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "BMO's native CSV export is limited to recent transactions. For older PDF statements or BMO PDFs received from clients, DocNeat handles both Canadian BMO and US BMO Harris formats."
    },
  },

  "scotiabank": {
    displayName: "Scotiabank",
    region: "Canada",
    statementFormat: "Scotiabank PDF statements use a five-column layout: Date, Description, Withdrawals, Deposits, and Balance. The transit number, institution number (002), and account number appear in the header. Scotiabank international statements from Caribbean and Latin American branches follow a similar structure.",
    extractedColumns: ["Date", "Description", "Withdrawals", "Deposits", "Balance", "Transit number", "Institution number", "Account number"],
    commonIssues: [
      "Scotiabank statements include a Scotia Points or rewards summary for eligible accounts. DocNeat skips this section and extracts only transaction rows.",
      "Scotiabank international branches may use local date formats. DocNeat normalises all dates to a consistent format.",
      "Descriptions for Interac e-Transfer transactions include the sender or recipient name. These are preserved in full in the output.",
      "Multi-page statements repeat column headers on each new page. DocNeat deduplicates these automatically."
    ],
    whyText: "Scotiabank operates across Canada, the Caribbean, and Latin America with regional statement variations. DocNeat handles all Scotiabank regional formats, normalising dates and currency symbols automatically regardless of which Scotiabank branch issued the statement.",
    faqs: [
      { question: "Does DocNeat work with Scotiabank Business statements?", answer: "Yes. Scotiabank Business statements are fully supported." },
      { question: "Can I convert Scotiabank international statements?", answer: "Yes. Scotiabank statements from Caribbean and Latin American branches are supported. DocNeat normalises date formats automatically." },
      { question: "Will Interac e-Transfer details appear in the CSV?", answer: "Yes. Interac e-Transfer descriptions, including sender and recipient names, are preserved in full." },
      { question: "What is Scotiabank's institution number?", answer: "Scotiabank's institution number is 002. This is extracted from the statement header and included as a metadata column in your CSV." },
      { question: "How far back do Scotiabank statements go online?", answer: "Scotiabank provides up to 7 years of statements online. DocNeat can process any PDF from this archive." }
    ],
    relatedBanks: [
      { name: "RBC", slug: "rbc-statement-to-csv" },
      { name: "TD Bank", slug: "td-bank-statement-to-csv" },
      { name: "BMO", slug: "bmo-statement-to-csv" },
      { name: "CIBC", slug: "cibc-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format DD/MM/YYYY matches Canadian regional settings.",
    nativeExport: {
      intro: "Scotiabank online banking lets you download your transaction history as a CSV file.",
      steps: [
          "Sign in to scotiabank.com and select your account",
          "Click Download Transactions",
          "Select CSV as the format",
          "Set your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "Scotiabank's native export covers online history. For older PDF statements or Scotiabank statements from international branches sent as PDFs, DocNeat normalises date formats automatically."
    },
  },

  "cibc": {
    displayName: "CIBC",
    region: "Canada",
    statementFormat: "CIBC PDF statements use a four-column layout: Date, Description, Withdrawals, and Deposits, with a Balance column. The transit number, institution number (010), and account number are in the header. CIBC Smart Account and Business Operating Account statements share the same format.",
    extractedColumns: ["Date", "Description", "Withdrawals", "Deposits", "Balance", "Transit number", "Institution number", "Account number"],
    commonIssues: [
      "CIBC statements include a statement summary with total withdrawals and deposits for the period. DocNeat skips this and extracts only individual transaction rows.",
      "CIBC descriptions for pre-authorised payments include the payee name and authorisation reference. These are preserved in full.",
      "CIBC US Dollar account statements use USD amounts. DocNeat extracts these as-is without currency conversion.",
      "Multi-page CIBC statements carry a balance-forward row at the start of each page. DocNeat removes these automatically."
    ],
    whyText: "CIBC statements separate withdrawals and deposits into distinct columns rather than using a signed amount, which requires different handling than most US bank formats. DocNeat handles this split-column structure natively and produces clean output for both personal and business CIBC accounts.",
    faqs: [
      { question: "Does DocNeat work with CIBC Business Operating Account statements?", answer: "Yes. CIBC Business statements are fully supported." },
      { question: "Can I convert CIBC US Dollar account statements?", answer: "Yes. CIBC USD account statements are supported. Amounts are extracted in USD as shown on the statement." },
      { question: "What is CIBC's institution number?", answer: "CIBC's institution number is 010. This is extracted from the statement header and included in your CSV." },
      { question: "Does DocNeat work with CIBC Simplii Financial statements?", answer: "Simplii Financial is a separate brand from CIBC. Simplii statements use a similar format and are supported." },
      { question: "How do I download my CIBC statement as a PDF?", answer: "Log in to CIBC online banking, go to Accounts, select your account, click Statements, and download the PDF for the desired period." }
    ],
    relatedBanks: [
      { name: "RBC", slug: "rbc-statement-to-csv" },
      { name: "TD Bank", slug: "td-bank-statement-to-csv" },
      { name: "BMO", slug: "bmo-statement-to-csv" },
      { name: "Scotiabank", slug: "scotiabank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format DD/MM/YYYY matches Canadian regional settings.",
    nativeExport: {
      intro: "CIBC online banking supports CSV download of your account transaction history.",
      steps: [
          "Sign in to cibc.com and select your account",
          "Click Download Transactions above your transaction list",
          "Select CSV as the file format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "CIBC's native export is limited to recent history. For older PDF statements or CIBC PDFs sent by clients, DocNeat converts them to CSV with the correct split withdrawal/deposit column structure."
    },
  },

  "mercury": {
    displayName: "Mercury",
    region: "US",
    statementFormat: "Mercury bank PDF statements use a clean three-column layout: Date, Description, and Amount, with a Balance column. Mercury is a digital bank built for startups and tech companies. Statements are generated from the Mercury dashboard and include transaction category tags.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Account number"],
    commonIssues: [
      "Mercury statements include transaction category tags in the description field. DocNeat preserves these for expense tracking.",
      "Mercury virtual card transactions include the card name in the description. DocNeat preserves the full description string.",
      "Mercury statements downloaded from the dashboard use a consistent PDF format regardless of account type.",
      "Mercury treasury account statements follow the same format as checking account statements."
    ],
    whyText: "Mercury is purpose-built for startups and includes transaction categories and virtual card labels that generic converters strip out. DocNeat preserves Mercury's category and card metadata, making the CSV immediately useful for startup expense tracking and investor reporting without additional cleanup.",
    faqs: [
      { question: "Does DocNeat work with Mercury business checking statements?", answer: "Yes. Mercury business checking and savings statements are fully supported." },
      { question: "Will virtual card transaction details appear in the CSV?", answer: "Yes. Mercury virtual card names and transaction details are preserved in full." },
      { question: "Can I convert Mercury treasury account statements?", answer: "Yes. Mercury treasury account statements use the same format and are fully supported." },
      { question: "How do I download my Mercury statement as a PDF?", answer: "Log in to Mercury, go to Accounts, select your account, click Statements, and download the PDF for the desired period." },
      { question: "Does DocNeat work with Mercury team member accounts?", answer: "Yes. Mercury team member card statements are supported alongside main account statements." }
    ],
    relatedBanks: [
      { name: "Ally Bank", slug: "ally-bank-statement-to-csv" },
      { name: "Chime", slug: "chime-statement-to-csv" },
      { name: "Capital One", slug: "capital-one-statement-to-csv" },
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "Silicon Valley Bank", slug: "silicon-valley-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Mercury makes it easy to export transactions as a CSV file directly from your dashboard.",
      steps: [
          "Log in to mercury.com",
          "Go to Accounts and select your account",
          "Click Export Transactions",
          "Select CSV format",
          "Choose your date range and click Export"
      ].filter(Boolean),
      limitation: "Mercury's native CSV export is excellent for most use cases. For older Mercury PDF statements needed for investor reporting or tax purposes, DocNeat converts them with virtual card labels and category metadata preserved."
    },
  },

  "chime": {
    displayName: "Chime",
    region: "US",
    statementFormat: "Chime PDF statements are generated from the Chime app and use a simple three-column layout: Date, Description, and Amount. Chime is a US fintech operating on Stride Bank's infrastructure. The account and routing numbers appear in the header.",
    extractedColumns: ["Date", "Description", "Amount", "Running balance", "Account number", "Routing number"],
    commonIssues: [
      "Chime statements are generated from app data and the PDF format is simpler than traditional bank statements. DocNeat handles this lightweight format correctly.",
      "Chime SpotMe overdraft transactions appear as separate rows. DocNeat captures these with their original amounts.",
      "Chime descriptions include merchant names without category codes. The full description is preserved.",
      "Chime Credit Builder statements follow a slightly different format to checking statements. DocNeat handles both."
    ],
    whyText: "Chime is a mobile-first bank whose statements are generated dynamically from app data rather than a traditional banking system. Generic converters built for traditional bank PDF formats sometimes fail on Chime's lightweight statement structure. DocNeat handles Chime's app-generated format correctly.",
    faqs: [
      { question: "Does DocNeat work with Chime Savings Account statements?", answer: "Yes. Chime Savings and Checking Account statements are both supported." },
      { question: "Can I convert Chime Credit Builder statements?", answer: "Yes. Chime Credit Builder statements are supported." },
      { question: "How do I download my Chime statement as a PDF?", answer: "In the Chime app, go to Settings, select Documents, choose Statements, select the period, and download as PDF." },
      { question: "Will SpotMe transactions appear in the CSV?", answer: "Yes. SpotMe overdraft transactions appear as regular rows in the CSV output." },
      { question: "Will my routing number appear in the CSV?", answer: "Yes. The Chime routing number is extracted from the header and included as a metadata column." }
    ],
    relatedBanks: [
      { name: "Ally Bank", slug: "ally-bank-statement-to-csv" },
      { name: "Capital One", slug: "capital-one-statement-to-csv" },
      { name: "Mercury", slug: "mercury-statement-to-csv" },
      { name: "Discover", slug: "discover-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Chime allows you to download your monthly statements as PDF files from the app.",
      steps: [
          "Open the Chime app",
          "Go to Settings",
          "Tap Documents",
          "Select Statements and choose the month",
          "Download the PDF — then upload to DocNeat to convert to CSV"
      ].filter(Boolean),
      limitation: "Chime does not offer a native CSV export — only PDF statements are available. DocNeat converts your Chime PDF statements to clean CSV files ready for Excel or accounting software."
    },
  },

  "hsbc": {
    displayName: "HSBC",
    region: "UK/Global",
    statementFormat: "HSBC UK PDF statements use a five-column layout: Date, Payment type and details, Paid out, Paid in, and Balance. HSBC operates globally and statement formats vary slightly by country — UK statements include sort code and account number in the header, while international branches include local equivalents. HSBC Advance and Premier statements follow the same core structure.",
    extractedColumns: ["Date", "Payment type and details", "Paid out", "Paid in", "Balance", "Sort code", "Account number"],
    commonIssues: [
      "HSBC running balance is sometimes omitted for individual transactions on older statement formats. DocNeat flags these rows and inserts a calculated balance where possible.",
      "HSBC payment type codes such as VIS (Visa), DD (Direct Debit), and SO (Standing Order) appear as prefixes in the description. These are preserved in the output for easy filtering.",
      "HSBC international statements may use local currency and date formats. DocNeat normalises both to a consistent output format.",
      "Multi-page HSBC statements repeat the column header on each page. DocNeat deduplicates these automatically."
    ],
    whyText: "HSBC operates across 60+ countries with regional statement format variations. Generic converters built for UK formats fail on HSBC Hong Kong or HSBC US statements. DocNeat detects the HSBC regional format automatically and applies the correct extraction rules, producing consistent output regardless of which country issued the statement.",
    faqs: [
      { question: "Does DocNeat work with HSBC Business statements?", answer: "Yes. HSBC Business Banking statements are fully supported." },
      { question: "Can I convert HSBC international statements?", answer: "Yes. HSBC statements from the US, Hong Kong, Singapore, UAE, and other regions are supported. DocNeat normalises date and currency formats automatically." },
      { question: "What about HSBC Premier statements?", answer: "HSBC Premier statements use the same core format as standard HSBC statements and are fully supported." },
      { question: "Will sort code and account number appear in my CSV?", answer: "Yes. For UK statements, the sort code and account number are extracted from the header and included as metadata columns." },
      { question: "Does DocNeat work with HSBC Expat statements?", answer: "Yes. HSBC Expat statements issued from Jersey and other offshore centres are supported." }
    ],
    relatedBanks: [
      { name: "Barclays", slug: "barclays-statement-to-csv" },
      { name: "NatWest", slug: "natwest-statement-to-csv" },
      { name: "Lloyds Bank", slug: "lloyds-bank-statement-to-csv" },
      { name: "Santander", slug: "santander-statement-to-csv" },
      { name: "Halifax", slug: "halifax-statement-to-csv" },
      { name: "Standard Chartered", slug: "standard-chartered-statement-to-csv" },
      { name: "Deutsche Bank", slug: "deutsche-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks Online, Xero, Sage 50, Excel — date format DD/MM/YYYY matches UK regional settings.",
    nativeExport: {
      intro: "HSBC online banking allows you to export transactions as a CSV file across all its global markets.",
      steps: [
          "Sign in to your HSBC online banking and select your account",
          "Click Download or Export Transactions",
          "Select CSV or Excel as the format",
          "Choose your date range",
          "Click Download or Export"
      ].filter(Boolean),
      limitation: "HSBC's native export covers recent online banking history. For older HSBC PDF statements, statements from international branches, or client PDFs, DocNeat detects the HSBC regional format automatically and converts accurately."
    },
  },

  "barclays": {
    displayName: "Barclays",
    region: "UK",
    statementFormat: "Barclays PDF statements use a five-column layout: Date, Description, Money Out, Money In, and Balance. The account holder name, sort code, and account number appear in the statement header. Statements downloaded from the Barclays app and from Online Banking use slightly different PDF structures — DocNeat handles both automatically.",
    extractedColumns: ["Date", "Transaction description", "Money out (debit)", "Money in (credit)", "Running balance", "Sort code", "Account number"],
    commonIssues: [
      "Multi-page statements repeat the column header on every page — DocNeat deduplicates these automatically so your CSV has a single clean header row.",
      "Barclays description fields often include reference prefixes such as VIS (Visa), BGC (BACS credit), or DD (Direct Debit). These are preserved in the output so you can filter by payment type in Excel or your accounting software.",
      "Statements that span a month-end sometimes split a transaction across two pages. DocNeat detects and merges these into a single row.",
      "Barclays Business and Premier statements include additional fields such as cheque numbers and branch codes — these are captured as extra columns rather than discarded."
    ],
    whyText: "Barclays PDFs use a proprietary multi-column layout that generic converters frequently misread, merging debit and credit into a single amount column and losing the sign. DocNeat preserves the separate Money Out and Money In columns exactly as Barclays formats them, which means your totals reconcile correctly the first time you open the file in QuickBooks, Xero, or Sage.",
    faqs: [
      { question: "Does DocNeat work with Barclays Business account statements?", answer: "Yes. Barclays Business statements include additional fields such as cheque numbers and branch reference codes. DocNeat captures these as extra columns in the CSV output rather than discarding them." },
      { question: "What about Barclays Premier statements?", answer: "Barclays Premier statements are fully supported. The format is identical to standard statements with the addition of a Premier branding header, which DocNeat ignores during extraction." },
      { question: "Can I convert statements downloaded from the Barclays app?", answer: "Yes. The Barclays mobile app generates a slightly different PDF structure to Online Banking. DocNeat detects both formats and applies the correct extraction rules automatically." },
      { question: "How far back do Barclays PDF statements go?", answer: "Barclays typically makes up to 7 years of statements available as PDF downloads through Online Banking. DocNeat can process any statement from this archive regardless of age." },
      { question: "Will my sort code and account number appear in the CSV?", answer: "They are extracted from the statement header and included as metadata columns in your CSV, which is useful when reconciling across multiple accounts." },
      { question: "Does it work with joint Barclays accounts?", answer: "Yes. Joint account statements follow the same PDF format as individual accounts and are processed identically." }
    ],
    relatedBanks: [
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "NatWest", slug: "natwest-statement-to-csv" },
      { name: "Lloyds Bank", slug: "lloyds-bank-statement-to-csv" },
      { name: "Halifax", slug: "halifax-statement-to-csv" },
      { name: "Santander", slug: "santander-statement-to-csv" },
      { name: "Monzo", slug: "monzo-statement-to-csv" },
      { name: "Starling Bank", slug: "starling-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks Online, Xero, Sage 50, Excel — date format DD/MM/YYYY matches UK regional settings.",
    nativeExport: {
      intro: "Barclays online banking lets you download your transactions as a CSV file — but the option is slightly hidden.",
      steps: [
          "Sign in to barclays.co.uk and go to your account",
          "Click on Statements in the left menu",
          "Select the statement period you want",
          "Click the Download icon and choose CSV format",
          "Alternatively, go to Manage account → Download transactions and select CSV"
      ].filter(Boolean),
      limitation: "Barclays native CSV export only covers the past 12 months and doesn't include all statement data fields. For older Barclays statements, multi-year archives, or PDF statements sent by clients, DocNeat converts Barclays PDFs to CSV with the full Money Out / Money In column structure preserved."
    },
  },

  "natwest": {
    displayName: "NatWest",
    region: "UK",
    statementFormat: "NatWest PDF statements use a five-column layout: Date, Type, Description, Value, and Balance. The Type column contains payment method codes such as POS, DD, CR, and TFR. The sort code and account number appear in the header alongside the statement period.",
    extractedColumns: ["Date", "Payment type", "Description", "Value", "Balance", "Sort code", "Account number"],
    commonIssues: [
      "NatWest includes a Type column with payment codes (POS, DD, CR, TFR, BP) that generic converters often merge into the description. DocNeat preserves this as a separate column.",
      "NatWest business statements include a reference column for BACS and CHAPS payments. DocNeat captures this as an additional field.",
      "Multi-page NatWest statements repeat the balance brought forward at the top of each page. DocNeat removes these automatically.",
      "NatWest descriptions for card transactions include the merchant location. These are preserved in full."
    ],
    whyText: "NatWest's dedicated payment type column (POS, DD, TFR) is uniquely useful for expense categorisation, but generic converters merge it into the description field. DocNeat preserves this column separately, so you can filter by payment type directly in your accounting software without manual cleanup.",
    faqs: [
      { question: "Does DocNeat work with NatWest Business statements?", answer: "Yes. NatWest Business statements are fully supported, including BACS reference extraction." },
      { question: "What about Royal Bank of Scotland statements?", answer: "RBS and NatWest are part of the same group and use nearly identical statement formats. DocNeat supports both." },
      { question: "Will the payment type column appear in my CSV?", answer: "Yes. The NatWest Type column (POS, DD, CR etc.) is preserved as a separate column in your CSV output." },
      { question: "How far back do NatWest PDF statements go?", answer: "NatWest provides up to 7 years of statements online. DocNeat can process any PDF from this archive." },
      { question: "Does DocNeat work with NatWest Mettle statements?", answer: "NatWest Mettle is a separate business banking app. Its statement format is similar to standard NatWest statements and is supported." }
    ],
    relatedBanks: [
      { name: "Barclays", slug: "barclays-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "Lloyds Bank", slug: "lloyds-bank-statement-to-csv" },
      { name: "Halifax", slug: "halifax-statement-to-csv" },
      { name: "Santander", slug: "santander-statement-to-csv" },
      { name: "Monzo", slug: "monzo-statement-to-csv" },
      { name: "Starling Bank", slug: "starling-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks Online, Xero, Sage 50, Excel — date format DD/MM/YYYY matches UK regional settings.",
    nativeExport: {
      intro: "NatWest online banking and the NatWest app both allow you to download transactions as a CSV file.",
      steps: [
          "Sign in to natwest.com or the NatWest app and select your account",
          "Click Statements or Transaction history",
          "Look for the Download or Export option",
          "Select CSV format",
          "Choose your date range and click Download"
      ].filter(Boolean),
      limitation: "NatWest's native CSV export covers recent history only. For older NatWest PDF statements or PDF statements received from business clients, DocNeat preserves NatWest's payment type column (POS, DD, TFR) which the native export sometimes omits."
    },
  },

  "lloyds-bank": {
    displayName: "Lloyds Bank",
    region: "UK",
    statementFormat: "Lloyds Bank PDF statements use a five-column layout: Date, Transaction description, Debit, Credit, and Balance. The sort code and account number are in the header. Lloyds Business and Club Lloyds statements share the same core structure with minor branding differences.",
    extractedColumns: ["Date", "Transaction description", "Debit", "Credit", "Balance", "Sort code", "Account number"],
    commonIssues: [
      "Lloyds statements include a brought-forward balance row at the top of each page on multi-page statements. DocNeat removes these automatically.",
      "Lloyds descriptions include payment type codes such as BGC, DEB, and TFR. These are preserved in the output.",
      "Lloyds Business statements include a separate section for charges and interest. DocNeat captures these as regular transaction rows.",
      "Club Lloyds statements include a monthly benefit summary. DocNeat skips this section and extracts only transaction rows."
    ],
    whyText: "Lloyds Bank statements use separate Debit and Credit columns rather than a single signed amount, which is the correct format for UK double-entry bookkeeping. DocNeat preserves this split precisely, so your Xero or Sage import doesn't require manual column remapping.",
    faqs: [
      { question: "Does DocNeat work with Lloyds Business statements?", answer: "Yes. Lloyds Business Banking statements are fully supported." },
      { question: "What about Club Lloyds statements?", answer: "Club Lloyds statements are supported. The monthly benefits summary section is automatically skipped." },
      { question: "Can I convert Lloyds credit card statements?", answer: "Yes. Lloyds credit card statements are supported alongside bank account statements." },
      { question: "Does DocNeat work with Halifax statements?", answer: "Yes. Halifax is part of Lloyds Banking Group and uses a similar format. Halifax has its own dedicated page on DocNeat." },
      { question: "How far back do Lloyds PDF statements go?", answer: "Lloyds provides up to 7 years of statements online. DocNeat can process any PDF from this archive." }
    ],
    relatedBanks: [
      { name: "Halifax", slug: "halifax-statement-to-csv" },
      { name: "Barclays", slug: "barclays-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "NatWest", slug: "natwest-statement-to-csv" },
      { name: "Santander", slug: "santander-statement-to-csv" },
      { name: "Monzo", slug: "monzo-statement-to-csv" },
      { name: "Starling Bank", slug: "starling-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks Online, Xero, Sage 50, Excel — date format DD/MM/YYYY matches UK regional settings.",
    nativeExport: {
      intro: "Lloyds Bank online banking supports CSV download of your transaction history.",
      steps: [
          "Sign in to lloydsbank.com and select your account",
          "Click Statements in the account menu",
          "Select the Export or Download option",
          "Choose CSV as the format",
          "Select your date range and click Download"
      ].filter(Boolean),
      limitation: "Lloyds native export covers recent transactions. For older Lloyds PDF statements, business account statements, or client PDFs, DocNeat converts them with the correct separate Debit and Credit column structure for Xero and Sage."
    },
  },

  "santander": {
    displayName: "Santander",
    region: "UK/Global",
    statementFormat: "Santander UK PDF statements use a four-column layout: Date, Description, Amount, and Balance. Debits appear as negative amounts. Santander operates globally and statement formats vary by country — UK statements include sort code and account number, while Spanish and Brazilian statements include local account identifiers.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Sort code", "Account number"],
    commonIssues: [
      "Santander UK statements include a carried-forward balance on multi-page documents. DocNeat removes these automatically.",
      "Santander Spain and Brazil statements use different date formats and local account number formats. DocNeat normalises both.",
      "Santander business statements include a charges section at the end of the statement. DocNeat captures these as regular transaction rows.",
      "Santander descriptions for online transfers include the payee reference. These are preserved in full."
    ],
    whyText: "Santander operates across the UK, Spain, Brazil, and other markets with regional statement variations. Generic converters built for UK formats fail on Spanish or Brazilian Santander statements. DocNeat handles all Santander regional formats with consistent output.",
    faqs: [
      { question: "Does DocNeat work with Santander Business statements?", answer: "Yes. Santander Business Banking statements are fully supported." },
      { question: "Can I convert Santander Spain statements?", answer: "Yes. Santander Spain statements are supported. DocNeat normalises date formats and handles the Spanish account identifier format." },
      { question: "What about Santander Brazil statements?", answer: "Santander Brazil statements are supported. DocNeat handles the Brazilian date format and account structure." },
      { question: "Will sort code and account number appear in my CSV?", answer: "Yes. For UK statements, these are extracted from the header and included as metadata columns." },
      { question: "How far back do Santander PDF statements go?", answer: "Santander UK provides up to 7 years of statements online. DocNeat can process any PDF from this archive." }
    ],
    relatedBanks: [
      { name: "Barclays", slug: "barclays-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "NatWest", slug: "natwest-statement-to-csv" },
      { name: "Lloyds Bank", slug: "lloyds-bank-statement-to-csv" },
      { name: "Halifax", slug: "halifax-statement-to-csv" }
    ],
    compatibility: "QuickBooks Online, Xero, Sage 50, Excel — date format DD/MM/YYYY for UK, DD/MM/YYYY for Spain and Brazil.",
    nativeExport: {
      intro: "Santander UK online banking allows you to download your transactions as a CSV file.",
      steps: [
          "Sign in to santander.co.uk and select your account",
          "Go to Account statements or Transaction history",
          "Click Download or Export",
          "Select CSV format",
          "Choose your date range and click Download"
      ].filter(Boolean),
      limitation: "Santander's native export is limited to recent history. For older PDF statements, Santander statements from Spain or Brazil, or client PDFs, DocNeat handles all Santander regional formats."
    },
  },

  "monzo": {
    displayName: "Monzo",
    region: "UK",
    statementFormat: "Monzo PDF statements are generated from the Monzo app and use a clean three-column layout: Date, Description, and Amount. Monzo includes merchant logos and category icons in the app view, but the PDF export strips these to plain text. The sort code and account number appear in the header.",
    extractedColumns: ["Date", "Description", "Amount", "Running balance", "Sort code", "Account number"],
    commonIssues: [
      "Monzo statements are generated from the app and sometimes include emoji characters in merchant names. DocNeat strips these automatically to produce clean CSV output.",
      "Monzo Pots transactions appear as internal transfers in the statement. DocNeat preserves these with their original Pot name in the description.",
      "Monzo Business statements include a category column. DocNeat captures this as an additional field in the CSV.",
      "Monzo statements for joint accounts include both account holders' names in the header. DocNeat extracts both."
    ],
    whyText: "Monzo statements are generated dynamically from app data rather than a traditional banking system, which means the PDF structure differs from high street bank statements. DocNeat is specifically tuned for Monzo's app-generated format, handling emoji characters, Pot transfers, and the category column that Monzo Business includes.",
    faqs: [
      { question: "Does DocNeat work with Monzo Business statements?", answer: "Yes. Monzo Business statements include an additional category column which DocNeat captures in the CSV output." },
      { question: "How do I export my Monzo statement as a PDF?", answer: "In the Monzo app, go to Account, scroll down to Statements, select the period, and tap Download PDF." },
      { question: "Will my Monzo Pot transactions appear in the CSV?", answer: "Yes. Pot deposits and withdrawals appear as internal transfers with the Pot name in the description field." },
      { question: "Can I convert Monzo Plus or Monzo Premium statements?", answer: "Yes. Monzo Plus and Premium statements use the same PDF format as standard Monzo statements." },
      { question: "Does DocNeat handle Monzo's emoji merchant names?", answer: "Yes. DocNeat strips emoji characters from merchant names automatically, producing clean text output." }
    ],
    relatedBanks: [
      { name: "Starling Bank", slug: "starling-bank-statement-to-csv" },
      { name: "Revolut", slug: "revolut-statement-to-csv" },
      { name: "Barclays", slug: "barclays-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "NatWest", slug: "natwest-statement-to-csv" },
      { name: "Lloyds Bank", slug: "lloyds-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks Online, Xero, Sage 50, Excel — date format DD/MM/YYYY matches UK regional settings.",
    nativeExport: {
      intro: "Monzo allows you to export your transactions as a CSV file directly from the app.",
      steps: [
          "Open the Monzo app and go to Account",
          "Scroll down to Statements",
          "Select the period you want",
          "Tap Export or Download as CSV",
          "The CSV file will be saved to your device or shared via your phone's share sheet"
      ].filter(Boolean),
      limitation: "Monzo's native CSV export works well for personal use. For older statements only available as PDFs, or for Monzo Business statements that need import into Xero or QuickBooks, DocNeat converts the PDF version with full category column support."
    },
  },

  "revolut": {
    displayName: "Revolut",
    region: "UK/Global",
    statementFormat: "Revolut PDF statements use a four-column layout: Date, Description, Amount, and Balance. Revolut operates in multiple currencies and the statement currency is shown in the header. Revolut Business statements include additional columns for category and reference. Statements can be exported from the Revolut app or web dashboard.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Currency", "Account number"],
    commonIssues: [
      "Revolut operates in multiple currencies. DocNeat extracts the statement currency from the header and includes it as a column so multi-currency reconciliation is straightforward.",
      "Revolut currency exchange transactions appear as two rows — one debit and one credit in different currencies. DocNeat preserves both rows with their original currency amounts.",
      "Revolut Business statements include a category column and reference field. DocNeat captures both as additional columns.",
      "Revolut statements generated from the app may include transactions from multiple accounts if you have several Revolut accounts. DocNeat extracts all transactions in the order they appear."
    ],
    whyText: "Revolut is a multi-currency platform and its statements reflect this, with exchange transactions appearing as paired rows in different currencies. Generic converters collapse these or produce errors on non-GBP amounts. DocNeat handles Revolut's multi-currency format natively, preserving all currency information in the output.",
    faqs: [
      { question: "Does DocNeat work with Revolut Business statements?", answer: "Yes. Revolut Business statements, including the additional category and reference columns, are fully supported." },
      { question: "How do I export my Revolut statement as a PDF?", answer: "In the Revolut app, go to Accounts, select your account, tap Statements, choose the period, and select PDF." },
      { question: "Will multi-currency transactions appear correctly?", answer: "Yes. DocNeat extracts the statement currency and preserves all amounts as shown. Currency exchange pairs appear as two separate rows." },
      { question: "Can I convert Revolut Metal statements?", answer: "Yes. Revolut Metal and Premium statements use the same PDF format as standard Revolut statements." },
      { question: "Does DocNeat support Revolut <18 statements?", answer: "Revolut <18 statements use the same format as standard Revolut statements and are supported." }
    ],
    relatedBanks: [
      { name: "Monzo", slug: "monzo-statement-to-csv" },
      { name: "Starling Bank", slug: "starling-bank-statement-to-csv" },
      { name: "Barclays", slug: "barclays-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" }
    ],
    compatibility: "QuickBooks Online, Xero, Sage 50, Excel — multi-currency output preserves original currency codes.",
    nativeExport: {
      intro: "Revolut makes it easy to export your transactions as a CSV file directly from the app or web dashboard.",
      steps: [
          "Open the Revolut app or log in at revolut.com",
          "Go to Accounts and select your account",
          "Tap or click Statements",
          "Select CSV as the format",
          "Choose your date range and tap Export"
      ].filter(Boolean),
      limitation: "Revolut's native CSV export is excellent for most use cases. For multi-currency statements that need specific formatting for accounting software, or for Revolut Business statements, DocNeat ensures the currency codes and category columns are preserved correctly."
    },
  },

  "starling-bank": {
    displayName: "Starling Bank",
    region: "UK",
    statementFormat: "Starling Bank PDF statements use a clean four-column layout: Date, Description, Money In, and Money Out, with a Balance column. Starling Business statements include a reference column. The sort code and account number appear in the header. Starling generates statements from the app and web dashboard.",
    extractedColumns: ["Date", "Description", "Money in", "Money out", "Balance", "Sort code", "Account number"],
    commonIssues: [
      "Starling Spaces transactions appear as internal transfers with the Space name in the description. DocNeat preserves these in full.",
      "Starling Business statements include a reference column for invoice and payment references. DocNeat captures this as an additional field.",
      "Starling descriptions for card payments include the merchant category. DocNeat preserves this in the output for expense categorisation.",
      "Starling statements include a summary section at the top. DocNeat skips this and extracts only transaction rows."
    ],
    whyText: "Starling Bank separates Money In and Money Out into distinct columns, which is ideal for accounting software import but requires specific handling. DocNeat preserves Starling's split-column format precisely, making imports into Xero and FreeAgent straightforward without column remapping.",
    faqs: [
      { question: "Does DocNeat work with Starling Business statements?", answer: "Yes. Starling Business statements, including the reference column, are fully supported." },
      { question: "How do I download my Starling statement as a PDF?", answer: "In the Starling app, go to Account, tap Statements, select the period, and download as PDF. You can also do this from the Starling web app." },
      { question: "Will my Starling Spaces appear in the CSV?", answer: "Yes. Starling Spaces transfers appear as internal transactions with the Space name in the description field." },
      { question: "Can I convert Starling Euro account statements?", answer: "Yes. Starling Euro account statements are supported. Amounts are extracted in EUR as shown on the statement." },
      { question: "Does DocNeat work with Starling Kite statements?", answer: "Starling Kite is a child account linked to a parent Starling account. Its statements use the same format and are supported." }
    ],
    relatedBanks: [
      { name: "Monzo", slug: "monzo-statement-to-csv" },
      { name: "Revolut", slug: "revolut-statement-to-csv" },
      { name: "Barclays", slug: "barclays-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "NatWest", slug: "natwest-statement-to-csv" },
      { name: "Lloyds Bank", slug: "lloyds-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks Online, Xero, FreeAgent, Sage 50, Excel — date format DD/MM/YYYY matches UK regional settings.",
    nativeExport: {
      intro: "Starling Bank makes CSV export very straightforward from both the app and the web app.",
      steps: [
          "Open the Starling app or log in at starlingbank.com",
          "Go to Account and tap Statements",
          "Select the period you want",
          "Tap Download as CSV",
          "The file will be saved to your device"
      ].filter(Boolean),
      limitation: "Starling's native CSV export is one of the best in UK banking. For Starling Business accounts needing specific import formats for Xero or FreeAgent, or for older PDF statements, DocNeat preserves the reference column that Starling Business includes."
    },
  },

  "halifax": {
    displayName: "Halifax",
    region: "UK",
    statementFormat: "Halifax PDF statements use a five-column layout: Date, Description, Debit, Credit, and Balance. Halifax is part of Lloyds Banking Group and shares a similar statement structure. The sort code and account number appear in the header. Halifax Reward Current Account and Clarity credit card statements follow the same format.",
    extractedColumns: ["Date", "Description", "Debit", "Credit", "Balance", "Sort code", "Account number"],
    commonIssues: [
      "Halifax statements include a brought-forward balance at the top of each page on multi-page documents. DocNeat removes these automatically.",
      "Halifax descriptions include payment type codes such as VIS, DD, and CR. These are preserved in the output.",
      "Halifax Reward statements include a monthly reward credit row. DocNeat captures this as a regular transaction with the original date and amount.",
      "Halifax statements for ISA accounts include an interest calculation summary. DocNeat skips this section and extracts only transaction rows."
    ],
    whyText: "Halifax statements are structured identically to Lloyds Bank statements, reflecting their shared banking group infrastructure. DocNeat handles both brands with the same extraction logic, producing consistent output whether you bank with Halifax or Lloyds.",
    faqs: [
      { question: "Does DocNeat work with Halifax Business statements?", answer: "Yes. Halifax Business Banking statements are fully supported." },
      { question: "Can I convert Halifax credit card statements?", answer: "Yes. Halifax Clarity and other Halifax credit card statements are supported." },
      { question: "What about Halifax ISA statements?", answer: "Halifax ISA statements are supported. The interest calculation summary section is automatically skipped." },
      { question: "Will my Halifax Reward credit appear in the CSV?", answer: "Yes. Monthly reward credits appear as regular transaction rows with the correct date and amount." },
      { question: "How far back do Halifax PDF statements go?", answer: "Halifax provides up to 7 years of statements online. DocNeat can process any PDF from this archive." }
    ],
    relatedBanks: [
      { name: "Lloyds Bank", slug: "lloyds-bank-statement-to-csv" },
      { name: "Barclays", slug: "barclays-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "NatWest", slug: "natwest-statement-to-csv" },
      { name: "Santander", slug: "santander-statement-to-csv" },
      { name: "Monzo", slug: "monzo-statement-to-csv" }
    ],
    compatibility: "QuickBooks Online, Xero, Sage 50, Excel — date format DD/MM/YYYY matches UK regional settings.",
    nativeExport: {
      intro: "Halifax online banking lets you download your transactions as a CSV file.",
      steps: [
          "Sign in to halifax.co.uk and select your account",
          "Go to Statements or Transaction history",
          "Click the Download or Export option",
          "Select CSV as the format",
          "Choose your date range and click Download"
      ].filter(Boolean),
      limitation: "Halifax native CSV export covers recent transactions. For older Halifax PDF statements, ISA account statements, or client PDFs, DocNeat converts them with the correct separate Debit and Credit columns."
    },
  },

  "deutsche-bank": {
    displayName: "Deutsche Bank",
    region: "Europe/Global",
    statementFormat: "Deutsche Bank PDF statements use a four-column layout: Booking date, Value date, Transaction details, and Amount. German statements include the IBAN and BIC in the header. Deutsche Bank operates globally and statement formats vary by country — German statements use European date formatting while US and UK branches adapt to local conventions.",
    extractedColumns: ["Booking date", "Value date", "Transaction details", "Amount", "IBAN", "BIC"],
    commonIssues: [
      "Deutsche Bank German statements use a comma as the decimal separator and a period as the thousands separator. DocNeat normalises these to standard CSV number formatting.",
      "Deutsche Bank includes both a booking date and value date for each transaction. DocNeat preserves both columns in the output.",
      "SEPA transfer descriptions include the originator IBAN and payment reference. DocNeat preserves the full description string.",
      "Deutsche Bank international statements may use local currency. DocNeat extracts amounts as shown and includes the currency code."
    ],
    whyText: "Deutsche Bank's European statement format uses comma-decimal notation and dual-date columns that differ significantly from UK and US bank formats. Generic converters built for Anglo-American banks produce number parsing errors on Deutsche Bank statements. DocNeat handles European number formatting natively.",
    faqs: [
      { question: "Does DocNeat work with Deutsche Bank Business statements?", answer: "Yes. Deutsche Bank Business and Corporate Banking statements are supported." },
      { question: "Will IBAN and BIC appear in my CSV?", answer: "Yes. The IBAN and BIC are extracted from the header and included as metadata columns." },
      { question: "Can I convert Deutsche Bank statements from other countries?", answer: "Yes. Deutsche Bank statements from the UK, US, Singapore, and other regions are supported. DocNeat normalises date and number formats automatically." },
      { question: "How are European decimal separators handled?", answer: "DocNeat converts European comma-decimal notation to standard period-decimal notation in the CSV output, so your accounting software reads amounts correctly." },
      { question: "Will both booking date and value date appear in my CSV?", answer: "Yes. Both columns are preserved in the output." }
    ],
    relatedBanks: [
      { name: "Societe Generale", slug: "societe-generale-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "Santander", slug: "santander-statement-to-csv" },
      { name: "Barclays", slug: "barclays-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — European number formatting normalised to standard CSV output.",
    nativeExport: {
      intro: "Deutsche Bank online banking supports transaction export in various formats including CSV.",
      steps: [
          "Sign in to your Deutsche Bank online banking portal",
          "Select your account and go to Account movements or Transactions",
          "Click Export or Download",
          "Select CSV as the format",
          "Choose your date range and click Download"
      ].filter(Boolean),
      limitation: "Deutsche Bank's native export uses European number formatting (comma decimals). For Deutsche Bank PDF statements from any country, DocNeat normalises European number formatting to standard CSV output compatible with QuickBooks and Excel."
    },
  },

  "societe-generale": {
    displayName: "Societe Generale",
    region: "Europe/Global",
    statementFormat: "Societe Generale PDF statements use a four-column layout: Date, Description, Debit, and Credit, with a Balance column. French statements use European date and number formatting. The IBAN and BIC appear in the header. Societe Generale operates across Europe, Africa, and Asia with regional format variations.",
    extractedColumns: ["Date", "Description", "Debit", "Credit", "Balance", "IBAN", "BIC"],
    commonIssues: [
      "Societe Generale French statements use comma-decimal notation. DocNeat normalises these to standard CSV number formatting.",
      "French statement descriptions include SEPA mandate references for direct debits. These are preserved in full.",
      "Societe Generale statements from African branches may use local currency and date formats. DocNeat normalises both.",
      "Multi-page statements include a balance carried forward. DocNeat removes these automatically."
    ],
    whyText: "Societe Generale statements use French number formatting with comma decimals and period thousands separators, which causes errors in most English-language converter tools. DocNeat handles European number formatting natively, producing correctly formatted CSV output regardless of the source country.",
    faqs: [
      { question: "Does DocNeat work with Societe Generale Business statements?", answer: "Yes. Societe Generale Business and Corporate Banking statements are supported." },
      { question: "Can I convert Societe Generale statements from Africa?", answer: "Yes. Societe Generale statements from Francophone African countries are supported. DocNeat normalises date and currency formats." },
      { question: "Will IBAN and BIC appear in my CSV?", answer: "Yes. The IBAN and BIC are extracted from the header and included as metadata columns." },
      { question: "How are French decimal separators handled?", answer: "DocNeat converts French comma-decimal notation to standard period-decimal notation in the CSV output." },
      { question: "Can I upload statements in French?", answer: "Yes. DocNeat processes the transaction data regardless of the statement language." }
    ],
    relatedBanks: [
      { name: "Deutsche Bank", slug: "deutsche-bank-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "Santander", slug: "santander-statement-to-csv" },
      { name: "Barclays", slug: "barclays-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — European number formatting normalised to standard CSV output.",
    nativeExport: {
      intro: "Societe Generale online banking allows you to export transactions, though the steps vary by country.",
      steps: [
          "Sign in to your Societe Generale online banking portal",
          "Select your account",
          "Go to Account movements or Relevé de compte",
          "Click Télécharger or Export",
          "Select CSV format and choose your date range"
      ].filter(Boolean),
      limitation: "Societe Generale's native export uses French number formatting. For PDF statements from any Societe Generale branch, DocNeat converts them to standard CSV format compatible with English-language accounting software."
    },
  },

  "standard-chartered": {
    displayName: "Standard Chartered",
    region: "UK/Global",
    statementFormat: "Standard Chartered PDF statements use a five-column layout: Date, Description, Debit, Credit, and Balance. Standard Chartered operates across Asia, Africa, and the Middle East. Statement formats vary by country — UK statements include sort code and account number, while Asian statements include local account identifiers.",
    extractedColumns: ["Date", "Description", "Debit", "Credit", "Balance", "Account number", "Sort code (UK) / local identifier"],
    commonIssues: [
      "Standard Chartered operates in 50+ markets and date formats vary by country. DocNeat normalises all dates to a consistent format in the CSV output.",
      "Standard Chartered descriptions include Swift reference numbers for international transfers. These are preserved in full.",
      "Multi-page Standard Chartered statements repeat the column header on each page. DocNeat deduplicates these automatically.",
      "Standard Chartered Priority Banking and Private Bank statements include additional service charge rows. DocNeat captures these as regular transaction rows."
    ],
    whyText: "Standard Chartered operates across 50+ markets with regional statement format variations. Generic converters built for a single market fail when applied to Standard Chartered statements from another country. DocNeat detects the regional format automatically and normalises dates, currencies, and account identifiers consistently.",
    faqs: [
      { question: "Does DocNeat work with Standard Chartered Business statements?", answer: "Yes. Standard Chartered Business Banking statements are fully supported." },
      { question: "Can I convert Standard Chartered statements from Singapore, Hong Kong, or India?", answer: "Yes. Standard Chartered statements from across Asia are supported. DocNeat normalises date and number formats automatically." },
      { question: "What about Standard Chartered Priority Banking statements?", answer: "Standard Chartered Priority Banking statements use the same core format and are fully supported." },
      { question: "Will Swift reference numbers appear in my CSV?", answer: "Yes. Swift reference numbers in the description field are preserved in full." },
      { question: "Does DocNeat work with Standard Chartered NRI statements?", answer: "Yes. Standard Chartered NRI statements from India and other markets are supported." }
    ],
    relatedBanks: [
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "Barclays", slug: "barclays-statement-to-csv" },
      { name: "DBS Bank", slug: "dbs-bank-statement-to-csv" },
      { name: "HDFC Bank", slug: "hdfc-bank-statement-to-csv" },
      { name: "ICICI Bank", slug: "icici-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date formats normalised per regional settings.",
    nativeExport: {
      intro: "Standard Chartered online banking allows you to download transactions across its global markets.",
      steps: [
          "Sign in to your Standard Chartered online banking portal",
          "Select your account and go to Transactions or Statements",
          "Click Download or Export",
          "Select CSV or Excel format",
          "Choose your date range and click Download"
      ].filter(Boolean),
      limitation: "Standard Chartered's native export varies by country. For PDF statements from any Standard Chartered market, DocNeat detects the regional format automatically and normalises dates and currencies to a consistent CSV output."
    },
  },

  "axis-bank": {
    displayName: "Axis Bank",
    region: "India",
    statementFormat: "Axis Bank PDF statements use a six-column layout: Date, Transaction details, Chq/Ref number, Value date, Withdrawal amount, Deposit amount, and Closing balance. The account number, IFSC code, and MICR code appear in the header. Axis Bank statements are commonly used for visa applications and loan processing.",
    extractedColumns: ["Date", "Transaction details", "Cheque/reference number", "Value date", "Withdrawal amount", "Deposit amount", "Closing balance", "IFSC code", "Account number"],
    commonIssues: [
      "Axis Bank statements include both a transaction date and a value date. DocNeat preserves both columns in the output.",
      "Axis Bank descriptions include UPI transaction IDs for UPI payments. These are preserved in full — useful for reconciling UPI transactions.",
      "Multi-page Axis Bank statements repeat the column header on each page. DocNeat deduplicates these automatically.",
      "Axis Bank statements sometimes include a summary table at the end with opening and closing balances. DocNeat skips this section."
    ],
    whyText: "Axis Bank statements include IFSC codes and UPI transaction IDs that are essential for Indian financial reconciliation but are ignored by generic converters. DocNeat extracts these fields specifically, producing CSV output that works directly with Indian accounting software and GSTN filing requirements.",
    faqs: [
      { question: "Does DocNeat work with Axis Bank Salary Account statements?", answer: "Yes. Axis Bank Salary Account statements use the same PDF format and are fully supported." },
      { question: "Will UPI transaction IDs appear in the CSV?", answer: "Yes. UPI transaction IDs in the description field are preserved in full." },
      { question: "Can I use the CSV for visa applications?", answer: "DocNeat produces a clean CSV of your transactions. Most visa applications require the original PDF statement from your bank, not a converted file." },
      { question: "Will the IFSC code appear in my CSV?", answer: "Yes. The IFSC code is extracted from the header and included as a metadata column." },
      { question: "Does DocNeat work with Axis Bank NRI statements?", answer: "Yes. Axis Bank NRE and NRO account statements are supported." }
    ],
    relatedBanks: [
      { name: "HDFC Bank", slug: "hdfc-bank-statement-to-csv" },
      { name: "ICICI Bank", slug: "icici-bank-statement-to-csv" },
      { name: "SBI", slug: "sbi-statement-to-csv" },
      { name: "Kotak Mahindra", slug: "kotak-mahindra-statement-to-csv" },
      { name: "Yes Bank", slug: "yes-bank-statement-to-csv" },
      { name: "Canara Bank", slug: "canara-bank-statement-to-csv" }
    ],
    compatibility: "Tally, QuickBooks, Zoho Books, Excel — date format DD/MM/YYYY matches Indian regional settings.",
    nativeExport: {
      intro: "Axis Bank Net Banking allows you to download your account statement in Excel format, which opens as a spreadsheet.",
      steps: [
          "Log in to axisbank.com and go to Accounts",
          "Select Account Statement",
          "Choose your account and date range",
          "Click Download and select XLS or Excel format",
          "The file downloads to your device"
      ].filter(Boolean),
      limitation: "Axis Bank's native export works for recent transactions but doesn't always include all fields needed for ITR filing or GST reconciliation. For PDF statements — especially password-protected ones from the bank — DocNeat extracts the full data including UPI transaction IDs and IFSC codes."
    },
  },

  "hdfc-bank": {
    displayName: "HDFC Bank",
    region: "India",
    statementFormat: "HDFC Bank PDF statements use a seven-column layout: Date, Narration, Chq/Ref number, Value date, Withdrawal amount (Dr), Deposit amount (Cr), and Closing balance. The account number, IFSC code, branch, and MICR code appear in the header. HDFC Bank is India's largest private sector bank and its statements are among the most commonly converted.",
    extractedColumns: ["Date", "Narration", "Cheque/reference number", "Value date", "Withdrawal (Dr)", "Deposit (Cr)", "Closing balance", "IFSC code", "Account number", "Branch"],
    commonIssues: [
      "HDFC Bank statements include both a transaction date and a value date. DocNeat preserves both.",
      "HDFC descriptions (narrations) include UPI transaction IDs, NEFT reference numbers, and IMPS references. All are preserved in full.",
      "HDFC Bank statements sometimes arrive with password protection. DocNeat cannot process password-protected PDFs — remove the password first using your bank's portal.",
      "Multi-page HDFC statements repeat column headers on each page. DocNeat deduplicates these automatically."
    ],
    whyText: "HDFC Bank statements are frequently requested for loan applications, visa processing, and GST reconciliation in India. DocNeat preserves the IFSC code, MICR code, and full narration including UPI and NEFT reference numbers — the details that matter most for Indian financial compliance.",
    faqs: [
      { question: "Does DocNeat work with HDFC Bank Salary Account statements?", answer: "Yes. HDFC Salary, Savings, and Current Account statements are all supported." },
      { question: "My HDFC statement is password protected. What do I do?", answer: "HDFC Bank protects statements with your date of birth as the password. Remove the password using Adobe Acrobat or a free PDF unlocker before uploading to DocNeat." },
      { question: "Will UPI and NEFT reference numbers appear in the CSV?", answer: "Yes. All reference numbers in the narration field are preserved in full." },
      { question: "Can I use the CSV for ITR filing?", answer: "Yes. DocNeat produces a clean CSV with all transaction details suitable for income tax return preparation." },
      { question: "Does DocNeat work with HDFC NRI account statements?", answer: "Yes. HDFC NRE, NRO, and FCNR account statements are supported." }
    ],
    relatedBanks: [
      { name: "ICICI Bank", slug: "icici-bank-statement-to-csv" },
      { name: "Axis Bank", slug: "axis-bank-statement-to-csv" },
      { name: "SBI", slug: "sbi-statement-to-csv" },
      { name: "Kotak Mahindra", slug: "kotak-mahindra-statement-to-csv" },
      { name: "Yes Bank", slug: "yes-bank-statement-to-csv" },
      { name: "Canara Bank", slug: "canara-bank-statement-to-csv" }
    ],
    compatibility: "Tally, QuickBooks, Zoho Books, Excel — date format DD/MM/YYYY matches Indian regional settings.",
    nativeExport: {
      intro: "HDFC Bank Net Banking and the HDFC Bank mobile app allow you to download your account statement in Excel or PDF format.",
      steps: [
          "Log in to hdfcbank.com or the HDFC Bank app",
          "Go to Accounts, then Account Statement",
          "Select your account and choose the date range",
          "Click Download and select XLS format for a native spreadsheet",
          "Note: PDF statements from HDFC are password protected with your date of birth (DDMMYYYY)"
      ].filter(Boolean),
      limitation: "HDFC Bank's XLS export is useful but may not include all narration details needed for ITR filing, GST reconciliation, or loan applications. For HDFC PDF statements — particularly password-protected ones — DocNeat extracts the full narration including UPI reference numbers and NEFT codes after you remove the password."
    },
  },

  "sbi": {
    displayName: "SBI",
    region: "India",
    statementFormat: "State Bank of India PDF statements use a six-column layout: Txn Date, Value Date, Description, Ref No/Cheque No, Debit, Credit, and Balance. SBI is India's largest bank with over 22,000 branches. The account number, IFSC code, branch code, and CIF number appear in the header.",
    extractedColumns: ["Transaction date", "Value date", "Description", "Reference/cheque number", "Debit", "Credit", "Balance", "IFSC code", "Account number", "CIF number"],
    commonIssues: [
      "SBI statements include a CIF (Customer Information File) number in the header. DocNeat extracts this as a metadata column.",
      "SBI descriptions for YONO app transactions include YONO reference numbers. These are preserved in full.",
      "Multi-page SBI statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "SBI statements sometimes include a nominee details section at the end. DocNeat skips this non-transaction content."
    ],
    whyText: "SBI statements include CIF numbers and YONO reference numbers specific to the State Bank of India's systems. Generic converters treat the SBI header as transaction data, producing garbage rows at the top of the output. DocNeat correctly identifies the SBI header format and extracts only genuine transactions.",
    faqs: [
      { question: "Does DocNeat work with SBI Savings and Current Account statements?", answer: "Yes. Both SBI Savings and Current Account statements are fully supported." },
      { question: "Will the CIF number appear in my CSV?", answer: "Yes. The CIF number is extracted from the header and included as a metadata column." },
      { question: "Can I convert SBI statements from the YONO app?", answer: "Yes. YONO app-generated statements follow the same PDF format as online banking statements and are fully supported." },
      { question: "Does DocNeat work with SBI NRI statements?", answer: "Yes. SBI NRE and NRO account statements are supported." },
      { question: "How do I download my SBI statement as a PDF?", answer: "Log in to SBI Net Banking or the YONO app, go to e-Statement, select the account and period, and download the PDF." }
    ],
    relatedBanks: [
      { name: "HDFC Bank", slug: "hdfc-bank-statement-to-csv" },
      { name: "ICICI Bank", slug: "icici-bank-statement-to-csv" },
      { name: "Axis Bank", slug: "axis-bank-statement-to-csv" },
      { name: "Canara Bank", slug: "canara-bank-statement-to-csv" },
      { name: "KVB", slug: "kvb-statement-to-csv" },
      { name: "TMB", slug: "tmb-statement-to-csv" }
    ],
    compatibility: "Tally, QuickBooks, Zoho Books, Excel — date format DD/MM/YYYY matches Indian regional settings.",
    nativeExport: {
      intro: "State Bank of India offers statement download via Net Banking and the YONO app in both PDF and Excel formats.",
      steps: [
          "Log in to onlinesbi.sbi or the YONO app",
          "Go to e-Statement under My Accounts",
          "Select your account and the date range",
          "Choose Excel format for a native spreadsheet download",
          "The file downloads to your device"
      ].filter(Boolean),
      limitation: "SBI's native Excel export is suitable for recent transactions. For SBI PDF statements needed for ITR filing, loan applications, or visa processing, DocNeat extracts the complete data including CIF numbers and YONO reference numbers."
    },
  },

  "icici-bank": {
    displayName: "ICICI Bank",
    region: "India",
    statementFormat: "ICICI Bank PDF statements use a six-column layout: Date, Mode, Particulars, Deposits, Withdrawals, and Balance. The Mode column identifies the payment channel (UPI, NEFT, IMPS, ATM, etc.). The account number, IFSC code, and branch appear in the header.",
    extractedColumns: ["Date", "Mode", "Particulars", "Deposits", "Withdrawals", "Balance", "IFSC code", "Account number"],
    commonIssues: [
      "ICICI Bank includes a Mode column identifying the payment channel (UPI, NEFT, IMPS, ATM). DocNeat preserves this as a separate column — useful for categorising transactions by payment type.",
      "ICICI descriptions (particulars) include UPI transaction IDs and NEFT reference numbers. These are preserved in full.",
      "Multi-page ICICI statements repeat column headers. DocNeat deduplicates these automatically.",
      "ICICI Bank iMobile Pay app statements follow the same format as online banking statements."
    ],
    whyText: "ICICI Bank's Mode column — which identifies UPI, NEFT, IMPS, and other payment channels — is uniquely valuable for expense categorisation. Generic converters merge this into the description field. DocNeat preserves it as a standalone column, making it straightforward to filter and categorise transactions in your accounting software.",
    faqs: [
      { question: "Does DocNeat work with ICICI Bank Business statements?", answer: "Yes. ICICI Bank Current Account and Business statements are fully supported." },
      { question: "Will the Mode column (UPI, NEFT, IMPS) appear in my CSV?", answer: "Yes. The Mode column is preserved as a separate column in the CSV output." },
      { question: "Can I convert ICICI Bank NRI statements?", answer: "Yes. ICICI NRE, NRO, and FCNR account statements are supported." },
      { question: "Does DocNeat work with ICICI iMobile statements?", answer: "Yes. Statements downloaded from iMobile Pay use the same format as online banking statements." },
      { question: "How do I download my ICICI statement as a PDF?", answer: "Log in to ICICI Bank Net Banking, go to Accounts, select your account, click Account Statement, choose the period, and download as PDF." }
    ],
    relatedBanks: [
      { name: "HDFC Bank", slug: "hdfc-bank-statement-to-csv" },
      { name: "Axis Bank", slug: "axis-bank-statement-to-csv" },
      { name: "SBI", slug: "sbi-statement-to-csv" },
      { name: "Kotak Mahindra", slug: "kotak-mahindra-statement-to-csv" },
      { name: "Yes Bank", slug: "yes-bank-statement-to-csv" }
    ],
    compatibility: "Tally, QuickBooks, Zoho Books, Excel — date format DD/MM/YYYY matches Indian regional settings.",
    nativeExport: {
      intro: "ICICI Bank Net Banking and iMobile Pay allow you to download account statements in Excel or PDF format.",
      steps: [
          "Log in to icicibank.com or iMobile Pay",
          "Go to Accounts, then Account Statement",
          "Select your account and date range",
          "Click Download and choose Excel format",
          "The file downloads to your device"
      ].filter(Boolean),
      limitation: "ICICI Bank's native Excel export may not preserve the Mode column (UPI, NEFT, IMPS) which is essential for categorising transactions in Tally or Zoho Books. For ICICI PDF statements needed for ITR or GST reconciliation, DocNeat preserves the Mode column as a separate field."
    },
  },

  "canara-bank": {
    displayName: "Canara Bank",
    region: "India",
    statementFormat: "Canara Bank PDF statements use a six-column layout: Date, Narration, Ref No/Chq No, Value Date, Withdrawal (Dr), Deposit (Cr), and Balance. Canara Bank is one of India's largest public sector banks. The account number, IFSC code, and branch details appear in the header.",
    extractedColumns: ["Date", "Narration", "Reference/cheque number", "Value date", "Withdrawal (Dr)", "Deposit (Cr)", "Balance", "IFSC code", "Account number"],
    commonIssues: [
      "Canara Bank statements include both transaction date and value date. DocNeat preserves both.",
      "Canara Bank narrations include NEFT and RTGS reference numbers. These are preserved in full.",
      "Multi-page statements repeat column headers on each new page. DocNeat deduplicates these automatically.",
      "Canara Bank statements sometimes include a passbook-style format for older accounts. DocNeat handles both the standard and passbook formats."
    ],
    whyText: "Canara Bank is a public sector bank whose PDF statements follow government-mandated formats that differ from private sector banks. DocNeat is specifically tuned for Canara Bank's public sector format, correctly identifying the transaction table boundaries in both standard and passbook-style statements.",
    faqs: [
      { question: "Does DocNeat work with Canara Bank Current Account statements?", answer: "Yes. Canara Bank Savings and Current Account statements are both supported." },
      { question: "Will NEFT and RTGS reference numbers appear in the CSV?", answer: "Yes. All reference numbers in the narration field are preserved in full." },
      { question: "Can I convert Canara Bank passbook-style statements?", answer: "Yes. DocNeat handles both the standard PDF statement and passbook-style PDF formats." },
      { question: "How do I download my Canara Bank statement as a PDF?", answer: "Log in to Canara Bank Net Banking, go to Accounts, select your account, click Account Statement, choose the period, and download as PDF." },
      { question: "Does DocNeat work with Canara Bank NRI statements?", answer: "Yes. Canara Bank NRE and NRO account statements are supported." }
    ],
    relatedBanks: [
      { name: "SBI", slug: "sbi-statement-to-csv" },
      { name: "HDFC Bank", slug: "hdfc-bank-statement-to-csv" },
      { name: "ICICI Bank", slug: "icici-bank-statement-to-csv" },
      { name: "KVB", slug: "kvb-statement-to-csv" },
      { name: "TMB", slug: "tmb-statement-to-csv" }
    ],
    compatibility: "Tally, QuickBooks, Zoho Books, Excel — date format DD/MM/YYYY matches Indian regional settings.",
    nativeExport: {
      intro: "Canara Bank Net Banking allows you to download your account statement in PDF or Excel format.",
      steps: [
          "Log in to canarabank.in Net Banking",
          "Go to Accounts and select Account Statement",
          "Choose your account and date range",
          "Click Download and select Excel format",
          "The file downloads to your device"
      ].filter(Boolean),
      limitation: "Canara Bank's native export covers recent history. For PDF statements needed for GST reconciliation, loan applications, or ITR filing, DocNeat converts Canara Bank PDFs including both standard and passbook-style formats."
    },
  },

  "tmb": {
    displayName: "TMB",
    region: "India",
    statementFormat: "Tamilnad Mercantile Bank (TMB) PDF statements use a six-column layout: Date, Particulars, Instrument No, Value Date, Debit, Credit, and Balance. The account number, IFSC code (TMBL followed by a branch code), and branch details appear in the header.",
    extractedColumns: ["Date", "Particulars", "Instrument number", "Value date", "Debit", "Credit", "Balance", "IFSC code", "Account number"],
    commonIssues: [
      "TMB statements include an Instrument No column for cheque and DD numbers. DocNeat preserves this as a separate column.",
      "TMB descriptions include NEFT and RTGS reference numbers. These are preserved in full.",
      "Multi-page TMB statements repeat column headers on each new page. DocNeat deduplicates these automatically.",
      "TMB statements are commonly used by businesses in Tamil Nadu for GST reconciliation. DocNeat preserves all fields needed for this purpose."
    ],
    whyText: "Tamilnad Mercantile Bank serves businesses across Tamil Nadu and is widely used for GST reconciliation. DocNeat preserves TMB's Instrument No column and full narration details, producing CSV output that maps directly to Tally and Zoho Books import formats used by most Tamil Nadu businesses.",
    faqs: [
      { question: "Does DocNeat work with TMB Current Account statements?", answer: "Yes. TMB Savings and Current Account statements are both supported." },
      { question: "Will the Instrument No column appear in my CSV?", answer: "Yes. The Instrument No column is preserved as a separate column in the CSV output." },
      { question: "Can I use the CSV for GST reconciliation?", answer: "Yes. DocNeat preserves all transaction details needed for GST reconciliation, including reference numbers and narrations." },
      { question: "How do I download my TMB statement as a PDF?", answer: "Log in to TMB Net Banking, go to Accounts, select Account Statement, choose the period, and download as PDF." },
      { question: "Does DocNeat work with TMB NRI statements?", answer: "Yes. TMB NRE and NRO account statements are supported." }
    ],
    relatedBanks: [
      { name: "KVB", slug: "kvb-statement-to-csv" },
      { name: "Canara Bank", slug: "canara-bank-statement-to-csv" },
      { name: "SBI", slug: "sbi-statement-to-csv" },
      { name: "ICICI Bank", slug: "icici-bank-statement-to-csv" },
      { name: "HDFC Bank", slug: "hdfc-bank-statement-to-csv" }
    ],
    compatibility: "Tally, Zoho Books, QuickBooks, Excel — date format DD/MM/YYYY matches Indian regional settings.",
    nativeExport: {
      intro: "Tamilnad Mercantile Bank Net Banking allows you to download your account statement in PDF format.",
      steps: [
          "Log in to tmbank.in Net Banking",
          "Go to Accounts and select Account Statement",
          "Choose your account and date range",
          "Click Download to get the PDF statement",
          "Upload the PDF to DocNeat to convert to CSV"
      ].filter(Boolean),
      limitation: "TMB primarily provides PDF statements rather than native CSV or Excel export. DocNeat converts TMB PDF statements to CSV including the Instrument No column, making the output ready for Tally and Zoho Books import."
    },
  },

  "kvb": {
    displayName: "KVB",
    region: "India",
    statementFormat: "Karur Vysya Bank (KVB) PDF statements use a six-column layout: Date, Particulars, Chq No, Value Date, Debit, Credit, and Balance. The account number, IFSC code (KVBL followed by a branch code), and branch details appear in the header.",
    extractedColumns: ["Date", "Particulars", "Cheque number", "Value date", "Debit", "Credit", "Balance", "IFSC code", "Account number"],
    commonIssues: [
      "KVB statements include a Chq No column for cheque transactions. DocNeat preserves this as a separate column.",
      "KVB descriptions include NEFT, RTGS, and IMPS reference numbers. These are preserved in full.",
      "Multi-page KVB statements repeat column headers on each new page. DocNeat deduplicates these automatically.",
      "KVB statements are commonly requested for loan applications in South India. DocNeat preserves all fields in their original format."
    ],
    whyText: "Karur Vysya Bank is a South Indian bank widely used by businesses in Tamil Nadu and surrounding states. DocNeat handles KVB's specific PDF structure, including the cheque number column and South Indian regional date formats, producing accurate CSV output for Tally and other Indian accounting platforms.",
    faqs: [
      { question: "Does DocNeat work with KVB Current Account statements?", answer: "Yes. KVB Savings and Current Account statements are both supported." },
      { question: "Will the cheque number column appear in my CSV?", answer: "Yes. The Chq No column is preserved as a separate column in the CSV output." },
      { question: "Can I use the CSV for loan applications?", answer: "DocNeat produces a clean CSV of your transactions. Most lenders require the original PDF statement from your bank for official loan applications." },
      { question: "How do I download my KVB statement as a PDF?", answer: "Log in to KVB Net Banking, go to Accounts, select Account Statement, choose the period, and download as PDF." },
      { question: "Does DocNeat work with KVB NRI statements?", answer: "Yes. KVB NRE and NRO account statements are supported." }
    ],
    relatedBanks: [
      { name: "TMB", slug: "tmb-statement-to-csv" },
      { name: "Canara Bank", slug: "canara-bank-statement-to-csv" },
      { name: "SBI", slug: "sbi-statement-to-csv" },
      { name: "ICICI Bank", slug: "icici-bank-statement-to-csv" },
      { name: "HDFC Bank", slug: "hdfc-bank-statement-to-csv" }
    ],
    compatibility: "Tally, Zoho Books, QuickBooks, Excel — date format DD/MM/YYYY matches Indian regional settings.",
    nativeExport: {
      intro: "Karur Vysya Bank Net Banking allows you to download your account statement in PDF format.",
      steps: [
          "Log in to kvb.co.in Net Banking",
          "Go to Accounts and select Account Statement",
          "Choose your account and date range",
          "Click Download to get the PDF statement",
          "Upload the PDF to DocNeat to convert to CSV"
      ].filter(Boolean),
      limitation: "KVB primarily provides PDF statements. DocNeat converts KVB PDFs to CSV including the cheque number column and full narration, ready for Tally and other Indian accounting platforms."
    },
  },

  "kotak-mahindra": {
    displayName: "Kotak Mahindra",
    region: "India",
    statementFormat: "Kotak Mahindra Bank PDF statements use a six-column layout: Transaction Date, Value Date, Description, Chq/Ref Number, Debit, Credit, and Balance. The account number, IFSC code, and branch appear in the header. Kotak 811 digital account statements follow the same format.",
    extractedColumns: ["Transaction date", "Value date", "Description", "Cheque/reference number", "Debit", "Credit", "Balance", "IFSC code", "Account number"],
    commonIssues: [
      "Kotak Mahindra statements include both transaction date and value date. DocNeat preserves both columns.",
      "Kotak descriptions include UPI transaction IDs and IMPS references. These are preserved in full.",
      "Kotak 811 digital account statements are generated from the app and follow the same PDF structure as branch account statements.",
      "Multi-page Kotak statements repeat column headers on each new page. DocNeat deduplicates these automatically."
    ],
    whyText: "Kotak Mahindra Bank and its Kotak 811 digital account are popular for their zero-balance savings accounts. DocNeat handles both traditional branch account statements and app-generated 811 statements, preserving UPI reference numbers and the dual-date format used across all Kotak account types.",
    faqs: [
      { question: "Does DocNeat work with Kotak 811 account statements?", answer: "Yes. Kotak 811 digital account statements use the same format and are fully supported." },
      { question: "Can I convert Kotak Mahindra Business statements?", answer: "Yes. Kotak Current Account and Business statements are supported." },
      { question: "Will UPI transaction IDs appear in the CSV?", answer: "Yes. UPI transaction IDs in the description field are preserved in full." },
      { question: "How do I download my Kotak statement as a PDF?", answer: "Log in to Kotak Net Banking or the Kotak app, go to Accounts, select Account Statement, choose the period, and download as PDF." },
      { question: "Does DocNeat work with Kotak NRI statements?", answer: "Yes. Kotak NRE and NRO account statements are supported." }
    ],
    relatedBanks: [
      { name: "HDFC Bank", slug: "hdfc-bank-statement-to-csv" },
      { name: "ICICI Bank", slug: "icici-bank-statement-to-csv" },
      { name: "Axis Bank", slug: "axis-bank-statement-to-csv" },
      { name: "Yes Bank", slug: "yes-bank-statement-to-csv" },
      { name: "SBI", slug: "sbi-statement-to-csv" }
    ],
    compatibility: "Tally, QuickBooks, Zoho Books, Excel — date format DD/MM/YYYY matches Indian regional settings.",
    nativeExport: {
      intro: "Kotak Mahindra Bank Net Banking and the Kotak app allow you to download your account statement in PDF or Excel format.",
      steps: [
          "Log in to kotak.com or the Kotak app",
          "Go to Accounts and select Account Statement",
          "Choose your account and date range",
          "Select Excel format for a native spreadsheet",
          "Click Download"
      ].filter(Boolean),
      limitation: "Kotak's native Excel export may not include all reference fields needed for financial analysis. For Kotak PDF statements or Kotak 811 digital account statements, DocNeat extracts the complete data including UPI transaction IDs."
    },
  },

  "yes-bank": {
    displayName: "Yes Bank",
    region: "India",
    statementFormat: "Yes Bank PDF statements use a six-column layout: Date, Narration, Chq/Ref No, Value Date, Withdrawal, Deposit, and Closing Balance. The account number, IFSC code (YESB followed by a branch code), and branch details appear in the header.",
    extractedColumns: ["Date", "Narration", "Cheque/reference number", "Value date", "Withdrawal", "Deposit", "Closing balance", "IFSC code", "Account number"],
    commonIssues: [
      "Yes Bank statements include both transaction and value dates. DocNeat preserves both.",
      "Yes Bank narrations include UPI, NEFT, and RTGS reference numbers. These are preserved in full.",
      "Multi-page Yes Bank statements repeat column headers on each new page. DocNeat deduplicates these automatically.",
      "Yes Bank statements are commonly used for credit assessments. DocNeat preserves all original fields."
    ],
    whyText: "Yes Bank statements are frequently requested for credit assessments and loan applications. DocNeat preserves all Yes Bank transaction fields in their original format, producing CSV output that is immediately usable for financial analysis without manual data cleaning.",
    faqs: [
      { question: "Does DocNeat work with Yes Bank Current Account statements?", answer: "Yes. Yes Bank Savings and Current Account statements are both supported." },
      { question: "Will UPI and NEFT reference numbers appear in the CSV?", answer: "Yes. All reference numbers in the narration field are preserved in full." },
      { question: "How do I download my Yes Bank statement as a PDF?", answer: "Log in to Yes Bank Net Banking, go to Accounts, select Account Statement, choose the period, and download as PDF." },
      { question: "Does DocNeat work with Yes Bank NRI statements?", answer: "Yes. Yes Bank NRE and NRO account statements are supported." },
      { question: "Can I convert Yes Bank statements for CA audit purposes?", answer: "Yes. DocNeat preserves all original transaction fields. The CSV output is suitable for CA audit preparation." }
    ],
    relatedBanks: [
      { name: "HDFC Bank", slug: "hdfc-bank-statement-to-csv" },
      { name: "ICICI Bank", slug: "icici-bank-statement-to-csv" },
      { name: "Axis Bank", slug: "axis-bank-statement-to-csv" },
      { name: "Kotak Mahindra", slug: "kotak-mahindra-statement-to-csv" },
      { name: "SBI", slug: "sbi-statement-to-csv" }
    ],
    compatibility: "Tally, QuickBooks, Zoho Books, Excel — date format DD/MM/YYYY matches Indian regional settings.",
    nativeExport: {
      intro: "Yes Bank Net Banking allows you to download your account statement in PDF or Excel format.",
      steps: [
          "Log in to yesbank.in Net Banking",
          "Go to Accounts and select Account Statement",
          "Choose your account and date range",
          "Select Excel format for a native spreadsheet",
          "Click Download"
      ].filter(Boolean),
      limitation: "Yes Bank's native Excel export covers recent history. For Yes Bank PDF statements needed for credit assessments or CA audit purposes, DocNeat converts them with all original narration fields preserved."
    },
  },

  "nab": {
    displayName: "NAB",
    region: "Australia",
    statementFormat: "NAB (National Australia Bank) PDF statements use a four-column layout: Date, Transaction details, Debit, and Credit, with a Balance column. The BSB number and account number appear in the header. NAB Business statements include a reference column for BPAY and EFT transactions.",
    extractedColumns: ["Date", "Transaction details", "Debit", "Credit", "Balance", "BSB number", "Account number"],
    commonIssues: [
      "NAB statements include both a BSB and account number in the header. DocNeat extracts both as metadata columns.",
      "NAB descriptions include BPAY biller codes and reference numbers for bill payments. These are preserved in full.",
      "Multi-page NAB statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "NAB Business statements include a separate section for fees. DocNeat captures these as regular transaction rows."
    ],
    whyText: "NAB statements include BSB numbers and BPAY references that are specific to Australian banking and essential for reconciliation in Xero and MYOB. DocNeat extracts these fields precisely, producing CSV output that imports cleanly into Australian accounting software without manual column mapping.",
    faqs: [
      { question: "Does DocNeat work with NAB Business statements?", answer: "Yes. NAB Business Banking statements, including BPAY reference extraction, are fully supported." },
      { question: "Will my BSB number appear in the CSV?", answer: "Yes. The BSB number is extracted from the header and included as a metadata column." },
      { question: "Can I import the CSV directly into MYOB or Xero?", answer: "Yes. DocNeat's CSV output is formatted for direct import into Xero and MYOB, which are the most widely used accounting platforms in Australia." },
      { question: "How far back do NAB PDF statements go?", answer: "NAB provides up to 7 years of statements via NAB Internet Banking. DocNeat can process any PDF from this archive." },
      { question: "Does DocNeat work with NAB credit card statements?", answer: "Yes. NAB credit card statements are supported alongside bank account statements." }
    ],
    relatedBanks: [
      { name: "Commonwealth Bank", slug: "commonwealth-bank-statement-to-csv" },
      { name: "ANZ Bank", slug: "anz-bank-statement-to-csv" },
      { name: "Westpac", slug: "westpac-statement-to-csv" }
    ],
    compatibility: "Xero, MYOB, QuickBooks, Excel — date format DD/MM/YYYY matches Australian regional settings.",
    nativeExport: {
      intro: "NAB Internet Banking lets you export transactions as a CSV file directly.",
      steps: [
          "Sign in to nab.com.au and select your account",
          "Click Export Transactions above your transaction list",
          "Select CSV as the format",
          "Choose your date range",
          "Click Export"
      ].filter(Boolean),
      limitation: "NAB's native CSV export covers recent online banking history. For older NAB PDF statements or business account PDFs, DocNeat converts them with BSB number extraction and BPAY reference preservation for direct Xero and MYOB import."
    },
  },

  "anz-bank": {
    displayName: "ANZ Bank",
    region: "Australia/NZ",
    statementFormat: "ANZ PDF statements use a four-column layout: Date, Details, Amount, and Balance. ANZ operates in Australia, New Zealand, and across Asia Pacific. Australian statements include a BSB number while New Zealand statements include a bank/branch/account/suffix number format in the header.",
    extractedColumns: ["Date", "Details", "Amount", "Balance", "BSB number (AU) / Account number"],
    commonIssues: [
      "ANZ Australia statements use a BSB number while ANZ New Zealand uses a different account number format. DocNeat detects the country automatically.",
      "ANZ descriptions include merchant categories for card transactions. These are preserved in the output.",
      "Multi-page ANZ statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "ANZ Business statements include a separate section for bank fees. DocNeat captures these as regular transaction rows."
    ],
    whyText: "ANZ operates across Australia, New Zealand, and Asia Pacific with regional statement variations. Generic converters handle only the Australian format, failing on ANZ New Zealand statements. DocNeat detects the ANZ region automatically and applies the correct account identifier extraction for each country.",
    faqs: [
      { question: "Does DocNeat work with ANZ Business statements?", answer: "Yes. ANZ Business Banking statements are fully supported." },
      { question: "Can I convert ANZ New Zealand statements?", answer: "Yes. ANZ NZ statements use a different account number format to AU statements, and DocNeat handles both." },
      { question: "Will my BSB number appear in the CSV?", answer: "Yes. The BSB number is extracted from Australian ANZ statement headers and included as a metadata column." },
      { question: "Can I import the CSV into Xero or MYOB?", answer: "Yes. DocNeat's CSV output is formatted for direct import into Xero and MYOB." },
      { question: "Does DocNeat work with ANZ credit card statements?", answer: "Yes. ANZ credit card statements are supported alongside bank account statements." }
    ],
    relatedBanks: [
      { name: "Commonwealth Bank", slug: "commonwealth-bank-statement-to-csv" },
      { name: "NAB", slug: "nab-statement-to-csv" },
      { name: "Westpac", slug: "westpac-statement-to-csv" }
    ],
    compatibility: "Xero, MYOB, QuickBooks, Excel — date format DD/MM/YYYY matches Australian and NZ regional settings.",
    nativeExport: {
      intro: "ANZ Internet Banking and the ANZ app both support direct CSV export of your transactions.",
      steps: [
          "Sign in to anz.com.au (AU) or anz.co.nz (NZ) and select your account",
          "Click Export or Download Transactions",
          "Select CSV as the file format",
          "Choose your date range",
          "Click Export or Download"
      ].filter(Boolean),
      limitation: "ANZ's native CSV export covers recent history. For older ANZ PDF statements or PDFs from ANZ New Zealand, DocNeat handles both AU and NZ account number formats with BSB extraction for MYOB and Xero import."
    },
  },

  "commonwealth-bank": {
    displayName: "Commonwealth Bank",
    region: "Australia",
    statementFormat: "Commonwealth Bank (CommBank) PDF statements use a three-column layout: Date, Transaction description, and Amount, with a Balance column. The BSB number and account number appear in the header. CommBank NetBank and the CommBank app generate statements in the same format.",
    extractedColumns: ["Date", "Transaction description", "Amount", "Balance", "BSB number", "Account number"],
    commonIssues: [
      "CommBank descriptions include merchant category codes for card transactions. DocNeat preserves these in the output.",
      "CommBank statements downloaded from the app use the same PDF format as NetBank statements.",
      "Multi-page CommBank statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "CommBank Business statements include a separate section for account fees. DocNeat captures these as regular transaction rows."
    ],
    whyText: "Commonwealth Bank is Australia's largest bank and its statements are the most commonly converted in Australia. DocNeat is specifically tuned for CommBank's PDF format, including the merchant category codes and BSB extraction that are essential for Australian business reconciliation in Xero and MYOB.",
    faqs: [
      { question: "Does DocNeat work with CommBank Business statements?", answer: "Yes. CommBank Business Transaction Account statements are fully supported." },
      { question: "Will my BSB number appear in the CSV?", answer: "Yes. The BSB number is extracted from the header and included as a metadata column." },
      { question: "Can I import the CSV into Xero or MYOB?", answer: "Yes. DocNeat's CSV output is formatted for direct import into both Xero and MYOB." },
      { question: "How do I download my CommBank statement as a PDF?", answer: "Log in to CommBank NetBank or the CommBank app, go to Accounts, select your account, click Statements, and download the PDF." },
      { question: "Does DocNeat work with CommBank credit card statements?", answer: "Yes. CommBank credit card statements are supported alongside bank account statements." }
    ],
    relatedBanks: [
      { name: "ANZ Bank", slug: "anz-bank-statement-to-csv" },
      { name: "NAB", slug: "nab-statement-to-csv" },
      { name: "Westpac", slug: "westpac-statement-to-csv" }
    ],
    compatibility: "Xero, MYOB, QuickBooks, Excel — date format DD/MM/YYYY matches Australian regional settings.",
    nativeExport: {
      intro: "CommBank NetBank and the CommBank app both let you export transactions as a CSV file.",
      steps: [
          "Sign in to commbank.com.au or the CommBank app",
          "Select your account",
          "Click Export or Download Transactions",
          "Select CSV as the format",
          "Choose your date range and click Export"
      ].filter(Boolean),
      limitation: "CommBank's native CSV export covers recent activity. For older CommBank PDF statements or business account PDFs, DocNeat converts them with BSB number extraction and merchant category code preservation for direct Xero and MYOB import."
    },
  },

  "westpac": {
    displayName: "Westpac",
    region: "Australia/NZ",
    statementFormat: "Westpac PDF statements use a four-column layout: Date, Narration, Debit, and Credit, with a Balance column. The BSB number and account number appear in the header. Westpac operates in Australia and New Zealand. Westpac Business statements include additional reference columns for EFT and BPAY transactions.",
    extractedColumns: ["Date", "Narration", "Debit", "Credit", "Balance", "BSB number", "Account number"],
    commonIssues: [
      "Westpac statements separate debits and credits into distinct columns. DocNeat preserves both columns in the output.",
      "Westpac descriptions include BPAY biller codes and reference numbers. These are preserved in full.",
      "Multi-page Westpac statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "Westpac New Zealand statements use a different account number format. DocNeat handles both AU and NZ formats."
    ],
    whyText: "Westpac's split debit/credit column format is the most natural structure for double-entry bookkeeping, but generic converters often merge these into a single signed amount. DocNeat preserves Westpac's original column structure, so your Xero or MYOB import requires no column remapping.",
    faqs: [
      { question: "Does DocNeat work with Westpac Business statements?", answer: "Yes. Westpac Business Banking statements are fully supported." },
      { question: "Can I convert Westpac New Zealand statements?", answer: "Yes. Westpac NZ statements use a different account format to AU statements, and DocNeat handles both." },
      { question: "Will my BSB number appear in the CSV?", answer: "Yes. The BSB number is extracted from the header and included as a metadata column." },
      { question: "Can I import the CSV into Xero or MYOB?", answer: "Yes. DocNeat's CSV output is formatted for direct import into both Xero and MYOB." },
      { question: "Does DocNeat work with Westpac credit card statements?", answer: "Yes. Westpac credit card statements are supported alongside bank account statements." }
    ],
    relatedBanks: [
      { name: "Commonwealth Bank", slug: "commonwealth-bank-statement-to-csv" },
      { name: "ANZ Bank", slug: "anz-bank-statement-to-csv" },
      { name: "NAB", slug: "nab-statement-to-csv" }
    ],
    compatibility: "Xero, MYOB, QuickBooks, Excel — date format DD/MM/YYYY matches Australian and NZ regional settings.",
    nativeExport: {
      intro: "Westpac Online Banking allows you to export transactions as a CSV file.",
      steps: [
          "Sign in to westpac.com.au (AU) or westpac.co.nz (NZ) and select your account",
          "Click Export Transactions",
          "Select CSV as the file format",
          "Choose your date range",
          "Click Export"
      ].filter(Boolean),
      limitation: "Westpac's native export covers recent history. For older Westpac PDF statements or NZ Westpac PDFs, DocNeat preserves the separate Debit and Credit columns that Westpac uses, making MYOB and Xero imports straightforward."
    },
  },

  "dbs-bank": {
    displayName: "DBS Bank",
    region: "Singapore/Asia",
    statementFormat: "DBS Bank PDF statements use a four-column layout: Transaction Date, Value Date, Description, and Amount, with a Balance column. DBS operates primarily in Singapore but also across Southeast and South Asia. The account number appears in the header alongside the statement period.",
    extractedColumns: ["Transaction date", "Value date", "Description", "Amount", "Balance", "Account number"],
    commonIssues: [
      "DBS statements include both a transaction date and value date. DocNeat preserves both columns.",
      "DBS descriptions include PayNow reference numbers for Singapore's instant payment system. These are preserved in full.",
      "DBS statements from different countries (Singapore, India, Taiwan) use different date formats. DocNeat normalises all to a consistent output format.",
      "DBS Multiplier account statements include an interest tier summary. DocNeat skips this section and extracts only transaction rows."
    ],
    whyText: "DBS Bank is Singapore's largest bank and its statements are widely used across Southeast Asia for business reconciliation. DocNeat preserves DBS's PayNow references and dual-date format, producing CSV output that imports cleanly into Xero, QuickBooks, and Singapore-specific accounting tools.",
    faqs: [
      { question: "Does DocNeat work with DBS Business statements?", answer: "Yes. DBS Business Banking and POSB statements are fully supported." },
      { question: "Will PayNow reference numbers appear in the CSV?", answer: "Yes. PayNow reference numbers in the description field are preserved in full." },
      { question: "Can I convert DBS statements from India or Taiwan?", answer: "Yes. DBS statements from across Asia are supported. DocNeat normalises date formats automatically." },
      { question: "Does DocNeat work with DBS Multiplier account statements?", answer: "Yes. DBS Multiplier statements are supported. The interest tier summary section is automatically skipped." },
      { question: "How do I download my DBS statement as a PDF?", answer: "Log in to DBS iBanking or the DBS digibank app, go to Accounts, select your account, click Statements, and download the PDF." }
    ],
    relatedBanks: [
      { name: "Standard Chartered", slug: "standard-chartered-statement-to-csv" },
      { name: "HSBC", slug: "hsbc-statement-to-csv" },
      { name: "ANZ Bank", slug: "anz-bank-statement-to-csv" }
    ],
    compatibility: "Xero, QuickBooks, Excel — date format DD/MM/YYYY normalised from Singapore format.",
    nativeExport: {
      intro: "DBS iBanking and the DBS digibank app allow you to download your transactions as a CSV or Excel file.",
      steps: [
          "Sign in to ibanking.dbs.com or the DBS digibank app",
          "Select your account",
          "Go to Statements or Transaction History",
          "Click Download or Export",
          "Select CSV format and choose your date range"
      ].filter(Boolean),
      limitation: "DBS's native export covers recent history. For older DBS PDF statements or statements from DBS branches in India, Taiwan, or other Asian markets, DocNeat normalises date formats and preserves PayNow reference numbers."
    },
  },

  "fifth-third": {
    displayName: "Fifth Third",
    region: "US",
    statementFormat: "Fifth Third Bank PDF statements use a four-column layout: Date, Description, Amount, and Balance. The account number and routing number appear in the header. Fifth Third operates primarily in the Midwest and Southeast US. Business and Momentum Checking statements follow the same format.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Account number", "Routing number"],
    commonIssues: [
      "Fifth Third statements include a summary section with average daily balance. DocNeat skips this and extracts only transaction rows.",
      "Fifth Third descriptions include merchant category identifiers for card transactions. These are preserved in the output.",
      "Multi-page Fifth Third statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "Fifth Third Business statements include a separate section for analysed fees. DocNeat captures these as regular transaction rows."
    ],
    whyText: "Fifth Third Bank's statements include a daily balance summary table embedded above the transaction list. Generic converters often misread this summary as the transaction data, producing incorrect output. DocNeat identifies Fifth Third's transaction table boundary precisely.",
    faqs: [
      { question: "Does DocNeat work with Fifth Third Business statements?", answer: "Yes. Fifth Third Business Banking statements are fully supported." },
      { question: "Can I convert Fifth Third credit card statements?", answer: "Yes. Fifth Third credit card statements are supported alongside bank account statements." },
      { question: "How far back do Fifth Third statements go online?", answer: "Fifth Third provides up to 7 years of statements online. DocNeat can process any PDF from this archive." },
      { question: "Will my routing number appear in the CSV?", answer: "Yes. The routing number is extracted from the header and included as a metadata column." },
      { question: "Does DocNeat work with Fifth Third Momentum Checking statements?", answer: "Yes. Fifth Third Momentum Checking statements use the same format and are fully supported." }
    ],
    relatedBanks: [
      { name: "PNC Bank", slug: "pnc-bank-statement-to-csv" },
      { name: "Huntington", slug: "huntington-statement-to-csv" },
      { name: "KeyBank", slug: "keybank-statement-to-csv" },
      { name: "Regions Bank", slug: "regions-bank-statement-to-csv" },
      { name: "US Bank", slug: "us-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Fifth Third Bank online banking supports CSV download of your transaction history.",
      steps: [
          "Sign in to 53.com and select your account",
          "Click Download Transactions",
          "Select CSV as the format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "Fifth Third's native export covers recent history. For older PDF statements or business account PDFs, DocNeat converts Fifth Third statements accurately, skipping the daily balance summary that confuses generic converters."
    },
  },

  "suntrust": {
    displayName: "SunTrust",
    region: "US",
    statementFormat: "SunTrust Bank (now Truist) PDF statements use a four-column layout: Date, Description, Amount, and Balance. SunTrust merged with BB&T to form Truist in 2019. Legacy SunTrust statements retain the SunTrust branding and format. The account number and routing number appear in the header.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Account number", "Routing number"],
    commonIssues: [
      "SunTrust merged with BB&T to form Truist in 2019. Older statements retain SunTrust branding while newer statements may use Truist branding. DocNeat handles both.",
      "SunTrust descriptions include merchant category codes. These are preserved in the output.",
      "Multi-page SunTrust statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "SunTrust Business statements include a separate section for fees and service charges. DocNeat captures these as regular transaction rows."
    ],
    whyText: "SunTrust statements from before and after the Truist merger have slightly different branding but the same underlying PDF structure. DocNeat handles both SunTrust and Truist-branded statements from this bank with consistent output.",
    faqs: [
      { question: "Does DocNeat work with Truist statements?", answer: "Yes. Following the SunTrust and BB&T merger, Truist-branded statements use a similar format and are supported." },
      { question: "Can I convert legacy SunTrust statements?", answer: "Yes. Legacy SunTrust-branded statements from before the Truist merger are fully supported." },
      { question: "Does DocNeat work with SunTrust Business statements?", answer: "Yes. SunTrust Business Banking statements are supported." },
      { question: "How far back do SunTrust statements go online?", answer: "Truist (formerly SunTrust) provides up to 7 years of statements online. DocNeat can process any PDF from this archive." },
      { question: "Will my routing number appear in the CSV?", answer: "Yes. The routing number is extracted from the header and included as a metadata column." }
    ],
    relatedBanks: [
      { name: "Regions Bank", slug: "regions-bank-statement-to-csv" },
      { name: "Fifth Third", slug: "fifth-third-statement-to-csv" },
      { name: "Huntington", slug: "huntington-statement-to-csv" },
      { name: "KeyBank", slug: "keybank-statement-to-csv" },
      { name: "M&T Bank", slug: "m&t-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Truist (formerly SunTrust) online banking allows you to download transactions as a CSV file.",
      steps: [
          "Sign in to truist.com and select your account",
          "Click Download Transactions above your transaction list",
          "Select CSV as the format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "Truist/SunTrust native export covers recent history. For legacy SunTrust PDF statements from before the Truist merger, or for business account PDFs, DocNeat handles both SunTrust and Truist-branded statement formats."
    },
  },

  "silicon-valley-bank": {
    displayName: "Silicon Valley Bank",
    region: "US",
    statementFormat: "Silicon Valley Bank (SVB) PDF statements use a four-column layout: Date, Description, Amount, and Balance. SVB was a leading bank for startups and venture-backed companies before its closure in March 2023. Legacy SVB statements are commonly needed for audit and tax purposes. The account number and routing number appear in the header.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Account number", "Routing number"],
    commonIssues: [
      "SVB statements are legacy documents that may be needed for audit, tax, or legal purposes. DocNeat processes these identically to current bank statements.",
      "SVB descriptions include wire transfer reference numbers and startup-specific transaction types. These are preserved in full.",
      "Multi-page SVB statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "SVB statements from before its March 2023 closure follow the same PDF format throughout its history."
    ],
    whyText: "Silicon Valley Bank statements are frequently needed for historical audit, tax reconstruction, and legal proceedings following the bank's 2023 closure. DocNeat processes legacy SVB statements exactly as it processes current bank statements, preserving all transaction details in a clean, accountant-ready CSV.",
    faqs: [
      { question: "Can I convert SVB statements from before the 2023 closure?", answer: "Yes. DocNeat processes historical SVB statements from any period." },
      { question: "Are SVB statements needed for tax or audit purposes?", answer: "Yes. Many former SVB customers need their historical statements for tax returns, audits, and legal proceedings. DocNeat can help convert these to CSV for analysis." },
      { question: "Does DocNeat work with SVB Business statements?", answer: "Yes. SVB Business Banking statements are fully supported." },
      { question: "Will wire transfer references appear in the CSV?", answer: "Yes. Wire transfer reference numbers in the description field are preserved in full." },
      { question: "Where can I get my old SVB statements?", answer: "Former SVB customers can access their historical statements through the FDIC receivership portal or through First Citizens Bank, which acquired SVB's deposits." }
    ],
    relatedBanks: [
      { name: "Mercury", slug: "mercury-statement-to-csv" },
      { name: "First Republic", slug: "first-republic-statement-to-csv" },
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "Ally Bank", slug: "ally-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Legacy Silicon Valley Bank statements are only available as PDF downloads via the FDIC portal or First Citizens Bank.",
      steps: [
          "Contact First Citizens Bank (which acquired SVB deposits) to access your historical statements",
          "Alternatively, access statements via the FDIC receivership portal if applicable",
          "Download your statement as a PDF",
          "Upload to DocNeat to convert to CSV",
          ""
      ].filter(Boolean),
      limitation: "SVB statements are legacy documents with no native CSV export option. DocNeat converts all historical SVB PDF statements to CSV, producing clean audit-ready output for tax and legal purposes."
    },
  },

  "first-republic": {
    displayName: "First Republic",
    region: "US",
    statementFormat: "First Republic Bank PDF statements use a four-column layout: Date, Description, Amount, and Balance. First Republic was acquired by JPMorgan Chase in May 2023. Legacy First Republic statements are commonly needed for audit, tax, and legal purposes. The account number and routing number appear in the header.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Account number", "Routing number"],
    commonIssues: [
      "First Republic statements are legacy documents following the bank's acquisition by JPMorgan Chase in 2023. DocNeat processes these identically to current bank statements.",
      "First Republic descriptions include private banking transaction types and wire references. These are preserved in full.",
      "Multi-page First Republic statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "Accounts transitioned to JPMorgan Chase will produce Chase-branded statements from mid-2023 onwards."
    ],
    whyText: "First Republic Bank statements are frequently needed for historical audit, tax reconstruction, and legal proceedings following its acquisition. DocNeat processes legacy First Republic statements preserving all transaction details, including the private banking transaction types specific to First Republic's clientele.",
    faqs: [
      { question: "Can I convert First Republic statements from before the 2023 acquisition?", answer: "Yes. DocNeat processes historical First Republic statements from any period." },
      { question: "Does DocNeat work with First Republic Business statements?", answer: "Yes. First Republic Business Banking statements are fully supported." },
      { question: "Where can I get my old First Republic statements?", answer: "Former First Republic customers can access historical statements through JPMorgan Chase, which acquired First Republic's deposits in May 2023." },
      { question: "Will wire transfer references appear in the CSV?", answer: "Yes. Wire transfer reference numbers in the description field are preserved in full." },
      { question: "My account moved to Chase. Can I convert Chase statements now?", answer: "Yes. DocNeat supports both legacy First Republic statements and Chase statements for accounts that transitioned." }
    ],
    relatedBanks: [
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "Silicon Valley Bank", slug: "silicon-valley-bank-statement-to-csv" },
      { name: "Mercury", slug: "mercury-statement-to-csv" },
      { name: "Wells Fargo", slug: "wells-fargo-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Legacy First Republic Bank statements are available via JPMorgan Chase, which acquired First Republic's deposits in May 2023.",
      steps: [
          "Log in to chase.com — your First Republic account will have been migrated to Chase",
          "For pre-acquisition statements, contact JPMorgan Chase to request historical First Republic PDFs",
          "Download the PDF statement",
          "Upload to DocNeat to convert to CSV",
          ""
      ].filter(Boolean),
      limitation: "Pre-acquisition First Republic statements are only available as PDFs with no native CSV export. DocNeat converts historical First Republic PDFs to CSV for audit, tax, and legal purposes."
    },
  },

  "regions-bank": {
    displayName: "Regions Bank",
    region: "US",
    statementFormat: "Regions Bank PDF statements use a four-column layout: Date, Description, Amount, and Balance. Regions operates across the South, Midwest, and Texas. The account number and routing number appear in the header. Regions LifeGreen Checking and Business statements share the same format.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Account number", "Routing number"],
    commonIssues: [
      "Regions statements include a summary section with average balance and fee information. DocNeat skips this and extracts only transaction rows.",
      "Regions descriptions include merchant category codes for card transactions. These are preserved in the output.",
      "Multi-page Regions statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "Regions Business statements include a separate section for analysed fees. DocNeat captures these as regular transaction rows."
    ],
    whyText: "Regions Bank is a major regional bank across the US South and Midwest. DocNeat handles Regions' statement format precisely, skipping the fee summary section that causes errors in generic converters and extracting only genuine transaction rows.",
    faqs: [
      { question: "Does DocNeat work with Regions Bank Business statements?", answer: "Yes. Regions Business Banking statements are fully supported." },
      { question: "Can I convert Regions credit card statements?", answer: "Yes. Regions credit card statements are supported alongside bank account statements." },
      { question: "How far back do Regions statements go online?", answer: "Regions provides up to 7 years of statements online. DocNeat can process any PDF from this archive." },
      { question: "Will my routing number appear in the CSV?", answer: "Yes. The routing number is extracted from the header and included as a metadata column." },
      { question: "Does DocNeat work with Regions LifeGreen Checking statements?", answer: "Yes. Regions LifeGreen Checking statements use the same format and are fully supported." }
    ],
    relatedBanks: [
      { name: "SunTrust", slug: "suntrust-statement-to-csv" },
      { name: "Fifth Third", slug: "fifth-third-statement-to-csv" },
      { name: "Huntington", slug: "huntington-statement-to-csv" },
      { name: "KeyBank", slug: "keybank-statement-to-csv" },
      { name: "M&T Bank", slug: "m&t-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Regions Bank online banking supports CSV download of your transaction history.",
      steps: [
          "Sign in to regions.com and select your account",
          "Click Download Transactions",
          "Select CSV as the file format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "Regions Bank's native export covers recent history. For older Regions PDF statements or business account PDFs, DocNeat converts them accurately, skipping the fee summary sections that confuse generic converters."
    },
  },

  "m&t-bank": {
    displayName: "M&T Bank",
    region: "US",
    statementFormat: "M&T Bank PDF statements use a four-column layout: Date, Description, Amount, and Balance. M&T Bank operates primarily in the Northeast US. The account number and routing number appear in the header. M&T Business Checking and Manufacturers and Traders Trust statements share the same format.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Account number", "Routing number"],
    commonIssues: [
      "M&T statements include a summary section at the top with beginning and ending balances. DocNeat skips this and extracts only transaction rows.",
      "M&T descriptions include check numbers for paper checks as part of the description string. DocNeat preserves these in full.",
      "Multi-page M&T statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "M&T Business statements include a separate section for account analysis charges. DocNeat captures these as regular transaction rows."
    ],
    whyText: "M&T Bank is a leading Northeast US regional bank whose statements include account analysis sections that confuse generic converters. DocNeat identifies M&T's transaction table precisely, skipping all account analysis and summary content.",
    faqs: [
      { question: "Does DocNeat work with M&T Business statements?", answer: "Yes. M&T Business Banking and Manufacturers Trust statements are fully supported." },
      { question: "Can I convert M&T credit card statements?", answer: "Yes. M&T credit card statements are supported alongside bank account statements." },
      { question: "How far back do M&T statements go online?", answer: "M&T provides up to 7 years of statements online. DocNeat can process any PDF from this archive." },
      { question: "Will my routing number appear in the CSV?", answer: "Yes. The routing number is extracted from the header and included as a metadata column." },
      { question: "Does DocNeat work with People's United statements?", answer: "M&T Bank acquired People's United Bank in 2022. Legacy People's United statements use a similar format and are supported." }
    ],
    relatedBanks: [
      { name: "PNC Bank", slug: "pnc-bank-statement-to-csv" },
      { name: "KeyBank", slug: "keybank-statement-to-csv" },
      { name: "Huntington", slug: "huntington-statement-to-csv" },
      { name: "Fifth Third", slug: "fifth-third-statement-to-csv" },
      { name: "Regions Bank", slug: "regions-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "M&T Bank online banking allows you to download transactions as a CSV file.",
      steps: [
          "Sign in to mtb.com and select your account",
          "Click Download Transactions",
          "Select CSV as the format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "M&T Bank's native export covers recent history. For older M&T PDF statements or business account PDFs, DocNeat converts them accurately, skipping the account analysis sections that confuse generic converters."
    },
  },

  "huntington": {
    displayName: "Huntington",
    region: "US",
    statementFormat: "Huntington Bank PDF statements use a four-column layout: Date, Description, Amount, and Balance. Huntington operates primarily in the Midwest US. The account number and routing number appear in the header. Huntington Asterisk-Free Checking and Business Checking statements share the same format.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Account number", "Routing number"],
    commonIssues: [
      "Huntington statements include a 24-Hour Grace notification section that appears before the transaction table. DocNeat skips this and starts extraction at the transaction table.",
      "Huntington descriptions include merchant category codes for card transactions. These are preserved in the output.",
      "Multi-page Huntington statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "Huntington Business statements include a separate section for account analysis. DocNeat captures these as regular transaction rows."
    ],
    whyText: "Huntington Bank statements include a 24-Hour Grace promotional section before the transaction table that causes generic converters to produce incorrect output. DocNeat identifies the transaction table start precisely, skipping all non-transaction content.",
    faqs: [
      { question: "Does DocNeat work with Huntington Business statements?", answer: "Yes. Huntington Business Checking statements are fully supported." },
      { question: "Can I convert Huntington credit card statements?", answer: "Yes. Huntington credit card statements are supported alongside bank account statements." },
      { question: "How far back do Huntington statements go online?", answer: "Huntington provides up to 7 years of statements online. DocNeat can process any PDF from this archive." },
      { question: "Will my routing number appear in the CSV?", answer: "Yes. The routing number is extracted from the header and included as a metadata column." },
      { question: "Does DocNeat work with TCF Bank statements?", answer: "Huntington acquired TCF Bank in 2021. Legacy TCF Bank statements use a similar format and are supported." }
    ],
    relatedBanks: [
      { name: "Fifth Third", slug: "fifth-third-statement-to-csv" },
      { name: "KeyBank", slug: "keybank-statement-to-csv" },
      { name: "PNC Bank", slug: "pnc-bank-statement-to-csv" },
      { name: "US Bank", slug: "us-bank-statement-to-csv" },
      { name: "Regions Bank", slug: "regions-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Huntington Bank online banking supports CSV download of your account transactions.",
      steps: [
          "Sign in to huntington.com and select your account",
          "Click Download Transactions",
          "Select CSV as the format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "Huntington's native export covers recent history. For older Huntington PDF statements or business account PDFs, DocNeat converts them accurately, skipping the 24-Hour Grace sections that confuse generic converters."
    },
  },

  "keybank": {
    displayName: "KeyBank",
    region: "US",
    statementFormat: "KeyBank PDF statements use a four-column layout: Date, Description, Amount, and Balance. KeyBank operates primarily in the Northwest, Mountain West, and Northeast US. The account number and routing number appear in the header. KeyBank Business and Key4Kids Savings statements share the same core format.",
    extractedColumns: ["Date", "Description", "Amount", "Balance", "Account number", "Routing number"],
    commonIssues: [
      "KeyBank statements include a summary section with account activity totals. DocNeat skips this and extracts only transaction rows.",
      "KeyBank descriptions include merchant category codes for card transactions. These are preserved in the output.",
      "Multi-page KeyBank statements repeat column headers on each page. DocNeat deduplicates these automatically.",
      "KeyBank Business statements include a separate section for account analysis fees. DocNeat captures these as regular transaction rows."
    ],
    whyText: "KeyBank's statement PDF includes an account activity summary embedded before the transaction table. Generic converters frequently include summary rows in the transaction output. DocNeat identifies KeyBank's transaction table boundary precisely, excluding all summary content.",
    faqs: [
      { question: "Does DocNeat work with KeyBank Business statements?", answer: "Yes. KeyBank Business Banking statements are fully supported." },
      { question: "Can I convert KeyBank credit card statements?", answer: "Yes. KeyBank credit card statements are supported alongside bank account statements." },
      { question: "How far back do KeyBank statements go online?", answer: "KeyBank provides up to 7 years of statements online. DocNeat can process any PDF from this archive." },
      { question: "Will my routing number appear in the CSV?", answer: "Yes. The routing number is extracted from the header and included as a metadata column." },
      { question: "Does DocNeat work with First Niagara statements?", answer: "KeyBank acquired First Niagara in 2016. Legacy First Niagara statements use a similar format and are supported." }
    ],
    relatedBanks: [
      { name: "Huntington", slug: "huntington-statement-to-csv" },
      { name: "Fifth Third", slug: "fifth-third-statement-to-csv" },
      { name: "US Bank", slug: "us-bank-statement-to-csv" },
      { name: "PNC Bank", slug: "pnc-bank-statement-to-csv" },
      { name: "M&T Bank", slug: "m&t-bank-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "KeyBank online banking allows you to download your transactions as a CSV file.",
      steps: [
          "Sign in to key.com and select your account",
          "Click Download Transactions",
          "Select CSV as the format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "KeyBank's native export covers recent history. For older KeyBank PDF statements or business account PDFs, DocNeat converts them accurately, skipping account activity summaries that confuse generic converters."
    },
  },

  "discover": {
    displayName: "Discover",
    region: "US",
    statementFormat: "Discover PDF statements use a three-column layout: Transaction Date, Description, and Amount, with a Balance column. Discover is primarily known as a credit card issuer but also offers checking and savings accounts. The account number appears in the header alongside the statement period.",
    extractedColumns: ["Transaction date", "Description", "Amount", "Balance", "Account number"],
    commonIssues: [
      "Discover credit card statements include a rewards summary section at the top. DocNeat skips this and extracts only transaction rows.",
      "Discover descriptions include merchant category codes. These are preserved in the output for expense categorisation.",
      "Discover statements include a minimum payment and due date row. DocNeat identifies and excludes these non-transaction rows.",
      "Discover Cashback Bonus credits appear as transaction rows. DocNeat captures these with their original dates and amounts."
    ],
    whyText: "Discover statements include a Cashback Bonus summary and minimum payment information before the transaction table. Generic converters often include these as transaction rows, causing reconciliation errors. DocNeat identifies the Discover transaction table precisely and excludes all non-transaction content.",
    faqs: [
      { question: "Does DocNeat work with Discover Cashback credit card statements?", answer: "Yes. Discover it, Cashback, and all Discover credit card statements are fully supported." },
      { question: "Can I convert Discover Bank checking statements?", answer: "Yes. Discover Bank checking and savings account statements are supported." },
      { question: "Will Cashback Bonus credits appear in the CSV?", answer: "Yes. Cashback Bonus credits are captured as regular transaction rows with their original dates and amounts." },
      { question: "How far back do Discover statements go online?", answer: "Discover provides up to 7 years of statements online. DocNeat can process any PDF from this archive." },
      { question: "Does DocNeat work with Discover student card statements?", answer: "Yes. Discover student credit card statements use the same format and are fully supported." }
    ],
    relatedBanks: [
      { name: "Capital One", slug: "capital-one-statement-to-csv" },
      { name: "Citibank", slug: "citibank-statement-to-csv" },
      { name: "Chase", slug: "chase-statement-to-csv" },
      { name: "Ally Bank", slug: "ally-bank-statement-to-csv" },
      { name: "Chime", slug: "chime-statement-to-csv" }
    ],
    compatibility: "QuickBooks, Xero, Sage, Excel — date format MM/DD/YYYY matches US regional settings.",
    nativeExport: {
      intro: "Discover allows you to download your transaction history as a CSV file from online banking.",
      steps: [
          "Sign in to discover.com and select your account",
          "Click Download near your transaction list",
          "Select CSV as the format",
          "Choose your date range",
          "Click Download"
      ].filter(Boolean),
      limitation: "Discover's native CSV export covers recent activity. For older Discover PDF statements or credit card statements received as PDFs, DocNeat converts them accurately, excluding the Cashback Bonus summary that confuses generic converters."
    },
  }

};