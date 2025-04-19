import React, { useState } from "react";

const ApplyDiscount = () => {
  const [code, setCode] = useState<string>("");
  return (
    <div className="flex m-2 ">
      <input
        type="text"
        id="discount"
        name="discount"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter discount / voucher code"
        className="rounded-none rounded-s-lg bg-slate-30 border border-slate-300 text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-sm p-2.5  "
      />
      <span className="inline-flex items-center px-3 text-sm text-white bg-green-500 cursor-pointer border border-e-0 border-slate-300 rounded-e-full">
        Apply
      </span>
    </div>
  );
};

export default ApplyDiscount;
