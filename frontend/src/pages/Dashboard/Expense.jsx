import React  from 'react';
import { useEffect } from 'react'; 
import { useState } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/layouts/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';


const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)

    // Get All Expense Details
  const fetchExpenseDetails = async() => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false);
    }
  };

  // Move useEffect to component level
  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  // API call to Handle Add Expense
  const handleAddExpense = async(expense) => {
    const { category, amount, date, icon } = expense;

    // Validation Checks
    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount, 
        date,
        icon,
    });
      // Optimistically update state
    setExpenseData(prev => [...prev, { category, amount, date, icon }]);
    await fetchExpenseDetails();
    setOpenAddExpenseModal(false);
    toast.success("Expense added successfully");
  } catch(error){
    console.error(
      "Error adding expense:",
      error.response?.data?.message || error.message
    );
  }
};

  // Delete Income
  const deleteIncome = async(id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error deleting(expense):", 
        error.response?.data?.message || error.message
      );
    }
  };

  // Handle Downloading Income details
  const handleDownloadIncomeDetails = async () => {};
  
  return (
      <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
        </div>

        <Modal 
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>

      </div>

      </DashboardLayout>
  )
}

export default Expense