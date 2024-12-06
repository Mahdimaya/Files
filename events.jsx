import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import {TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useLinkProps } from '@react-navigation/native';

const MyEventsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [userName, setUserName] = useState({ firstName: '', lastName: '' });
  const [registeredUser, setRegisteredUser] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const LinkButton = ({ children }) => {
    const linkProps = useLinkProps({ to: '/events' });
  }

  // Gestion de l'inscription
  const handleRegister = () => {
    if (userName.firstName.trim() && userName.lastName.trim()) {
      setRegisteredUser(userName);
      setModalVisible(false);
      setUserName({ firstName: '', lastName: '' });
      Alert.alert('Inscription réussie', 'Vous pouvez maintenant procéder au paiement.');
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs !');
    }
  };

  // Gestion du paiement
  const handlePayment = () => {
    const { cardName, cardNumber, expiryDate, cvv } = paymentDetails;

    if (
      cardName.trim() &&
      cardNumber.trim() &&
      expiryDate.trim() &&
      cvv.trim()
    ) {
      setPaymentModalVisible(false);
      setConfirmationVisible(true);
    } else {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs de paiement !');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.goBackButton}>
          <Text style={styles.goBackText}>Go back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Events</Text>
      </View>

      {/* Welcome Message */}
      {registeredUser && (
        <Text style={styles.welcomeText}>
          Bienvenue, {registeredUser.firstName} {registeredUser.lastName} ! Veuillez procéder au paiement.
        </Text>
      )}

      {/* Inscription Button */}
      {!registeredUser && (
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.registerButtonText}>S'inscrire</Text>
        </TouchableOpacity>
      )}

      {/* Paiement Button */}
      {registeredUser && (
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => setPaymentModalVisible(true)}
        >
          <Text style={styles.paymentButtonText}>Payer</Text>
        </TouchableOpacity>
      )}

      {/* Modal for Registration */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Inscription</Text>
            <TextInput
              style={styles.input}
              placeholder="Prénom"
              value={userName.firstName}
              onChangeText={(text) =>
                setUserName((prev) => ({ ...prev, firstName: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Nom"
              value={userName.lastName}
              onChangeText={(text) =>
                setUserName((prev) => ({ ...prev, lastName: text }))
              }
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleRegister}
              >
                <Text style={styles.modalButtonText}>S'inscrire</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Payment */}
      <Modal
        visible={paymentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Paiement</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom sur la carte"
              value={paymentDetails.cardName}
              onChangeText={(text) =>
                setPaymentDetails((prev) => ({ ...prev, cardName: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Numéro de carte"
              keyboardType="numeric"
              value={paymentDetails.cardNumber}
              onChangeText={(text) =>
                setPaymentDetails((prev) => ({ ...prev, cardNumber: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Date d'expiration (MM/AA)"
              value={paymentDetails.expiryDate}
              onChangeText={(text) =>
                setPaymentDetails((prev) => ({ ...prev, expiryDate: text }))
              }
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry={true}
              value={paymentDetails.cvv}
              onChangeText={(text) =>
                setPaymentDetails((prev) => ({ ...prev, cvv: text }))
              }
            />
            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handlePayment}
              >
                <Text style={styles.modalButtonText}>Payer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setConfirmationVisible(false);
                  navigation.navigate('Events'); // Redirige vers l'écran des événements
                }}
              >
                <Text style={styles.modalButtonText}>Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Confirmation Screen */}
      <Modal
  visible={confirmationVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setConfirmationVisible(false)}
>
  <TouchableWithoutFeedback
    onPress={() => setConfirmationVisible(false)} // Ferme le modal si on clique en dehors
  >
    <View style={styles.confirmationContainer}>
      <View style={styles.confirmationContent}>
        <View style={styles.checkIcon}>
          <Text style={styles.checkMark}>✔️</Text>
        </View>
        <Text style={styles.congratulationsText}>Congratulations!!!</Text>
        <Text style={styles.confirmationMessage}>
          You have joined the event!
        </Text>
        <LinkButton>
          <Text style={styles.continueButtonText}>Continue scrolling</Text>
        </LinkButton>
      </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
</View>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4E4',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  goBackButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#F8BBD0',
  },
  goBackText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  welcomeText: {
    fontSize: 16,
    color: '#000',
    marginVertical: 20,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#F8BBD0',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paymentButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 10,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#F8BBD0',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  confirmationContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
  },
  checkIcon: {
    backgroundColor: '#4CAF50',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkMark: {
    fontSize: 40,
    color: '#fff',
  },
  congratulationsText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  confirmationMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#F8BBD0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyEventsScreen;
