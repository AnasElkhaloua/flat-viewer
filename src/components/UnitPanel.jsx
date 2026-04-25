export default function UnitPanel({ unit, onClose }) {
  if (!unit) return null

  const statusColors = {
    available: '#4caf50',
    reserved: '#ff9800',
    sold: '#f44336',
  }

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      right: '24px',
      transform: 'translateY(-50%)',
      width: '280px',
      background: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      zIndex: 10,
    }}>
      {/* close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'none',
          border: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          color: '#666',
          lineHeight: 1,
        }}
      >
        ✕
      </button>

      {/* unit name */}
      <h2 style={{ margin: '0 0 12px 0', fontSize: '20px', color: '#1a1a1a' }}>
        {unit.name}
      </h2>

      {/* status badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: statusColors[unit.status],
        }} />
        <span style={{
          fontSize: '13px',
          color: statusColors[unit.status],
          fontWeight: '600',
          textTransform: 'capitalize',
        }}>
          {unit.status}
        </span>
      </div>

      {/* details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#888', fontSize: '14px' }}>Price</span>
          <span style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: '600' }}>{unit.price}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#888', fontSize: '14px' }}>Area</span>
          <span style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: '600' }}>{unit.area}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#888', fontSize: '14px' }}>Rooms</span>
          <span style={{ color: '#1a1a1a', fontSize: '14px', fontWeight: '600' }}>{unit.rooms}</span>
        </div>
      </div>

      {/* CTA button */}
      {unit.status === 'available' && (
        <button style={{
          marginTop: '20px',
          width: '100%',
          padding: '12px',
          background: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
        }}>
          Request Info
        </button>
      )}
    </div>
  )
}