function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function getErrorStatusCode(error: unknown): number {
  if (typeof error === 'object' && error !== null) {
    const status =
      (error as { status?: number }).status ||
      (error as { statusCode?: number }).statusCode;
    if (typeof status === 'number') return status;
  }
  return 500;
}

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error('❌ Error:', err);

  const status = getErrorStatusCode(err);
  const message = getErrorMessage(err);

  res.status(status).json({
    success: false,
    message,
  });
}
