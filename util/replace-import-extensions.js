const fs = require('fs');
const path = require('path');

function replaceImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Match ./ or ../ at the start of the import path
  content = content.replace(
    /((?:import|export)\s.*?from\s*['"])(\.{1,2}\/[^'"]+?)(['"])/g,
    (match, p1, p2, p3) => {
      if (p2.endsWith('.js') || p2.endsWith('.css') || p2.endsWith('.json')) return match;
      return `${p1}${p2}.js${p3}`;
    }
  );
  fs.writeFileSync(filePath, content, 'utf8');
}

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.js')) {
      replaceImports(fullPath);
    }
  });
}

walk(path.join(__dirname, '../dist'));
console.log('Import extensions replaced.');