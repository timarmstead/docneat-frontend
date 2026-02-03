// This single file will power: 
// docneat.com/convert/chase-bank-statement-to-csv
// docneat.com/convert/barclays-bank-statement-to-csv
// ...etc

export default async function BankLandingPage({ params }) {
  const { bank } = params;
  const bankName = bank.charAt(0).toUpperCase() + bank.slice(1);

  return (
    <main>
      <Hero 
        title={`Convert ${bankName} PDF Statements to CSV Instantly`} 
        subtitle={`Precision extraction for ${bankName} layouts. No more manual data entry.`}
      />
      <FeatureGrid bank={bankName} />
      <FAQ bank={bankName} />
      <StickyCTA />
    </main>
  );
}
