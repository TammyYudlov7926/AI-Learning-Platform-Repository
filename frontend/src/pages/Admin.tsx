import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Admin.css';

interface User {
  id: number;
  name: string;
  phone: string;
  role: string;
  createdAt: string;
}

interface Prompt {
  id: number;
  prompt: string;
  response: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [promptsMap, setPromptsMap] = useState<{ [userId: number]: Prompt[] }>({});
  const [openPromptIds, setOpenPromptIds] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchUsers = React.useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/admin/users', {
        params: { search, page, limit: 5 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch users');
    }
  }, [search, page, token]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const togglePrompts = async (userId: number) => {
    const newOpen = new Set(openPromptIds);
    if (newOpen.has(userId)) {
      newOpen.delete(userId);
    } else {
      newOpen.add(userId);
      if (!promptsMap[userId]) {
        try {
          const res = await axios.get(`http://localhost:8000/api/admin/users/${userId}/prompts`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setPromptsMap((prev) => ({ ...prev, [userId]: res.data }));
        } catch (err: any) {
          setError(err.response?.data?.error || 'Failed to fetch prompts');
        }
      }
    }
    setOpenPromptIds(newOpen);
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.id !== userId));
      const copy = { ...promptsMap };
      delete copy[userId];
      setPromptsMap(copy);
      const openCopy = new Set(openPromptIds);
      openCopy.delete(userId);
      setOpenPromptIds(openCopy);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete user');
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <button className="admin-profile-btn" onClick={() => navigate('/admin/profile')}>
        admin-profile
      </button>

      {error && <p className="error-message">{error}</p>}

      <input
        type="text"
        placeholder="🔍 חפש לפי שם..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <section className="users-management">
        <h2>Users Management</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <React.Fragment key={user.id}>
                <tr>
                  <td>
                    <div className="user-info">
                      <strong>{user.name}</strong>
                      <span className="user-phone">{user.phone}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <button
                      title={openPromptIds.has(user.id) ? 'Hide Prompt History' : 'View Prompt History'}
                      className="action-btn view"
                      onClick={() => togglePrompts(user.id)}
                    >
                      {openPromptIds.has(user.id) ? 'Hide' : 'View'}
                    </button>
                    <button
                      title="Delete User"
                      className="action-btn delete"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
                {openPromptIds.has(user.id) && (
                  <tr>
                    <td colSpan={4}>
                      <div className="prompts-section">
                        <h4>Prompt History</h4>
                        <ul className="prompts-list">
                          {(promptsMap[user.id] || []).map((prompt) => (
                            <li key={prompt.id} className="prompt-item">
                              <strong>Q:</strong> {prompt.prompt} <br />
                              <strong>A:</strong> {prompt.response}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="pagination-controls">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          ← Previous
</button>
<span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            next →
          </button>
        </div>
      </section>
    </div>
  );
};

export default Admin;