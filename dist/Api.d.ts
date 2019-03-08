import ShotApi from './ShotApi';
import Image from './Image';
declare type ShotCallback = (api: ShotApi) => Promise<Image>;
export declare function shot(subjectName: string, callback: ShotCallback): void;
export {};
