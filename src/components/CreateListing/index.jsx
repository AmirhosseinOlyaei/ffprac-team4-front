import Box from "@mui/material/Box";
import { useState, useContext } from "react";
import LeftDrawer from "./LeftDrawer";
import ToyListingPreview from "./ToyListingPreview";
import { getUserContext } from "../../context/userContext";
const CreateListing = () => {
  const { user } = getUserContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [delivery, setDelivery] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [googleValue, setGoogleValue] = useState(null);
  const [value, setValue] = useState(null);
  const [toy, setToy] = useState({});
  const [fetchedFileName, setFetchedFileName] = useState("");
  const userId = user ? user._id : "";
  const handleValueChangeLocation = (newValue) => {
    setValue(newValue);
  };

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };
  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };
  const handleConditionChange = (newCondition) => {
    setCondition(newCondition);
  };
  const handleDeliveryChange = (newDelivery) => {
    setDelivery(newDelivery);
  };

  const handleFileChange = (newFile) => {
    setSelectedFile(newFile);
  };
  const handleClearPhoto = () => {
    setSelectedFile(null);
  };
  const handleInputChange = (newvalue) => {
    setGoogleValue(newvalue);
  };

  const handleToyChange = (newToy) => {
    setToy(newToy);
  };
  const handleFetchedFile = (fetchedFileName) => {
    setFetchedFileName(fetchedFileName);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <LeftDrawer
        onTitleChange={handleTitleChange}
        title={title}
        onDescriptionChange={handleDescriptionChange}
        description={description}
        onCategoryChange={handleCategoryChange}
        category={category}
        onConditionChange={handleConditionChange}
        condition={condition}
        onDeliveryChange={handleDeliveryChange}
        delivery={delivery}
        onFileChange={handleFileChange}
        selectedFile={selectedFile}
        onClearPhoto={handleClearPhoto}
        onValueChangeLocation={handleValueChangeLocation}
        value={value}
        onInputChange={handleInputChange}
        googleValue={googleValue}
        onToyChange={handleToyChange}
        toy={toy}
        handleFetchedFile={handleFetchedFile}
        userId={userId}
      />

      <ToyListingPreview
        title={title}
        description={description}
        condition={condition}
        delivery={delivery}
        selectedFile={selectedFile}
        googleValue={googleValue}
        value={value}
        toy={toy}
        fetchedFileName={fetchedFileName}
        userId={userId}
      />
    </Box>
  );
};

export default CreateListing;
