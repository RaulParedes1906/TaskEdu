import { useState } from 'react'

const stats = [
  { label: 'Materias', value: '6', color: '#4a7cfc' },
  { label: 'Entregadas', value: '18', color: '#34d399' },
  { label: 'Pendientes', value: '21', color: '#fb923c' },
  { label: 'Promedio', value: '9.1', color: '#a78bfa' },
]

const subjects = [
  { name: 'Diseño de Interfaces', grade: 9.5, color: '#a78bfa', progress: 68 },
  { name: 'Programación Web', grade: 9.0, color: '#34d399', progress: 55 },
  { name: 'Bases de Datos', grade: 8.7, color: '#fb923c', progress: 72 },
  { name: 'Cálculo Diferencial', grade: 8.5, color: '#38bdf8', progress: 60 },
  { name: 'Álgebra Lineal', grade: 9.8, color: '#f472b6', progress: 80 },
  { name: 'Redes y Sistemas', grade: 8.9, color: '#facc15', progress: 48 },
]

const achievements = [
  { icon: '🏆', label: 'Estudiante estrella', color: '#facc15' },
  { icon: '🔥', label: 'Racha 7 días', color: '#fb923c' },
  { icon: '📚', label: '20 tareas entregadas', color: '#34d399' },
  { icon: '⚡', label: 'Entrega puntual', color: '#a78bfa' },
]

export default function ProfileScreen() {
  const [activeSection, setActiveSection] = useState<'materias' | 'logros'>('materias')

  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        backgroundColor: '#0c0e1a',
      }}
    >
      {/* Profile Header */}
      <div
        style={{
          background: 'linear-gradient(160deg, #131e4a 0%, #0c0e1a 70%)',
          padding: '24px 24px 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background dots */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at center, rgba(74,124,252,0.08) 1px, transparent 1.5px)',
            backgroundSize: '20px 20px',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24, position: 'relative' }}>
          {/* Avatar */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4a7cfc, #a78bfa)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                boxShadow: '0 0 0 3px #0c0e1a, 0 0 0 5px #4a7cfc44',
              }}
            >
              👩‍💻
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#22c55e',
                border: '2px solid #0c0e1a',
              }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontFamily: 'Outfit',
                fontSize: 20,
                fontWeight: 800,
                color: '#e2e8f8',
                margin: 0,
                letterSpacing: '-0.3px',
              }}
            >
              Raul Paredes
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#8892b0', margin: '3px 0 0' }}>
              Ingeniería en tecnologías de la información
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#4a7cfc', margin: '2px 0 0' }}>
              7to Cuatrimestre · 2023 – 2026
            </p>

            <div
              style={{
                marginTop: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                backgroundColor: '#1e2d5a',
                borderRadius: 8,
                padding: '4px 10px',
                border: '1px solid #253570',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M22 10H2M22 14H2" stroke="#4a7cfc" strokeWidth="2" strokeLinecap="round" />
                <rect x="3" y="4" width="18" height="16" rx="3" stroke="#4a7cfc" strokeWidth="2" />
              </svg>
              <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#6b9bff', fontWeight: 600 }}>
                Mat. 2022-0847
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            backgroundColor: '#131629',
            borderRadius: '20px 20px 0 0',
            padding: '16px 8px',
            gap: 0,
            borderTop: '1px solid #1e2440',
            borderLeft: '1px solid #1e2440',
            borderRight: '1px solid #1e2440',
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'Outfit',
                  fontSize: 22,
                  fontWeight: 800,
                  color: s.color,
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {s.value}
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: 10, color: '#4a5470', margin: '4px 0 0' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          backgroundColor: '#131629',
          borderLeft: '1px solid #1e2440',
          borderRight: '1px solid #1e2440',
          display: 'flex',
          padding: '0 16px',
          gap: 4,
        }}
      >
        {(['materias', 'logros'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              borderBottom: activeSection === tab ? '2px solid #4a7cfc' : '2px solid transparent',
              padding: '12px 0',
              fontFamily: 'Outfit',
              fontSize: 13,
              fontWeight: 600,
              color: activeSection === tab ? '#4a7cfc' : '#4a5470',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'capitalize',
            }}
          >
            {tab === 'materias' ? 'Mis Materias' : 'Logros'}
          </button>
        ))}
      </div>

      <div style={{ padding: '16px 24px 24px' }}>
        {activeSection === 'materias' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {subjects.map((sub) => (
              <div
                key={sub.name}
                style={{
                  backgroundColor: '#131629',
                  borderRadius: 16,
                  padding: '14px 16px',
                  border: '1px solid #1e2440',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <p
                    style={{
                      fontFamily: 'Outfit',
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#e2e8f8',
                      margin: 0,
                    }}
                  >
                    {sub.name}
                  </p>
                  <span
                    style={{
                      fontFamily: 'Outfit',
                      fontSize: 14,
                      fontWeight: 800,
                      color: sub.color,
                    }}
                  >
                    {sub.grade}
                  </span>
                </div>
                <div style={{ height: 4, backgroundColor: '#1e2440', borderRadius: 4, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${sub.progress}%`,
                      backgroundColor: sub.color,
                      borderRadius: 4,
                      transition: 'width 0.6s ease',
                    }}
                  />
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: 10, color: '#4a5470', margin: '4px 0 0' }}>
                  {sub.progress}% completado
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {achievements.map((a, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#131629',
                  borderRadius: 16,
                  padding: '18px 16px',
                  border: `1px solid ${a.color}33`,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: `${a.color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                  }}
                >
                  {a.icon}
                </div>
                <p
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 11,
                    fontWeight: 600,
                    color: a.color,
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {a.label}
                </p>
              </div>
            ))}
            {/* Locked achievement */}
            <div
              style={{
                backgroundColor: '#0f1220',
                borderRadius: 16,
                padding: '18px 16px',
                border: '1px solid #1a1e30',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                opacity: 0.5,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#1a1e35',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}
              >
                🔒
              </div>
              <p style={{ fontFamily: 'Inter', fontSize: 11, color: '#4a5470', margin: 0 }}>
                Por desbloquear
              </p>
            </div>
            <div
              style={{
                backgroundColor: '#0f1220',
                borderRadius: 16,
                padding: '18px 16px',
                border: '1px solid #1a1e30',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                opacity: 0.5,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#1a1e35',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                }}
              >
                🔒
              </div>
              <p style={{ fontFamily: 'Inter', fontSize: 11, color: '#4a5470', margin: 0 }}>
                Por desbloquear
              </p>
            </div>
          </div>
        )}

        {/* Settings */}
        <div style={{ marginTop: 20 }}>
          {[
            { icon: '🔔', label: 'Notificaciones', sub: 'Recordatorios activos' },
            { icon: '🎨', label: 'Apariencia', sub: 'Modo oscuro · Azul' },
            { icon: '🚪', label: 'Cerrar sesión', sub: 'UPTx', danger: true },
          ].map((item, i) => (
            <button
              key={i}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: i < 2 ? '1px solid #1a1e30' : 'none',
                padding: '14px 0',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <span style={{ fontSize: 20, width: 32, textAlign: 'center' }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: 'Outfit',
                    fontSize: 14,
                    fontWeight: 600,
                    color: (item as { danger?: boolean }).danger ? '#f87171' : '#e2e8f8',
                    margin: 0,
                  }}
                >
                  {item.label}
                </p>
                <p style={{ fontFamily: 'Inter', fontSize: 11, color: '#4a5470', margin: '2px 0 0' }}>
                  {item.sub}
                </p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="#252a45" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
