export class Endpoints {
  static apiUrl = '/api/v1';
  api   = Endpoints.apiUrl;
  login = this.api + '/login';

  user = this.api + '/user';
  terminal = this.api + '/terminal';
  group = this.api + "/group";
  terminalGroup = this.api + '/terminalgroup';
  release = this.api + "/release";

  upload = this.api + '/upload';
  download = this.api + '/download';

  config = this.api + '/config';

}
