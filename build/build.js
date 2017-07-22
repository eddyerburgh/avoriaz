const rollup = require('rollup').rollup
const flow = require('rollup-plugin-flow-no-whitespace')
const resolve = require('path').resolve
const buble = require('rollup-plugin-buble')

rollup({
    entry: resolve('src/avoriaz.js'),
    dest: resolve('dist/avoriaz.js'),
    plugins: [
        flow(),
        buble({
            objectAssign: 'Object.assign'
        })
    ]
}).then(bundle => {
    bundle.write({
        dest: resolve('dist/avoriaz.js'),
        format: 'cjs'
    })
})
    .then(() => console.log('Build successful'))
    .catch(err => {
        console.error(err)
    })