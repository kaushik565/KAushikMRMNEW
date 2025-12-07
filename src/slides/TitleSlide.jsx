const primaryLogoUrl = 'https://ci3.googleusercontent.com/meips/ADKq_NYoWiyCxIBqXhvayEyoxq9RdqOFqxTu5zYVWWPmrNV2i6HjGtBI5ZIGmLgb8GS-P9z___3MejWcSMXcOtakV5I2Jx_qBa-jgUgiWCxeHnZMfcTzixwuqAXJ=s0-d-e1-ft#https://new.molbiodiagnostics.com/mailSignature/png/Molbio_Logo.png'
const fallbackLogoUrl = 'https://raw.githubusercontent.com/kaushik565/KAushikMRMNEW/master/image.png'

export default function TitleSlide() {
  return (
    <section className="title-slide" data-state="title-slide">
      <img
        src={primaryLogoUrl}
        alt="Molbio Diagnostics Limited logo"
        className="title-logo"
        onError={(e) => { e.currentTarget.src = fallbackLogoUrl }}
      />
      <div className="title-company">Molbio Diagnostics Limited</div>
      <h1>Management Review Meeting</h1>
      <div className="date">December 15-16, 2025</div>
      <div style={{ marginTop: '60px', fontSize: '1.2em', color: '#111827' }}>Presented By: Hammed C R</div>
      <div style={{ fontSize: '1em', color: '#6b7280', marginTop: '8px' }}>Asst. Manager</div>
      <div style={{ fontSize: '1.1em', color: '#111827', marginTop: '12px' }}>Quality Assurance Site-III</div>
    </section>
  )
}
