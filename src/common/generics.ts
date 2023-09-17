type IsOptional<P extends keyof T, T> = object extends Pick<T, P> ? P : never

type DeepRequired<T> = {
    [P in keyof T]-?: IsOptional<P, T> extends never ? T[P] : DeepRequired<T[P]>
}

export type { DeepRequired }
