import React from "react";

// Create a custom React hook to decouple logic from the App component
// It's a function, and for rule, it should start with "use"
// From now on, we'l use the logic defined in the "useLocalStorage" hook
// We'll use "react use state" only in the "useLocalStorage" hook
//Returns the items in local storage
function useLocalStorage(itemName, initialValue) {
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    //initialValue is the default state
    const [item, setItem] = React.useState(initialValue);

    React.useEffect(() => {
        setTimeout(() => {
            try {
                //Call localStorage and get item, which comes in string format
                const localStorageItem = localStorage.getItem(itemName);
                //There are 2 options. The user is new or not. If new, create an empty array, otherwise, retrieve the existing one from localStorage
                let parsedItem; //This will be sent to React.useState
                if (localStorageItem) {
                    parsedItem = JSON.parse(localStorageItem); //Parse the string
                } else {
                    parsedItem = initialValue;
                    localStorage.setItem(itemName, JSON.stringify(parsedItem)); //);
                }

                setItem(parsedItem);
                setLoading(false)
            } catch (error) {
                setError(error)
            }
        }, 1000)
    });



    //Function to update the state AND store the tasks in localStorage
    const saveItem = (newItem) => {
        try {
            const stringifiedItem = JSON.stringify(newItem);
            localStorage.setItem(itemName, stringifiedItem);
            setItem(newItem);
        } catch (error) {
            setError(error)
        }
    }

    return {
        item,
        saveItem,
        loading,
        error,
    };
}

export { useLocalStorage };