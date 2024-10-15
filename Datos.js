import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class Datos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Foto: "",
      nombre: "",
      carrera: {},
      tipoUsuario: "",
      estatus: "",
      bandera: 0,
    };
  }

  componentDidMount() {
    const codigo = this.props.route?.params?.codigo;
    const nip = this.props.route?.params?.nip;

    // Directamente obtenemos los datos del alumno
    this.obtenerDatos(codigo, nip);
  }

  obtenerDatos(codigo, nip) {
    let _this = this;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // Asumimos que siempre se reciben los datos correctamente
        const datos = JSON.parse(xhttp.responseText);
        
        // Guardamos los datos del alumno en el estado
        _this.setState({
          nombre: datos.nombre,
          carrera: datos.carrera[0],
          tipoUsuario: datos.tipoUsuario,
          estatus: datos.estatus,
        });

        // Obtenemos la foto del alumno
        _this.obtenerFoto(codigo);
      }
    };

    xhttp.open(
      'GET',
      'http://148.202.152.33/cucei/credenciales.php?codigo=' + codigo + '&nip=' + nip,
      true
    );
    xhttp.send();
  }

  obtenerFoto(codigo) {
    let _this = this;
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // Guardamos la URL de la foto en el estado
        _this.setState({ Foto: this.responseText, bandera: 1 });
      }
    };

    xhttp.open("GET", "http://148.202.152.33/cucei/fotoA.php?codigo=" + codigo, true);
    xhttp.send();
  }

  render() {
    const { codigo } = this.props.route.params;
    const { nombre, carrera, tipoUsuario, estatus, Foto, bandera } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Datos Alumno:</Text>
        <Text style={styles.info}>Código: {codigo}</Text>
        <Text style={styles.info}>Nombre: {nombre}</Text>
        <Text style={styles.info}>Carrera: {carrera.descripcion}</Text>
        <Text style={styles.info}>Ciclo de Ingreso: {carrera.cicloIngreso}</Text>
        <Text style={styles.info}>Escuela: {carrera.escuela}</Text>
        <Text style={styles.info}>Último Ciclo: {carrera.ultimoCiclo}</Text>
        <Text style={styles.info}>Tipo de Usuario: {tipoUsuario}</Text>
        <Text style={styles.info}>Estatus: {estatus}</Text>

        {!bandera ? (
          <Image
            style={styles.image}
            source={require('./Fotos/perfil.jpg')}
          />
        ) : (
          <Image
            style={styles.image}
            source={{ uri: Foto }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'purple',
  },
  info: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
    fontFamily: 'times new roman'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    marginTop: 20,
  },
});