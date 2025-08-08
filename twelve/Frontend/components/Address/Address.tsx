"use client";

import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Pencil, Trash, X } from "lucide-react";

// Define Address Type
interface Address {
  id: number;
  name: string;
  location: string;
  phone: string;
}

const AddressManager: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Open Modal for Adding New Address
  const openModal = () => {
    setCurrentAddress(null);
    setIsModalOpen(true);
  };

  // Open Modal for Editing Address
  const editAddress = (address: Address) => {
    setCurrentAddress(address);
    setIsModalOpen(true);
  };

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const newAddress: Address = {
      id: currentAddress ? currentAddress.id : Date.now(),
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      phone: formData.get("phone") as string,
    };

    if (currentAddress) {
      setAddresses((prev) => prev.map((addr) => (addr.id === currentAddress.id ? newAddress : addr)));
    } else {
      setAddresses((prev) => [...prev, newAddress]);
    }

    setIsModalOpen(false);
  };

  // Delete Address
  const deleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-center text-xl font-bold border-b pb-2">ADDRESS</h2>

      {/* Add Address Button */}
      <button onClick={openModal} className="w-full mt-4 border px-4 py-2 rounded-md text-black font-semibold hover:bg-gray-100">
        ADD ADDRESS
      </button>

      {/* Address List */}
      <div className="mt-4">
        {addresses.map((address) => (
          <div key={address.id} className="flex justify-between items-center p-4 border-b">
            <div>
              <p className="font-bold">{address.name}</p>
              <p className="text-sm">{address.location}</p>
              <p className="text-sm">{address.phone}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => editAddress(address)} className="text-blue-500 hover:text-blue-700" title="Edit Address">
                <Pencil size={18} />
              </button>
              <button onClick={() => deleteAddress(address.id)} className="text-red-500 hover:text-red-700" title="Delete Address"> 
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Address */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Dialog.Panel className="bg-white p-6 rounded-md w-96">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{currentAddress ? "Edit Address" : "Add Address"}</h3>
            <button onClick={() => setIsModalOpen(false)} className="text-gray-600 hover:text-black" title="Close Modal">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" name="name" placeholder="Full Name" defaultValue={currentAddress?.name || ""} required className="w-full border p-2 rounded-md" />
            <input type="text" name="location" placeholder="Location" defaultValue={currentAddress?.location || ""} required className="w-full border p-2 rounded-md" />
            <input type="text" name="phone" placeholder="Phone Number" defaultValue={currentAddress?.phone || ""} required className="w-full border p-2 rounded-md" />
            <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
              {currentAddress ? "Update Address" : "Add Address"}
            </button>
          </form>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default AddressManager;
