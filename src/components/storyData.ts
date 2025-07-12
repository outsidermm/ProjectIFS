// Define story data matching your sections
export const storyData = [
  {
    title: "",
    groups: [{ name: "", count: 0, color: "bg-blue-500" }],
  },
  {
    title: "Education & Age",
    groups: [
      { name: "Master's/PhD", count: 25, color: "bg-purple-600" },
      { name: "Bachelor's", count: 35, color: "bg-purple-400" },
      { name: "High School", count: 40, color: "bg-purple-200" },
    ],
  },
  {
    title: "Marital Status & Gender",
    groups: [
      { name: "Married Female", count: 32, color: "bg-pink-600" },
      { name: "Married Male", count: 28, color: "bg-pink-500" },
      { name: "Single Female", count: 18, color: "bg-pink-400" },
      { name: "Single Male", count: 15, color: "bg-pink-300" },
      { name: "Widowed/Separated", count: 7, color: "bg-pink-200" },
    ],
  },
  {
    title: "Income & Dependents",
    groups: [
      { name: "High Income, No Dependents", count: 22, color: "bg-yellow-600" },
      {
        name: "High Income, With Dependents",
        count: 18,
        color: "bg-yellow-500",
      },
      {
        name: "Medium Income, No Dependents",
        count: 25,
        color: "bg-yellow-400",
      },
      {
        name: "Medium Income, With Dependents",
        count: 20,
        color: "bg-yellow-300",
      },
      { name: "Low Income", count: 15, color: "bg-yellow-200" },
    ],
  },
  {
    title: "CIBIL Score",
    groups: [
      { name: "750+ (Excellent)", count: 22, color: "bg-sky-600" },
      { name: "700-749 (Good)", count: 31, color: "bg-sky-500" },
      { name: "650-699 (Fair)", count: 28, color: "bg-sky-400" },
      { name: "600-649 (Poor)", count: 12, color: "bg-sky-300" },
      { name: "<600 (Very Poor)", count: 7, color: "bg-sky-200" },
    ],
  },
  {
    title: "Assets & Loan Term",
    groups: [
      { name: "High Assets, Short Term", count: 28, color: "bg-emerald-600" },
      { name: "High Assets, Long Term", count: 22, color: "bg-emerald-500" },
      { name: "Medium Assets, Short Term", count: 25, color: "bg-emerald-400" },
      { name: "Medium Assets, Long Term", count: 15, color: "bg-emerald-300" },
      { name: "Low Assets", count: 10, color: "bg-emerald-200" },
    ],
  },
  {
    title: "Final Approval Status",
    groups: [
      { name: "Approved", count: 58, color: "bg-green-500" },
      { name: "Rejected", count: 42, color: "bg-red-500" },
    ],
  },
];
