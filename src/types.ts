export interface AuditData {
  url: string;
  title: string | null;
  metaDescription: string | null;
  visibleText: string;
  wordCount: number;
  imageCount: number;
  responseTime: number;
}

export interface AuditResponse {
  success: boolean;
  data?: AuditData;
  message?: string;
  details?: unknown;
}
