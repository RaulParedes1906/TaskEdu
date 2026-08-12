import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import CalendarScreen from './screens/CalendarScreen'
import InboxScreen from './screens/InboxScreen'
import NotificationsScreen from './screens/NotificationsScreen'
import ProfileScreen from './screens/ProfileScreen'

type Tab = 'home' | 'calendar' | 'inbox' | 'notifications' | 'profile'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [inboxSubject, setInboxSubject] = useState<string | null>(null)

  const openInbox = (subject: string) => {
    setInboxSubject(subject)
    setActiveTab('inbox')
  }

  const screens: Record<Tab, React.ReactNode> = {
    home: <HomeScreen onOpenInbox={openInbox} />,
    calendar: <CalendarScreen />,
    inbox: <InboxScreen subject={inboxSubject} />,
    notifications: <NotificationsScreen />,
    profile: <ProfileScreen />,
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#06070f',
        padding: '0',
      }}
    >
      <div
        style={{
          width: '390px',
          height: '844px',
          backgroundColor: '#0c0e1a',
          borderRadius: '44px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 0 0 1px #1a1e35, 0 40px 80px rgba(0,0,0,0.8)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Status Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 28px 0',
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: 15, color: '#e2e8f8' }}>
            9:41
          </span>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <StatusSignal />
            <StatusWifi />
            <StatusBattery />
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {screens[activeTab]}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}

function StatusSignal() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
      <rect x="0" y="7" width="3" height="5" rx="1" fill="#e2e8f8" />
      <rect x="4.5" y="4.5" width="3" height="7.5" rx="1" fill="#e2e8f8" />
      <rect x="9" y="2" width="3" height="10" rx="1" fill="#e2e8f8" />
      <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#e2e8f8" />
    </svg>
  )
}

function StatusWifi() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <path d="M8 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="#e2e8f8" />
      <path d="M3.5 6.5a6.4 6.4 0 0 1 9 0" stroke="#e2e8f8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 4a9.8 9.8 0 0 1 14 0" stroke="#e2e8f8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function StatusBattery() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#e2e8f8" strokeOpacity="0.5" />
      <rect x="2" y="2" width="15" height="8" rx="2" fill="#e2e8f8" />
      <path d="M23 4v4a2 2 0 0 0 0-4z" fill="#e2e8f8" fillOpacity="0.4" />
    </svg>
  )
}

interface BottomNavProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'home',
      label: 'Inicio',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M3 12L12 3l9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 10v10a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'calendar',
      label: 'Calendario',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="8" cy="14" r="1.5" fill="currentColor" />
          <circle cx="12" cy="14" r="1.5" fill="currentColor" />
          <circle cx="16" cy="14" r="1.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 'inbox',
      label: 'Materias',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 2h12a1 1 0 0 1 1 1v18l-7-3-7 3V3a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 7h6M9 11h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'notifications',
      label: 'Avisos',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'profile',
      label: 'Perfil',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ]

  return (
    <div
      style={{
        backgroundColor: '#131629',
        borderTop: '1px solid #1e2440',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '10px 0 20px',
        flexShrink: 0,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const isInbox = tab.id === 'inbox'
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 10px',
              position: 'relative',
            }}
          >
            {isInbox ? (
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '16px',
                  backgroundColor: isActive ? '#4a7cfc' : '#1e2d5a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -20,
                  boxShadow: isActive ? '0 4px 20px rgba(74,124,252,0.5)' : 'none',
                  transition: 'all 0.2s ease',
                  color: '#fff',
                }}
              >
                {tab.icon}
              </div>
            ) : (
              <>
                <div
                  style={{
                    color: isActive ? '#4a7cfc' : '#4a5470',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {tab.icon}
                </div>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontSize: 10,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#4a7cfc' : '#4a5470',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {tab.label}
                </span>
              </>
            )}
          </button>
        )
      })}
    </div>
  )
}
