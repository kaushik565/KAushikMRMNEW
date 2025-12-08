const primaryLogoUrl = 'https://raw.githubusercontent.com/kaushik565/KAushikMRMNEW/master/logo.png'
const fallbackLogoUrl = 'https://raw.githubusercontent.com/kaushik565/KAushikMRMNEW/master/logo.png'

export default function TitleSlide() {
  return (
    <section className="title-slide" data-state="title-slide">
      <div className="title-content">
        <img
          src={primaryLogoUrl}
          alt="Molbio Diagnostics Limited logo"
          className="title-logo"
          onError={(e) => { e.currentTarget.src = fallbackLogoUrl }}
        />
        <div className="title-company">Molbio Diagnostics Limited</div>
        <h1>Management Review Meeting</h1>
        <div className="date">December 15-16, 2025</div>
      </div>
    </section>
  )
}
