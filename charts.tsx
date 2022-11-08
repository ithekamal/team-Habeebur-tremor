import React, { useEffect, useState } from "react";
import { Card, Title, AreaChart, ColGrid,Dropdown,DropdownItem } from "@tremor/react";


interface cardDetails{
  label : string,
  sublabel : string,
  yAxis:number,
  xAxis:number
}

//Given Input
let userData: cardDetails[][] = [
  [
    {
      label: "scenario1",
      sublabel:"$438m",
      yAxis: 72,
      xAxis: 2003,
    },
    {
      label: "scenario1",
      sublabel:"$438m",
      yAxis: 92,
      xAxis: 2005,
    },
    {
      label: "scenario1",
      sublabel:"$438m",
      yAxis: 19,
      xAxis: 2006,
    },
  ],
  [
    {
    label: "scenario2", 
    sublabel:"$338m",
    yAxis: 30, 
    xAxis: 2001
    },
    {
     label: "scenario2",
     sublabel:"$338m",
     yAxis: 10, 
     xAxis: 2005
    },
    {
      label: "scenario2",
      sublabel:"$338m",
      yAxis: 11, 
      xAxis: 2007
     },
  ],
  [
    {
    label: "scenario4", 
    sublabel:"$338m",
    yAxis: 30, 
    xAxis: 2001
    },
    {
     label: "scenario4",
     sublabel:"$338m",
     yAxis: 10, 
     xAxis: 2005
    },
    {
      label: "scenario4",
      sublabel:"$338m",
      yAxis: 11, 
      xAxis: 2007
     },
  ]
];
//random Data to create New Card
let newCard:cardDetails[] = [
  {
  label: "scenario", 
  sublabel:"$338m",
  yAxis: 30, 
  xAxis: 2001
  },
  {
   label: "scenario",
   sublabel:"$338m",
   yAxis: 10, 
   xAxis: 2005
  },
  {
    label: "scenario",
    sublabel:"$338m",
    yAxis: 11, 
    xAxis: 2007
   },
]


const charts = () => {
  let cardsInformations = userData

  //UpdatingCards
  const [updateCards,setUpdateCards] = useState<cardDetails[][]>(cardsInformations)
  const [addKPI,setaddKPI] = useState(false)
  const [isHovering, setHovering] = useState(false);


  //function to remove cards
  const deletingCard = (cardToRemove:cardDetails[]) =>{
    setHovering(false);
    let reducedCards =  updateCards
    reducedCards.splice (reducedCards.indexOf(cardToRemove),1)
    setUpdateCards(() => ([...reducedCards]))
  }
  

  //function to add card
  const addingKPI = (labelName:string,shouldAddElement:cardDetails[]) =>{
    shouldAddElement.map((eachData:cardDetails) => eachData.label = labelName)
    setUpdateCards(() => ([...updateCards,shouldAddElement]))
    setaddKPI(false)
  }
   
  //function for Delete Button Visibilty
  const handleMouseOver = () => {
    setHovering(true);
  };
  
  return (
  
  <>
   {addKPI === false ? <h3 onClick={() => setaddKPI(!addKPI)}>+addKPi</h3>:
     <Dropdown
     placeholder="Select..."
     handleSelect={ (value:string) => addingKPI(value,newCard) }

     maxWidth="max-w-none"
     marginTop="mt-0"
 >
     <DropdownItem
         value={ "chairman" }
         text= "chairman"
     />
     
     <DropdownItem
         value={ "manager" }
         text="manager"
     />
     
     <DropdownItem
         value={ "designer"}
         text="designer"
     />
 </Dropdown>
   }
 
  <ColGrid
      numColsMd={4}
      numColsLg={4}
      gapX="gap-x-2"
      gapY="gap-y-2"
      marginTop="mt-0"
      >

  {updateCards.map((eachCard:cardDetails[]) => (
    <Card maxWidth="max-w-xs">
        <div  onMouseOver={handleMouseOver}>
      <Title>{eachCard[0].label}</Title>
      <Title>{eachCard[0].sublabel}</Title>

      <div className="hover_area">
          <div>
                  x
                  {isHovering && (
                     <span>
                     <button className="delete-Button" onClick={()=>{deletingCard(eachCard)}} style={{border:"solid 1px green", borderRadius:'5px', backgroundColor:'#ff8e77'}}>
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
  </>)
};

export default charts;
