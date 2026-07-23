import { useRef } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

import { COLORS } from "@/constants/colors";
import { BORDER_RADIUS } from "@/constants/styles";

interface Props {
  visible: boolean;
  location: string;
  onClose: () => void;
}

export default function LocationModal({ visible, location, onClose }: Props) {
  const webViewRef = useRef<WebView>(null);

  const encodedLocation = encodeURIComponent(location);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <style>
        body { margin: 0; padding: 0; }
        #map { width: 100%; height: 100vh; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        var map = L.map('map').setView([51.5, -0.1], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        var address = '${encodedLocation.replace(/'/g, "\\'")}';
        fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address) + '&limit=1')
          .then(function(r) { return r.json(); })
          .then(function(data) {
            if (data && data.length > 0) {
              var lat = parseFloat(data[0].lat);
              var lon = parseFloat(data[0].lon);
              map.setView([lat, lon], 15);
              L.marker([lat, lon]).addTo(map)
                .bindPopup(address)
                .openPopup();
            } else {
              L.marker([51.5, -0.1]).addTo(map)
                .bindPopup('Location not found: ' + address)
                .openPopup();
            }
          })
          .catch(function() {
            L.marker([51.5, -0.1]).addTo(map)
              .bindPopup('Could not load location')
              .openPopup();
          });
      </script>
    </body>
    </html>
  `;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            {location}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
        <WebView
          ref={webViewRef}
          source={{ html }}
          style={styles.map}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: COLORS.RED_0,
    borderRadius: BORDER_RADIUS.SMALL,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  closeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  container: {
    backgroundColor: "white",
    flex: 1
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  map: {
    flex: 1
  },
  title: {
    color: "#221611",
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 12
  }
});
