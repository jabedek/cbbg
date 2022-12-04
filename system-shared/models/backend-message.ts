declare class NativeError extends globalThis.Error {} // mongoose

export interface BackendMessage {
  status: "" | "success" | "failure";
  message?: string | Event | NativeError;
}

export interface BackendError extends Omit<Error, "message"> {
  error: BackendMessage;
}
