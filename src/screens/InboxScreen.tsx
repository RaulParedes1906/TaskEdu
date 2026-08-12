import { useState, useRef, type DragEvent } from 'react'

interface Props {
  subject: string | null
}

const assignments: Record<string, { task: string; due: string; description: string }[]> = {
  'Diseño de Interfaces': [
    { task: 'Prototipo de alta fidelidad', due: '15 ago 2026', description: 'Entrega el prototipo en Figma con al menos 5 pantallas.' },
    { task: 'Análisis de usabilidad', due: '22 ago 2026', description: 'Documento PDF con heurísticas de Nielsen evaluadas.' },
    { task: 'Presentación final', due: '30 ago 2026', description: 'Diapositivas con el diseño completo del proyecto.' },
  ],
  'Programación Web': [
    { task: 'API REST con Node.js', due: '18 ago 2026', description: 'Entrega el repositorio en GitHub con el link al README.' },
    { task: 'Frontend en React', due: '25 ago 2026', description: 'Componentes funcionales con hooks y Tailwind CSS.' },
    { task: 'Deploy en Vercel', due: '01 sep 2026', description: 'URL pública del proyecto desplegado.' },
    { task: 'Pruebas unitarias', due: '05 sep 2026', description: 'Cobertura mínima del 80% con Jest.' },
    { task: 'Documentación técnica', due: '10 sep 2026', description: 'Swagger o Postman collection.' },
  ],
  'Bases de Datos': [
    { task: 'Modelo E-R normalizado', due: '20 ago 2026', description: 'Diagrama entidad-relación en 3ra forma normal.' },
    { task: 'Scripts SQL', due: '28 ago 2026', description: 'DDL y DML para el esquema de base de datos.' },
  ],
  'Cálculo Diferencial': [
    { task: 'Tarea 3: Derivadas', due: '17 ago 2026', description: 'Ejercicios del capítulo 3, páginas 88-92.' },
    { task: 'Examen parcial 1', due: '24 ago 2026', description: 'Temas: límites, continuidad y derivadas básicas.' },
    { task: 'Proyecto integrador', due: '15 sep 2026', description: 'Aplicación de derivadas a un problema real.' },
    { task: 'Tarea 6: Regla de la cadena', due: '02 sep 2026', description: 'Ejercicios del capítulo 5, páginas 120-125.' },
  ],
}

const defaultAssignments = [
  { task: 'Tarea pendiente', due: '25 ago 2026', description: 'Entrega tu archivo en el formato solicitado.' },
]

