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
                                <td hidden>{investment.id}</td>
                                <td>{investment.investmentName}</td>
                                <td>{investment.amount}</td>
                                <td>{investment.date}</td>
                                <td>
                                    <button className='btn btn-primary' onClick={() => props.handleUpdating(investment.id,investment.investmentName,investment.date,investment.amount)}>
                                       <i class="bi bi-pencil-square"></i>
                                    </button>
                                    &nbsp;
                                    <button className='btn btn-danger' onClick={() => props.handleDelete(investment.id)}>
                                       <i class="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
    </div>
  )
}

export default InvestmentList