const logoUrl = 'https://new.molbiodiagnostics.com/mailSignature/png/Molbio_Logo.png'

export default function TitleSlide() {
  return (
    <section className="title-slide" data-state="title-slide">
      <img src={logoUrl} alt="Molbio Diagnostics Limited logo" className="title-logo" />
      <div className="title-company">Molbio Diagnostics Limited</div>
      <h1>Management Review Meeting</h1>
      <div className="date">December 15-16, 2025</div>
      <div style={{ marginTop: '60px', fontSize: '1.2em', color: '#111827' }}>Presented By: Hammed C R</div>
      <div style={{ fontSize: '1em', color: '#6b7280', marginTop: '8px' }}>Asst. Manager</div>
      <div style={{ fontSize: '1.1em', color: '#111827', marginTop: '12px' }}>Quality Assurance Site-III</div>
    </section>
  )
}