export default function InboxScreen({ subject }: Props) {
  const [selectedTask, setSelectedTask] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const subjectName = subject ?? 'Diseño de Interfaces'
  const tasks = assignments[subjectName] ?? defaultAssignments
  const currentTask = tasks[selectedTask]

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setUploadedFile(file.name)
      setSubmitted(false)
    }
  }
  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0]
    if (file) {
      setUploadedFile(file.name)
      setSubmitted(false)
    }
  }

  const handleSubmit = () => {
    if (!uploadedFile) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1800)
  }

  const resetTask = () => {
    setUploadedFile(null)
    setSubmitted(false)
  }

  const selectTask = (i: number) => {
    setSelectedTask(i)
    resetTask()
  }

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
          BUZÓN DE ENTREGAS
        </p>
        <h2
          style={{
            fontFamily: 'Outfit',
            fontSize: 22,
            fontWeight: 700,
            color: '#e2e8f8',
            margin: 0,
            letterSpacing: '-0.3px',
          }}
        >
          {subjectName}
        </h2>
      </div>

      {/* Task selector */}
      <div style={{ padding: '0 24px 16px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, width: 'max-content' }}>
          {tasks.map((t, i) => (
            <button
              key={i}
              onClick={() => selectTask(i)}
              style={{
                backgroundColor: i === selectedTask ? '#4a7cfc' : '#1a1e35',
                border: `1px solid ${i === selectedTask ? '#4a7cfc' : '#252a45'}`,
                borderRadius: 20,
                padding: '6px 14px',
                cursor: 'pointer',
                fontFamily: 'Inter',
                fontSize: 12,
                fontWeight: i === selectedTask ? 600 : 400,
                color: i === selectedTask ? '#fff' : '#8892b0',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              Tarea {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Task Info Card */}
        <div
          style={{
            backgroundColor: '#131629',
            borderRadius: 20,
            padding: '18px',
            border: '1px solid #1e2440',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h3
                style={{
                  fontFamily: 'Outfit',
                  fontSize: 17,
                  fontWeight: 700,
                  color: '#e2e8f8',
                  margin: '0 0 6px',
                  lineHeight: 1.3,
                }}
              >
                {currentTask.task}
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#8892b0', margin: 0, lineHeight: 1.5 }}>
                {currentTask.description}
              </p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 14,
              padding: '8px 12px',
              backgroundColor: '#1e2d5a',
              borderRadius: 10,
              border: '1px solid #253570',
              width: 'fit-content',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#4a7cfc" strokeWidth="2" />
              <path d="M3 9h18M8 2v4M16 2v4" stroke="#4a7cfc" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span style={{ fontFamily: 'Outfit', fontSize: 13, fontWeight: 600, color: '#6b9bff' }}>
              Entrega: {currentTask.due}
            </span>
          </div>
        </div>

        {/* Drop Zone */}
        {!submitted ? (
          <>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                backgroundColor: isDragging ? '#1e2d5a' : uploadedFile ? '#0d2235' : '#131629',
                border: `2px dashed ${isDragging ? '#4a7cfc' : uploadedFile ? '#34d399' : '#252a45'}`,
                borderRadius: 20,
                padding: '30px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {uploadedFile ? (
                <>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      backgroundColor: '#06311e',
                      border: '2px solid #34d399',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="14,2 14,8 20,8" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontFamily: 'Outfit', fontSize: 14, fontWeight: 600, color: '#34d399', margin: 0 }}>
                      {uploadedFile}
                    </p>
                    <p style={{ fontFamily: 'Inter', fontSize: 11, color: '#8892b0', margin: '4px 0 0' }}>
                      Toca para cambiar el archivo
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: '#1e2d5a',
                      border: `2px solid ${isDragging ? '#4a7cfc' : '#253570'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    {/* Envelope icon */}
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="5" width="20" height="14" rx="2" stroke="#4a7cfc" strokeWidth="1.8" />
                      <path d="M2 7l10 7 10-7" stroke="#4a7cfc" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M12 3v6" stroke="#6b9bff" strokeWidth="1.8" strokeLinecap="round" />
                      <path d="M10 5l2-2 2 2" stroke="#6b9bff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p
                      style={{
                        fontFamily: 'Outfit',
                        fontSize: 15,
                        fontWeight: 600,
                        color: isDragging ? '#6b9bff' : '#e2e8f8',
                        margin: 0,
                      }}
                    >
                      Arrastra tu archivo aquí
                    </p>
                    <p style={{ fontFamily: 'Inter', fontSize: 12, color: '#8892b0', margin: '4px 0 0' }}>
                      o toca para seleccionar
                    </p>
                    <p style={{ fontFamily: 'Inter', fontSize: 11, color: '#4a5470', margin: '8px 0 0' }}>
                      PDF, DOCX, ZIP · máx. 50 MB
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!uploadedFile || loading}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: 16,
                border: 'none',
                background:
                  uploadedFile && !loading
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : '#1a1e35',
                color: uploadedFile ? '#fff' : '#4a5470',
                fontFamily: 'Outfit',
                fontSize: 16,
                fontWeight: 700,
                cursor: uploadedFile && !loading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s ease',
                boxShadow: uploadedFile && !loading ? '0 4px 20px rgba(34,197,94,0.3)' : 'none',
              }}
            >
              {loading ? (
                <>
                  <LoadingSpinner />
                  Enviando...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Depositar en el buzón
                </>
              )}
            </button>
          </>
        ) : (
          /* Confirmation state */
          <div
            style={{
              backgroundColor: '#071c10',
              border: '2px solid #22c55e',
              borderRadius: 24,
              padding: '36px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: '#14532d',
                border: '3px solid #22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(34,197,94,0.3)',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L19 7"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'Outfit',
                  fontSize: 22,
                  fontWeight: 800,
                  color: '#22c55e',
                  margin: 0,
                }}
              >
                Entregado ✓
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: 13, color: '#86efac', margin: '6px 0 0', lineHeight: 1.5 }}>
                Tu tarea fue depositada exitosamente
                <br />
                en el buzón del profesor.
              </p>
            </div>
            <div
              style={{
                backgroundColor: '#0f2d1a',
                borderRadius: 12,
                padding: '10px 16px',
                width: '100%',
                border: '1px solid #166534',
              }}
            >
              <p style={{ fontFamily: 'Inter', fontSize: 11, color: '#86efac', margin: 0, textAlign: 'center' }}>
                📄 {uploadedFile}
              </p>
            </div>
            <button
              onClick={resetTask}
              style={{
                marginTop: 4,
                background: 'none',
                border: '1px solid #253570',
                borderRadius: 12,
                padding: '8px 20px',
                color: '#8892b0',
                fontFamily: 'Inter',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              Enviar otro archivo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
