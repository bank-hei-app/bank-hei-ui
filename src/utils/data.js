const DATA = [
    {
        
        fullname: "Admin Account",
        type: "Savings Peso",
        number: "47290539480",
        balance: 1000,
        isAdmin: true, 
        transactions: []
    },
    {
        
        fullname: "Jeffrey de Lara",
        type: "Savings Peso",
        number: "47290539481",
        balance: 1029300.43,
        isAdmin: true, 
        transactions: []
    },
    {
        
        fullname: "Juan dela Cruz",
        type: "Savings Peso",
        number: "47290539482",
        balance: 392830.22,
        isAdmin: false, 
        budget: [
            {
                title: "Tuition fee",
                amount: 12000
            },
            {
                title: "Food take out during the pandemic",
                amount: 4000
            }
        ], 
        transactions: [
            {
                title: "Fund transfer", 
                amount: 2000,
                type: "debit", 
                date: "October 1, 2021"
            }, 
            {
                title: "Withdraw", 
                amount: 10000, 
                type: "debit",
                date: "October 1, 2021"
            }
        ]
    },
    {
        
        fullname: "Peter de Castro",
        type: "Savings Peso",
        number: "47290539483",
        balance: 102938.34,
        isAdmin: false, 
        transactions: []
    },
    {
       
        fullname: "Noli Enriquez",
        type: "Checking Peso",
        number: "47290539484",
        balance: 837495.38, 
        isAdmin: false, 
        transactions: []
    },

    {
        
        fullname: "Karen Davila",
        type: "Checking Peso",
        number: "47290539485",
        balance: 574839.58, 
        isAdmin: false, 
        transactions: []
    },
    {
        
        fullname: "Client Demo Account",
        type: "Savings Peso",
        number: "47290539486",
        balance: 1000,
        isAdmin: false, 
        transactions: []
    }
];

export default DATA;
