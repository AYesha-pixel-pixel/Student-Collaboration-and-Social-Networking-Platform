// client/src/components/FollowButton.jsx

const FollowButton = ({ isFollowing, isLoggedIn, followLoading, onToggle }) => {
  if (!isLoggedIn) return null

  const label = isFollowing ? 'Following' : 'Follow'

  return (
    <button
      onClick={onToggle}
      disabled={followLoading}
      style={{
        width: '100%',
        padding: '0.7rem',
        marginBottom: '0.5rem',
        border: isFollowing ? '2px solid #43a047' : 'none',
        borderRadius: '999px',
        cursor: followLoading ? 'not-allowed' : 'pointer',
        background: isFollowing ? '#e8f5e0' : '#1a4a1a',
        color: isFollowing ? '#1a4a1a' : '#fff',
        fontWeight: 800,
        fontFamily: "'Nunito', sans-serif",
        opacity: 1
      }}
    >
      {label}
    </button>
  )
}

export default FollowButton