import React from 'react';
import { Alert } from 'vtex.styleguide';
import styles from './samplerestrequest.css';

interface Props{
    success: string,
    error: string,
    restResolver:any
}

interface State {
    showAlert: boolean
}

class Response extends React.Component<Props, State>{

    constructor(props:any) {
        super(props);
        
        this.state = {
          showAlert : true,
        };
        
        this.onCloseAlert = this.onCloseAlert.bind(this)
    }

    onCloseAlert(event:any)
    {
        console.log("event", event);
        event.preventDefault();
        this.setState({
            showAlert:false,
        });
    }

    

    render(){
        console.log("Response props", this.props);
        let msg;
        let msgType;
        
        if(this.props.restResolver == undefined)
            return false;

        switch (Number(this.props.restResolver.code)) {
            case 200:
                //msg = this.props.success;
                msg = this.props.restResolver.params
                msgType = "success";
                break;

            case 404:
            case 500:
                msg = this.props.restResolver.params;
                msgType = "error";
                break;
            
            case 501:
                msg = this.props.error;
                msgType = "error";
                break;

            default:
                return false;
        }
        debugger
        if(this.state.showAlert)
        {
            return(
                <div className={styles.response}>
                    <Alert key={100001} type={msgType} onClose={this.onCloseAlert} >
                        {msg}
                    </Alert>
                </div>
            )
        }

        //if(!this.state.showAlert)
        //    this.setState({showAlert:true});

        return false;
        
    }
}

export default Response;