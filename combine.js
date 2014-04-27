'use strict';

var _ = require('underscore');
var fs = require('fs');

var arsenalPosts = require('./arsenalPosts.json');
var tottenhamPosts = require('./tottenhamPosts.json');

var extendedArsenalPosts = _.map(arsenalPosts, _.partial(extendPostInfo, false));
var extendedTottenhamPosts = _.map(tottenhamPosts, _.partial(extendPostInfo, true));

function extendPostInfo(isHomeTeam, postInfo) {
  return _.extend(postInfo, { homeTeam: isHomeTeam });
}

var allPosts = extendedArsenalPosts.concat(extendedTottenhamPosts);
var allPostsSorted = _.sortBy(allPosts, function(postInfo) { return postInfo.timestamp; });

var allPostsFileName = './posts.json';
var allPostsFile = fs.createWriteStream(allPostsFileName, { flags: 'w', encoding: 'utf-8' });
allPostsFile.write(JSON.stringify(allPostsSorted, null, 4));
allPostsFile.end();

console.log('Wrote ' + allPostsSorted.length + ' posts (' + arsenalPosts.length + ' + ' +
            tottenhamPosts.length + ') to file ' + allPostsFileName + '.');
