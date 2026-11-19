declare module '*/vendor/pdfjs/pdf.min.mjs' {
  export const GlobalWorkerOptions: {
    workerSrc: string;
    workerPort: any;
  };
  export function getDocument(src: any): {
    promise: Promise<any>;
    destroy?: () => void;
  };
  const pdfjsDefault: {
    GlobalWorkerOptions: typeof GlobalWorkerOptions;
    getDocument: typeof getDocument;
  };
  export default pdfjsDefault;
}

declare module '*/vendor/pdfjs/pdf.worker.min.mjs' {
  export const WorkerMessageHandler: any;
  const workerDefault: {
    WorkerMessageHandler: any;
  };
  export default workerDefault;
}
