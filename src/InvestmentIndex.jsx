import React, { useEffect, useState } from 'react'
import InvestmentList from './InvestmentList'
import { useAddInvestmentMutation, useDeleteInvestmentMutation, useGetInvestmentsQuery, useUpdateInvestmentMutation } from './Api/investmentApi'
import { useGetGraphQuery } from './Api/InvestmentGraphAPI'
import InvestmentGraph from './InvestmentGraph';
import InvestmentGraphByCategory from './InvestmentGraphByCategory';
import MainLoader from './MainLoader';



function InvestmentIndex() {
    const{data,isLoading} = useGetInvestmentsQuery();
    const [invetments,setInvestments] = useState([])
    const [addInvestment] = useAddInvestmentMutation();
    useEffect(() => {
      if (!isLoading) {
        setInvestments(data);
        
      }
    }, [data, isLoading]);
   
    const [investmentName, setInvestmentName] = useState("");
    const [amount, setAmount] = useState(0);
    const[investmentDate, setInvestmentDate] = useState("");
    const[investmentId, setInvestmentId] = useState(0)
    const [updateInvestment] = useUpdateInvestmentMutation();
    
    const handleAddInvestment = (e) => {
      e.preventDefault();
      if (isUpdating) {
        var existingInvestmentWithDifferentId = invetments.filter((investment) =>
            investment.investmentName.toUpperCase() ===
              investmentName.toUpperCase() &&
            new Date(investment.date).getMonth() ===
              new Date(investmentDate).getMonth()
              && investment.id != investmentId
        );
        if(existingInvestmentWithDifferentId.length > 0)
        {
            var newAmount = 0;
            existingInvestmentWithDifferentId.map((i) => {
                newAmount += i.amount;
                deleteInvestment(i.id)
                
            });
            updateInvestment({
                id: investmentId,
                investmentName: investmentName,
                amount: Number(amount) + Number(newAmount),
                date: investmentDate,
              });
        }
        else{
            updateInvestment({
                id: investmentId,
                investmentName: investmentName,
                amount: amount,
                date: investmentDate,
              });
       
        }
        setIsUpdating(false);
      } else {
        var existingInvestment = invetments.filter(
          (investment) =>
            investment.investmentName.toUpperCase() ===
              investmentName.toUpperCase() &&
            new Date(investment.date).getMonth() ===
              new Date(investmentDate).getMonth()
        );
        if (existingInvestment.length > 0) {
          
          updateInvestment({
            ...existingInvestment[0],
            amount: parseInt(existingInvestment[0].amount) + parseInt(amount),
            date: investmentDate,
          });
        } else {
          addInvestment({
            investmentName: investmentName,
            amount: amount,
            date: investmentDate,
          });
        }
      }

      setInvestmentName("");
      setAmount(0);
      setInvestmentDate("");
    }
    const [isUpdating,setIsUpdating] = useState(false)
    const handleUpdating = (updatingInvestmentId,updatingInvestmentName,updatingInvestmentDate,updatingAmount) => {
            setIsUpdating(true)
            setInvestmentName(updatingInvestmentName)
            setInvestmentDate(updatingInvestmentDate)
            setAmount(updatingAmount)
            setInvestmentId(updatingInvestmentId)
    }
    const[deleteInvestment] = useDeleteInvestmentMutation();
    
    const handleDelete = async (id) => {
        console.log(id)
        await deleteInvestment(id);
    }
    const currentDate = new Date();
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    const [selectedMonthForCategory, setselectedMonthForCategory] = useState(currentDate.getMonth());
    const [selectedYearCategory, setselectedYearCategory] = useState(currentDate.getFullYear());

    const [selectedYearForGraph, setselectedYearForGraph] = useState(currentDate.getFullYear());
    
    const minYear = invetments.reduce((min,item) => {
      const date = new Date(item.date)

      if(date.getFullYear() <= min)
        min = date.getFullYear()
      return min
    },9999);
    const maxYear = invetments.reduce((max,item) => {
      const date = new Date(item.date)
      if(date.getFullYear() >= max)
        max = date.getFullYear()
      return max
    },0);

    let years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);
    console.log(selectedYearForGraph)
 

   
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">My Invetment Tracker</h1>
      <div className="row justify-content-center mb-5">
        <div className="col-md-6 card-style">
          <form method="POST" onSubmit={handleAddInvestment}>
            <div className="mb-3">
              <label htmlFor="investmentName" className="form-label">
                Invetment Name
              </label>
              <input
                type="text"
                className="form-control"
                id="investmentName"
                name="investmentName"
                value={investmentName}
                onChange={(e) => setInvestmentName(e.target.value)}
                required
              />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="investmentDate" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="investmentDate"
                  name="investmentDate"
                  value={investmentDate}
                  onChange={(e) => setInvestmentDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={`btn  ${
                isUpdating ? "btn-success" : "btn-primary"
              } mb-3 w-100`}
            >
              {isUpdating ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-6 card-style">
          <h2 className="text-center mb-4">Investment List</h2>
          <div className="select-group mb-4">
            <select
              className="form-select w-auto"
              id="monthSelect"
              aria-label="Default select example"
              onChange={(e) => {
                setSelectedMonth(e.target.value);
              }}
              defaultValue={selectedMonth}
            >
              {/* <!-- <option value={selectedMonth} selected>{months[selectedMonth]}</option> --> */}
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

            <select
              className="form-select w-auto"
              id="monthSelect"
              aria-label="Default select example"
              onChange={(e) => {
                setSelectedYear(e.target.value);
              }}
              value={selectedYear}
            >
              {years.map((item,index) => (
                    <option value={item} key={index}>{item}</option>
                ))}
                
            </select>
          </div>
          <InvestmentList
            investmentList={invetments.filter((investment) => {
              const invDate = new Date(investment.date);

              return (
                invDate.getMonth() === parseInt(selectedMonth) &&
                invDate.getFullYear() === parseInt(selectedYear)
              );
            })}
            handleUpdating={handleUpdating}
            handleDelete={handleDelete}
          />
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-10  card-style">
          <h2 className="text-center mb-4">Investment Tracker by Month</h2>
          <div id="chartByMonth" style={{ height: "100%", width: "100%" }}>
            <div className="select-group">
              <select
                className="form-select w-auto"
                id="yearSelectForGraph"
                aria-label="Default select example"
                onChange={(e) => {
                  setselectedYearForGraph(e.target.value);
                }}
                value={selectedYearForGraph}
              >
                {/* <option selected>{selectedYear}</option> */}
                {years.map((item,index) => (
                    <option value={item} key={index}>{item}</option>
                ))}
                
              </select>
            </div>
            {isLoading ? <MainLoader/> : <InvestmentGraph investments={invetments} year={selectedYearForGraph}/>}
             
          
            
          </div>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-10  card-style">
          <h2 className="text-center mb-4">Investment Tracker by Category</h2>
          <div id="chartByMonth" style={{ height: "100%", width: "100%" }}>
            <div className="select-group">
              <select
                className="form-select w-auto"
                id="monthSelectForCategoryGraph"
                aria-label="Default select example"
                onChange={(e) => {
                  setselectedMonthForCategory(e.target.value);
                }}
                defaultValue={selectedMonthForCategory}
              >
                {/* <!-- <option value={selectedMonth} selected>{months[selectedMonth]}</option> --> */}
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
              <select
                className="form-select w-auto"
                id="yearSelectForGraph"
                aria-label="Default select example"
                onChange={(e) => {
                  setselectedYearCategory(e.target.value);
                }}
                value={selectedYearCategory}
              >
                {years.map((item,index) => (
                    <option value={item} key={index}>{item}</option>
                ))}
                
              </select>
            </div>
            <InvestmentGraphByCategory
              investments={invetments}
              month={selectedMonthForCategory}
              year={selectedYearCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestmentIndex