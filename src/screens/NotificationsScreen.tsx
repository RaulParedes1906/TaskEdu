interface Notification {
  id: number
  title: string
  body: string
  time: string
  color: string
  unread: boolean
  icon: string
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'Entrega mañana',
    body: 'Prototipo de alta fidelidad — Diseño de Interfaces vence el 15 ago.',
    time: 'Hace 2h',
    color: '#a78bfa',
    unread: true,
    icon: '⚠️',
  },
  {
    id: 2,
    title: 'Calificación publicada',
    body: 'Tarea 2 de Programación Web: 9.5/10. ¡Buen trabajo!',
    time: 'Hace 5h',
    color: '#34d399',
    unread: true,
    icon: '✅',
  },
  {
    id: 3,
    title: 'Recordatorio',
    body: 'Examen Parcial 1 de Cálculo Diferencial en 10 días.',
    time: 'Ayer',
    color: '#38bdf8',
    unread: true,
    icon: '📅',
  },
  {
    id: 4,
    title: 'Nueva tarea publicada',
    body: 'Dr. Martínez publicó "Deploy en Vercel" — vence el 01 sep.',
    time: 'Ayer',
    color: '#34d399',
    unread: false,
    icon: '📋',
  },
  {
    id: 5,
    title: 'Foro de clase',
    body: 'Dra. López comentó en el hilo "Principios de Gestalt aplicados".',
    time: 'Hace 2 días',
    color: '#a78bfa',
    unread: false,
    icon: '💬',
  },
  {
    id: 6,
    title: 'Entrega confirmada',
    body: 'Tu tarea "Tarea 2: Integrales" fue recibida correctamente.',
    time: 'Hace 3 días',
    color: '#22c55e',
    unread: false,
    icon: '📬',
  },
]

export default function NotificationsScreen() {
  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
        backgroundColor: '#0c0e1a',
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#8892b0', margin: '0 0 4px', letterSpacing: '0.5px' }}>
            CENTRO DE AVISOS
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
            Notificaciones
          </h2>
        </div>
        {unreadCount > 0 && (
          <div
            style={{
              backgroundColor: '#4a7cfc',
              borderRadius: 20,
              padding: '4px 10px',
              marginBottom: 4,
            }}
          >
            <span style={{ fontFamily: 'Outfit', fontSize: 12, fontWeight: 700, color: '#fff' }}>
              {unreadCount} nuevas
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              backgroundColor: n.unread ? '#131629' : '#0f1220',
              borderRadius: 18,
              padding: '16px',
              border: n.unread ? `1px solid ${n.color}33` : '1px solid #1a1e30',
              display: 'flex',
              gap: 12,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {n.unread && (
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  backgroundColor: n.color,
                  borderRadius: '3px 0 0 3px',
                }}
              />
            )}
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                backgroundColor: `${n.color}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {n.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <p
                  style={{
                    fontFamily: 'Outfit',
                    fontSize: 14,
                    fontWeight: 700,
                    color: n.unread ? '#e2e8f8' : '#8892b0',
                    margin: 0,
                  }}
                >
                  {n.title}
                </p>
                <span style={{ fontFamily: 'Inter', fontSize: 10, color: '#4a5470', flexShrink: 0, marginLeft: 8 }}>
                  {n.time}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'Inter',
                  fontSize: 12,
                  color: n.unread ? '#8892b0' : '#4a5470',
                  margin: '4px 0 0',
                  lineHeight: 1.5,
                }}
              >
                {n.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
