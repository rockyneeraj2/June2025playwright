// Minimal MCP server example
const { createServer } = require('@microsoft/model-context-protocol');

const server = createServer({
  port: 3000,
  onRequest: (req, res) => {
    res.end('MCP server running with Playwright integration!');
  }
});

server.listen(() => {
  console.log('MCP server listening on port 3000');
});
