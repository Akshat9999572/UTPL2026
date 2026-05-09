import fs from 'fs';
import path from 'path';

const indexPath = path.join(process.cwd(), 'dist', 'index.html');
const outputPath = path.join(process.cwd(), 'api', 'html-template.js');

if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');
  // Escape backticks and dollar signs for the template string
  const escapedHtml = html.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  const content = `export const htmlTemplate = \`${escapedHtml}\`;`;
  
  if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  }
  fs.writeFileSync(outputPath, content);
  console.log('Successfully generated api/html-template.js');
} else {
  console.error('dist/index.html not found. Make sure to run this after build.');
  process.exit(1);
}
