export type Unpack<T> = T extends { [K in keyof T]: infer U } ? U : never;

export type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? ReturnType<T[K]> : any;
};

export type ActionTypesCreator<T> = Unpack<ReturnTypes<T>>;
