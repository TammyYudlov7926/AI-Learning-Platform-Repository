import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import subCategoryRoutes from './routes/subcategory.routes';  
import promptRoutes from './routes/prompt.routes';
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import { errorHandler } from './middleware/errorHandler';
import { setupSwagger } from './swagger';

import 'dotenv/config';
const app = express();

app.use(cors());
app.use(express.json());



setupSwagger(app);
app.get('/', (req, res) => {
  res.send('API is working!');
});
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);   
app.use('/api/prompts', promptRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);


export default app;


