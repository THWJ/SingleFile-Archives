const fs = require('fs');
const path = require('path');

function generateIndexHtml() {
    const currentDir = process.cwd();
    const files = fs.readdirSync(currentDir);
    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');
    
    const links = [];
    const seen = new Set();
    
    htmlFiles.forEach(file => {
        const fileNameWithoutExt = path.basename(file, '.html');
        if (!seen.has(fileNameWithoutExt)) {
            seen.add(fileNameWithoutExt);
            links.push(`<li><a href="${file}">${fileNameWithoutExt}</a></li>`);
        }
    });
    
    const indexContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML文件索引</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1 { color: #333; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 5px 0; }
        a { color: #0066cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>当前目录下的HTML文件</h1>
    <ul>
        ${links.join('\n        ')}
    </ul>
</body>
</html>`;
    
    fs.writeFileSync(path.join(currentDir, 'index.html'), indexContent);
    console.log('index.html 文件已生成！');
}

generateIndexHtml();
