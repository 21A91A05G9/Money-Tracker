import React,{useState,useEffect} from 'react'
import axios from 'axios'
import 'bootstrap'
import {format} from 'date-fns'

function Transactions() {
  const [Trandata,setTData] = useState([]);
  const [inc,setInc] = useState(0);
  useEffect(()=>{
        axios.get('https://money-tracker-backend-mu.vercel.app/transactions')
        .then(res=>{
            const sortedData = res.data.sort((a, b) => { return new Date(b.date) - new Date(a.date); });     
            setTData(sortedData)
        })
        .catch(err=>console.log(err));
  },[])

  const [page,pageNav]=useState([0,10]);
  const show = Trandata.length > 10;


  return (
    <div className="pb-1 pt-4" style={{height : '90%'}}>
    <div className="col-md-12 h-100 border px-2 pt-4 rounded ">
        <div className="d-flex flex-column  h-100 justify-content-between rounded  text-center" >
        <div>
            <table className='table table-striped '>
            <thead>
                <tr>
                <th>S.No</th>
                <th>Title</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Reference</th>          
                </tr>
            </thead>
            <tbody>
                {
                    Trandata.slice(page[0],page[1]).map((item,id) => (
                        <tr key={id}>
                            <td >{id+1+inc}</td>
                            <td >{item.title}</td>
                            <td >{format(item.date,'dd/MM/yyyy')}</td>
                            <td style={{'color': (item.type==='Expense')?'red':'green', fontWeight : 'bold'}} >{item.amount}₹</td>
                            <td >{item.type}</td>
                            <td >{item.ref}</td>
                        </tr>
                    ))
                }
            </tbody>
            </table> 
        </div>
        {show && <div className="row w-100 align-items-center justify-content-around pb-3 ">
            <button className='col-md-2 btn btn-light p-0' onClick={()=>{ pageNav([page[0]-10,page[1]-9]); setInc(inc-10); }} disabled={page[0] === 0} ><i className="bi bi-arrow-left-short"></i> Previous </button>
            <button className='col-md-2 btn btn-light p-0' onClick={()=>{ pageNav([page[0]+10,page[1]+9]); setInc(inc+10); }} disabled={page[1] >= Trandata.length} > Next <i className="bi bi-arrow-right-short"></i> </button>
        </div>}
        </div>
        </div>
    </div>
  )
}

export default Transactions
