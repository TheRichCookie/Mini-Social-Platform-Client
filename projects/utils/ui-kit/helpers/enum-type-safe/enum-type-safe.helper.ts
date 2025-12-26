type EnumValue<E> = E[keyof E] extends string ? E[keyof E] : never;

export type EnumTranslation<E> = Record<EnumValue<E>, string>;
