import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [subCategories, setSubCategories] = useState<{id:number, name:string}[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('/api/categories', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setCategories(res.data))
      .catch(() => setError('Failed to load categories'));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios.get(`/api/subcategories?categoryId=${selectedCategory}`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then(res => setSubCategories(res.data))
        .catch(() => setError('Failed to load subcategories'));
    }
  }, [selectedCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResponse(null);
    if (!selectedCategory || !selectedSubCategory) {
      setError('Please select category and subcategory');
      return;
    }
    try {
      const res = await axios.post('/api/prompts', {
        categoryId: selectedCategory,
        subCategoryId: selectedSubCategory,
        prompt,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResponse(res.data.response);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create prompt');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleSubmit}>
        <select onChange={e => setSelectedCategory(Number(e.target.value))} defaultValue="">
          <option value="" disabled>בחר קטגוריה</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select onChange={e => setSelectedSubCategory(Number(e.target.value))} defaultValue="">
          <option value="" disabled>בחר תת קטגוריה</option>
          {subCategories.map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
        </select>

        <textarea
          placeholder="הקלד את ה-prompt כאן..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          required
        />

        <button type="submit">שלח prompt</button>
      </form>

      {error && <p style={{color:'red'}}>{error}</p>}
      {response && (
        <div>
          <h3>תשובת AI:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
