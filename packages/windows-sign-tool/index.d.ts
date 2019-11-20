export interface Options {
  /**
   * pfx证书
   */
  pfxFile: string;

  /**
   * pfx证书密码
   */
  pfxPwd: string;

  /**
   * 签名文件
   */
  file: string;
}

export default function signTool(options: Options): Promise<void>;
