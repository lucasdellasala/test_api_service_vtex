import styles from './samplerestrequest.css';
import React from 'react';

interface Props{
  title:string,
  inputType:string,
  placeholder:string,
  name:string,
  id:any,
  selectOptions:string,
}
class Input extends React.Component<Props> {
    public static schema: any;

    constructor(props:any) {
        super(props);

        this.state = {
          title : '',
        };
    
        this.changeInput = this.changeInput.bind(this);
    }

    changeInput(e:any){
      const {value, name} = e.target;
      this.setState({
        [name] : value
      });
    }

    render(){
      if(this.props.inputType != 'select' && this.props.inputType != 'textarea')
      {
        return(
          <div className={ styles.formcontrol } >
            <span className={styles.title}>{this.props.title}</span>
            <br/>
            <input className={styles.input} type={this.props.inputType} placeholder={this.props.placeholder} name={this.props.name} id={this.props.id} onChange={this.changeInput}  />
            <br/>
          </div>
        )
      }else{
        if(this.props.inputType == 'select')
        {
          return(
            <div className={ styles.formcontrol } >
              <span>{this.props.title}</span>
              <br/>
              <select name={this.props.name} id={this.props.id} onChange={this.changeInput}>
                {
                  this.props.selectOptions.split(";").map((item: any) => (
                    <option key={item} value={item}>{item}</option>
                  ))
                }
              </select>
              <br/>
            </div>
          )
        }else{
          return(
            <div className={ styles.formcontrol } >
              <span>{this.props.title}</span>
              <br/>
              <textarea name={this.props.name} id={this.props.id} placeholder={this.props.placeholder} onChange={this.changeInput}>

              </textarea>
              <br/>
            </div>
          )
        }
      }
      
    }
}

export default Input;