const fs = require('fs');
const path = require('path');

// 递归目录查找模块
function modules() {
  let result = [];
  let base = path.join(__dirname, './src/views');
  fs.readdirSync(base).forEach(function(file) {
    file = path.resolve(base, file);
    let stat = fs.statSync(file);
    if (stat && stat.isDirectory() && fs.existsSync(path.join(file, 'index.js'))) {
      result.push(path.basename(file));
    }
  });
  return result;
}

// 模块列表
const list = modules();

// 代码模板
let code = list.reduce((str, name) => {
  str += `import { ${name}Route } from './views/${name}';\n`;
  str += `import { ${name}Store } from './views/${name}';\n`;
  return str;
}, '');

// 整合路由
code += `
const routes = [${list.map(name => `...${name}Route`).join(', ')}];
`;

// 组织Vuex
code += `
const modules = { ${list.map(name => `${name}: ${name}Store`).join(', ')} };
`;

// 导出内容
code += `
export { routes, modules };
`;

fs.writeFileSync('./src/schema.js', code, 'utf8');
