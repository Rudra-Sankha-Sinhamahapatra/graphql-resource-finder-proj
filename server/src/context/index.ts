import type { Request, Response } from 'express';
import { GraphQLError } from 'graphql';
import { logger } from '../utils/logger';
import { token as tokenUtils } from '../utils';
import type { Context, User } from '../types/context';
import UserModel from '../db/models/userModel';

interface ContextProps {
    req: Request;
    res: Response;
  }
  export const createContext = async ({ 
    req, 
    res 
  }: ContextProps): Promise<Context> => {
    let token: string | undefined = undefined;
    let user: User | null = null;

    try {
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }

      if (token) {
        try {
          const decoded = await tokenUtils.verify(token);

          if (decoded && typeof decoded === 'object' && decoded.userId) {
            const userDoc = await UserModel.findById(decoded.userId)
              .select('email username')
              .lean();

            if (userDoc) {
              user = {
                id: decoded.userId,
                email: userDoc.email,
                username: userDoc.username
              };
            }
          }
        } catch (error) {
          logger.error('Token verification failed:', error);
        }
      }

      return { user: user? {
        id: user.id,
        email: user.email,
        username: user.username
      }:null, req, res };
    } catch (error) {
      logger.error('Context creation error:', error);
      return { user: null, req, res };
    }
  };

  export const checkAuth = (context: Context) => {
    if (!context.user) {
      throw new GraphQLError('Not authenticated', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
    return context.user;
  };

  