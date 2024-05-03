import React, { useState } from 'react';
import '../css/RoomForm.css';
import { useNavigate } from 'react-router-dom';
import {useUser} from './UserContext';
import jsonData from './rooms.json';

function RoomForm(){
    // Define state variables to store form field values
    const [id, setId] = useState<number | null>(null);
    const [proprietaria, setProprietaria] = useState('');
    const [telefone, setTelefone] = useState('');
    //const [imagem1, setImagem1] = useState('');
    //const [imagem2, setImagem2] = useState('');
    //const [imagem3, setImagem3] = useState('');
    //const [imagem4, setImagem4] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [localizacao, setLocalizacao] = useState('');
    const [locaisProximos, setLocaisProximos] = useState<string[]>([]);
    const [cidade, setCidade] = useState('');
    const [pais, setPais] = useState('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [description, setDescription] = useState('');
    const [transportes, setTransportes] = useState('');
    const [mobilia, setServicos] = useState('');
    const [descricaoProprietaria, setDescricaoProprietaria] = useState('');
    const [cama, setCama] = useState('');
    const [cozinha, setCozinha] = useState('');
    const [casasDeBanho, setCasasDeBanho] = useState<number | null>(null);
    const [ambiente, setAmbiente] = useState('');
    const [price, setPrice] = useState<number | null>(null);
    const [pessoasPermitidas, setPessoasPermitidas] = useState<string[]>([]);
    const [gastos, setGastos] = useState('');
    const [animais, setAnimais] = useState('');
    const [fumadores, setFumadores] = useState('');
    const [area, setArea] = useState<number | null>(null);
    const [vista, setVista] = useState('');
    const [rendaInclui, setRendaInclui] = useState<string[]>([]);
    const [equipamentoDisponivel, setEquipamentoDisponivel] = useState<string[]>([]);
    const [genero, setGenero] = useState<string[]>([]);
    const [tipoQuarto, setTipoQuarto] = useState('');
    const [wc, setWC] = useState('');
    const [alojamento, setAlojamento] = useState('');
    const [andar, setAndar] = useState('');
    const [avaliado, setAvaliado] = useState('');
    const [avaliacao, setAvaliacao] = useState<number | null>(null);
    const [data_entrada, setDataEntrada] = useState('');
    const [data_saida, setDataSaida] = useState('');
    const [requestaval, setRequestAval] = useState('');
    const navigate = useNavigate();
    const { user } = useUser();




    const generateRoomId = () => {
        // Retrieve the current list of rooms from localStorage
        const roomsData = JSON.parse(localStorage.getItem('roomsData') || '[]');
        // If there are no rooms, start with ID 1
        if (roomsData.length === 0) {
            return 1;
        }
        // Otherwise, find the highest ID and increment it
        const highestId = Math.max(...roomsData.map((room: { id: number }) => room.id));
        return highestId + 1;
    };

    const [isOpen, setIsOpen] = useState(false);
    const distances = [100, 200, 300, 400, 500];

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectDistance = (distance: number) => {
        setTransportes(distance === 500 ? 'a +500m' : `a ${distance}m`);
        setIsOpen(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const fileArray: string[] = [];
            for (let i = 0; i < Math.min(files.length, 4); i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = (event) => {
                    if (event.target) {
                        fileArray.push(event.target.result as string);
                        if (fileArray.length === Math.min(files.length, 4)) {
                            setImages(fileArray);
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const uniqueEquipmentNames = Array.from(new Set(jsonData.flatMap(property => property.Equipamento_disponivel)));

    const toggleEquipment = (equipment: string) => {
        if (equipamentoDisponivel.includes(equipment)) {
            setEquipamentoDisponivel(prevState => prevState.filter(item => item !== equipment));
        } else {
            setEquipamentoDisponivel(prevState => [...prevState, equipment]);
        }
    };

    const [showEquipmentOptions, setShowEquipmentOptions] = useState(false);

    const handleToggleOptions = () => {
        setShowEquipmentOptions(prevState => !prevState);
    };

    // Function to handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior
        
        const newRoomId = generateRoomId();
        // Construct an object with the form data
        const formData = {
            id: newRoomId,//ta
            proprietaria, //ta
            telefone,
            //imagem1,
            //imagem2,
            //imagem3,
            //imagem4,
            images: images,             //ta
            localizacao,                //ta
            locaisProximos,             //ta
            cidade,                     //ta
            pais,                       //ta
            latitude,                   //ta
            longitude,                  //ta
            description,                //ta
            transportes,                //ta
            mobilia,                    //ta
            descricaoProprietaria,      //ta
            cama,                       //ta
            cozinha,                    //ta
            casasDeBanho,               //ta
            wc,                         //ta
            ambiente,                   //ta
            price,                      //ta
            pessoasPermitidas,
            gastos,                     //ta
            animais,                    //ta
            fumadores,                  //ta
            area,                       //ta
            vista,                      //ta
            rendaInclui,
            equipamentoDisponivel,
            tipoQuarto,                 //ta
            genero,
            alojamento,                 //ta
            andar,                      //ta
            avaliado,                   //ta
            avaliacao,                  //ta
            data_entrada,
            data_saida,
        };
    
        console.log(formData);
        
        formData.proprietaria = user?.firstname + " " + user?.lastname;
        formData.telefone = user?.phone ?? '';
        formData.avaliado = "Não";
        formData.avaliacao= 0;
        // Assuming you have a mechanism to store all rooms in an array in localStorage
        const roomsData = JSON.parse(localStorage.getItem('roomsData') || '[]');
        roomsData.push(formData);
        localStorage.setItem('roomsData', JSON.stringify(roomsData));
        console.log('New room added:', formData);
        navigate("../../homeLandlord");
    };

    return ( 
        <div className="addroom-container">
        <form className="addroom-form" onSubmit={handleSubmit}>
            <h2>Room Form</h2>

            <label htmlFor="localizacao" className="label1">Localização</label>
            <input
                type="text"
                placeholder="Localização"
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                required
                title="Insira a rua/morada"
            />

            <div className="image-upload-container">
                <label className="image-upload-label">Upload Images (Max 4)</label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="image-upload-input"
                />
                <div className="image-preview-container">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="image-preview"
                            style={{ width: `calc(25% - 10px)` }} // Set width to 25% of container width with margin
                        />
                    ))}
                </div>
            </div>
            
            <label htmlFor="Locais Próximos (separados por vírgula)" className="label1">Locais próximos</label>
            <input
                type="text"
                placeholder="Locais Próximos (separados por vírgula)"
                value={locaisProximos.join(',')}
                onChange={(e) => setLocaisProximos(e.target.value.split(','))}
                required
            />

            <div className="location-info-container">
                <div className="label-container">
                    <label htmlFor="cidade" className="label1">Cidade</label>
                    <input
                        type="text"
                        id="cidade"
                        placeholder="Cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        required
                    />
                </div>
                
                <div className="label-containerend">
                    <label htmlFor="pais" className="label1">País</label>
                    <input
                        type="text"
                        id="pais"
                        placeholder="País"
                        value={pais}
                        onChange={(e) => setPais(e.target.value)}
                        required
                    />
                </div>
                
                <div className="label-container1">
                    <label htmlFor="latitude" className="label1">Latitude</label>
                    <input
                        type="number"
                        id="latitude"
                        placeholder="Latitude"
                        value={latitude || ''}
                        onChange={(e) => setLatitude(parseFloat(e.target.value))}
                        required
                    />
                </div>
                
                <div className="label-container1">
                    <label htmlFor="longitude" className="label1">Longitude</label>
                    <input
                        type="number"
                        id="longitude"
                        placeholder="Longitude"
                        value={longitude || ''}
                        onChange={(e) => setLongitude(parseFloat(e.target.value))}
                        required
                    />
                </div>
            </div>
            
            <label htmlFor="localizacao" className="label1">Title</label>
            <input
                type="text"
                placeholder="Title"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={80}
                required
                title="Escreva uma pequena frase que descreva o quarto (Esta frase é a que irá aparecer destacada no anuncio do seu quarto)"
            />


            <div className="location-info-container1">
                <div className="label-container2">
                    <div className="dropdown-container">
                        <label className="dropdown-label">Transport Distance</label>
                        <input
                            type="text"
                            value={transportes}
                            placeholder="Select Distance"
                            readOnly
                            onClick={handleToggle}
                            className="dropdown-input"
                            title="A que distãncia se encontra o transporte público mais perto (autocarro)"
                        />
                        {isOpen && (
                            <div className="options-container">
                                {distances.map((distance, index) => (
                                    <div
                                        key={index}
                                        className="option-item"
                                        onClick={() => handleSelectDistance(distance)}
                                    >
                                        {distance === 500 ? '+500m' : `${distance}m`}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="label-container3">
                    <label htmlFor="mobilia" className="label1">Mobilado</label>
                    <select
                        value={mobilia}
                        onChange={(e) => setServicos(e.target.value)}
                        required
                        title="Indique se o quarto se encontra mobilado (Pode indicar a mobilia na descrição)"
                    >
                        <option value="">Selecione...</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                </div>

                <div className="label-container4">
                    <label htmlFor="Cama" className="label1">Cama</label>
                    <select
                        value={cama}
                        onChange={(e) => setCama(e.target.value)}
                        required
                        title="Insira o tipo de cama (casal/solteiro/beliche)"
                    >
                        <option value="">Selecione...</option>
                        <option value="Casal">Casal</option>
                        <option value="Solteiro">Solteiro</option>
                        <option value="Beliche">Beliche</option>
                    </select>
                </div>

                <div className="label-container3">
                    <label htmlFor="cozinha" className="label1">Cozinha</label>
                    <select
                        value={cozinha}
                        onChange={(e) => setCozinha(e.target.value)}
                        required
                        title="Indique se o alojamento tem cozinha"
                    >
                        <option value="">Selecione...</option>
                        <option value="Sim">Sim</option>
                        <option value="Não">Não</option>
                    </select>
                </div>

                <div className="label-container5">
                    <label htmlFor="Casas de banho" className="label1">Casas de Banho</label>
                    <input
                        type="number"
                        placeholder="Número de casa de banho"
                        value={casasDeBanho || ''}
                        onChange={(e) => setCasasDeBanho(parseFloat(e.target.value))}
                        required
                        title="Número de casas de banho"
                    />
                </div>

                <div className="label-container4">
                    <label htmlFor="WC" className="label1">WC</label>
                    <select
                        value={wc}
                        onChange={(e) => setWC(e.target.value)}
                        required
                        title="Insira o tipo de WC (individual/partilhado)"
                    >
                        <option value="">Selecione...</option>
                        <option value="Individual">Individual</option>
                        <option value="Partilhado">Partilhado</option>
                    </select>
                </div>

                <div className="label-container3">
                    <label htmlFor="alojamento" className="label1">Alojamento</label>
                    <select
                        value={alojamento}
                        onChange={(e) => setAlojamento(e.target.value)}
                        required
                        title="Indique o tipo de alojamento"
                    >
                        <option value="">Selecione...</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Casa">Casa</option>
                    </select>
                </div>

            </div>

            <div className="descricao-label-container">
                <label htmlFor="descricao" className="descricao-label">Descrição</label>
                <textarea
                    id="descricao"
                    placeholder="Descrição"
                    value={descricaoProprietaria}
                    onChange={(e) => setDescricaoProprietaria(e.target.value)}
                    required
                    className="descricao-input"
                    title="Insira aqui uma descrição do quarto"
                />
            </div>

            <div className="location-info-container1">

                <div className="label-container5">
                    <label htmlFor="tipodequarto" className="label1">Tipo de Quarto</label>
                    <select
                        value={tipoQuarto}
                        onChange={(e) => setTipoQuarto(e.target.value)}
                        required
                        title="Indique se o alojamento é um T0/T1/T2/T3/..."
                    >
                        <option value="">Selecione...</option>
                        <option value="T0">T0</option>
                        <option value="T1">T1</option>
                        <option value="T2">T2</option>
                        <option value="T3">T3</option>
                        <option value="T4+">T4+</option>
                    </select>
                </div>

                <div className="label-container3">
                    <label htmlFor="price" className="label1">Preço</label>
                    <input
                        type="number"
                        placeholder="Preço"
                        value={price || ''}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        required
                        title="Indique o custo por mês"
                    />
                </div>

                <div className="label-container3">
                    <label htmlFor="area" className="label1">Área</label>
                    <input
                        type="number"
                        placeholder="Área"
                        value={area || ''}
                        onChange={(e) => setArea(parseFloat(e.target.value))}
                        required
                        title="Indique a área do quarto (em m^2)"
                    />
                </div>

                <div className="label-container3">
                    <label htmlFor="Andar" className="label1">Andar</label>
                    <select
                        value={andar}
                        onChange={(e) => setAndar(e.target.value)}
                        required
                        title="Indique o andar onde se encontrar o quarto"
                    >
                        <option value="">Selecione...</option>
                        <option value="Rés do chão">Rés do chão</option>
                        <option value="1º">1º andar</option>
                        <option value="2º">2º andar</option>
                        <option value="3º">3º andar</option>
                        <option value="4º">4º andar</option>
                        <option value="5º">5º andar</option>
                        <option value="+5ª">+5º andar</option>
                    </select>
                </div>

                <div className="label-container3">
                    <label htmlFor="gastos" className="label1">Gastos</label>
                    <select
                        value={gastos}
                        onChange={(e) => setGastos(e.target.value)}
                        required
                        title="Indique se os gastos estão incluidos"
                    >
                        <option value="">Selecione...</option>
                        <option value="Incluidos">Incluidos</option>
                        <option value="Não incluidos">Não incluidos</option>
                    </select>
                </div>

                <div className="label-container6">
                    <label htmlFor="Animais" className="label1">Animais</label>
                    <select
                        value={animais}
                        onChange={(e) => setAnimais(e.target.value)}
                        required
                        title="Indique se são permitodos animais no alojamento"
                    >
                        <option value="">Selecione...</option>
                        <option value="Permitidos">Permitidos</option>
                        <option value="Não permitidos">Não Permitidos</option>
                    </select>
                </div>

                <div className="label-container3">
                    <label htmlFor="fumadores" className="label1">Fumadores</label>
                    <select
                        value={fumadores}
                        onChange={(e) => setFumadores(e.target.value)}
                        required
                        title="Indique se é permitido fumar dentro do alojamento"
                    >
                        <option value="">Selecione...</option>
                        <option value="Permitido">Permitido</option>
                        <option value="Não permitido">Não Permitido</option>
                    </select>
                </div>

            </div>
            
            <label htmlFor="ambiente" className="label1">Ambiente</label>
            <input
                type="text"
                placeholder="Ambiente"
                value={ambiente}
                onChange={(e) => setAmbiente(e.target.value)}
                required
                title="Descreva o ambiente"
            />

            <label htmlFor="vista" className="label1">Vista</label>
            <input
                type="text"
                placeholder="Vista"
                value={vista}
                onChange={(e) => setVista(e.target.value)}
                required
                title="Descreva a vista"
            />

            <button type="button" onClick={handleToggleOptions}>
                {showEquipmentOptions ? 'Esconde as opções' : 'Adiciona os equipamentos disponíveis no alojamento'}
            </button>
            {showEquipmentOptions && (
                <div className="equipment-options">
                    {uniqueEquipmentNames.map((equipment, index) => (
                        <div key={index} className="equipment-option">
                            <label htmlFor={`equipment-${index}`}>{equipment}</label>
                            <input
                                type="checkbox"
                                id={`equipment-${index}`}
                                value={equipment}
                                onChange={() => toggleEquipment(equipment)}
                                checked={equipamentoDisponivel.includes(equipment)}
                            />
                        </div>
                    ))}
                </div>
            )}
            <div className="selected-equipment">
                <h3>Selected Equipment:</h3>
                <ul>
                    {equipamentoDisponivel.map((equipment, index) => (
                        <li key={index}>{equipment}</li>
                    ))}
                </ul>
            </div>

            <input
                type="text"
                placeholder="Géneros"
                value={genero.join(',')}
                onChange={(e) => setGenero(e.target.value.split(','))}
                required
                title="Insira os géneros permitidos"
            />
            <input
                type="text"
                placeholder="Renda Inclui (separado por vírgula)"
                value={rendaInclui.join(',')}
                onChange={(e) => setRendaInclui(e.target.value.split(','))}
                required
                title="Insira o que está incluido na renda, separado por vírgula"
            />
            <input
                type="text"
                placeholder="Equipamento Disponível (separado por vírgula)"
                value={equipamentoDisponivel.join(',')}
                onChange={(e) => setEquipamentoDisponivel(e.target.value.split(','))}
                required
                title="Insira todos os equipamentos disponíveis, separados por vírgula"
            />
            <button type="submit">Submit</button>
        </form>
    </div>
    );
}

export default RoomForm;