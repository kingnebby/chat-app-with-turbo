// https://stackoverflow.com/questions/48953587/typescript-class-implements-class-with-private-functions
export type PublicMembersOf<T> = { [K in keyof T]: T[K] };
