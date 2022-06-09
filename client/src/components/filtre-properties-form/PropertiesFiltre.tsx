import React from "react";
import "./PropertiesFiltre.scss";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";

const PropertiesFiltre = (props: any) => {
  const { setCategories, categories, city, setCity, type, setType } = props;
  const handleCategoryChange = (e: any) => {
    //add or remove the value from the categories array
    if (e.target.checked) {
      setCategories([...categories, e.target.value]);
    } else {
      setCategories(
        categories.filter((category: string) => category !== e.target.value)
      );
    }
  };
  const handleTypeChange = (e: any) => {
    if (e.target.checked) {
      setType([...type, e.target.value]);
    } else {
      setType(type.filter((type: string) => type !== e.target.value));
    }
  };
  const handleCityChange = (e: any) => {
    if (e.target.checked) {
      setCity([...city, e.target.value]);
    } else {
      setCity(city.filter((city: string) => city !== e.target.value));
    }
  };

  return (
    <>
      <h2>CATÉGORIE</h2>
      <div className="p-2 flex flex-col">
        <Checkbox
          name="maisons"
          value={"maisons"}
          onChange={(e: any) => handleCategoryChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
        >
          {" "}
          Maison
        </Checkbox>
        <Checkbox
          value={"bureaux"}
          name="Bureaux"
          onChange={(e: any) => handleCategoryChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
        >
          {" "}
          Bureaux
        </Checkbox>
        <Checkbox
          name="Villas"
          value={"villas"}
          onChange={(e: any) => handleCategoryChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
        >
          {" "}
          Villas
        </Checkbox>
        <Checkbox
          value={"appartments"}
          name="appartements"
          onChange={(e: any) => handleCategoryChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
        >
          {" "}
          appartements
        </Checkbox>
        <Checkbox
          value={"locaux"}
          name="locaux"
          onChange={(e: any) => handleCategoryChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
        >
          {" "}
          Locaux
        </Checkbox>
      </div>

      <h2>TYPE</h2>
      <div className="p-2 flex flex-col">
        <Checkbox
          name="A louer"
          onChange={(e: any) => handleTypeChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"louer"}
        >
          {" "}
          A louer
        </Checkbox>
        <Checkbox
          name="A vendre"
          onChange={(e: any) => handleTypeChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"vendre"}
        >
          {" "}
          A vendre
        </Checkbox>
      </div>
      <h2>Ville</h2>
      <div className="p-2 flex flex-col">
        <Checkbox
          name="Monastir"
          onChange={(e: any) => handleCityChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"monastir"}
        >
          {" "}
          Monastir
        </Checkbox>
        <Checkbox
          name="Sousse"
          onChange={(e: any) => handleCityChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"sousse"}
        >
          {" "}
          Sousse
        </Checkbox>
        <Checkbox
          name="Tozer"
          onChange={(e: any) => handleCityChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"tozeur"}
        >
          {" "}
          Tozer
        </Checkbox>
        <Checkbox
          name="Nabeul"
          onChange={(e: any) => handleCityChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"nabeul"}
        >
          {" "}
          Nabeul
        </Checkbox>
        <Checkbox
          name="Sidi-Bouzid"
          onChange={(e: any) => handleCityChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"sidibouzid"}
        >
          {" "}
          Sidi-Bouzid
        </Checkbox>
        <Checkbox
          name="Sfax"
          onChange={(e: any) => handleCityChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"sfax"}
        >
          {" "}
          Sfax
        </Checkbox>
        <Checkbox
          name="tunis"
          onChange={(e: any) => handleCityChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"tunis"}
        >
          {" "}
          Tunis
        </Checkbox>
        <Checkbox
          name="jendouba"
          onChange={(e: any) => handleCityChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"Jendouba"}
        >
          {" "}
          Jendouba
        </Checkbox>
        <Checkbox
          name="Mahdia"
          onChange={(e: any) => handleCityChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"mahdia"}
        >
          {" "}
          Mahdia
        </Checkbox>
        <Checkbox
          name="bizerte"
          onChange={(e: any) => handleCityChange(e)}
          shape="curve"
          variant="thick"
          className="my-2 "
          color="success-o"
          value={"bizerte"}
        >
          {" "}
          Bizerte
        </Checkbox>
      </div>
    </>
  );
};

export default PropertiesFiltre;
