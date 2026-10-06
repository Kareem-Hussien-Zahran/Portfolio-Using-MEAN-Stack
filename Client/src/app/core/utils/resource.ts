/**
 * Reads a resource's value without throwing.
 * `resource.value()` throws while the resource is in the `error` state, so templates and
 * computed signals must go through this helper (or check `hasValue()` first).
 */
export function valueOr<T, F>(res: { hasValue(): boolean; value(): T | undefined }, fallback: F): T | F {
  return res.hasValue() ? (res.value() as T) : fallback;
}
