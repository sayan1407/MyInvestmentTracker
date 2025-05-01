import React from 'react'

function InvestmentList(props) {
  return (
    <div className="col-6 offset-3 mt-3 border">
                <h2 className="h2 text-center">Investment List</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Investment Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody id="investmentList">
                        {props.investmentList.map((investment, index) => (
                            <tr key={index}>
                                <td>{investment.investmentName}</td>
                                <td>{investment.amount}</td>
                                <td>{investment.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    </div>
  )
}

export default InvestmentList