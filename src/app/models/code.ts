export class Code {
  id: string; // contextId
  ctxId: string;
  writer: string; // userId -- how to get it??
  interval: number;
  name: string; // code name
  content: string; // code content
  date: string; // (new Date().toJSON())
}
