import React, { useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useState } from 'react';
import IncomeOverview from '../../components/Income/IncomeOverview';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Modal from '../../components/layouts/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';

const Income = () => {
  const [incomeData, setIncomeData ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)

  // Get All Income Details
  const fetchIncomeDetails = async() => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false);
    }
  };

  // Move useEffect to component level
  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  // Handle Add Income
  const handleAddIncome = async() => {};

  // Delete Income
  const deleteIncome = async(id) => {};

  // Handle Downloading Income details
  const handleDownloadIncomeDetails = async () => {
  };

  return (
    <DashboardLayout activeMenu="Income">
          <div className="my-5 mx-auto"></div>
          <div className="grid grid-cols-1 gap-6">
            <div className="">
              <IncomeOverview
                transactions={incomeData}
                onAddIncome={() => setOpenAddIncomeModal(true)}
              />
            </div>
          </div>

          <Modal
            isOpen={openAddIncomeModal}
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </Modal>
    </DashboardLayout>
  )
}

export default Income