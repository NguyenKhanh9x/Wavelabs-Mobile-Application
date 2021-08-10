import { createSlice } from "@reduxjs/toolkit";

let initServiceExited = [
    {
        id: 1,
        name: "Service 1",
        items: [{
            id: 1,
            name: "option 1",
        },
        {
            id: 2,
            name: "option 2",
        },
        {
            id: 3,
            name: "option 3",
        }]
    },
    {
        id: 2,
        name: "Service 2",
        items: [{
            id: 1,
            name: "option 4",
        },
        {
            id: 2,
            name: "option 5",
        },
        {
            id: 3,
            name: "option 6",
        }]
    },
    {
        id: 3,
        name: "Service 3",
        items: [{
            id: 1,
            name: "option 7",
        },
        {
            id: 2,
            name: "option 8",
        },
        {
            id: 3,
            name: "option 9",
        }]
    },
    {
        id: 4,
        name: "Service 4",
        items: [{
            id: 1,
            name: "option 10",
        },
        {
            id: 2,
            name: "option 11",
        },
        {
            id: 3,
            name: "option 12",
        }]
    },
    {
        id: 5,
        name: "Service 5",
        items: [{
            id: 1,
            name: "option 13",
        },
        {
            id: 2,
            name: "option 14",
        },
        {
            id: 3,
            name: "option 15",
        }]
    },
    {
        id: 6,
        name: "Service 6",
        items: [{
            id: 1,
            name: "option 16",
        },
        {
            id: 2,
            name: "option 17",
        },
        {
            id: 3,
            name: "option 18",
        }]
    },
]


const initialState = {
    listServices: initServiceExited,
    listChekedServices: [],
};

const ServiceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        addService: (state, action) => {
            const data = action.payload;
            const listChecked = state.listChekedServices;
            if (listChecked.length > 0) {
                const index = listChecked.findIndex(item => item.id === data.id)
                if (index > -1) {
                    const index2 = listChecked[index].option.findIndex(item => item.id === data.option[0].id)
                    if (index2 > -1) {
                        if (listChecked[index].option.length === 1) {
                            listChecked.splice(index, 1);
                        }
                        else {
                            listChecked[index].option.splice(index2, 1);
                        }
                    }
                    else {
                        listChecked[index].option.push(data.option[0])
                    }
                }
                else {
                    listChecked.push(data)
                }
            }
            else {
                state.listChekedServices.push(data)
            }
        },
        resetList: (state, action) => {
            state.listChekedServices = []
        }
    },
});
export const servicesAction = ServiceSlice.actions;
export default ServiceSlice.reducer;
