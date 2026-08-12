import { useState } from 'react'

interface Assignment {
  subject: string
  task: string
  color: string
  day: number
}

const dueDates: Assignment[] = [
  { subject: 'Cálculo', task: 'Tarea 3: Derivadas', color: '#38bdf8', day: 17 },
  { subject: 'Prog. Web', task: 'API REST', color: '#34d399', day: 18 },
  { subject: 'Diseño', task: 'Prototipo Figma', color: '#a78bfa', day: 15 },
  { subject: 'Bases de Datos', task: 'Modelo E-R', color: '#fb923c', day: 20 },
  { subject: 'Cálculo', task: 'Examen Parcial 1', color: '#38bdf8', day: 24 },
  { subject: 'Diseño', task: 'Análisis Usabilidad', color: '#a78bfa', day: 22 },
  { subject: 'Prog. Web', task: 'Frontend React', color: '#34d399', day: 25 },
  { subject: 'Álgebra', task: 'Tarea 4', color: '#f472b6', day: 14 },
  { subject: 'Redes', task: 'Práctica 2', color: '#facc15', day: 28 },
  { subject: 'Bases de Datos', task: 'Scripts SQL', color: '#fb923c', day: 28 },
]

const DAYS = ['D', 'L', 'M', 'X', 'J', 'V', 'S']
const MONTH = 'Agosto 2026'

const START_DAY = 6
const TOTAL_DAYS = 31
const TODAY = 10

export default function CalendarScreen() {
  const [selected, setSelected] = useState<number | null>(TODAY)

  const selectedTasks = selected
    ? dueDates.filter((d) => d.day === selected)
    : []


  const cells: (number | null)[] = []
  for (let i = 0; i < START_DAY; i++) cells.push(null)
  for (let d = 1; d <= TOTAL_DAYS; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const hasDue = (day: number) => dueDates.some((d) => d.day === day)
  const getDueColors = (day: number) =>
    [...new Set(dueDates.filter((d) => d.day === day).map((d) => d.color))]

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
      <div style={{ padding: '20px 24px 16px' }}>
        <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#8892b0', margin: '0 0 4px', letterSpacing: '0.5px' }}>
          ENTREGAS
        </p>
        <h2
          style={{
            fontFamily: 'Outfit',
            fontSize: 26,
            fontWeight: 700,
            color: '#e2e8f8',
            margin: 0,
            letterSpacing: '-0.5px',
          }}
        >
          Calendario
        </h2>
      </div>

      {/* Month navigation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px 16px',
        }}
      >
        <button
          style={{
            background: '#1a1e35',
            border: '1px solid #252a45',
            borderRadius: 10,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#8892b0',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span
          style={{
            fontFamily: 'Outfit',
            fontSize: 16,
            fontWeight: 700,
            color: '#e2e8f8',
          }}
        >
          {MONTH}
        </span>
        <button
          style={{
            background: '#1a1e35',
            border: '1px solid #252a45',
            borderRadius: 10,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#8892b0',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Calendar grid */}
      <div style={{ padding: '0 24px' }}>
        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 8 }}>
          {DAYS.map((d) => (
            <div
              key={d}
              style={{
                textAlign: 'center',
                fontFamily: 'Outfit',
                fontSize: 12,
                fontWeight: 600,
                color: '#4a5470',
                padding: '4px 0',
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px 0' }}>
          {cells.map((day, i) => {
            if (!day) {
              return <div key={`empty-${i}`} />
            }
            const isToday = day === TODAY
            const isSelected = day === selected
            const isDue = hasDue(day)
            const dotColors = getDueColors(day)

            return (
              <button
                key={day}
                onClick={() => setSelected(day === selected ? null : day)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 3,
                  height: 48,
                  borderRadius: 12,
                  border: 'none',
                  backgroundColor: isSelected
                    ? '#4a7cfc'
                    : isToday
                    ? '#1e2d5a'
                    : 'transparent',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  boxShadow: isSelected ? '0 2px 12px rgba(74,124,252,0.4)' : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Outfit',
                    fontSize: 14,
                    fontWeight: isToday || isSelected ? 700 : 400,
                    color: isSelected ? '#fff' : isToday ? '#6b9bff' : '#e2e8f8',
                  }}
                >
                  {day}
                </span>
                {isDue && (
                  <div style={{ display: 'flex', gap: 2 }}>
                    {dotColors.slice(0, 3).map((c, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          backgroundColor: isSelected ? 'rgba(255,255,255,0.8)' : c,
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected day tasks */}
      <div style={{ flex: 1, padding: '20px 24px 24px' }}>
        <p
          style={{
            fontFamily: 'Outfit',
            fontSize: 14,
            fontWeight: 600,
            color: '#8892b0',
            margin: '0 0 12px',
          }}
        >
          {selected
            ? selectedTasks.length > 0
              ? `Entregas del ${selected} de agosto`
              : `Sin entregas el ${selected} de agosto`
            : 'Próximas entregas'}
        </p>

        {(selected ? selectedTasks : dueDates.sort((a, b) => a.day - b.day).slice(0, 4)).map(
          (item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                backgroundColor: '#131629',
                borderRadius: 16,
                padding: '14px 16px',
                marginBottom: 8,
                border: '1px solid #1e2440',
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 40,
                  borderRadius: 4,
                  backgroundColor: item.color,
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontFamily: 'Outfit',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#e2e8f8',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.task}
                </p>
                <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#8892b0', margin: '2px 0 0' }}>
                  {item.subject}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: `${item.color}22`,
                  borderRadius: 8,
                  padding: '4px 8px',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'Outfit',
                    fontSize: 12,
                    fontWeight: 700,
                    color: item.color,
                  }}
                >
                  {item.day} ago
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
