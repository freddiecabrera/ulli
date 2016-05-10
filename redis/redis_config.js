// 'use strict';
//
// const redis = require('redis'),
// url = require('url');
//
// exports.createClient = function (port_arg, host_arg, options) {
//     let client;
//     if (process.env.REDISTOGO_URL) {
//         const redisURL = url.parse(process.env.REDISTOGO_URL);
//         client = redis.createClient(redisURL.port, redisURL.hostname, options);
//         client.auth(redisURL.auth.split(":")[1]);
//     } else {
//         client = redis.createClient(port_arg, host_arg, options);
//     }
//
//     return client;
// };
//
// exports.redis = redis;
