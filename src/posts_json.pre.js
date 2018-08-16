const request = require('request-promise');
const { pipe } = require('@adobe/hypermedia-pipeline/src/defaults/json.pipe.js');

const KEYS_TO_REMOVE = ['position'];

function removePosition(node) {
  if (node && typeof node === 'object') {
    const keys = Object.keys(node);
    keys.forEach((k) => {
      if (KEYS_TO_REMOVE.indexOf(k) !== -1) {
        delete node[k];
      } else {
        removePosition(node[k]);
      }
    });
  }
}

function cleanUpPayload(payload) {
  const p = payload;
  delete p.resource.body;
  delete p.resource.html;

  removePosition(p.resource.mdast);
  removePosition(p.resource.htast);

  return p;
}

async function fetchPosts(apiRoot, owner, repo, logger) {
  logger.debug('posts_json-pre.js - Collecting posts');

  if (!apiRoot) {
    logger.debug('posts_json-pre.js - No REPO_API_ROOT provided');
    return [];
  }

  const options = {
    uri: `${apiRoot}` +
      'repos/' +
      `${owner}` +
      '/' +
      `${repo}` +
      '/contents/posts',
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  };

  logger.debug(`posts_json.js - Fetching... ${options.uri}`);
  return request(options);
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

async function feedThePosts(posts, baseURI, logger) {
  logger.debug('posts_json-pre.js - Feeding the posts');

  const ret = [];
  await asyncForEach(posts, async function (p, i) {
    // for each post, retrieve its json rendering and add it to the resulting post object
    const options = {
      uri: `${baseURI}/${p.path.replace('.md', '.json')}`,
      headers: {
        'User-Agent': 'Request-Promise',
      },
      json: true,
    };

    const res = await request(options);
    ret.push(res);
  });
  return ret;
}

// module.exports.pre is a function (taking next as an argument)
// that returns a function (with payload, secrets, logger as arguments)
// that calls next (after modifying the payload a bit)
async function pre(payload, config) {
  const { logger } = config;

  const p = cleanUpPayload(payload);

  const posts = await fetchPosts(config.REPO_API_ROOT, p.owner, p.repo, logger);
  p.resource.posts = await feedThePosts(posts, 'http://localhost:3000', logger);

  let jsonStr = JSON.stringify(p);
  p.json = jsonStr;

  return p;
}

module.exports.pre = pre;
