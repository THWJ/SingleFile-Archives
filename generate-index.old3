const fs = require('fs');
const path = require('path');

function generateIndexHtml() {
    const currentDir = process.cwd();
    const files = fs.readdirSync(currentDir);
    
    // 获取HTML文件并附带文件状态信息
    const htmlFilesWithStats = files
        .filter(file => file.endsWith('.html') && file !== 'index.html')
        .map(file => {
            const filePath = path.join(currentDir, file);
            return {
                name: file,
                stat: fs.statSync(filePath),
                path: filePath
            };
        })
        // 按修改时间降序排序（最新的在前面）
        .sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs);
    
    const links = [];
    const seen = new Set();
    
    htmlFilesWithStats.forEach(fileObj => {
        const fileNameWithoutExt = path.basename(fileObj.name, '.html');
        if (!seen.has(fileNameWithoutExt)) {
            seen.add(fileNameWithoutExt);
            
            // 添加文件修改日期显示
            const modifiedDate = new Date(fileObj.stat.mtime);
            const formattedDate = modifiedDate.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            links.push(`
                <li class="file-item">
                    <a href="${fileObj.name}">${fileNameWithoutExt}</a>
                    <span class="file-date">${formattedDate}</span>
                </li>
            `);
        }
    });
    
    const indexContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jerome的随想</title>
    <style>
        :root {
            --primary-color: #2c3e50;
            --secondary-color: #34495e;
            --accent-color: #3498db;
            --text-color: #333;
            --light-bg: #f9f9f9;
            --border-color: #e0e0e0;
        }
        
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            color: var(--text-color);
            background-color: var(--light-bg);
        }
        
        .container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid var(--border-color);
        }
        
        h1 {
            color: var(--primary-color);
            font-weight: 300;
            font-size: 2.2em;
            margin: 0;
        }
        
        .subtitle {
            color: var(--secondary-color);
            font-weight: 300;
            margin-top: 10px;
        }
        
        .file-list {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        
        .file-item {
            padding: 12px 15px;
            margin: 8px 0;
            background-color: white;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            transition: all 0.2s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .file-item:hover {
            background-color: #f5f5f5;
            transform: translateX(5px);
            border-left: 3px solid var(--accent-color);
        }
        
        .file-item a {
            color: var(--primary-color);
            text-decoration: none;
            font-size: 1.1em;
            flex-grow: 1;
        }
        
        .file-item a:hover {
            color: var(--accent-color);
        }
        
        .file-date {
            color: var(--secondary-color);
            font-size: 0.85em;
            opacity: 0.8;
        }
        
        footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
            color: var(--secondary-color);
            font-size: 0.9em;
        }
        
        @media (max-width: 600px) {
            .container {
                margin: 20px;
                padding: 15px;
            }
            
            h1 {
                font-size: 1.8em;
            }
            
            .file-item {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .file-date {
                margin-top: 5px;
                font-size: 0.8em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Jerome的临时文章和收藏</h1>
            <p class="subtitle">Life is short, play more!</p>
        </header>
        
        <ul class="file-list">
            ${links.join('\n')}
        </ul>
        
        <footer>
            <p>© ${new Date().getFullYear()} Jerome. 所有文件均为个人收藏。</p>
        </footer>
    </div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(currentDir, 'index.html'), indexContent);
    console.log('index.html 文件已生成！');
}

generateIndexHtml();
