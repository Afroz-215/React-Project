import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (!user || !user.token) {
        setError('User not authenticated');
        return;
      }

      try {
        const res = await api.get('/viewProfile', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setProfile(res.data?.data);
      } catch (err) {
        console.error(' Failed to fetch profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <div className="card p-4 shadow">
        <p><strong>Name:</strong> {profile?.name || 'N/A'}</p>
        <p><strong>Email:</strong> {profile?.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {profile?.phone || 'N/A'}</p>
      </div>
    </div>
  );
};

export default Profile;
