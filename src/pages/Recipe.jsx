import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import React from "react";
import recipes from "../data/recipes.json";

const recipeData = recipes.recipes.filter((recipe) => recipe.id);

function Recipe() {
  let params = useParams();
  //   const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const filteredRecipe = recipeData.filter(
    (recipe) => recipe.id === params.name
  )[0];
  //   console.log(filteredRecipe);
  //   console.log(filteredRecipe.ingredients);

  return (
    <DetailWrapper>
      <div className="titleAndImage">
        <h2>{filteredRecipe.title}</h2>
        <img src={"../assets/images/" + filteredRecipe.image} alt="" />
      </div>
      <InfoCard>
        <ButtonWrapper>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </Button>
        </ButtonWrapper>
        <ContentWrapper>
          {activeTab === "instructions" &&
            filteredRecipe.instructions.replaceAll(";", "")}
          {activeTab === "ingredients" && (
            <ul>
              {filteredRecipe.ingredients.split(";").map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </ContentWrapper>
      </InfoCard>
    </DetailWrapper>

    // {recipeData.map((recipe) => {
    //   return <li>{recipe.id}</li>;
    // })}
  );
}

export default Recipe;

const DetailWrapper = styled.div`
  margin: 4rem 10rem;
  display: flex;
  align-items: flex-start;
  border-radius: 15px;
  justify-content: center;

  .active {
    /* background: aquamarine; */
    color: black;
    border: 4px solid aquamarine;
  }
  .titleAndImage {
    flex-direction: column;
    padding: 0 20px 20px;
    display: flex;
    align-items: center;
  }
  h2 {
    margin-top: 0;
    margin-bottom: 2rem;
    padding: 5px;
    font-size: 2.5rem;
    color: #313131;
    background: rgba(250, 250, 250, 0.4);
    border-top: 4px solid lightblue;
    border-bottom: 8px solid lightblue;
    text-align: center;

    @media (max-width: 640px) {
      margin-bottom: 1rem;
    }
  }
  li {
    line-height: 2.3rem;
  }
  ul {
    margin-top: 1rem;
  }

  img {
    background: white;
    border-radius: 10px;
    box-shadow: 3px 3px 5px lightgray;
    padding: 10px;
    max-width: 250px;
    max-height: 200px;
    width: auto;
    height: auto;
  }
  @media (max-width: 640px) {
    justify-content: center;
    flex-wrap: wrap;
    h2 {
      padding: 8px 0;
      line-height: 2rem;
      font-size: 2rem;
      border-top: 2px solid lightblue;
      border-bottom: 4px solid lightblue;
    }
    line-height: 1.7rem;
    div {
      border: none;
    }
    margin: 1px;
    ul {
      padding: 8px;
      margin: 0;
    }
    li {
      line-height: 1.7rem;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  font-size: 1.2rem;
  background: #fff;
  border: 2px solid #666;
  box-shadow: 2px 2px 5px 3px #888888;
  border-radius: 15px;
  margin-top: 10px;
  margin-right: 2rem;
  margin-bottom: 2rem;
  font-weight: 600;

  @media (max-width: 640px) {
    margin-right: 1rem;
    margin-bottom: 1rem;
    font-size: 1rem;
    padding: 8px;
  }
`;

const InfoCard = styled.div`
  margin-left: 10rem;
  width: 100%;
  max-width: 600px;
  /* background: pink; */
  /* border: 2px solid #a67025; */
  border-radius: 15px;
  padding: 0 10px;

  @media (max-width: 640px) {
    margin: 1rem;
    padding: 10px;
    // font-size: 11px;
  }
`;

const ContentWrapper = styled.div`
  background: white;

  border: 3px solid transparent;
  border-image: linear-gradient(45deg, #db8594, pink);
  border-image-slice: 1;
  padding: 10px 20px;
  color: #313131;
  font-size: 1.6rem;
  // text-align: justify;
  line-height: 2.4rem;

  @media (max-width: 640px) {
    font-size: 1.1rem;
    line-height: 1.5rem;
    li {
      // padding-left: 2px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
