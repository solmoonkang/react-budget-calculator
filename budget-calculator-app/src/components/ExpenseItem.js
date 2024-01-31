import React, { useState } from "react";

const ExpenseItem = React.memo(({ id, expense, budgetData, setBudgetData, provided, snapshot, handleClick }) => {

    // TODO: 수정을 눌렀을 때, 지출 항목과 비용을 수정할 수 있는 기능을 구현해야 된다.
    // TODO: 수정과 삭제 아이콘을 변경해준다.

    const [isEditing, setIsEditing] = useState(false);
    const [editedExpense, setEditedExpense] = useState(expense);

    const handleEditChange = (event) => {
        setEditedExpense({...editedExpense, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {
        let newBudgetData = budgetData.map((data) => {
            if (data.id === id) {
                data.expense = editedExpense;
            }
            return data;
        });
        setBudgetData(newBudgetData);
        setIsEditing(false);
    }

    if (isEditing) {
        return (
            <div>
                <li className="bg-white leading-6 px-5 py-2.5 mb-4 border border-gray-300 flex justify-between transition-all duration-300 transform hover:scale-105">
                    <form onSubmit={handleSubmit}>
                        <input className="mr-8" value={editedExpense.category} onChange={handleEditChange} autoFocus />
                        <input className="font-light text-base py-0.5 px-0.5" value={editedExpense.amount} onChange={handleEditChange} autoFocus />
                    </form>
                    <div>
                        <button className="bg-transparent border-none text-x1 focus:outline-none cursor-pointer text-green-500" onClick={handleSubmit}>저장</button>
                        <button className="bg-transparent border-none text-x1 focus:outline-none cursor-pointer text-red-500" onClick={() => setIsEditing(true)}>삭제</button>
                    </div>
                </li>
            </div>
        );
    } else {
        return (
            <div className={`${snapshot.isDragging ? "bg-gray-400" : "gb-gray-100"}`} key={id} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                <li className="bg-white leading-6 px-5 py-2.5 mb-4 border border-gray-300 flex justify-between transition-all duration-300 transform hover:scale-105">
                    <div className="flex justify-between w-3/5">
                        <input className="mr-8" />{expense.category}
                        <span className="font-light text-base py-0.5 px-0.5">{expense.amount} 원</span>
                    </div>
                    <div>
                        <button className="bg-transparent border-none text-x1 focus:outline-none cursor-pointer text-green-500" onClick={() => setIsEditing(true)}>수정</button>
                        <button className="bg-transparent border-none text-x1 focus:outline-none cursor-pointer text-red-500" onClick={() => handleClick(id)}>삭제</button>
                    </div>
                </li>
            </div>
        );
    }
})

export default ExpenseItem;