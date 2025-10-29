import express from 'express';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

const router = express.Router();

router.get('/', async (req, res) => {
  const target = req.query.url;
  if (!target) return res.send('Missing URL');

  try {
    const response = await fetch(target, {
      headers: {
        'User-Agent': req.headers['user-agent'],
        'Referer': req.headers['referer']
      }
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.startsWith('javascript')) {
        const full = new URL(href, target).href;
        $(el).attr('href', `/proxy?url=${encodeURIComponent(full)}`);
      }
    });

    res.send($.html());
  } catch (err) {
    res.send(`Error fetching ${target}: ${err.message}`);
  }
});

export default router;
