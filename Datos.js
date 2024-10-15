import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class Datos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Foto: "",
      bandera: 0,
    };
  }

  componentDidMount() {
    const codigo = this.props.route?.params?.codigo;

    if (!codigo) {
      console.log('Código de alumno no encontrado');
      return;
    }

    let _this = this;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Guardamos la respuesta en el estado
        _this.setState({ Foto: this.responseText, bandera: 1 });
      }
    };

    xhttp.open("GET", "http://148.202.152.33/cucei/fotoA.php?codigo=" + codigo, true); // Especificamos que es una petición GET
    xhttp.send();
  }

  render() {
    const codigo = this.props.route?.params?.codigo || '218870762';

    return (
      <View>
         <Text style={{ color: 'black', fontSize: 16 }}> Datos Alumno: </Text>
         <Text style={{ color: 'black', fontSize: 16 }}> Codigo: {codigo} </Text>

        {!this.state.bandera ? (
          <View>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: "black",
                width: 100,
                height: 100,
              }}
              source={require("./Fotos/perfil.jpg")} // Imagen por defecto
            />
          </View>
        ) : (
          <View>
            <Image
              style={{
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "red",
                width: 100,
                height: 100,
              }}
              source={{ uri: this.state.Foto }} // Imagen obtenida desde el servidor
            />
          </View>
        )}
      </View>
    );
  }
}
