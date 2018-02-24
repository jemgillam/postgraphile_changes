const results = require("./results.json");
const { table } = require("table");
const chalk = require("chalk");

const data = [
  [
    "Query",
    "program",
    "concurrency",
    "requests sent",
    "requests complete",
    "requests/second avg",
    "latency min",
    "latency p50",
    "latency p90",
    "latency p99",
    "max RSS"
  ].map(str => chalk.bold(str))
];

for (const result of results) {
  const [bin, query, concurrency] = result.title.split(/ \/ (?:concurrency=)?/);
  data.push(
    [
      query,
      (bin === "postgraphile" ? chalk.green : chalk.red)(bin),
      concurrency,
      result.requests.sent,
      result.requests.total,
      result.requests.average,
      result.latency.average,
      result.latency.p50,
      result.latency.p90,
      result.latency.p99,
      Math.max(...result.memorySamples.map(([ts, rss]) => rss))
    ].map(String)
  );
}

console.log(table(data));
