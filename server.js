import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import proxyRouter from './routes/proxy.js';
import spoofHeaders from './middleware/spoof.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(spoofHeaders);
app.use('/proxy', proxyRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.listen(PORT, () => {
  console.log(`Proxy running at http://localhost:${PORT}`);
});
