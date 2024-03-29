import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import React, { useState, useCallback } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const initialBudgetData = localStorage.getItem("budgetData") ? JSON.parse(localStorage.getItem("budgetData")) : [];

function App() {
  
  const [budgetData, setBudgetData] = useState(initialBudgetData);
  const [expense, setExpense] = useState({ category: "", amount: "" });

  const handleClick = useCallback((id) => {
    let newBudgetData = budgetData.filter((data) => data.id !== id);
    setBudgetData(newBudgetData);
    localStorage.setItem("budgetData", JSON.stringify(newBudgetData));

    toast("아이템이 삭제되었습니다.", { autoClose: 3000 });
  }, [budgetData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let newBudgetData = {
      id: Date.now(),
      expense: expense
    }
    setBudgetData(prev => [...prev, newBudgetData]);
    localStorage.setItem("budgetData", JSON.stringify([...budgetData, newBudgetData]));
    
    setExpense({ category: "", amount: "" });
    
    toast("아이템이 생성되었습니다.", { autoClose: 3000 });
  }

  const totalExpense = budgetData.reduce((expense, item) => expense + Number(item.expense.amount), 0);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-yellow-100">
      <div className="w-full p-6 m-4 rounded lg:w-3/4 lg:max-lg">
        <div className="flex justify-between mb-3 text-4xl">
          <h1>예산 계산기</h1>
        </div>
        <ToastContainer />
        <ExpenseForm handleSubmit={handleSubmit} expense={expense} setExpense={setExpense} />
        <ExpenseList handleClick={handleClick} budgetData={budgetData} setBudgetData={setBudgetData} />
        <div className="flex justify-end mt-4">
          <div className="text-3xl">
            총지출: 
            <span>{Number(totalExpense).toLocaleString()}원</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;