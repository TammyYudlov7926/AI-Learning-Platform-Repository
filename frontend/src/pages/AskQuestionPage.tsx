import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCategories, fetchSubCategories } from '../features/categories/categoriesSlice';
import { createPrompt, clearCurrentResponse } from '../features/prompt/promptSlice';
import '../styles/AskQuestionPage.css';

const AskQuestionPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { phone } = useAppSelector((state) => state.user);
  const { categories, subCategories, loading: categoriesLoading } = useAppSelector((state) => state.categories);
  const { loading: promptLoading, currentResponse } = useAppSelector((state) => state.prompts);
  
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);
  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubCategories());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentResponse());
    };
  }, [dispatch]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedSubCategory || !prompt) return;

    dispatch(createPrompt({ categoryId: selectedCategory, subCategoryId: selectedSubCategory, prompt }));
    setPrompt('');
    setSelectedCategory(null);
    setSelectedSubCategory(null);
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

            <button type="submit" disabled={promptLoading || categoriesLoading}>
              {promptLoading ? 'Thinking...' : 'Ask'}
            </button>
          </form>
        </div>

        {currentResponse && (
          <div className="ai-response">
            <h3>AI Answer:</h3>
            <p>{currentResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskQuestionPage;