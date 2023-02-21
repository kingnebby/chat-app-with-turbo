import { Session } from 'next-auth';

export type NextSession = Session & {
  accessToken: string;
};
