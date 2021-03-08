// import { isEmpty } from "ramda";

export const restResolver = (_a: any, _variables: any, { clients: { urlclient } }: Context) => {
  //let myUrlClient = new UrlClient(_variables.domain)
  console.log('----------------------------------------resolvers/restResolver.ts:5----------------------------------------')
  console.log('_variables', _variables)
  console.log('-----------------------------------------resolvers/restResolver.ts:7------------------------------------------')
  let domain = _variables.domain
  let url = _variables.url
  var dj = _variables.datajson;
  
  //let domain = "https://swapi.dev/api/people/1"
  console.log('----------------------------------------resolvers/restResolver.ts:13----------------------------------------')
  console.log("dj", dj)
  console.log('----------------------------------------resolvers/restResolver.ts:15----------------------------------------')

  // if(isEmpty(dj) || String(dj).length < 3)
  //   return {code:"502"};
  
  try {
    // console.log("PARAMS", dj);
    var ret = urlclient.getUrl(domain, url, null);
    // var ret = urlclient.postUrl(domain, url, dj);
    console.log('----------------------------------------resolvers/restResolver.ts:24----------------------------------------')
    // ret?.then((response)=>{
    //   console.log(response)
    // })
    console.log('----------------------------------------resolvers/restResolver.ts:28----------------------------------------')

    return ret;
  } catch (error) {
    return {code:"501"};
  }
}