/*import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";

const PaymentSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Payment processed successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <CardContent>
          <h2 className="text-xl font-semibold text-center mb-4">Payment Section</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name on Card</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Card Number</Label>
              <Input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                maxLength={16}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Expiry Date</Label>
                <Input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <Label>CVV</Label>
                <Input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  maxLength={3}
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
              Pay Now
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSection;*/

