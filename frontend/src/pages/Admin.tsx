import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  phone: string;
  role: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [prompts, setPrompts] = useState<any[]>([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to fetch users');
      }
    };

    fetchUsers();
  }, [token]);

  const fetchPrompts = async (userId: number) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/admin/users/${userId}/prompts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedUserId(userId);
      setPrompts(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch prompts');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.phone}) - {user.role}
            <button
              onClick={() => fetchPrompts(user.id)}
              style={{ marginLeft: '1rem' }}
            >
              View Prompts
            </button>
          </li>
        ))}
      </ul>

      {selectedUserId && (
        <>
          <h3>Prompt History (User ID: {selectedUserId})</h3>
          <ul>
            {prompts.map((prompt) => (
              <li key={prompt.id}>
                <strong>Q:</strong> {prompt.prompt} <br />
                <strong>A:</strong> {prompt.response}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Admin;
