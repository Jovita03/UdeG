
import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default class Horario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      codigo: '',
      nip: '',
      nomalumno: "",
      datos: "",
      open: false,
    };
  }

  componentDidMount = () => {
    console.log(this.props.route.params.codigo);
    console.log(this.props.route.params.nip);

    const formdata = new FormData();
    formdata.append("codigo", this.props.route.params.codigo);
    formdata.append("nip", this.props.route.params.nip);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
    };

    fetch("http://148.202.152.33/cucei/alumnoH.php", requestOptions)
      .then(response => {
        response.json().then(parsedValue => {
          console.log(parsedValue)
          this.setState({ nomalumno: parsedValue.alumno })
          this.setState({ dataSource: parsedValue })
        })
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Horario</Text>
        <Text style={styles.subtitle}>Alumno: {this.state.nomalumno}</Text>

        <FlatList
          style={styles.list}
          data={this.state.dataSource.horario}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.subject}>{item.nombre_materia}</Text>
              <View style={styles.detailsRow}>
                <Text style={styles.schedule}>{item.horario}</Text>
                <Text style={styles.days}>{item.dias}</Text>
              </View>
              <Text style={styles.professor}>Profesor: {item.profesor}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: "#555",
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  subject: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  schedule: {
    fontSize: 16,
    color: "#777",
  },
  days: {
    fontSize: 16,
    color: "#777",
  },
  professor: {
    fontSize: 16,
    color: "#555",
    marginTop: 10,
  },
});
