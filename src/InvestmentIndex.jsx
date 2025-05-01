import React, { useState } from 'react'
import InvestmentList from './InvestmentList'

function InvestmentIndex() {
    const [invetments,setInvestments] = useState(() => {
        return [{
            investmentName: "Tata small cap fund",
            amount: 5000,
            date: "2025-05-01"
        },
        {
            investmentName: "Navi Nifty50 index fund",
            amount: 4000,
            date: "2025-05-01"
        },
       ]
    })
    const [investmentName, setInvestmentName] = useState("");
    const [amount, setAmount] = useState(0);
    const[investmentDate, setInvestmentDate] = useState("");
    const handleAddInvestment = (e) => {
        e.preventDefault();
        setInvestments((prevState) => {
            var existingInvestment = invetments.filter((investment) => investment.investmentName.toUpperCase() === investmentName.toUpperCase())
            if(existingInvestment.length > 0){
                 return prevState.map((investment) => {
                    if(investment.investmentName.toUpperCase() === investmentName.toUpperCase())
                    {
                        return {...investment, amount: parseInt(investment.amount) + parseInt(amount), date: investmentDate}
                    }
                    return investment;
                 });
            } 
            else{           
            return [...prevState, {investmentName: investmentName, amount: amount, date: investmentDate}];
            }
        })
        setInvestmentName("");
        setAmount(0);
        setInvestmentDate("");
    }
    const date = new Date();
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());
    
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   
  return (
    <div className="container">
        <h1 className="h1 text-success text-center">My Invetment Tracker</h1>
        <div className="row mb-5">
            <div className="col-6 offset-3 border">
                <form  method="POST" onSubmit={handleAddInvestment}>
                    <div className="mb-3 mt-3">
                        <label for="investmentName" className="form-label">Invetment Name</label>
                        <input type="text" className="form-control" id="investmentName" name="investmentName" 
                        value={investmentName} onChange={(e) => setInvestmentName(e.target.value)} required />
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <label for="amount" className="form-label">Amount</label>
                            <input type="number" className="form-control" id="amount" name="amount" 
                            value={amount} onChange={(e) => setAmount(e.target.value)}  required/>
                        </div>
                        <div className="col-6">
                            <label for="investmentDate" className="form-label">Date</label>
                            <input type="date" className="form-control" id="investmentDate" name="investmentDate"
                            value={investmentDate} onChange={(e) => setInvestmentDate(e.target.value)}  required />
                        </div>

                    </div>
                    
                    <button type="submit" className="btn btn-primary mb-3">Add</button>
                </form>
            </div>
        </div>
        <div className="row mb-3"></div>
        <div className="row mb-3"></div>
        <div className="row mb-3"></div>
        
        <div className="row mt-3">
            <div className="offset-3 col-2">
                <select className="form-select" id="monthSelect" aria-label="Default select example" onChange={(e) => {setSelectedMonth(e.target.value)}} >
                    <option value={selectedMonth} selected>{months[selectedMonth]}</option>
                    <option value="0">January</option>
                    <option value="1">February</option>
                    <option value="2">March</option>
                    <option value="3">April</option>
                    <option value="4">May</option>
                    <option value="5">June</option>
                    <option value="6">July</option>
                    <option value="7">August</option>
                    <option value="8">September</option>
                    <option value="9">October</option>
                    <option value="10">November</option>
                    <option value="11">December</option>
                </select>
            </div>
            <div className="col-2">
                <select className="form-select" id="monthSelect" aria-label="Default select example" onChange={(e) => {setSelectedYear(e.target.value)}} >
                    <option selected>{selectedYear}</option>
                    <option value="2025">2025</option>
                    
                </select>
            </div>
        </div>
       
        <div className="row mt-6">
            <InvestmentList investmentList = {invetments.filter((investment) => {
                const invDate = new Date(investment.date);
             
                return invDate.getMonth() === parseInt(selectedMonth) && invDate.getFullYear() === parseInt(selectedYear);
            })}/>
        </div>
    </div>
  )
}

export default InvestmentIndex