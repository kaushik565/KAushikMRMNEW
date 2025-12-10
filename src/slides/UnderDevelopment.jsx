import React from 'react'

export default function UnderDevelopment() {
  return (
    <section
      data-state="under-development"
      style={{
        width: '100vw',
        height: '100vh',
        padding: '0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #43e97b 100%)',
        position: 'relative',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
        top: '-200px',
        left: '-100px',
        pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        bottom: '-150px',
        right: '-100px',
        pointerEvents: 'none',
        animation: 'float 10s ease-in-out infinite 1s'
      }}></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        maxWidth: '900px'
      }}>
        {/* Animated Construction Icon */}
        <div style={{
          fontSize: '8rem',
          marginBottom: '40px',
          animation: 'spin 3s linear infinite',
          display: 'inline-block'
        }}>
          🔨
        </div>

        {/* Main Title */}
        <div style={{
          fontSize: '4.5rem',
          fontWeight: 950,
          color: '#ffffff',
          marginBottom: '24px',
          letterSpacing: '-0.03em',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          animation: 'slideInDown 0.8s ease-out'
        }}>
          Under Development
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: '1.8rem',
          fontWeight: 700,
          color: 'rgba(255, 255, 255, 0.95)',
          marginBottom: '32px',
          lineHeight: '1.6',
          animation: 'slideInDown 0.8s ease-out 0.2s both'
        }}>
          This slide is currently being developed
        </div>

        {/* Description Box */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '40px',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          marginBottom: '40px',
          animation: 'slideInDown 0.8s ease-out 0.4s both'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.8'
          }}>
            📋 Exciting content is on the way!
            <br />
            <br />
            We're working hard to bring you comprehensive information and insights on this topic. Stay tuned for updates coming soon.
          </div>
        </div>

        {/* Status Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: '#ffffff',
          animation: 'slideInDown 0.8s ease-out 0.6s both'
        }}>
          <span style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>●</span>
          Work in Progress
          <span style={{ animation: 'pulse 1.5s ease-in-out infinite 0.3s' }}>●</span>
        </div>
      </div>

      {/* Bottom Message */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '1.2rem',
        fontWeight: 600,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        animation: 'slideInDown 0.8s ease-out 0.8s both'
      }}>
        ✨ Thank you for your patience ✨
      </div>
    </section>
  )
}
