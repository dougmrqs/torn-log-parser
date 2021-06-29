const fs = require('fs')
const JSSoup = require('jssoup').default;

const file = fs.readFileSync('vault.html', 'utf-8');

const soup = new JSSoup(file)

let content = soup.find('ul', 'vault-trans-list').findAll('ul', 'transaction')

content = content.map(c => c.findAll('li').map(d => d.getText().replace(/\s|\\n|'|\$|,/g, '')))
content = content.map(c => [c[0], parseInt(c[3])])

content.shift()

console.log(content)

let sum = content.reduce((acc, c) => c[1] += acc, 0)

console.log('==> $', sum.toLocaleString())