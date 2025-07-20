import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchUserPrompts } from '../features/prompt/promptSlice';
import '../styles/HistoryPage.css';

const HistoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userPhone = useAppSelector((state) => state.user.phone);
  const { prompts, loading, error } = useAppSelector((state) => state.prompts);

  useEffect(() => {
    if (userPhone) {
      dispatch(fetchUserPrompts(userPhone));
    }
  }, [dispatch, userPhone]);

  return (
    <div className="history-container">
      <h2>Learning History</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul className="prompt-list">
        {prompts && prompts.length > 0 ? (
          prompts.map((item) => (
            <li key={item.id} className="prompt-card">
              <div className="meta">
                <span>{new Date(item.createdAt).toLocaleString()}</span>
                <span>{item.category?.name} &gt; {item.subCategory?.name}</span>
              </div>
              <p className="question">❓ {item.prompt}</p>
              <p className="answer">💡 {item.response}</p>
            </li>
          ))
        ) : (
          !loading && <p>No history found.</p>
        )}
      </ul>
    </div>
  );
};

export default HistoryPage;
