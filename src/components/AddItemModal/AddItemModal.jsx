import { useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// onAddItem refers to handleAddItemSubmit, which is declared in App.js
const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  // declare state for each input field
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("hot");
  // use a useEffect hook to reset the input field state to empty strings when
  // the modal is opened
  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("hot");
    }
  }, [isOpen]);

  // create onChange handlers corresponding to each state variable
  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
    onCloseModal();
    // prevent defaultbehavior
    // call onAddItem with appropriate arguments
  }

  return <ModalWithForm />;
};

export default AddItemModal;
