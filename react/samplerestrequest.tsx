import { Query } from 'react-apollo';
import Response from './response';
import { useQuery } from 'react-apollo';
import React from 'react';
import styles from './samplerestrequest.css';
import restApiCall from './graphql/url.graphql';
import PropTypes, { string } from 'prop-types';
import MyInput from './input';
import FormData from 'form-data';

//import { any } from 'prop-types';

interface Props { 
  title: string,
  form: any,
  info: any
}

interface State {
  //responseCode: number
}

function Test(domain: any, url: any) {
  console.log("TEST1")
  console.log(domain);
  console.log(url);
  console.log("TEST2")
  const { loading, error, data } = useQuery(restApiCall, {
    variables: {
      domain: domain.domain, 
      url: domain.url,
      datajson: ""
    },
    ssr: false
  });
  console.log(loading);
  console.log(error);
  console.log("TEST3")

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return <code>{JSON.stringify(data)}</code>

}

class SampleRestRequest extends React.Component<Props, State> {
  public static schema: any;

  public static defaultProps: Props = {
    title: '',
    form: {},
    info: {domain:"", url:"", error:"", success:""}
  }

  public static uiSchema = {
    title: string,
    gap: string,
  }

  public static propTypes = {
    title: PropTypes.string,
    gap: PropTypes.string,
  }

  public state = {
    //responseCode: 0
  }

  public static getSchema = () => {
     return {
      properties: {
        form: {
          minItems: 1,
          title: 'Inputs',
          type: 'array',
          items: {
            title: 'Agregar Inputs',
            type: 'object',
            properties: {
              title: {
                title: 'title',
                type: 'string',
                default: "",
                isLayout: false,
              },
              name:{
                title: 'name',
                type: 'string',
                default: "",
                isLayout: false,
              },
              id:{
                title: 'id',
                type: 'string',
                default: "",
                isLayout: false,
              },
              inputType: {
                title: 'inputType',
                type: 'string',
                default: "",
                isLayout: false,
              },
              placeholder: {
                title: 'placeholder',
                type: 'string',
                default: "",
                isLayout: false,
              },
              selectOptions: {
                title: 'If is select separate with ; ',
                type: 'string',
                default: "",
                isLayout: false,
              },
            },
          },
        },
        info:{
          title: 'title',
          type: 'object',
          properties:{
            domain: {
              title: 'domain',
              type: 'string',
              default: "",
              isLayout: false,
            },
            url: {
              title: 'url',
              type: 'string',
              default: "",
              isLayout: false,
            },
            button:{
              title:'button',
              type:'string',
              default:'Enviar',
              isLayout:false,
            },
            success:{
              title: 'success',
              type:'string',
              default:'Suscripción correcta',
              isLayout:false,
            },
            error:{
              title: 'error',
              type:'string',
              default:'Hubo un error',
              isLayout:false,
            },
            sendType:{
              title: 'sendType',
              type: 'string',
              enum:["Json", "FormData"],
              default: "Json",
              isLayout: false,
            }
          }
        },
      },
      title: 'admin/editor.samplerestrequest.title',
      type: 'object',
    }
  }

  constructor(props: any){
    super(props);

    this.onSubmitForm = this.onSubmitForm.bind(this)
  }

  onSubmitForm(event:any)
  {
    fetch('https://swapi.dev/api/people/1/')

    event.preventDefault();
    for (let i = 0; i < event.currentTarget.length; i++) {
      const input = event.currentTarget[i];
      this.setState({
        [input.name] : input.value,
      });
    }
  }

  buildFormData(formData:any, data:any, parentKey:any) {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        this.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
  
      formData.append(parentKey, value);
    }
  }
  
  jsonToFormData(data:any) {
    const formData = new FormData();
  
    this.buildFormData(formData, data, false);
  
    return formData;
  }

  render(){
    console.log("props", this.props);
    console.log("state", this.state);

    // let myData;
    //if(this.props.info.sendType == "Json")
      // myData = JSON.stringify(this.state)
    //else
    // myData = this.jsonToFormData(JSON.stringify(this.state));
    console.log(this.props.info.domain);
    console.log(this.props.info.url); 

    
    
    return (
      <div>
        <Test domain={this.props.info.domain} url={this.props.info.url}/>
        <div id="query">
          <Query query={restApiCall} ssr={false} variables={{domain:this.props.info.domain, url: this.props.info.url, datajson: ""}}>
            { 
              ({ data } : { data: any }) => (
                data ? 
                  <Response { ...{ ...this.props.info, ...data }}>
                    {data.name}
                  </Response>
                  : 
                  null
              )
            }
          </Query>
        </div>
        
        <div className={`flex items-start justify-center mt9 mb13 flex-column-reverse-os ${styles.container}`}>
          <div className={`mr12 w-100-os ${styles.formContainer}`}>
              <form onSubmit={ this.onSubmitForm } encType="multipart/form-data">
                {this.props.form.map((item: any) => (
                  <MyInput key={item.id} {... item} ></MyInput>
                ))}
                <div className={styles.btn}>
                  <input className={styles.btnInput} type="submit" value={this.props.info.button}/>
                </div>
                
              </form>
          </div>
        </div>
      </div>
    );
  }
}

SampleRestRequest.schema = {
  properties: {
    form: {
      minItems: 1,
      title: 'Inputs',
      type: 'array',
      items: {
        title: 'Agregar Inputs',
        type: 'object',
        properties: {
          title: {
            title: 'title',
            type: 'string',
            default: "",
            isLayout: false,
          },
          name:{
            title: 'name',
            type: 'string',
            default: "",
            isLayout: false,
          },
          id:{
            title: 'id',
            type: 'string',
            default: "",
            isLayout: false,
          },
          inputType: {
            title: 'inputType',
            type: 'string',
            enum:["text", "password", "number", "email", "textarea", "select", "hidden", "date", "url"],
            default: "",
            isLayout: false,
          },
          placeholder: {
            title: 'placeholder',
            type: 'string',
            default: "",
            isLayout: false,
          },
          selectOptions: {
            title: 'If is select separate with ; ',
            type: 'string',
            default: "",
            isLayout: false,
          },
        },
      },
    },
    info:{
      title: 'title',
      type: 'object',
      properties:{
        domain: {
          title: 'Domain',
          type: 'string',
          default: "https://swapi.dev/api/people/1",
          isLayout: false,
        },
        url: {
          title: 'URL',
          type: 'string',
          default: "vtex/genericform",
          isLayout: false,
        },
        button:{
          title:'Button',
          type:'string',
          default:'Enviar',
          isLayout:false,
        },
        success:{
          title: 'Success message',
          type:'string',
          default:'Suscripción correcta',
          isLayout:false,
        },
        error:{
          title: 'Error message',
          type:'string',
          default:'Hubo un error',
          isLayout:false,
        },
        sendType:{
          title: 'sendType',
          type: 'string',
          enum:["Json", "FormData"],
          default: "Json",
          isLayout: false,
        }
      }
    },
  },
  title: 'GenericForm',
  type: 'object',
}

export default SampleRestRequest;