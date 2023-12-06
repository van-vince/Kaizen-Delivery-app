export const filterData = [ 
    // {name:"Ride",image: require('../../assets/ride.png'), id:"0"},
    {name:"Package",image:require("../../assets/package.png"),id:"2"},
    {name:"Food",image:require("../../assets/food.png"),id:"1"},
    {name:"Anything",image:require("../../assets/reserve.png"),id:"3"}
                          
    ];


export const rideData =[
    {street:"Marina mall accra",area:"Airport bypass road Accra Ghana",id:"0"},
    {street:"Madina Zongo",area:"madina, Accra Ghana",id:"1"},
    {street:"Numguah Secondary School",area:"Accra Tema beach road, Nunguah Ghana",id:"2"},
    {street:"37 Military Hospital",area:"Liberation Road 37 millitary hospital",id:"3"},
    {street:"Independence Avenue",area:"Independence Avenue Accra Ghana",id:"4"},
];

export const carTypeData =[
    {title:"Popular",
     data:[
    {name:"Uber Go",group :2, price:7,image: require('../../assets/uberGo.png'),note:"Affordable.compact rides",promotion:5 ,time:"20:19",id:"0"},
    {name:"UberX",group :3, price:5.5,image: require('../../assets/uberX.png'),note:"Affordable everyday trips",promotion:0,time:"20:20", id:"1"},
    {name:"Connect", group:0, price:12.6,image: require('../../assets/uberConnect.png'),note:"Send and receive packages",promotion:10,time:"20:33", id:"2"}
     ]
    },

    {title:"Premium",
    data:[
   {name:"Black",group :3, price:17.4,image: require('../../assets/uberBlack.png'),note:"Premium trips in luxury cars",promotion:0,time:"20:31",id:"3"},
   {name:"Van", group:6, price:22.3,image: require('../../assets/uberVan.png'),note:"Rides for groups up to 6",promotion:12,time:"20:31", id:"4"},
    ]
   },

   {title:"More",
   data:[
  {name:"Assist",group :3, price:35.3,image: require('../../assets/uberAssist.png'),note:"Special assistance from certified drivers",promotion:26,time:"20:25",id:"5"},
   ]
  },

];

 export const requestData = [{
    name:"For Me",id:0
},
{
    name:"For Someone",id:1
}

]

export const rideOptions = [{name:"Personal",icon:"account", id:"0"},
{name:"Business",icon:"briefcase", id:"1"},  

];

export const paymentOptions = [{image:require('../../assets/visaIcon.png'),text:"Visa ...0476"},
                                {image:require('../../assets/cashIcon.png'),text:"Cash"}]

export const availableServices = ["Uber Go","UberX","Uber connect","Uber Black","Uber Van","Uber Assist"]

export const carsAround = [
    {latitude:5.594690,longitude:-0.088250},
    {latitude:5.588769,longitude:-0.128826},
    {latitude:5.583985,longitude:-0.170025},
    {latitude:5.575784,longitude:-0.125393},
    {latitude:5.583985,longitude:-0.098614},

]