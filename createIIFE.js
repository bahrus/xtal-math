const jiife = require('jiife');
const xs = 'node_modules/xtal-shell/';
const xl = 'node_modules/xtal-latx/';
const xd = 'node_modules/xtal-decorator/';
const pd = 'node_modules/p-d.p-u/';
const def = xl + 'define.js';
jiife.processFiles([def, xl + 'xtal-latx.js', xd + 'xtal-deco.js', pd + 'p.js', pd + 'p-u.js'], 'dist/gian-pen-dep.iife.js');




