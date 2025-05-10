import React, { useEffect, useState } from 'react'
import InvestmentList from './InvestmentList'
import { useAddInvestmentMutation, useDeleteInvestmentMutation, useGetInvestmentsQuery, useUpdateInvestmentMutation } from './Api/investmentApi'
import { useGetGraphQuery } from './Api/InvestmentGraphAPI'
import InvestmentGraph from './InvestmentGraph';
import InvestmentGraphByCategory from './InvestmentGraphByCategory';


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
    const date = new Date();
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
    const [selectedYear, setSelectedYear] = useState(date.getFullYear());

    const [selectedMonthForCategory, setselectedMonthForCategory] = useState(date.getMonth());
    const [selectedYearCategory, setselectedYearCategory] = useState(date.getFullYear());
    
   
  return (
    <div className="container">
      <h1 className="h1 text-success text-center">My Invetment Tracker</h1>
      <div className="row mb-5">
        <div className="col-6 offset-3 border">
          <form method="POST" onSubmit={handleAddInvestment}>
            <div className="mb-3 mt-3">
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
              <div className="col-6">
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
              <div className="col-6">
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
              } mb-3`}
            >
              {isUpdating ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>
      <div className="row mb-3"></div>
      <div className="row mb-3"></div>
      <div className="row mb-3"></div>

      <div className="row mt-3">
        <div className="offset-3 col-2">
          <select
            className="form-select"
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
        </div>
        <div className="col-2">
          <select
            className="form-select"
            id="monthSelect"
            aria-label="Default select example"
            onChange={(e) => {
              setSelectedYear(e.target.value);
            }}
            defaultValue={selectedYear}
          >
            {/* <option selected>{selectedYear}</option> */}
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      <div className="row mt-6">
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
      <div className="row mb-3"></div>
      <div className="row mb-3"></div>
      <div className="row mb-3"></div>
      <div className='border  border-info m-5 border-3'>
        <div className="row mt-3">
          <div className="col-2 offset-2">
            <select
              className="form-select"
              id="yearSelectForGraph"
              aria-label="Default select example"
              onChange={(e) => {
                setSelectedYear(e.target.value);
              }}
              defaultValue={selectedYear}
            >
              {/* <option selected>{selectedYear}</option> */}
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-6 offset-1">
            <InvestmentGraph investments={invetments} />
          </div>
        </div>
      </div>

      <div className="border  border-warning m-5 border-3">
        <div className="row mt-5">
          <div className="offset-3 col-2">
            <select
              className="form-select"
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
          </div>
          <div className="col-2">
            <select
              className="form-select"
              id="yearSelectForCategoryGraph"
              aria-label="Default select example"
              onChange={(e) => {
                setselectedYearCategory(e.target.value);
              }}
              defaultValue={selectedYearCategory}
            >
              {/* <option selected>{selectedYear}</option> */}
              <option value="2025">2025</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-6 offset-1">
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