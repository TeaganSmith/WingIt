import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    padding: 50,
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    padding: 16,
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
    marginTop: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    width: '100%',
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    shadowOpacity: .5,
    shadowRadius: 8,
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
    height: 200,
    resizeMode: 'contain',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  searchInput: {
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,

  },

});

export default styles;