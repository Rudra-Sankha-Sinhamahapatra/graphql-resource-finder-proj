import type { Request, Response } from 'express';

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface Context {
  token?: string | null;
  user?: User | null;
  req: Request;
  res: Response;
}