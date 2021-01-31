import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from "react-native-popup-dialog";

export default class AddProjModal extends React.Component {
  state = {
    name: "",
  };

  delProj = () => {
    const { name } = this.state;

    const list = { name };

    this.props.delList(list);

    this.setState({ name: "" });
    this.props.closeModal();
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Delete Project</Text>

          <TextInput
            style={styles.input}
            placeholder="Project Name?"
            onChangeText={(text) => this.setState({ name: text })}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          ></View>

          <TouchableOpacity style={[styles.create]} onPress={this.delProj}>
            <Text style={{ color: colors.white, fontWeight: "600" }}>
              Delete!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
