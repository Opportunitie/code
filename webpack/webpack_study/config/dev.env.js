'use strict'
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CONFIG_ENV: JSON.stringify(process.env.CONFIG_ENV),
})
