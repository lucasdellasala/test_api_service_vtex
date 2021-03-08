import { HttpClient, ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export class UrlClient extends ExternalClient {
  _domain : any;
  _url : any;
  _params : any;
  
  constructor (context: IOContext, options?: InstanceOptions) {
    super("https://swapi.dev/", context, options)
  }

  public getUrl = (domain:any, url: any, params: any) => {
    var jsonResponse;
    if(this.options){
      jsonResponse = HttpClient.forExternal(domain, this.context, this.options).get(url, params)
    }
    console.log('----------------------------------------clients/urlclient/index.ts:17----------------------------------------')
    console.log(jsonResponse)
    console.log('----------------------------------------clients/urlclient/index.ts:19----------------------------------------')

    return jsonResponse
  }

  public postUrl = (domain:any, url: any, params: any) => {
    var jsonResponse;
    console.log("postUrl/params", params);
    params = String(params);
    if(this.options){
      /*if(this.options.headers != undefined){
        this.options.headers["Content-Type"] = "multipart/form-data";
        this.options.headers["socketPath"] = domain;
      }*/

      jsonResponse = HttpClient.forExternal(domain, this.context, this.options).post(url, params)
    }

    return jsonResponse
  }

  public putUrl = (domain:any, url: any, params: any) => {
    var jsonResponse;
    if(this.options){
      jsonResponse = HttpClient.forExternal(domain, this.context, this.options).put(url, params, params)
    }
    return jsonResponse
  }
}