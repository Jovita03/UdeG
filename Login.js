import { Input } from '@rneui/base';
import React, {Component} from 'react';
import {View, Text, Image, TextInput, Button, } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: '',
      nip: '',
    };
  }

  render() {
    const login = () => {
      console.log('entro');
      let _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          console.log(xhttp.responseText);
          if (!xhttp.responseText === '0') {
            //error
          } else {
            _this.props.navigation.navigate('Drawer',{codigo:_this.state.codigo,nip:_this.state.nip});
          }
        }
      };
      xhttp.open(
        'GET','http://148.202.152.33/cucei/credenciales.php?codigo='+this.state.codigo +'&nip=' +this.state.nip,true,
      );
      xhttp.send();
    };
    return (
      
      <View>
        
        <View style={{alignItems:'center', marginTop:'5%'}}>
          <Image
          source={require('./Fotos/logo.png')}
          style={{width: 220, height: 310}}
          />
        </View>
        <View style={{alignItems:'center',  marginTop:'10%'}}>
          <View
          style={{
            borderRadius: 15,
            borderColor: 'black',
            borderWidth: 3,
            width: '45%',
          }}>
          <TextInput
            style={{color:'black'}}
            placeholder=" Ingresa Código"
            placeholderTextColor="black"
            onChangeText={codigo => this.setState({codigo})}
          />
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop:'5%'}}>
          <View
            style={{
              borderRadius: 15,
              borderColor: 'black ',
              borderWidth: 3,
              width: '45%',
            }}>
            <TextInput
              style={{color:'black'}}
              placeholder="Ingresa Nip"
              placeholderTextColor="black"
              onChangeText={nip => this.setState({nip})}
              secureTextEntry={true}
            />
          </View>
        </View>
        

        <View style={{alignItems:'center'}}>
          <View
            style={{
              borderRadius: 9,
              borderColor: 'black',
              width: '45%',
              marginTop:'5%'
              
            }}>
            <Button title="entrar" onPress={login} color="purple" />
          </View>
        </View>
        
      </View>
    );
  }
}