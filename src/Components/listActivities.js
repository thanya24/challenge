import React, {useState, useEffect} from 'react'
import { getActivities, saveNewFormat } from '../Services/'


const ListActivities = () => {
    const [activities,setActivities] = useState([]) 
    const [userSessions,setUserSessions] = useState([]) 
    useEffect(()=>{
       async function loadActivities(){
           const response = await getActivities()
           console.log(response)
           if(response.status===200){               
                 
               console.log(response.data.activities)      
               setActivities(response.data.activities)
           
           }
       }
       loadActivities()
    },[])


    const user_sessions = activities.reduce((p, c) => {
        let index = p[1].indexOf(c.user_id); 
        if (index === -1) { 
          p[1].push(c.user_id); 
              
          var user = c.user_id 
          var object  = { [user]:{ ended_at: c.answered_at, 
                                started_at: c.first_seen_at, 
                                duration_Second: c.answered_at - c.first_seen_at, 
                                activity_id:  [c.id]}};  
          p[0].push(object);  

        var answeredAtValidation = new Date(c.answered_at).getTime();
        var firstSeenAtValidation    = new Date(c.first_seen_at).getTime();
        var diff = answeredAtValidation - firstSeenAtValidation;
        if((diff/(1000*60) )>5){           
            p[0+1].push(object); 
        } 
        } 
        else {
          p[0][index].ended_at =p[0][index].c.answered_at;
          p[0][index].started_at =  p[0][index].c.first_seen_at;
          p[0][index].activity_id.push(c.id);  
          p[0][index].duration_Second = p[0][index].p.answered_at - p.first_seen_at;  
        }
        console.log("User sessions method")
        console.log(p)
        return p;
      }, [[],[]])[0];


      const submitSessions = (activities)=>{
        setUserSessions (user_sessions())
        saveNewFormat(userSessions)
    }



  return (
    <div className='row'>
        <h3>{activities.length > 1 ?  "Working": " not good TESTING"}</h3>
        {activities.map((activity,index)=> {          
           return <ul  key={index}>{activity.id} -{activity.user_id} - {activity.answered_at} - {activity.first_seen_at}</ul>
         })}

         <button className='btn btn-primary' onClick={()=>submitSessions(activities)}>Click me to send data</button>
    </div>
  )
}

export default ListActivities;