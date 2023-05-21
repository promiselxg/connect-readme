import { createContext, useState } from 'react';

const FormToggleContext = createContext({});

export const FormToggleProvider = ({ children }) => {
  const [modal, setModal] = useState('');
  const switchScreen = (elem) => {
    setModal(elem);
  };

  return (
    <FormToggleContext.Provider value={{ modal, switchScreen }}>
      {children}
    </FormToggleContext.Provider>
  );
};

export default FormToggleContext;
