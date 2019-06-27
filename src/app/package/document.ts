import {DriveFile} from './drive.file';

export class Document extends DriveFile {
  fileExpiry: Date;

  constructor (location: string, path: string, name: string, fileType: string, fileExpiry: Date) {
    super (location, path, name, fileType);
    this.fileExpiry = fileExpiry;
  }

  setFileExpiry (date: Date) {
    this.fileExpiry = date;
  }
}
