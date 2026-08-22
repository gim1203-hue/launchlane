import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("LaunchLane ships the complete planner experience", async () => {
  const [component, page, layout] = await Promise.all([
    source("app/LaunchLane.tsx"),
    source("app/page.tsx"),
    source("app/layout.tsx"),
  ]);

  assert.match(page, /<LaunchLane\s*\/>/);
  assert.match(layout, /LaunchLane/);
  assert.match(component, /localStorage\.setItem/);
  assert.match(component, /localStorage\.getItem/);
  assert.match(component, /Reset progress/);
  assert.match(component, /Next step/);
  assert.match(component, /Mark complete/);
  assert.match(component, /type="range"/);
  assert.match(component, /aria-label=/);
});

test("LaunchLane has responsive and accessible presentation rules", async () => {
  const css = await source("app/globals.css");

  assert.match(css, /@media\s*\(max-width:\s*600px\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /grid-template-columns/);
});

test("the production server renders LaunchLane", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>LaunchLane/);
  assert.match(html, /Turn your next idea into a launch you can finish/);
  assert.match(html, /Four-week roadmap/);
  assert.doesNotMatch(html, /Starter Project|Building your site/);
});
