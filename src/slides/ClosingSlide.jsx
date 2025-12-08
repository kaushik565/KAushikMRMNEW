const logoUrl = 'https://raw.githubusercontent.com/kaushik565/KAushikMRMNEW/master/logo.png'

export default function ClosingSlide() {
  return (
    <section className="closing-slide" style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      textAlign: 'center',
      backgroundColor: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    }}>
      {/* Company Logo */}
      <img 
        src={logoUrl}
        alt="Company Logo"
        style={{
          width: '280px',
          height: 'auto',
          marginBottom: '48px',
          objectFit: 'contain'
        }}
      />

      {/* Main Thank You Message */}
      <h1 style={{
        fontSize: '4em',
        fontWeight: '800',
        marginBottom: '24px',
        color: '#b91c1c',
        letterSpacing: '-0.02em'
      }}>
        Thank You
      </h1>

      {/* Subheading */}
      <h2 style={{
        fontSize: '1.8em',
        fontWeight: '600',
        marginBottom: '48px',
        color: '#475569'
      }}>
        for your attention & engagement
      </h2>

      {/* Decorative line */}
      <div style={{
        width: '120px',
        height: '4px',
        backgroundColor: '#b91c1c',
        marginBottom: '48px',
        borderRadius: '2px'
      }}></div>
    </section>
  )
}
