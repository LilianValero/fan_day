fan_day
=======

# Tapatalk XML-RPC testing tool

## Setup

Install Node.js with an [installer](http://nodejs.org/download), or if you have [Homebrew](http://brew.sh/):

```
brew install node
```

Then install Node packages by executing in the project root:

```
npm install
```

## Fetch forum posts

To retrieve forum posts, run `main.js` with:

```
node main tottenham|arsenal
```

This will store fetched post information to a `<team name>Posts.json` file.


## Combine two teams' posts into one file

To combine `arsenalPosts.json` and `tottenhamPosts.json` ordered by timestamp into a single `posts.json` file, run
`combine.js` with:

```
node combine
```
