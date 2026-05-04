import {
  Registry,
  Counter,
  Histogram,
  Gauge,
  collectDefaultMetrics,
} from "prom-client";

const register = new Registry();

export const requestsTotal = new Counter({
  name: "lektio_requests_total",
  help: "Total number of requests",
  labelNames: ["method", "route", "status"],
  registers: [register],
});

export const jobsTotal = new Counter({
  name: "lektio_jobs_total",
  help: "Total number of jobs",
  labelNames: ["status"],
  registers: [register],
});

export const errorsTotal = new Counter({
  name: "lektio_errors_total",
  help: "Total number of errors",
  labelNames: ["type"],
  registers: [register],
});

export const llmLatency = new Histogram({
  name: "lektio_llm_latency",
  help: "LLM latency in seconds",
  labelNames: ["status"],
  buckets: [0.5, 1, 2, 5, 10, 30, 60],
  registers: [register],
});

export const requestsDuration = new Histogram({
  name: "lektio_requests_duration",
  help: "Request duration in seconds",
  labelNames: ["method", "route", "status"],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5, 10, 30, 60],
  registers: [register],
});

export const queueSize = new Gauge({
  name: "lektio_queue_size",
  help: "Queue size",
  registers: [register],
});

collectDefaultMetrics({ register });
export default register;
