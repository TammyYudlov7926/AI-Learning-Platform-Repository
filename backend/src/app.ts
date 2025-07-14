import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import subCategoryRoutes from './routes/subcategory.routes';  
import promptRoutes from './routes/prompt.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);   
app.use('/api/prompts', promptRoutes);

export default app;

