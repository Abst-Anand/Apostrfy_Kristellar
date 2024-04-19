import { View, TouchableOpacity, StyleSheet } from "react-native";

const Footer = () => {
  const FooterButton = ({ icon, onPress }) => {
    return (
      <TouchableOpacity style={styles.footerButton} onPress={onPress}>
        <Feather name={icon} size={24} color="#fff" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.footer}>
      {/* Footer buttons */}
      <FooterButton
        icon="home"
        onPress={() => navigation.navigate("WriteThoughtScreen")}
      />
      <FooterButton
        icon="message-circle"
        onPress={() => navigation.navigate("ChatList")}
      />
      <FooterButton
        icon="map-pin"
        onPress={() => navigation.navigate("MapPage")}
      />
      <FooterButton
        icon="users"
        onPress={() => navigation.navigate("ConnectionScreen")}
      />
      <FooterButton
        icon="bell"
        onPress={() => navigation.navigate("NotificationPage")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#000000",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerButton: {
    padding: 10,
  },
});

export default Footer;
