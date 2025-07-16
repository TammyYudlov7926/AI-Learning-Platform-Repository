// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../store';
// import { fetchCategories } from '../features/category/categorySlice';
// import { fetchSubCategories } from '../features/subcategory/subcategorySlice';
// import { sendPrompt } from '../features/prompt/promptSlice';
// import '../styles/askai.css';

// const AskAIPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const { categories } = useSelector((state: RootState) => state.category);
//   const { subCategories } = useSelector((state: RootState) => state.subcategory);
//   const { phone, token } = useSelector((state: RootState) => state.user);
//   const { response, loading } = useSelector((state: RootState) => state.prompt);

//   const [categoryId, setCategoryId] = useState<number | null>(null);
//   const [subCategoryId, setSubCategoryId] = useState<number | null>(null);
//   const [prompt, setPrompt] = useState('');

//   useEffect(() => {
//     dispatch(fetchCategories() as any);
//     dispatch(fetchSubCategories() as any);
//   }, [dispatch]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (categoryId && subCategoryId && prompt && token) {
//       dispatch(sendPrompt({ categoryId, subCategoryId, prompt, token }) as any);
//     }
//   };

//   return (
//     <div className="askai-container">
//       <h2>שאל את ה-AI</h2>
//       <form onSubmit={handleSubmit} className="askai-form">
//         <select value={categoryId ?? ''} onChange={(e) => setCategoryId(Number(e.target.value))} required>
//           <option value="">בחר קטגוריה</option>
//           {categories.map(cat => (
//             <option key={cat.id} value={cat.id}>{cat.name}</option>
//           ))}
//         </select>

//         <select value={subCategoryId ?? ''} onChange={(e) => setSubCategoryId(Number(e.target.value))} required>
//           <option value="">בחר תת קטגוריה</option>
//           {subCategories
//             .filter(sub => sub.categoryId === categoryId)
//             .map(sub => (
//               <option key={sub.id} value={sub.id}>{sub.name}</option>
//             ))}
//         </select>

//         <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="כתוב שאלה..." required />
//         <button type="submit">שלח</button>
//       </form>

//       {loading && <p>טוען תשובה...</p>}
//       {response && (
//         <div className="ai-response">
//           <h3>תשובת ה-AI:</h3>
//           <p>{response}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AskAIPage;
export {};