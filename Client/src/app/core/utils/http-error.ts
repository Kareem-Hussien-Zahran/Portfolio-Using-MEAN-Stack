/** Extracts the HTTP status from an `HttpErrorResponse`, also when a Resource wraps it as `cause`. */
export function httpStatus(err: unknown): number | undefined {
  const e = err as { status?: number; cause?: { status?: number } } | null | undefined;
  return e?.status ?? e?.cause?.status;
}

export const isNotFound = (err: unknown): boolean => httpStatus(err) === 404;

/** Returns the server's `{ message }` text when present, otherwise a generic fallback. */
export function serverMessage(err: unknown, fallback: string): string {
  const e = err as { error?: { message?: string }; cause?: { error?: { message?: string } } } | null;
  return e?.error?.message ?? e?.cause?.error?.message ?? fallback;
}
