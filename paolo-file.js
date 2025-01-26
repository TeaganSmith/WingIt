import { StyleSheet } from 'react-native';

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
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop:0, // Adds space above the button
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    width: '100%',
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    shadowOpacity: .5,
    shadowRadius: 8,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    height: 100,
    marginVertical: 10,
    textAlignVertical: 'top',
  },
  dropdownItem: {
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  image: {
    flex: 1, // Ensures the image stretches to fill its container
    width: '100%',
    height: '100%',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  logo: {
    width: 200,
    height: 100,
    marginLeft: 50,
    padding: 0,
    resizeMode: 'contain',
  },
  searchBar: {
    margin: 54,
    borderRadius: 5,
  },
});

export default styles;