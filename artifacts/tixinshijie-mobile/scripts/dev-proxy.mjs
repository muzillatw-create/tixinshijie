import { createServer } from "http";
import { createConnection } from "net";
import { spawn } from "child_process";
import { request as httpRequest } from "http";

const PROXY_PORT = parseInt(process.env.PORT || "5000", 10);
const METRO_PORT = PROXY_PORT + 1;

function proxyHttp(req, res, retries) {
  if (retries === undefined) retries = 20;
  const options = {
    hostname: "127.0.0.1",
    port: METRO_PORT,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: `127.0.0.1:${METRO_PORT}` },
  };

  const proxy = httpRequest(options, (metroRes) => {
    res.writeHead(metroRes.statusCode, metroRes.headers);
    metroRes.pipe(res, { end: true });
  });

  proxy.on("error", () => {
    if (retries > 0) {
      setTimeout(() => proxyHttp(req, res, retries - 1), 500);
    } else {
      if (!res.headersSent) res.writeHead(502);
      res.end("Metro starting, please refresh in a moment.");
    }
  });

  req.pipe(proxy, { end: true });
}

const server = createServer((req, res) => {
  proxyHttp(req, res);
});

server.on("upgrade", (req, socket, head) => {
  const upstream = createConnection({ host: "127.0.0.1", port: METRO_PORT }, () => {
    const rawHeaders = req.rawHeaders;
    let headerStr = `${req.method} ${req.url} HTTP/1.1\r\n`;
    for (let i = 0; i < rawHeaders.length; i += 2) {
      const key = rawHeaders[i];
      const val = rawHeaders[i + 1];
      if (key.toLowerCase() === "host") {
        headerStr += `host: 127.0.0.1:${METRO_PORT}\r\n`;
      } else {
        headerStr += `${key}: ${val}\r\n`;
      }
    }
    headerStr += "\r\n";
    upstream.write(headerStr);
    if (head && head.length) upstream.write(head);
    upstream.pipe(socket);
    socket.pipe(upstream);
  });
  upstream.on("error", () => socket.destroy());
  socket.on("error", () => upstream.destroy());
});

server.listen(PROXY_PORT, "0.0.0.0", () => {
  console.log(`[proxy] Port ${PROXY_PORT} open → forwarding to Metro on ${METRO_PORT}`);

  const metro = spawn(
    "pnpm",
    ["exec", "expo", "start", "--port", String(METRO_PORT)],
    {
      cwd: process.cwd(),
      env: { ...process.env, PORT: String(METRO_PORT) },
      stdio: "inherit",
    }
  );

  metro.on("exit", (code) => {
    console.log(`[proxy] Metro exited (code=${code}), shutting down proxy`);
    process.exit(code ?? 1);
  });
});
