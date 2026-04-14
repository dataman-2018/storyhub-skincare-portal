export default function handler(req, res) {
  const auth = req.headers.authorization;
  if (auth) {
    const [, encoded] = auth.split(' ');
    const decoded = Buffer.from(encoded, 'base64').toString();
    if (decoded === 'storyhub:ensemble') {
      res.setHeader('Set-Cookie', 'sh_auth=1; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax');
      const dest = req.query.from || '/';
      res.writeHead(302, { Location: dest });
      res.end();
      return;
    }
  }
  res.setHeader('WWW-Authenticate', 'Basic realm="StoryHub"');
  res.status(401).send('Unauthorized');
}
