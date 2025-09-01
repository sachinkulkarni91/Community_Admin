// src/pages/JoinCommunity.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import displayError from '../utils/error-toaster';

axios.defaults.withCredentials = true; // ensure cookies are sent

export default function JoinCommunity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isJoining, setIsJoining] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || id === 'undefined') { 
      setError('Invalid community ID');
      setIsJoining(false);
      return; 
    }

    let cancelled = false;
    (async () => {
      try {
        setIsJoining(true);
        await axios.put(`/api/communities/${encodeURIComponent(id)}/join`, {});
        if (!cancelled) {
          navigate(`/feed`, { replace: true });
        }
      } catch (err: unknown) {
        if (!cancelled) {
          console.error('Join community error:', err);
          displayError(err);
          setError('Failed to join community');
          setIsJoining(false);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [id, navigate]);

  if (error) {
    return (
      <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h1>Unable to Join Community</h1>
        <p>{error}</p>
        <button 
          onClick={() => navigate('/communities')} 
          style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Browse Communities
        </button>
      </div>
    );
  }

  if (isJoining) {
    return (
      <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <h1>Joining community…</h1>
        <p>If this takes more than a moment, refresh the page.</p>
      </div>
    );
  }

  return null;
}
