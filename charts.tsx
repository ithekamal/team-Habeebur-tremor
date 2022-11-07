import React, { useEffect, useState } from "react";
import {
  Card,
  Title,
  AreaChart,
  ColGrid,
  Dropdown,
  DropdownItem,
} from "@tremor/react";


interface cardDetails {
  label: string;
  sublabel: string;
  yAxis: number;
  xAxis: number;
}

//Given Input
let cardsInformations: cardDetails[][] = [
  [
    {
      label: "scenario1",
      sublabel: "$438m",
      yAxis: 72,
      xAxis: 2003,
    },
    {
      label: "scenario1",
      sublabel: "$438m",
      yAxis: 92,
      xAxis: 2005,
    },
    {
      label: "scenario1",
      sublabel: "$438m",
      yAxis: 19,
      xAxis: 2006,
    },
  ],
  [
    {
      label: "scenario2",
      sublabel: "$338m",
      yAxis: 30,
      xAxis: 2001,
    },
    {
      label: "scenario2",
      sublabel: "$338m",
      yAxis: 10,
      xAxis: 2005,
    },
    {
      label: "scenario2",
      sublabel: "$338m",
      yAxis: 11,
      xAxis: 2007,
    },
  ],
];

const charts = () => {
   

  //UpdatingCards
  const [updateCards, setupdateCards] = useState(false);
  const [addKPI, setaddKPI] = useState(false);
  const [isHovering, setHovering] = useState(false);
  //updating UI and Graph (by re-rendering)
  useEffect(() => {
    console.log("Updating Cards")
  }, [updateCards]);

  const handleMouseOver = () => {
    setHovering(true);
  };

  //function to removeCard/deleting particular card detail from card Details array 
  const removeCard = (element: any): void => {
    console.log("the getted input is",element)

    setHovering(false);
    cardsInformations.length === 1
      ? (cardsInformations = [])
      : cardsInformations.splice(cardsInformations.indexOf(element));
    setupdateCards(!updateCards);
  };

  //function to add KPi/adding another card details in  card Details array
  const addingKPI = (labelName: string) => {
    cardsInformations.push([
      {
        label: labelName,
        sublabel: "$4392092m",
        yAxis: 72,
        xAxis: 2003,
      },
      {
        label: labelName,
        sublabel: "$4392092m",
        yAxis: 64,
        xAxis: 2006,
      },
    ]);
    //updating state 
    setupdateCards(!updateCards);
    setaddKPI(false);
  };

  return (
    <>
      {addKPI === false ? (
        <h3 onClick={() => setaddKPI(!addKPI)}>+addKPi</h3>
      ) : (
        <Dropdown
          placeholder="Select..."
          handleSelect={(value: string) => addingKPI(value)}
          maxWidth="max-w-none"
          marginTop="mt-0"
        >
          <DropdownItem value={"chairman"} text="chairman" />
          <DropdownItem value={"manager"} text="manager" />
          <DropdownItem value={"designer"} text="designer" />
        </Dropdown>
      )}

      <ColGrid
        numColsMd={4}
        numColsLg={4}
        gapX="gap-x-2"
        gapY="gap-y-2"
        marginTop="mt-0"
      >
        {cardsInformations.map((eachCard: cardDetails[]) => (
          <Card maxWidth="max-w-xs">
            <div  onMouseOver={handleMouseOver}>
            <Title>{eachCard[0].label}</Title>
            <Title>{eachCard[0].sublabel}</Title>
              <div className="hover_area">
                <div >
                  x
                  {isHovering && (
                    <span>
                      <button className="delete-Button" onClick={removeCard} style={{border:"solid 1px green", borderRadius:'5px', backgroundColor:'red'}}>
                        Delete🗑
                      </button>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <AreaChart
              data={eachCard}
              categories={["yAxis"]}
              dataKey="xAxis"
              height="h-40"
              colors={["indigo"]}
              marginTop="mt-4"
            />
          </Card>
        ))}
      </ColGrid>
    </>
  );
};

export default charts;
