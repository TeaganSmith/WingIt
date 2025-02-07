import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    padding: 50,
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50, // Push the logo higher
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  searchButtonText: {

    color: '#fff',

    fontSize: 18,

    fontWeight: 'bold',

  },

  descriptionInput: {

    height: 100,

    borderColor: '#ccc',

    borderWidth: 1,

    borderRadius: 5,

    padding: 10,

    marginVertical: 10,

    textAlignVertical: 'top',

  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 0,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBar: {
    margin: 10,
    borderRadius: 5,
  },
  autocompleteContainer: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 40, // Add extra space below the airline picker
    width: width * 0.9,
  },
  selectedAirport: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    width: '100%',
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Add spacing below the date inputs
    width: width * 0.9,
  },
  dateInput: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: width * 0.42, // Two inputs side by side
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputText: {
    color: '#333',
    fontSize: 14,
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginVertical: 10,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  placeholderText: {
    fontSize: 14,
    color: '#aaa',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: width * 0.9, // Match other elements' width
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    flex: 1, // Ensures the image stretches to fill its container
    width: '100%',
    height: '100%',
  },
});

export default styles;
