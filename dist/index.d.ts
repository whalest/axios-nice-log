import { AxiosRequestConfig } from 'axios';

declare type keys = 'prefix' | 'time' | 'method' | 'url' | 'params' | 'separator' | 'delimiter';
declare type fields = Partial<Record<keys, string>>;
interface INiceLogOptions {
    prefix?: string;
    styles?: fields;
    template?: string;
    templates?: fields;
    logger?: (...data: any[]) => void;
}
declare const setAxiosNiceLog: (options?: INiceLogOptions) => INiceLogOptions;
declare class NiceLog {
    options: INiceLogOptions;
    constructor(options?: INiceLogOptions);
    setOptions(options?: INiceLogOptions): void;
    get(config: AxiosRequestConfig): AxiosRequestConfig;
    print(value: string): void;
    /**
     * @see issue https://github.com/chalk/chalk/issues/258
     * */
    chalkTemplate(str?: string): string;
    paint(fields: fields): string;
}
declare const axiosNiceLog: (config: AxiosRequestConfig, options?: INiceLogOptions) => AxiosRequestConfig;

export default axiosNiceLog;
export { INiceLogOptions, NiceLog, axiosNiceLog, fields, keys, setAxiosNiceLog };
