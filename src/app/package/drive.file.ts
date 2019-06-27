export class DriveFile {
  location: string;
  path: string;
  name: string;
  fileType: string;

  constructor (location: string, path: string, name: string, fileType: string) {
    this.location = location;
    this.path = path;
    this.name = name;
    this.fileType = fileType;
  }

  getFile () {
    return this.location + '/' + this.path;
  }
}
