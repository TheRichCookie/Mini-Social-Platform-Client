import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UkDownloadFileService {
  public download(blob: Blob, fileName = 'data'): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(url);
  }
}
