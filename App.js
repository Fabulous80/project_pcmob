import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import TodoList from "./screens/TodoList";
import AddProjModal from "./screens/AddProjModal";
import DelProjModal from "./screens/DelProjModal";
import DB from "./database/firebaseDB";
import Dialog, { DialogContent } from "react-native-popup-dialog";

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    delTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
  };

  // check for user and db connection

  componentDidMount() {
    firebase = new DB((error, user) => {
      if (error) {
        return alert("Uh oh, something went wrong");
      }

      firebase.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddProjModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  toggleDelProjModal() {
    this.setState({ delTodoVisible: !this.state.delTodoVisible });
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList} />;
  };

  // add list for Projects

  addList = (list) => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  delList = (list) => {
    console.log(list);

    // return firebase
    //   .collection("users")
    //   .doc("lrXb7NL8umWgiRxoLt5gCRTAwQw2")
    //   .collection("lists")
    //   .doc($list)
    //   .delete()
    //   .then(function () {
    //     console.log("Document successfully deleted!");
    //   })
    //   .catch(function (error) {
    //     console.error("Error removing document: ", error);
    //   });
  };

  // update list for Projects

  updateList = (list) => {
    firebase.updateList(list);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddProjModal()}
        >
          <AddProjModal
            closeModal={() => this.toggleAddProjModal()}
            addList={this.addList}
          />
        </Modal>

        <Modal
          animationType="slide"
          visible={this.state.delTodoVisible}
          onRequestClose={() => this.toggleDelProjModal()}
        >
          <DelProjModal
            closeModal={() => this.toggleDelProjModal()}
            delList={this.delList}
          />
        </Modal>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            Project{" "}
            <Text style={{ fontWeight: "300", color: colors.blue }}>
              Manager
            </Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={{ marginVertical: 20 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddProjModal()}
          >
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>

          <Text style={styles.add}>Add Project</Text>

          <TouchableOpacity
            style={styles.delList}
            onPress={() => this.toggleDelProjModal()}
          >
            <AntDesign name="minus" size={16} color={colors.red} />
          </TouchableOpacity>

          <Text style={styles.delete}>Delete Project</Text>
        </View>

        <View style={{ height: 275, paddingLeft: 32 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 64,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 2,
    padding: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  delList: {
    borderWidth: 2,
    borderColor: colors.red,
    borderRadius: 2,
    padding: 15,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
  delete: {
    color: colors.red,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
