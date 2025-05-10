export interface OpenApiVO {
  id: string;
  name: string;
  appId: string;
  appSecret: string;
  userId: string;
  remark?: string | null;
  createdAt: Date;
}
