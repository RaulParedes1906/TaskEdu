import { useState } from 'react'

interface Subject {
  id: string
  name: string
  code: string
  professor: string
  pending: number
  color: string
  bgGradient: string
  icon: string
}

const subjects: Subject[] = [
  {
    id: 'di',
    name: 'Diseño de Interfaces',
    code: 'DI-301',
    professor: 'Osvaldo Moreno',
    pending: 3,
    color: '#a78bfa',
    bgGradient: 'linear-gradient(135deg, #2d1b69 0%, #1e1340 100%)',
    icon: '✦',
  },
  {
    id: 'pw',
    name: 'Programación Web',
    code: 'PW-204',
    professor: 'Ma. Luisa Alcántara',
    pending: 5,
    color: '#34d399',
    bgGradient: 'linear-gradient(135deg, #064e3b 0%, #0d2e25 100%)',
    icon: '⟨/⟩',
  },
  {
    id: 'bd',
    name: 'Bases de Datos',
    code: 'BD-102',
    professor: 'Augusto Meléndez',
    pending: 2,
    color: '#fb923c',
    bgGradient: 'linear-gradient(135deg, #7c2d12 0%, #431407 100%)',
    icon: '⊞',
  },
  {
    id: 'cd',
    name: 'Cálculo Diferencial',
    code: 'MAT-101',
    professor: 'Ana Lilia Montiel',
    pending: 4,
    color: '#38bdf8',
    bgGradient: 'linear-gradient(135deg, #0c4a6e 0%, #082f49 100%)',
    icon: '∂',
  },
  {
    id: 'al',
    name: 'Álgebra Lineal',
    code: 'MAT-201',
    professor: 'Patricia Hernandez',
    pending: 1,
    color: '#f472b6',
    bgGradient: 'linear-gradient(135deg, #831843 0%, #500724 100%)',
    icon: '∑',
  },
  {
    id: 'rs',
    name: 'Redes y Sistemas',
    code: 'RS-303',
    professor: 'Ma.Luisa Xochihua',
    pending: 6,
    color: '#facc15',
    bgGradient: 'linear-gradient(135deg, #713f12 0%, #422006 100%)',
    icon: '⊕',
  },
]

interface Props {
  onOpenInbox: (subject: string) => void
}

export default function HomeScreen({ onOpenInbox }: Props) {
  const [pressed, setPressed] = useState<string | null>(null)
  const totalPending = subjects.reduce((s, sub) => s + sub.pending, 0)

  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        backgroundColor: '#0c0e1a',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#8892b0', margin: 0 }}>
              Semestre Agosto–Diciembre 2026
            </p>
            <h1
              style={{
                fontFamily: 'Outfit',
                fontSize: 26,
                fontWeight: 700,
                color: '#e2e8f8',
                margin: '4px 0 0',
                letterSpacing: '-0.5px',
              }}
            >
              Mis Materias
            </h1>
          </div>
          <div
            style={{
              backgroundColor: '#1a1e35',
              borderRadius: 12,
              padding: '8px 14px',
              textAlign: 'center',
              border: '1px solid #252a45',
            }}
          >
            <p style={{ fontFamily: 'Outfit', fontSize: 22, fontWeight: 700, color: '#4a7cfc', margin: 0, lineHeight: 1 }}>
              {totalPending}
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: 10, color: '#8892b0', margin: '2px 0 0' }}>
              pendientes
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 16, marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#8892b0' }}>Progreso del semestre</span>
            <span style={{ fontFamily: 'Outfit', fontSize: 12, fontWeight: 600, color: '#4a7cfc' }}>62%</span>
          </div>
          <div style={{ height: 5, backgroundColor: '#1a1e35', borderRadius: 10, overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: '62%',
                background: 'linear-gradient(90deg, #4a7cfc, #6b9bff)',
                borderRadius: 10,
              }}
            />
          </div>
        </div>
      </div>

      {/* Subject Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          padding: '16px 24px 24px',
        }}
      >
        {subjects.map((sub) => (
          <button
            key={sub.id}
            onMouseDown={() => setPressed(sub.id)}
            onMouseUp={() => setPressed(null)}
            onMouseLeave={() => setPressed(null)}
            onClick={() => onOpenInbox(sub.name)}
            style={{
              background: sub.bgGradient,
              border: `1px solid ${sub.color}22`,
              borderRadius: 20,
              padding: '18px 16px',
              cursor: 'pointer',
              textAlign: 'left',
              transform: pressed === sub.id ? 'scale(0.96)' : 'scale(1)',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              boxShadow: pressed === sub.id ? 'none' : `0 4px 20px ${sub.color}15`,
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                backgroundColor: `${sub.color}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
                fontSize: 18,
                color: sub.color,
                fontFamily: 'Outfit',
                fontWeight: 700,
                border: `1px solid ${sub.color}33`,
              }}
            >
              {sub.icon}
            </div>

            {/* Subject code */}
            <p
              style={{
                fontFamily: 'Inter',
                fontSize: 10,
                fontWeight: 600,
                color: sub.color,
                margin: '0 0 4px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              {sub.code}
            </p>

            {/* Subject name */}
            <p
              style={{
                fontFamily: 'Outfit',
                fontSize: 14,
                fontWeight: 600,
                color: '#e2e8f8',
                margin: '0 0 10px',
                lineHeight: 1.3,
              }}
            >
              {sub.name}
            </p>

            {/* Professor */}
            <p style={{ fontFamily: 'Inter', fontSize: 11, color: '#8892b0', margin: '0 0 10px' }}>
              {sub.professor}
            </p>

            {/* Pending badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  backgroundColor: sub.pending > 3 ? `${sub.color}33` : `${sub.color}22`,
                  borderRadius: 8,
                  padding: '3px 8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: sub.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Outfit',
                    fontSize: 12,
                    fontWeight: 700,
                    color: sub.color,
                  }}
                >
                  {sub.pending} {sub.pending === 1 ? 'tarea' : 'tareas'}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
