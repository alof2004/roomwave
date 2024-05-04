import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const universities = [
  "Universidade Aberta",
  "Universidade dos Açores",
  "Universidade do Algarve",
  "Universidade de Aveiro",
  "Universidade da Beira Interior",
  "Universidade de Coimbra",
  "Universidade de Évora",
  "Universidade de Lisboa",
  "Universidade da Madeira",
  "Universidade do Minho",
  "Universidade Nova de Lisboa",
  "Universidade do Porto",
  "Universidade de Trás-os-Montes e Alto Douro",
  "Universidade Autónoma de Lisboa Luís de Camões",
  "Universidade Católica Portuguesa",
  "Universidade da Maia",
  "Universidade Europeia",
  "Universidade Fernando Pessoa",
  "Universidade Lusíada",
  "Universidade Lusíada - Norte",
  "Universidade Lusófona de Humanidades e Tecnologias",
  "Universidade Lusófona do Porto",
  "Universidade Portucalense Infante D. Henrique",
  // Add any other universities here
];

const StyledForm = styled.form`
  flex-direction: column; /* Align items vertically */
  position: relative;
  width: 45rem;
  background: var(--color-brand);
  margin-left: 25%;
  margin-top: 100px;
  background: var(--color-dark);
  
`;

const StyledInput = styled.input`
  flex-grow: 1; /* Make input grow to fill available space */
  height: 50px;
  font-family: var(--font-fam);
  border: 0;
  color: var(--color-dark);
  font-size: 1.8rem;
  outline: 0;
  padding: 0 1.6rem;
  width: 80%;
  border-radius: 15px;
  appearance: none;
  position: relative;
  &::placeholder {
    color: var(--color-light);
  }
`;

const StyledDatalist = styled.datalist`
  position: absolute;
  z-index: 10;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid var(--color-light);
  border-radius: var(--rad);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledOption = styled.option`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: var(--color-light);
  }
`;

const StyledButton = styled.button`
  height: 50px;
  padding: 0 1.6rem;
  margin-left: 0.8rem;
  border-radius: 15px;
  background-color: #FF7A41;
  color: var(--color-dark);
  font-size: 1.8rem;
  border: none;
  cursor: pointer;
`;

const StyledLabel = styled.label`
  color: var(--color-light);
  font-size: 1.6rem;
  margin-bottom: 0.8rem;
`;

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDatalist, setShowDatalist] = useState(false);
  const navigate = useNavigate(); // Use the navigate function

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setShowDatalist(true);
    } else {
      setShowDatalist(false);
    }
  }, [searchQuery]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
    // Navigate to the room based on the selected university
    navigate(`/uni/${searchQuery}`);
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
  };

  return (
    <StyledForm onSubmit={handleSubmit} role="search">
      <StyledLabel htmlFor="search">Pesquise pelo seu estabelecimento</StyledLabel>
      <StyledInput
        id="search"
        type="search"
        placeholder="Pesquise pelo seu estabelecimento"
        required
        value={searchQuery}
        onChange={handleChange}
        list={showDatalist? "universities" : ""}
      />
      {showDatalist && (
        <StyledDatalist id="universities">
          {universities.map((university, index) => (
            <StyledOption key={index} value={university}>
              {university}
            </StyledOption>
          ))}
        </StyledDatalist>
      )}
      <StyledButton type="submit">Ir</StyledButton>
    </StyledForm>
  );
};

export default SearchForm;
