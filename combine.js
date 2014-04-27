'use strict';

var _ = require('underscore');
var fs = require('fs');

var arsenalPosts = require('./arsenalPosts.json');
var tottenhamPosts = require('./tottenhamPosts.json');

var allPosts = arsenalPosts.concat(tottenhamPosts);
var allPostsSorted = _.sortBy(allPosts, function(postInfo) { return postInfo.timestamp; });

var allPostsFileName = './posts.json';
var allPostsFile = fs.createWriteStream(allPostsFileName, { flags: 'w', encoding: 'utf-8' });
allPostsFile.write(JSON.stringify(allPostsSorted, null, 4));
allPostsFile.end();

console.log('Wrote ' + allPostsSorted.length + ' posts (' + arsenalPosts.length + ' + ' +
            tottenhamPosts.length + ') to file ' + allPostsFileName + '.');
