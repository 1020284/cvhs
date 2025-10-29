export default function spoofHeaders(req, res, next) {
  req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';
  req.headers['referer'] = req.query.url || '';
  req.headers['sec-ch-ua'] = '"Chromium";v="114", "Google Chrome";v="114"';
  next();
}
