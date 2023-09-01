export const promiseFilter = <T>(
  array: readonly T[],
  predicate: (item: T) => Promise<boolean>
): Promise<T[]> =>
  Promise.all(
    array.map((item) =>
      predicate(item).then((result) => (result ? item : null))
    )
  ).then((results) => results.filter(Boolean)) as Promise<T[]>;
