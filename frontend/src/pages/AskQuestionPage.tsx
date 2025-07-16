import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
  getCategories,
  getSubCategories,
  createPrompt,
} from '../api/authService';
import '../styles/AskQuestionPage.css';

const AskQuestionPage: React.FC = () => {
  const { phone } = useSelector((state: RootState) => state.user);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const cats = await getCategories();
      setCategories(cats);
      const subs = await getSubCategories();
      setSubCategories(subs);
    };
    fetchData();
  }, []);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory || !prompt) return;

    setLoading(true);
    const res = await createPrompt(selectedCategory, selectedSubCategory, prompt);
    setResponse(res.response);
    setLoading(false);
  };

  return (
    <div className="ask-wrapper">
      <div className="ask-container">
        <div className="ask-form">
          <h2>Ask the AI</h2>
          <p>👤 {phone}</p>

          <form onSubmit={handleAsk}>
            <select
              value={selectedCategory ?? ''}
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <select
              value={selectedSubCategory ?? ''}
              onChange={(e) => setSelectedSubCategory(Number(e.target.value))}
              required
            >
              <option value="">Select SubCategory</option>
              {subCategories
                .filter((sub) => sub.categoryId === selectedCategory)
                .map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
            </select>

            <textarea
              placeholder="Write your question..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </form>
        </div>

        {response && (
          <div className="ai-response">
            <h3>AI Answer:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskQuestionPage;
