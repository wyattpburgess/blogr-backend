export interface ResponseError extends Error {
  statusCode?: number;
  data?: any;
}
